import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import default_image from "../data/default_profile";
import axios from "axios";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";

function PageMembreInfo(props) {
  const navigate = useNavigate();
  const [membre, setMembre] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let locationActualiteId = parseInt(location.pathname.split("/")[2]);

  const convertirEnDateNaturel = (dateSql) => {
    let date = new Date(dateSql);
    let dateNaturel = date.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return dateNaturel;
  };

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

  const convertirEnHtml = (dateSql) => {
    const date = dateSql.split("T")[0];
    const parts = date.split("-");
    return `Le ${parts[0]}`;
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete(
        connection + "/supprimer-membre/" + locationActualiteId
      );
      navigate("/membres");
    } catch (error) {
      console.log("error : " + error);
      setServerError(true);
    }
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const goToHome = () => {
    navigate("/membres");
  };

  const goToEdit = () => {
    navigate("/membre-modifier/" + locationActualiteId);
  };

  const handleChange = () => {};
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
        <div className="operation">
          <img src="../icon/delete.png" onClick={openDialog} />
          <img src="../icon/edit.png" onClick={goToEdit} />
        </div>
      </div>
      <section className="form-adhesion" style={{ overflowY: "scroll" }}>
        {loading ? (
          <div>
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
          membre && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                maxHeight: "75vh",
              }}
            >
              <section
                className="form-adhesion"
                style={{ overflowY: "scroll" }}
              >
                <center>
                  <img
                    src={membre.photo || "../img/profile.png"}
                    width={"60%"}
                    height={150}
                    style={{ border: "black 2px solid" }}
                    alt="profile"
                  />
                </center>

                <div className="zone">
                  <label htmlFor="nom">Nom : </label>
                  <h2 name="nom">{membre.nom}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="prenom">Postnom : </label>
                  <h2 name="nom">{membre.postnom}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="prenom">Prenom : </label>
                  <h2 name="nom">{membre.prenom}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="sexe">Sexe : </label>
                  <h2 name="nom">{membre.sexe}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="lieu">Lieu de naissance : </label>
                  <h2 name="nom">{membre.lieuNaiss}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="lieu">Date de naissance : </label>
                  <h2 name="nom">
                    {convertirEnDateNaturel(membre.dateNaiss.split("T")[0])}
                  </h2>
                </div>
                <div className="zone">
                  <label htmlFor="lieu">Adresse : </label>
                  <h2 name="nom">{membre.adresse}</h2>
                </div>

                <div className="zone">
                  <label htmlFor="lieu">Profession : </label>
                  <h2 name="nom">{membre.nom}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="lieu">Telephone : </label>
                  <h2 name="nom">{membre.profession}</h2>
                </div>
                <div className="zone">
                  <label htmlFor="sexe">Type membre : </label>
                  <h2 name="nom">{membre.type}</h2>
                </div>
                {membre.niveau && (
                  <div className="zone">
                    <label
                      htmlFor="sexe"
                      style={{ textTransform: "capitalize" }}
                    >
                      {membre.niveauType} :{" "}
                    </label>
                    <h2 name="nom">{membre.niveau}</h2>
                  </div>
                )}
                {membre.fonction && (
                  <div className="zone">
                    <label htmlFor="sexe">Fonction : </label>
                    <h2 name="nom">{membre.fonction}</h2>
                  </div>
                )}
              </section>
              <center>
                <div
                  className="confirm-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "0.5em",
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/carte-membre/" + locationActualiteId);
                    }}
                  >
                    Voir la Carte
                  </button>
                </div>
              </center>
            </div>
          )
        )}
      </section>
      <dialog
        id="modal"
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
            onClick={closeDialog}
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
            onClick={handleDelete}
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
  );
}

export default PageMembreInfo;
