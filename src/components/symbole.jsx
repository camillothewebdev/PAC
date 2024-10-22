import { useNavigate } from "react-router-dom";
import axios from "axios";
import connection from "../data/connection";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

function Symbole(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const goToActualite = () => {
    navigate("/actualite/" + props.id);
  };
  const confirmerEvenement = async () => {
    await axios.put(connection + "/confirmer-evenement/" + props.id);
    window.location.reload();
  };
  const supprimerEvenement = async () => {
    await axios.delete(connection + "/supprimer-evenement/" + props.id);
    window.location.reload();
  };
  return (
    <div className="symbole">
      <div className="main">
        <img src={"../img/photo.png"} alt="symbole" />
        <div className="content">
          <h2 className="libelle">{props.libelle}</h2>
          <p>{props.typeMembre}</p>
          <h3>{props.montant} $</h3>
        </div>
      </div>
      <div className="controls">
        <div className="edit-delete">
          <img src="../icon/delete.png" />
          <img src="../icon/edit.png" />
        </div>
        <button>COMMANDER</button>
      </div>
    </div>
  );
}

export default Symbole;
