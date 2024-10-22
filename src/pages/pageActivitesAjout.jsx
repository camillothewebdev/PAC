import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import default_evenement from "../data/default_evenement";
import axios from "axios";
import connection from "../data/connection";
import data_actualite from "../data/data_actualite";
import imageCompression from "browser-image-compression";
import { AuthContext } from "../context/authContext";
import MainLayout from "../layout/mainlayout";

function PageActivitesAjout() {
  const { user } = useContext(AuthContext);
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [evenement, setEvenement] = useState({
    idPublicateur: user.id,
    evenementTitre: "",
    evenementImage: default_evenement,
    evenementContenu: "",
    evenementDate: dateNaturel,
    valide: user && user.idFonction != null ? "oui" : "non",
  });

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/activites");
  };
  const handleSubmit = async (event) => {
    if (evenement.evenementTitre == "" || evenement.evenementContenu == "") {
      alert("Veuillez remplir tous les champs");
      return;
    }
    event.target.disabled = true;
    try {
      await axios.post(connection + "/ajouter-evenement", evenement);
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
        setEvenement((prev) => ({ ...prev, evenementImage: reader.result }));
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
      <div className="header-controls">
        <img src="../icon/back.png" className="back-btn" onClick={goToHome} />
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
              src={evenement.evenementImage}
              width={"80%"}
              height="auto"
              style={{
                border: "black 2px solid",
                maxWidth: "300px",
                maxHeight: "250px",
              }}
              alt="profile"
              name="evenementImage"
            />
          </center>

          <center>
            <div className="zone">
              <label htmlFor="nom" style={{ textAlign: "left" }}>
                Titre :
              </label>
              <input
                type="text"
                name="evenementTitre"
                onChange={handleChange}
              />
            </div>
            <div className="zone">
              <label htmlFor="nom" style={{ textAlign: "left" }}>
                Contenu :
              </label>
              <textarea
                name="evenementContenu"
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
        <center>
          <div
            className="confirm-btn"
            style={{
              width: "100%",
              margin: "auto",
              bottom: "0",
            }}
          >
            <button onClick={handleSubmit}>PUBLIER</button>
            <br />
            <br />
          </div>
        </center>
      </div>
    </MainLayout>
  );
}

export default PageActivitesAjout;

// <center>
//           <div className="actualite-header">
//             <div className="title">
//               <img src="../icon/back.png" alt="back" onClick={goToHome} />
//               <h1>Nouveau</h1>
//             </div>
//           </div>
//           <br />
//           <section className="form-adhesion">
//             <center>
//               <div
//                 style={{
//                   position: "relative",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "80%",
//                 }}
//               >
//                 <img
//                   onClick={importData}
//                   src={evenement.evenementImage}
//                   alt="evenement"
//                   width={"100%"}
//                   height={150}
//                   style={{ border: "black solid 2px" }}
//                 />
//                 <img
//                   src="../icon/camera.png"
//                   alt="camera"
//                   style={{
//                     backgroundColor: "white",
//                     position: "absolute",
//                     width: "20%",
//                     maxWidth: "50px",
//                     borderRadius: "50%",
//                     padding: "0.3em",
//                     right: 0,
//                     bottom: 0,
//                     border: "black solid",
//                     margin: "0.2em",
//                   }}
//                 />
//               </div>
//             </center>
//             <br /> <br />
//             <input
//               type="text"
//               style={{ fontSize: "1.2rem", width: "80%", borderColor: "black" }}
//               placeholder="Entrez le titre"
//               name="evenementTitre"
//               onChange={handleChange}
//             />
//             <br /> <br />

//             <br /> <br />
//             <center>
//               <button
//                 style={{
//                   fontSize: 30,
//                   padding: "0em 1em",
//                   fontWeight: "bold",
//                   border: "black 2px solid",
//                 }}
//                 onClick={handleSubmit}
//               >
//                 PUBLIER
//               </button>
//             </center>
