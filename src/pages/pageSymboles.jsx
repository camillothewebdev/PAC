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
function PageSymboles() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [symboles, setSymboles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeMembreSelect, setTypeMembreSelect] = useState([]);
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [symboleFormData, setSymboleFormData] = useState({
    photo: default_evenement,
    id: 0,
    libelle: "",
    idTypeMembre: 0,
    montant: "",
  });

  const handleChange = (event) => {
    setSymboleFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(symboleFormData.idTypeMembre);
  };

  const goToInformationCommande = () => {
    navigate("/information-commande");
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    setSymboleFormData((prev) => ({
      ...prev,
      id: 0,
      photo: default_evenement,
      libelle: "",
      idTypeMembre: 0,
      montant: "",
    }));
    document.getElementById("modal").close();
  };

  const closeDialog2 = () => {
    setSymboleFormData((prev) => ({
      ...prev,
      id: 0,
      photo: default_evenement,
      idTypeMembre: 0,
      montant: "",
      libelle: "",
    }));
    document.getElementById("modal2").close();
  };

  const openDialog2 = (idSymbole) => {
    let symbole = symboles.find((symbole) => symbole.id == idSymbole);
    setSymboleFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: symbole.id,
      libelle: symbole.libelle,
      idTypeMembre: symbole.idTypeMembre,
      montant: symbole.montant,
    }));
    document.getElementById("modal2").showModal();
  };

  const closeDialog3 = () => {
    setSymboleFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: 0,
      libelle: "",
      idTypeMembre: 0,
      montant: "",
    }));
    document.getElementById("modal3").close();
  };

  const openDialog3 = (symboleId) => {
    let symbole = symboles.find((symbole) => symbole.id == symboleId);
    setSymboleFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: symbole.id,
      libelle: "",
      idTypeMembre: 0,
      montant: "",
    }));
    document.getElementById("modal3").showModal();
  };

  const closeDialog4 = () => {
    setSymboleFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: 0,
      libelle: "",
      idTypeMembre: 0,
      montant: "",
    }));
    document.getElementById("modal4").close();
  };

  const openDialog4 = (symboleId) => {
    let symbole = symboles.find((symbole) => symbole.id == symboleId);
    setSymboleFormData((prev) => ({
      ...prev,
      photo: default_evenement,
      id: symbole.id,
      libelle: "",
      idTypeMembre: 0,
      montant: symbole.montant,
    }));
    document.getElementById("modal4").showModal();
  };

  const add = async (event) => {
    if (
      symboleFormData.libelle == "" ||
      symboleFormData.montant == "" ||
      symboleFormData.idTypeMembre == ""
    ) {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      let response = await axios.post(
        connection + "/ajouter-symbole",
        symboleFormData
      );
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    closeDialog();
    fetchSymboles();
    event.target.disabled = false;
  };

  const commander = async (event) => {
    event.target.disabled = true;
    try {
      let response = await axios.post(connection + "/ajouter-commande", {
        idMembre: user.id,
        idSymbole: symboleFormData.id,
        date: dateNaturel,
      });
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    goToInformationCommande();
    event.target.disabled = false;
  };

  const edit = async (event) => {
    if (
      symboleFormData.libelle == "" ||
      symboleFormData.montant == "" ||
      symboleFormData.idTypeMembre == ""
    ) {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      let response = await axios.post(
        connection + "/modifier-symbole",
        symboleFormData
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
        connection + "/supprimer-symbole/" + symboleFormData.id
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
      const res = await axios.get(connection + "/lire-symboles");
      setSymboles(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const fetchTypeMembres = async () => {
    try {
      const res = await axios.get(connection + "/lire-type-membre");
      setTypeMembreSelect(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  useEffect(() => {
    fetchSymboles();
    fetchTypeMembres();
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
          <div className="symbole">
            <div className="main">
              <div className="content">
                <h2 className="libelle">{symbole.libelle}</h2>
                <p>{symbole.typeMembre}</p>
                <h3>{symbole.montant} FC</h3>
              </div>
            </div>
            <div className="controls">
              <button
                onClick={() => {
                  openDialog4(symbole.id);
                }}
              >
                COMMANDER
              </button>
              <div
                className="edit-delete"
                style={{
                  visibility: user.idFonction != null ? "visible" : "hidden",
                }}
              >
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

  const goToHome = () => {
    navigate("/");
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
        <div className="add-evenement" onClick={openDialog}>
          <h3>SYMBOLE</h3>
          <img src="../icon/ajouter.png" width="35px" />
        </div>
        <section className="actualite">
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
                value={symboleFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <div className="zone">
              <label htmlFor="adresse">Type de membre :</label>

              <select
                name="idTypeMembre"
                id="typeMembre"
                value={symboleFormData.idTypeMembre}
                onChange={handleChange}
              >
                <option value=""></option>
                {listTypeMembreSelect}
              </select>
            </div>
            <div className="zone">
              <label htmlFor="adresse">Montant en FC :</label>
              <input
                type="number"
                name="montant"
                value={symboleFormData.montant}
                onChange={handleChange}
              />
            </div>
            <br />
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
                value={symboleFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <div className="zone">
              <label htmlFor="adresse">Type de membre :</label>

              <select
                name="idTypeMembre"
                id="typeMembre"
                value={symboleFormData.idTypeMembre}
                onChange={handleChange}
              >
                <option value=""></option>
                {listTypeMembreSelect}
              </select>
            </div>
            <div className="zone">
              <label htmlFor="adresse">Montant en FC :</label>
              <input
                type="number"
                name="montant"
                value={symboleFormData.montant}
                onChange={handleChange}
              />
            </div>
            <br />
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
        <dialog
          id="modal4"
          style={{
            fontWeight: "bold",
            width: "90%",
            maxWidth: "500px",
            background: "rgb(224, 223, 223)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            ça coûte {symboleFormData.montant} FC
          </h2>
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
              onClick={closeDialog4}
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
              onClick={commander}
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
      </MainLayout>
    </>
  );
}

export default PageSymboles;
