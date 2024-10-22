import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Header() {
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [showing, setShowing] = useState(false);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const toggleMenu = (event) => {
    document.getElementById("navBar").style.width = showing ? "0%" : "80%";
    setShowing(!showing);
  };

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header>
      <div className="flex-it">
        <img
          src="../img/logo.png"
          loading="lazy"
          width="60"
          alt="logo"
          id="logo"
        />
      </div>
      <img
        className="menu-icon"
        src={"../icon/" + (showing ? "close.png" : "menu.png")}
        alt="menu"
        id="btnMenu"
        width="30px"
        onClick={toggleMenu}
      />
      <nav id="navBar">
        {user && user.idFonction != null && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              backgroundColor: "green",
              padding: "0.2em 0.5em",
              margin: "0.5em",
              fontWeight: "bold",
            }}
          >
            Admin
          </span>
        )}
        {user ? (
          <div className="user-profile" onClick={goToProfile}>
            <img src={user.photo || "../img/profile.png"} alt="profile" />
            <p style={{ color: user.theme == "sombre" ? "white" : "black" }}>
              {user.nom + " " + user.prenom}
            </p>
          </div>
        ) : (
          <center>
            <img
              src="../img/logo.png"
              id="header-profile"
              style={{ width: "120px", paddingBottom: "1em" }}
              alt=""
            />
          </center>
        )}
        <ul>
          <div className="nav-link">
            <img src="../icon/home.png" alt="" />
            <Link
              to={"/home"}
              onClick={() => {
                navigate("/");
              }}
              className="link"
            >
              Acceuil
            </Link>
          </div>
          {!user && (
            <div className="nav-link">
              <img src="../icon/user.png" alt="" />
              <Link to="/adhesion" className="link">
                S'adhérer
              </Link>
            </div>
          )}
          {user && user.idFonction != null && (
            <div className="nav-link">
              <img src="../icon/membres.png" alt="" />
              <Link to="/membres" className="link">
                Membres
              </Link>
            </div>
          )}
          {user && user.idFonction != null && (
            <div className="nav-link">
              <img src="../icon/niveaux.png" alt="" />
              <Link to="/federation" className="link">
                Niveaux
              </Link>
            </div>
          )}
          {user && (
            <div className="nav-link">
              <img src="../icon/event.png" alt="" />
              <Link to="/activites" className="link">
                Evenements
              </Link>
            </div>
          )}
          {user && (
            <div className="nav-link this">
              <img src="../icon/chat.png" alt="" />
              <Link to="/forum" className="link">
                Forum
              </Link>
            </div>
          )}
          {user && (
            <div className="nav-link">
              <img src="../icon/symboles.png" alt="" />
              <Link to="/symboles" className="link">
                Symboles
              </Link>
            </div>
          )}
          {user && user.idFonction != null && (
            <div className="nav-link">
              <img src="../icon/notification.png" alt="" />
              <Link to="/notifications" className="link">
                Notifications
              </Link>
            </div>
          )}
          {user && (
            <div className="nav-link">
              <img src="../icon/settings.png" alt="" />
              <Link to="/parametres" className="link">
                Parametres
              </Link>
            </div>
          )}
          <div className="nav-link">
            <img src="../icon/about.png" alt="" />
            <Link to="/about" className="link">
              Apropos
            </Link>
          </div>
        </ul>
        <center>
          {!user && (
            <button className="connect" onClick={goToLogin}>
              Se connecter
            </button>
          )}
        </center>
      </nav>
    </header>
  );
}

export default Header;
