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
function PageNotification() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [adhesions, setAdhesions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("adhesions");

  const fetchCommandes = async () => {
    try {
      let res = await axios.get(connection + "/lire-commandes");
      setCommandes(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const fetchAdhesions = async () => {
    try {
      let res = await axios.get(connection + "/lire-adhesions");
      setAdhesions(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  useEffect(() => {
    fetchCommandes();
    fetchAdhesions();
  }, []);

  let listeCommandes = [];
  listeCommandes =
    commandes &&
    commandes.map((commande) => {
      if (commande.id) {
        return (
          <div className="commande">
            <div>
              <h3>
                {commande.libelle} ({commande.type})
              </h3>
              <small>
                Membre :{" "}
                <strong>
                  {" "}
                  {commande.nom} {commande.prenom}
                </strong>
              </small>
              <p>{commande.date}</p>
            </div>
          </div>
        );
      }
    });

  let listeAdhesions = [];
  listeAdhesions =
    adhesions &&
    adhesions.map((adhesion) => {
      if (adhesion.id) {
        return (
          <div className="commande">
            <div>
              <h3>
                Nom : {adhesion.nom} {adhesion.prenom}
              </h3>
              <p>Tel : {adhesion.telephone}</p>
              <p>Date : {adhesion.dateAdhesion}</p>
              <center>
                {" "}
                <button
                  onClick={() => {
                    navigate("/membre-info/" + adhesion.id);
                  }}
                  className="voir-plus"
                  style={{ padding: "0.2em 1em", fontSize: "1.1rem" }}
                >
                  Voir plus
                </button>
              </center>
            </div>
          </div>
        );
      }
    });

  const selectAdhesion = () => {
    setSelected("adhesions");
  };

  const selectCommande = () => {
    setSelected("commandes");
  };

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
        {selected == "adhesions" && (
          <section
            className="actualite"
            style={{ height: "75vh", overflowY: "scroll", paddingTop: "0.5em" }}
          >
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
            ) : listeAdhesions.length ? (
              listeAdhesions
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
                Aucune adhesion
              </div>
            )}
          </section>
        )}
        {selected == "commandes" && (
          <section
            className="actualite"
            style={{ height: "76vh", overflowY: "scroll", paddingTop: "1em" }}
          >
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
            ) : listeCommandes.length ? (
              listeCommandes
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
                Aucune commande
              </div>
            )}
          </section>
        )}
        <center>
          <div
            className="header-notification"
            style={{
              justifyContent: "center",
            }}
          >
            <div
              className={selected == "adhesions" ? "active" : ""}
              onClick={selectAdhesion}
            >
              <div className="circle">
                <img src="../icon/adhesion.png" width="40px" />
              </div>
              <p>Adhesions</p>
            </div>
            <div
              className={selected == "commandes" ? "active" : ""}
              onClick={selectCommande}
              name="commandes"
            >
              <div className="circle">
                <img src="../icon/dollars.png" width="40px" />
              </div>
              <p>Commandes</p>
            </div>
          </div>
        </center>
      </MainLayout>
    </>
  );
}

export default PageNotification;
