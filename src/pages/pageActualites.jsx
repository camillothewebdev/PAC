import { useNavigate } from "react-router-dom";
import Actualite from "../components/actualite";
import data_actualite from "../data/data_actualite";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";
function PageActualites() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(connection + "/lire-evenements");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchData();
  }, []);

  let listEvenements = [];
  listEvenements =
    data &&
    data.map((evenement) => {
      if (evenement.id) {
        return <Actualite key={evenement.id} {...evenement} />;
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
        <div className="add-evenement" onClick={goToNewEvent}>
          <h3>PUBLIER</h3>
          <img src="../icon/ajouter.png" width="40px" />
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
          ) : listEvenements.length ? (
            listEvenements
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
              Aucun evenement
            </div>
          )}
        </section>
      </MainLayout>
    </>
  );
}

export default PageActualites;
