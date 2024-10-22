import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import Header from "../components/header";
import MainLayout from "../layout/mainlayout";

function PageActualite() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  let locationActualiteId = parseInt(location.pathname.split("/")[2]);
  const [changes, setChanges] = useState();

  const confirmerEvenement = async () => {
    await axios.put(connection + "/confirmer-evenement/" + locationActualiteId);
    navigate("/activites");
  };
  const supprimerEvenement = async () => {
    await axios.delete(
      connection + "/supprimer-evenement/" + locationActualiteId
    );
    navigate("/activites");
  };

  const goToActualites = () => {
    navigate("/activites");
  };

  const goToHome = () => {
    navigate("/");
  };
  const goToEdit = () => {
    navigate("/activites-modifier/" + locationActualiteId);
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          connection + "/lire-evenement/" + locationActualiteId
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchData();
  }, []);

  const publicateur =
    user && data && data.idPublicateur == user.id
      ? "Vous"
      : data && data.membrePrenom + " " + data.membreNom;

  const handleDelete = () => {
    const deleteData = async () => {
      try {
        await axios.delete(
          connection + "/supprimer-evenement/" + locationActualiteId
        );
        navigate("/activites");
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    deleteData();
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
    <MainLayout>
      <div className="header-controls">
        <img
          src="../icon/back.png"
          className="back-btn"
          onClick={goToActualites}
        />
        {(data && data.idPublicateur == user.id) ||
        (data && user.idFonction != null && data.valide == "oui") ? (
          <div className="operation">
            <img src="../icon/delete.png" onClick={openDialog} />
            <img src="../icon/edit.png" onClick={goToEdit} />
          </div>
        ) : (
          <div></div>
        )}
        {data && data.valide == "non" && user.idFonction != null && (
          <div className="operation">
            <img src="../icon/accept.png" onClick={confirmerEvenement} />
            <img src="../icon/refuse.png" onClick={supprimerEvenement} />
          </div>
        )}
      </div>
      {data && (
        <div
          className={`actualite-content`}
          style={{ overflowY: "scroll", height: "75vh" }}
        >
          <div className="actualite-title">
            <h2 style={{ textTransform: "uppercase" }}>{data.titre}</h2>
            <div className="date">{data.date}</div>
          </div>
          <img src={data.image || "../img/photo.png"} alt="actualite" />
          <small>
            Publié par <strong>{publicateur}</strong>
          </small>
          <p style={{ width: "100%", wordWrap: "break-word" }}>
            {data.contenu}
          </p>
        </div>
      )}
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
export default PageActualite;
