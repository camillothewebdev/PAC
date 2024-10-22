import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import default_evenement from "../data/default_evenement";
import axios from "axios";
import connection from "../data/connection";
import data_actualite from "../data/data_actualite";
import imageCompression from "browser-image-compression";
import MainLayout from "../layout/mainlayout";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function PageActivitesModifier() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let locationActualiteId = parseInt(location.pathname.split("/")[2]);
  const user = useContext(AuthContext);
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [evenement, setEvenement] = useState({
    idPublicateur: 0,
    titre: "",
    image: "",
    contenu: "",
    date: dateNaturel,
    valide: "",
  });
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          connection + "/lire-evenement/" + locationActualiteId
        );
        setEvenement(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/activites");
  };
  const handleSubmit = async (event) => {
    if (evenement.titre == "" || evenement.contenu == "") {
      alert("Veuillez remplir tous les champs");
      return;
    }
    evenement.valide = user.user.idFonction != null ? "oui" : "non";
    evenement.date = dateNaturel;
    event.target.disabled = true;
    try {
      await axios.put(
        connection + "/modifier-evenement/" + locationActualiteId,
        evenement
      );
    } catch (error) {
      console.log("error");
      setServerError(true);
    }
    navigate("/activites");
  };

  const handleChange = (event) => {
    setEvenement((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function convertToBase64(file, event) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setEvenement((prev) => ({ ...prev, image: reader.result }));
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function importData(event) {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files)[0];
      const options = {
        maxSizeMB: 0,
        maxWidthOrHeight: 180,
        useWebWorker: true,
        fileType: "image/png",
      };
      imageCompression(files, options).then((img) => {
        convertToBase64(img, event);
      });
    };
    input.click();
  }

  const [serverError, setServerError] = useState(false);
  if (serverError) {
    return (
      <div>
        <center>
          <img
            className="server-error"
            src="../img/no-wifi.png"
            alt="Erreur de connexion"
            width={"80%"}
            height={"230px"}
          />
          <h3>Il y a une erreur au serveur</h3>
          <br />
          <div className="confirm-btn">
            <button onClick={goToHome}>Réessayer</button>
          </div>
        </center>
      </div>
    );
  }

  return (
    <MainLayout>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <center>
            <img
              src="../img/wait.gif"
              className="wait"
              width="100%"
              alt="wait"
            />
          </center>
        </div>
      ) : (
        <>
          <div className="header-controls">
            <img
              src="../icon/back.png"
              className="back-btn"
              onClick={goToHome}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              maxHeight: "65vh",
            }}
          >
            <section
              className="form-adhesion"
              style={{
                overflowY: "scroll",
                alignContent: "center",
                justifyContent: "center",
                padding: "0em 5em",
              }}
            >
              <center>
                <br />
                <br />
                <img
                  onClick={importData}
                  src={evenement.image}
                  width={"80%"}
                  height="auto"
                  style={{
                    border: "black 2px solid",
                    maxWidth: "300px",
                    maxHeight: "250px",
                  }}
                  alt="profile"
                  name="image"
                />
              </center>

              <center>
                <div className="zone">
                  <label htmlFor="nom" style={{ textAlign: "left" }}>
                    Titre :
                  </label>
                  <input
                    type="text"
                    name="titre"
                    onChange={handleChange}
                    value={evenement.titre}
                  />
                </div>
                <div className="zone">
                  <label htmlFor="nom" style={{ textAlign: "left" }}>
                    Contenu :
                  </label>
                  <textarea
                    name="contenu"
                    value={evenement.contenu}
                    style={{
                      fontSize: "1.5rem",
                      width: "100%",
                      borderColor: "black",
                      fontWeight: "bold",
                    }}
                    cols="32"
                    rows="3"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </center>
            </section>
          </div>
          <center>
            <div
              className="confirm-btn"
              style={{
                width: "100%",
                margin: "auto",
                bottom: "0",
              }}
            >
              <button onClick={handleSubmit}>MODIFIER</button>
              <br />
              <br />
            </div>
          </center>
        </>
      )}
    </MainLayout>
  );
}

export default PageActivitesModifier;
