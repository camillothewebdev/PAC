import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Acceuil(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const goToAdhesion = () => {
    navigate("/adhesion");
  };
  const goToForum = () => {
    navigate("/");
  };
  const goToMembres = () => {
    navigate("/");
  };
  return (
    <>
      <img src="../img/pac-membres.jpg" alt="bienvenue" />
    </>
  );
}

export default Acceuil;
