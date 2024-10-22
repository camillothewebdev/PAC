import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import default_image from "../data/default_profile";
import axios from "axios";
import connection from "../data/connection";
import imageCompression from "browser-image-compression";
import MainLayout from "../layout/mainlayout";

function PageMembreAjout(props) {
  const navigate = useNavigate();
  const [typeMembreSelect, setTypeMembreSelect] = useState([]);
  const [fonctionSelect, setFonctionSelect] = useState([]);
  const [niveauSelect, setNiveauSelect] = useState([]);
  const niveauId = useLocation().pathname.split("/")[2];
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const openEndDialog = () => {
    document.getElementById("modal2").showModal();
  };

  const nonFinalise = () => {
    alert("Adhesion non finalisé");
    navigate("/home");
  };

  const [membre, setMembre] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
    lieuNaiss: "",
    dateNaiss: "",
    adresse: "",
    profession: "",
    telephone: "",
    idNiveau: "",
    idFonction: "",
    idTypeMembre: "",
    photo: default_image,
    dateAdhesion: dateNaturel,
    
  });

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
      membre.telephone == ""
    ) {
      openDialog();
    } else {
      openEndDialog();
    }
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const handleSubmit = async (event) => {
    event.target.disabled = true;
    try {
      await axios.post(connection + "/ajouter-membre", membre);
      navigate("/membres");
    } catch (error) {
      console.log("error");
      setServerError(true);
    }
  };

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        let typeMembreValues = await axios.get(
          connection + "/lire-type-membre"
        );
        let fonctionValues = await axios.get(connection + "/lire-fonction");
        let niveauValues = await axios.get(connection + "/lire-niveau");
        setTypeMembreSelect(typeMembreValues.data);
        setFonctionSelect(fonctionValues.data);
        setNiveauSelect(niveauValues.data);
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

  let listFonctionSelect = [];
  fonctionSelect &&
    fonctionSelect.forEach((value) => {
      if (value.id) {
        listFonctionSelect.push(
          <option key={value.id} value={value.id}>
            {value.libelle}
          </option>
        );
      }
    });

  let listNiveauSelect = [];
  let sw = 0;
  let group = "";
  let groupKey = 999;
  niveauSelect &&
    niveauSelect.forEach((value) => {
      groupKey += 1;
      if (value.type == group && sw == 1) {
        console.log(value.libelle);
      } else {
        sw = 0;
        group = value.type;
        sw = 1;
        listNiveauSelect.push(
          <optgroup key={groupKey} label={group}></optgroup>
        );
      }
      if (value.id) {
        listNiveauSelect.push(
          <option
            key={value.id}
            value={value.id}
            selected={value.id == niveauId ? true : false}
          >
            {value.libelle}
          </option>
        );
      }
    });
  const goToHome = () => {
    navigate("/");
  };

  const goToMembre = () => {
    navigate("/membres");
  };

  const goToCarte = () => {
    navigate("/paiement");
  };

  const handleChange = (event) => {
    if (event.target.name == "idNiveau" && membre.idFonction != "") {
      alert("La fonction a été retirée parceque le niveau a changé");
      setMembre((prev) => ({ ...prev, idFonction: "" }));
    }
    setMembre((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  function convertToBase64(file, event) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setMembre((prev) => ({ ...prev, photo: reader.result }));
        event.target.src = reader.result;
        console.log(reader.result);
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
        <img src="../icon/back.png" className="back-btn" onClick={goToMembre} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          maxHeight: "65vh",
        }}
      >
        <section className="form-adhesion" style={{ overflowY: "scroll" }}>
          <center>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "230px",
                margin: 0,
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
          <div className="zone">
            <label htmlFor="sexe">Niveau :</label>
            <select name="idNiveau" onChange={handleChange}>
              <option value=""></option>
              {listNiveauSelect}
            </select>
          </div>
          <div className="zone">
            <label htmlFor="">Fonction:</label>
            <select
              name="idFonction"
              value={membre.idFonction}
              onChange={handleChange}
            >
              <option value=""></option>
              {listFonctionSelect}
            </select>
          </div>
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
          <button onClick={pushButton}>ENREGISTRER</button>
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
        <h2 style={{ fontSize: "0.8rem", textAlign: "center" }}>
          La carte coûte 10$
        </h2>
        <center>
          {" "}
          <h3>Esque le membre a payé ?</h3>
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
            OUI
          </button>
        </div>
      </dialog>
    </MainLayout>
  );
}

export default PageMembreAjout;
