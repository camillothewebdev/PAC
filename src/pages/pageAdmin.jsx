import { useNavigate } from "react-router-dom";
import Actualite from "../components/actualite";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";
function PageAdmin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(connection + "/lire-admins");
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let listeMembres = [];
  data.forEach((membre) => {
    if (membre.id) {
      listeMembres.push(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2em",
            padding: "1em",
          }}
          key={membre.id}
          //onClick={openDialog}
        >
          <img
            width="50px"
            height="50px"
            style={{ borderRadius: "50%" }}
            src={membre.photo || "../img/profile.png"}
            alt=""
          />
          {membre.id == user.id ? <h4>Vous</h4> : <h4>{membre.prenom}</h4>}
          <img
            src="../icon/remove.png"
            alt="retirer"
            width="30px"
            onClick={async () => {
              try {
                await axios.put(connection + "/retirer-admin/" + membre.id);
              } catch (error) {
                console.log("error");
                setServerError(true);
              }
              fetchData();
            }}
          />
        </div>
      );
    }
  });
  const goToHome = () => {
    navigate("/parametres");
  };
  const goToNewEvent = () => {
    navigate("/choisir-admin");
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
        <main className="main-content">
          <section className="list-membres">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
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
            ) : listeMembres.length > 0 ? (
              <>
                <h3>Liste des administrateurs :</h3>
                {listeMembres}
              </>
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
                Aucun administrateur
              </div>
            )}
          </section>
        </main>
      </MainLayout>
    </>
  );
}

export default PageAdmin;
