import { useNavigate } from "react-router-dom";
import Actualite from "../components/actualite";
import data_actualite from "../data/data_actualite";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";
import Symbole from "../components/symbole";
import default_evenement from "../data/default_evenement";
function PageTypeMembre() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [symboles, setSymboles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fonctionFormData, setFonctionFormData] = useState({
    id: 0,
    libelle: "",
  });

  const handleChange = (event) => {
    setFonctionFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    setFonctionFormData((prev) => ({
      ...prev,
      id: 0,
      libelle: "",
    }));
    document.getElementById("modal").close();
  };

  const closeDialog2 = () => {
    setFonctionFormData((prev) => ({
      ...prev,
      id: 0,
      libelle: "",
    }));
    document.getElementById("modal2").close();
  };

  const openDialog2 = (idSymbole) => {
    let symbole = symboles.find((symbole) => symbole.id == idSymbole);
    setFonctionFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: symbole.id,
      libelle: symbole.libelle,
    }));
    document.getElementById("modal2").showModal();
  };

  const closeDialog3 = () => {
    setFonctionFormData((prev) => ({
      ...prev,
      id: 0,
      libelle: "",
    }));
    document.getElementById("modal3").close();
  };

  const openDialog3 = (symboleId) => {
    let symbole = symboles.find((symbole) => symbole.id == symboleId);
    setFonctionFormData((prev) => ({
      ...prev,
      id: symbole.id,
      libelle: "",
    }));
    document.getElementById("modal3").showModal();
  };

  const add = async (event) => {
    if (fonctionFormData.libelle == "") {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      // tester si la fonction là existe à partir du libelle
      let response = await axios.post(
        connection + "/ajouter-type-membre",
        fonctionFormData
      );
    } catch (error) {
      console.log(error);
      setServerError(true);
    }

    //   if (res.data.existe) {
    //     let membres = typeMembreSelect.find(
    //       (typeMembre) =>
    //         typeMembre.id == document.getElementById("typeMembre").value
    //     );
    //     alert(
    //       `Ce symbole existe déjà pour les membres ${membres.libelle.toLowerCase()}s.`
    //     );
    //     setFonctionFormData((prev) => ({
    //       ...prev,
    //       idTypeMembre: 0,
    //     }));
    //     event.target.disabled = false;
    //     return;
    //   }

    closeDialog();
    fetchSymboles();
    event.target.disabled = false;
  };

  const edit = async (event) => {
    if (fonctionFormData.libelle == "") {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      //   let res = await axios.post(
      //     connection + "/existe-type-membre-symbole",
      //     fonctionFormData
      //   );
      //   if (res.data.existe) {
      //     let membres = typeMembreSelect.find(
      //       (typeMembre) =>
      //         typeMembre.id == document.getElementById("typeMembre").value
      //     );
      //     alert(
      //       `Les membres ${membres.libelle.toLowerCase()}s ont déjà ce symbole.`
      //     );
      //     setFonctionFormData((prev) => ({
      //       ...prev,
      //       idTypeMembre: 0,
      //     }));
      //     event.target.disabled = false;
      //     return;
      //   }
      let response = await axios.post(
        connection + "/modifier-type-membre",
        fonctionFormData
      );
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    event.target.disabled = false;
    closeDialog2();
    fetchSymboles();
  };

  const remove = async (event) => {
    event.target.disabled = true;
    try {
      let res = await axios.delete(
        connection + "/supprimer-type-membre/" + fonctionFormData.id
      );
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    event.target.disabled = false;
    closeDialog3();
    fetchSymboles();
  };

  const fetchSymboles = async () => {
    try {
      const res = await axios.get(connection + "/lire-type-membre");
      setSymboles(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  useEffect(() => {
    fetchSymboles();
  }, []);

  let listeSymboles = [];
  listeSymboles =
    symboles &&
    symboles.map((symbole) => {
      if (symbole.id) {
        if (
          user.idFonction == null &&
          user.idTypeMembre != symbole.idTypeMembre
        )
          return;
        return (
          <div className="symbole fonction">
            <h2 className="libelle" style={{ textTransform: "capitalize" }}>
              {symbole.libelle}
            </h2>
            <div className="controls">
              <div className="edit-delete">
                <img
                  onClick={() => {
                    openDialog3(symbole.id);
                  }}
                  src="../icon/delete.png"
                />
                <img
                  onClick={() => {
                    openDialog2(symbole.id);
                  }}
                  src="../icon/edit.png"
                />
              </div>
            </div>
          </div>
        );
      }
    });

  const goToHome = () => {
    navigate("/parametres");
  };
  const goToNewEvent = () => {
    navigate("/activites-ajout");
  };

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
    <>
      <MainLayout>
        <div className="header-title">
          <img src="../icon/back.png" className="back-btn" onClick={goToHome} />
        </div>
        <section
          className="actualite"
          style={{ height: "75vh", overflowY: "scroll", paddingTop: "0.5em" }}
        >
          <div className="add-evenement" onClick={openDialog}>
            <h3>TYPE MEMBRE</h3>
            <img src="../icon/ajouter.png" width="35px" />
          </div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
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
          ) : listeSymboles.length ? (
            listeSymboles
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              Aucun symbole
            </div>
          )}
        </section>
        <dialog
          id="modal"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
            padding: "1.2em 2em",
          }}
        >
          <div className="form">
            <img
              src="../icon/close.png"
              width="35px"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "0.5em",
              }}
              onClick={closeDialog}
            />
            <center>
              <h2>NOUVEAU</h2>
            </center>
            <div className="zone">
              <label htmlFor="libelle">Libelle :</label>
              <input
                type="text"
                name="libelle"
                value={fonctionFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <button
              className="dialog-btn"
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
                color: "black",
                width: "100%",
                maxWidth: "300px",
              }}
              onClick={add}
            >
              ENREGISTRER
            </button>
            <br />
          </div>
        </dialog>
        <dialog
          id="modal2"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
            padding: "1.2em 2em",
          }}
        >
          <div className="form">
            <img
              src="../icon/close.png"
              width="35px"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "0.5em",
              }}
              onClick={closeDialog2}
            />
            <center>
              <h2>MODIFIER</h2>
            </center>
            <div className="zone">
              <label htmlFor="libelle">Libelle :</label>
              <input
                type="text"
                name="libelle"
                value={fonctionFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <button
              className="dialog-btn"
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
                color: "black",
                width: "100%",
                maxWidth: "300px",
              }}
              onClick={edit}
            >
              MODIFIER
            </button>
            <br />
          </div>
        </dialog>
        <dialog
          id="modal3"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
          }}
        >
          <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
            Voulez vous supprimer ?
          </p>
          <div
            className="choices"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={closeDialog3}
              className="dialog-btn"
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
              }}
            >
              Non
            </button>
            <button
              onClick={remove}
              className="dialog-btn"
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1em",
                padding: "0.2em 1em",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Oui
            </button>
          </div>
        </dialog>
      </MainLayout>
    </>
  );
}

export default PageTypeMembre;
