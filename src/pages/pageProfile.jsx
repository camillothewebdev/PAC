import { useNavigate } from "react-router-dom";
import About from "../components/about";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import MainLayout from "../layout/mainlayout";
function PageProfile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const goToCarte = () => {
    navigate("/carte-membre/" + user.id);
  };

  const goToEdit = () => {
    navigate("/compte-modifier/" + user.id);
  };

  return (
    <MainLayout>
      <section>
        <div className="my-profile">
          <div className="profile">
            <img src={user.photo || "../img/profile.png"} alt="profile" />
            <h3>{user.nom + " " + user.prenom}</h3>
            <i>Membre {user.type.toLowerCase()}</i>
            <br />
            <h2 style={{ textTransform: "capitalize" }}>
              {user.niveauType} {user.libelle}
            </h2>
            {user.idFonction != null && <h3>{`Vous etes ${user.fonction}`}</h3>}
            {user.idFonction != null && (
              <button onClick={goToEdit}>Modifier</button>
            )}
            <button className="disconnect" onClick={openDialog}>
              Deconnecter
            </button>
          </div>
        </div>
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
          Voulez vous deconnecter ?
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
            onClick={handleLogout}
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

export default PageProfile;
