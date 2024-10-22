import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import default_image from "../data/default_profile";
import axios from "axios";
import connection from "../data/connection";
import imageCompression from "browser-image-compression";
import MainLayout from "../layout/mainlayout";

function PageAdhesion(props) {
  const navigate = useNavigate();
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [membre, setMembre] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
    lieuNaiss: "",
    dateNaiss: "",
    pays: "",
    province: "",
    commune: "",
    avenue: "",
    numero: "",
    adresse: "",
    profession: "",
    telephone: "",
    photo: default_image,
    idTypeMembre: "",
    dateAdhesion : dateNaturel,
  });

  const [typeMembreSelect, setTypeMembreSelect] = useState([]);

  const handleSubmit = async (event) => {
    if (
      membre.nom == "" ||
      membre.postnom == "" ||
      membre.prenom == "" ||
      membre.sexe == "" ||
      membre.lieuNaiss == "" ||
      membre.dateNaiss == "" ||
      membre.adresse == "" ||
      membre.profession == "" ||
      membre.telephone == "" ||
      membre.idTypeMembre == ""
    ) {
      openDialog();
      return;
    }

    event.target.disabled = true;
    try {
      await axios.post(connection + "/adhesion-en-ligne", membre);
      navigate("/paiement");
    } catch (error) {
      console.log("error");
      setServerError(true);
    }
    console.log(membre);
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };
  const pushButton = () => {
    if (
      membre.nom == "" ||
      membre.postnom == "" ||
      membre.prenom == "" ||
      membre.sexe == "" ||
      membre.lieuNaiss == "" ||
      membre.dateNaiss == "" ||
      membre.adresse == "" ||
      membre.profession == "" ||
      membre.telephone == "" ||
      membre.idTypeMembre == ""
    ) {
      openDialog();
    } else {
      openEndDialog();
    }
  };
  const openEndDialog = () => {
    document.getElementById("modal2").showModal();
  };

  const nonFinalise = () => {
    alert("Adhesion non finalisé");
    navigate("/home");
  };

  const goToPaiement = () => {
    navigate("/paiement");
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToCarte = () => {
    navigate("/paiement");
  };

  const handleChange = (event) => {
    setMembre((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  function convertToBase64(file, event) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setMembre((prev) => ({ ...prev, photo: reader.result }));
        event.target.src = reader.result;
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
        maxWidthOrHeight: 100,
        useWebWorker: true,
        fileType: "image/png",
      };
      imageCompression(files, options).then((img) => {
        convertToBase64(img, event);
      });
    };
    input.click();
  }

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        let values = await axios.get(connection + "/lire-type-membre/");
        setTypeMembreSelect(values.data);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchSelect();
  }, []);

  let listTypeMembreSelect = [];
  typeMembreSelect &&
    typeMembreSelect.forEach((value) => {
      if (value.id) {
        listTypeMembreSelect.push(
          <option key={value.id} value={value.id}>
            {value.libelle}
          </option>
        );
      }
    });

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
      <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
        <section
          className="form-adhesion"
          style={{
            overflowY: "scroll",
          }}
        >
          <center>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "230px",
              }}
            >
              <img
                onClick={importData}
                src="../img/profile.png"
                width={"100%"}
                height={150}
                style={{ border: "black 2px solid" }}
                alt="profile"
              />
              <img
                src="../icon/camera.png"
                alt="camera"
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  width: "20%",
                  borderRadius: "50%",
                  padding: "0.3em",
                  right: 0,
                  bottom: 0,
                  margin: "0.2em",
                }}
              />
            </div>
          </center>
          <div className="zone">
            <label htmlFor="nom">Nom :</label>
            <input type="text" name="nom" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="prenom">Postnom :</label>
            <input type="text" name="postnom" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="prenom">Prenom :</label>
            <input type="text" name="prenom" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="sexe">Sexe :</label>
            <select name="sexe" onChange={handleChange}>
              <option value=""></option>
              <option value="M">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>
          <div className="zone">
            <label htmlFor="lieu">Lieu de naissance :</label>
            <input type="text" name="lieuNaiss" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="lieu">Date de naissance :</label>
            <input type="date" name="dateNaiss" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="lieu">Adresse :</label>
            <input type="text" name="adresse" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="lieu">Profession :</label>
            <input type="text" name="profession" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="lieu">Telephone :</label>
            <input type="text" name="telephone" onChange={handleChange} />
          </div>
          <div className="zone">
            <label htmlFor="sexe">Type membre :</label>
            <select name="idTypeMembre" onChange={handleChange}>
              <option value=""></option>
              {listTypeMembreSelect}
            </select>
          </div>
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
            <button onClick={pushButton}>CONFIRMER</button>
            <br />
            <br />
          </div>
        </center>
        <dialog
          id="modal"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
            background: "rgb(224, 223, 223)",
          }}
        >
          <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
            Veuillez remplir tous les champs
          </p>
          <div
            className="choices"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={closeDialog}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
              }}
            >
              OK
            </button>
          </div>
        </dialog>
        <dialog
          id="modal2"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
            background: "rgb(224, 223, 223)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>La carte coûte 10$</h2>
          <center>
            {" "}
            <br />
            <h3>Voulez vous payer ?</h3>
          </center>
          <div
            className="choices"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={nonFinalise}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
              }}
            >
              NON
            </button>
            <button
              onClick={handleSubmit}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
              }}
            >
              ACCEPTER
            </button>
          </div>
        </dialog>
      </div>
    </MainLayout>
  );
}

export default PageAdhesion;
