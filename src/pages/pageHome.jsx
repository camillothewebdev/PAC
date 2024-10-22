import React, { useContext, useEffect, useState } from "react";
import data_actualite from "../data/data_actualite";
import Actualite from "../components/actualite";
import Acceuil from "../components/acceuil";
import About from "../components/about";
import MainLayout from "../layout/mainlayout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";
import connection from "../data/connection";
import Header from "../components/header";

function PageHome() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageAttente, setMessageAttente] = useState("");
  console.log("application");
  const goToHome = () => {
    navigate("/");
  };

  const fetchEvenement = async () => {
    try {
      const res = await axios.get(connection + "/lire-evenements");
      setEvenements(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const verifyUser = async () => {
    if (user) {
      login(user.id);
    }
  };

  useEffect(() => {
    verifyUser();
    fetchEvenement();
  }, []);

  let listEvenements = [];
  evenements.forEach((evenement) => {
    if (listEvenements.length >= 3) {
      return;
    }
    listEvenements.push(
      <Actualite key={evenement.evenementId} {...evenement} />
    );
  });

  const goToAdhesion = () => {
    navigate("/adhesion");
  };
  const goToForum = () => {
    navigate("/forum");
  };

  const goToAbout = () => {
    navigate("/about");
  };
  const goToMembres = () => {
    navigate("/membres");
  };

  const goToAjoutMembre = () => {
    navigate("/membre-ajout");
  };

  const goToEvenements = () => {
    navigate("/activites");
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

  return !loading ? (
    <MainLayout>
      <section className="acceuil">
        <div className="acceuil-elements">
          <img
            src="../img/pac-membres.jpg"
            loading="lazy"
            alt=""
            width="100%"
            height="auto"
            style={{ maxHeight: "350px", maxWidth: "500px" }}
          />
          {user && user.idFonction != null ? (
            <div className="home-content">
              <h2>PATRIOTE EN ACTION</h2>
              <p>
                Bonjour,{" "}
                {user.sexe == "F"
                  ? "madame " + user.nom
                  : "monsieur " + user.nom}
                . En tant que administrateur Vous pouvez gerer les membres,
                publier des evenements et recevoir des notifications.
              </p>
              <button onClick={goToMembres}>Voir membres</button>
            </div>
          ) : user ? (
            <div className="home-content">
              <h2>PATRIOTE EN ACTION</h2>
              <p>
                Bonjour,{" "}
                {user.sexe == "F"
                  ? "madame " + user.nom
                  : "monsieur " + user.nom}
                . Vous etes un membre officiel de PAC. Vous pouvez parler au
                forum, changer le thème du site web.
              </p>
              <button onClick={goToForum}>Allez au forum</button>
            </div>
          ) : (
            <div className="home-content">
              <h2>PATRIOTE EN ACTION</h2>
              <p>
                Le parti politique PAC est le meilleur parti de toute la RDC. Si
                tu veux devenir membre de ce parti, cliquez sur le boutton
                adhérer.
              </p>
              <button onClick={goToAdhesion}>S'adhérer</button>
            </div>
          )}
        </div>
      </section>

      <section className="apropos">
        <div className="container">
          <div className="autorite-morale">
            <h2>Autorité morale :</h2>
            <div className="autorite">
              <img src="../img/mark.jpg" alt="Nadine ngalula" />
              <p>Nadine Ngalula</p>
            </div>
            <small>{"<< PAC toujours la loyauté ! >> "}</small>
          </div>
          <div className="information">
            <h2> C'est quoi PAC ? </h2>
            <p>
              PAC est un parti politique dont les membres sont en action. Il est
              dirigé par l'honorable Andé Amundala, le chef de l'état LOL. Notre
              objectif est d'ameliorer la politique en RDC et de voler l'argent
              du pays, Merci pour la comprehension, objectif est d'ameliorer la
              politique en RDC et de voler l'argent du pays, Merci pour la
              comprehension, objectif est d'ameliorer la politique en RDC et de
              voler l'argent du pays, Merci pour la comprehension.
            </p>
          </div>
        </div>
      </section>

      <section className="footer">
        <h2>CONTACTEZ NOUS</h2>
        <div className="contacts">
          <p>
            <strong>Adresse :</strong> <br /> c/Kasavubu av/Miami n°133
          </p>
          <br />
          <p>
            <strong>Contact :</strong> <br /> + 243 894 429 245
          </p>
        </div>
        <center className="liens">
          <img src="../icon/whatsapp.png" />
          <img src="../icon/facebook.png" />
          <img src="../icon/youtube.png" />
        </center>
      </section>
    </MainLayout>
  ) : (
    <>
      <img className="wait" src="../img/wait.gif" width="100%" alt="wait" />
      <center>
        <small>{messageAttente}</small>
      </center>
    </>
  );
}

export default PageHome;
