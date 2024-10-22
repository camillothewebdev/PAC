import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";
function PageFederation() {
  const navigate = useNavigate();
  const [niveaux, setNiveaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [FederationFormData, setFederationFormData] = useState({
    id: "",
    libelle: "",
    adresse: "",
    type: "federation",
    idSecretariat: 1,
  });
  const fetchNiveaux = async () => {
    setLoading(true);
    try {
      let res = await axios.get(connection + "/lire-federation");
      setNiveaux(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const handleChange = (event) => {
    setFederationFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const closeDialog = () => {
    setFederationFormData((prev) => ({
      ...prev,
      libelle: "",
      adresse: "",
    }));
    document.getElementById("modal").close();
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog2 = () => {
    setFederationFormData((prev) => ({
      ...prev,
      libelle: "",
      adresse: "",
    }));
    document.getElementById("modal2").close();
  };

  const openDialog2 = (idNiveau) => {
    let niveau = niveaux.find((niveau) => niveau.idNiveau == idNiveau);
    setFederationFormData((prev) => ({
      ...prev,
      id: idNiveau,
      libelle: niveau.libelle,
      adresse: niveau.adresse,
    }));
    document.getElementById("modal2").showModal();
  };

  const closeDialog3 = () => {
    setFederationFormData((prev) => ({
      ...prev,
      libelle: "",
      adresse: "",
    }));
    document.getElementById("modal3").close();
  };

  const openDialog3 = (idNiveau) => {
    let niveau = niveaux.find((niveau) => niveau.idNiveau == idNiveau);
    setFederationFormData((prev) => ({
      ...prev,
      id: idNiveau,
      libelle: niveau.libelle,
      adresse: niveau.adresse,
    }));
    document.getElementById("modal3").showModal();
  };

  const add = async (event) => {
    if (FederationFormData.libelle == "" || FederationFormData.adresse == "") {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      let res = await axios.post(
        connection + "/ajouter-federation",
        FederationFormData
      );
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    closeDialog();
    fetchNiveaux();
    event.target.disabled = false;
  };

  const edit = async (event) => {
    if (FederationFormData.libelle == "" || FederationFormData.adresse == "") {
      alert("Veuillez remplir le champ");
      return;
    }
    event.target.disabled = true;
    try {
      let res = await axios.put(
        connection + "/modifier-niveau",
        FederationFormData
      );
      fetchNiveaux();
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    event.target.disabled = false;
    closeDialog2();
  };

  const remove = async (event) => {
    event.target.disabled = true;
    try {
      let res = await axios.delete(
        connection + "/supprimer-niveau/" + FederationFormData.id
      );
      fetchNiveaux();
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    event.target.disabled = false;
    closeDialog3();
  };

  useEffect(() => {
    fetchNiveaux();
  }, []);

  let listNiveaux = [];
  niveaux &&
    niveaux.forEach((niveau) => {
      if (niveau.idNiveau) {
        let nombre;
        console.log(niveau);
        if (niveau.nombreNiveaux == 1) {
          nombre = "1 section";
        } else if (niveau.nombreNiveaux > 1) {
          nombre = niveau.nombreNiveaux + " sections";
        } else {
          nombre = "Aucune section";
        }
        listNiveaux.push(
          <div className="niveau" key={niveau.idNiveau}>
            <div
              onClick={() => {
                navigate("/section/" + niveau.idNiveau);
              }}
              style={{
                padding: "0.5em",
                borderRadius: "13px",
              }}
              className="content"
            >
              <h3>{niveau.libelle}</h3>
              <p>{niveau.adresse}</p>
              <strong>{nombre}</strong>
            </div>
            <div className="controls">
              <img
                src="../icon/delete.png"
                onClick={() => {
                  openDialog3(niveau.idNiveau);
                }}
              />
              <img
                src="../icon/edit.png"
                onClick={() => {
                  openDialog2(niveau.idNiveau);
                }}
              />
            </div>
          </div>
        );
      }
    });

  const goToHome = () => {
    navigate("/");
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="header-title">
            <img
              src="../icon/back.png"
              className="back-btn"
              onClick={goToHome}
            />
          </div>
          <div className="add" onClick={openDialog}>
            <h3>FEDERATION</h3>
            <img src="../icon/ajouter.png" width="40px" />
          </div>

          <section
            className="liste-niveaux"
            style={{ height: "75vh", overflowY: "scroll", paddingTop: "0.5em" }}
          >
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
            ) : listNiveaux.length > 0 ? (
              <>{listNiveaux}</>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  Aucune federation
                </div>
              </>
            )}
          </section>
        </div>
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
                value={FederationFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <div className="zone">
              <label htmlFor="adresse">Adresse :</label>
              <input
                type="text"
                name="adresse"
                value={FederationFormData.adresse}
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
                value={FederationFormData.libelle}
                onChange={handleChange}
              />
            </div>
            <div className="zone">
              <label htmlFor="adresse">Adresse :</label>
              <input
                type="text"
                name="adresse"
                value={FederationFormData.adresse}
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
      </MainLayout>
    </>
  );
}
export default PageFederation;
