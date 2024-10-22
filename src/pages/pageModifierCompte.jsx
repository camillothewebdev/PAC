import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import default_image from "../data/default_profile";
import axios from "axios";
import connection from "../data/connection";
import imageCompression from "browser-image-compression";
import { AuthContext } from "../context/authContext";
import MainLayout from "../layout/mainlayout";

function PageModifierCompte(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, update } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [typeMembreSelect, setTypeMembreSelect] = useState([]);
  const [fonctionSelect, setFonctionSelect] = useState([]);
  const [niveauSelect, setNiveauSelect] = useState([]);
  const convertirEnHtml = (dateSql) => {
    const date = dateSql.split("T")[0];
    return date;
  };
  const [membre, setMembre] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
    lieuNaiss: "",
    dateNaiss: "",
    province: "",
    pays: "",
    commune: "",
    avenue: "",
    numero: "",
    profession: "",
    telephone: "",
    idTypeMembre: "",
    idNiveau: "",
    idFonction: "",
    adresse: "",
    photo: default_image,
  });

  membre.dateNaiss = convertirEnHtml(membre.dateNaiss);

  let locationActualiteId = parseInt(location.pathname.split("/")[2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          connection + "/lire-membre/" + locationActualiteId
        );
        setMembre(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    if (
      membre.nom == "" ||
      membre.postnom == "" ||
      membre.prenom == "" ||
      membre.sexe == "" ||
      membre.lieuNaiss == "" ||
      membre.profession == "" ||
      membre.telephone == ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    event.target.disabled = true;
    try {
      await axios.put(
        connection + "/modifier-membre/" + locationActualiteId,
        membre
      );
      goToMembre();
    } catch (error) {
      console.log("error");
      setServerError(true);
    }
  };

  const goToHome = () => {
    navigate("/membres");
  };

  const goToMembre = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    if (event.target.name == "idNiveau" && membre.idFonction) {
      alert("La fonction a été retirée parceque le niveau a changé");
      setMembre((prev) => ({ ...prev, idFonction: "" }));
    }
    setMembre((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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

  const goToCarte = () => {
    navigate("/paiement");
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
          <option key={value.id} value={value.id}>
            {value.libelle}
          </option>
        );
      }
    });

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
                  }}
                >
                  <img
                    onClick={importData}
                    src={membre.photo || "../img/profile.png"}
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
                <input
                  type="text"
                  name="nom"
                  value={membre.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="prenom">Postnom :</label>
                <input
                  type="text"
                  name="postnom"
                  value={membre.postnom}
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="prenom">Prenom :</label>
                <input
                  type="text"
                  name="prenom"
                  value={membre.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="sexe">Sexe :</label>
                <select name="sexe" value={membre.sexe} onChange={handleChange}>
                  <option value=""></option>
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </div>
              <div className="zone">
                <label htmlFor="lieu">Lieu de naissance :</label>
                <input
                  type="text"
                  value={membre.lieuNaiss}
                  name="lieuNaiss"
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="lieu">Date de naissance :</label>
                <input
                  type="date"
                  value={membre.dateNaiss}
                  name="dateNaiss"
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="lieu">Adresse :</label>
                <input
                  type="text"
                  value={membre.adresse}
                  name="adresse"
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="lieu">Profession :</label>
                <input
                  type="text"
                  value={membre.profession}
                  name="profession"
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="lieu">Telephone :</label>
                <input
                  type="text"
                  value={membre.telephone}
                  name="telephone"
                  onChange={handleChange}
                />
              </div>
              <div className="zone">
                <label htmlFor="sexe">Type membre :</label>
                <select
                  name="idTypeMembre"
                  value={membre.idTypeMembre}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {listTypeMembreSelect}
                </select>
              </div>
              <div className="zone">
                <label htmlFor="sexe">Niveau :</label>
                <select
                  name="idNiveau"
                  value={membre.idNiveau}
                  onChange={handleChange}
                >
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

export default PageModifierCompte;
