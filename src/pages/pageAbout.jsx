import { useNavigate } from "react-router-dom";
import About from "../components/about";
import Footer from "../components/footer";
import MainLayout from "../layout/mainlayout";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
function PageAbout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const goToHome = () => {
    navigate("/");
  }; 

  return (
    <MainLayout>
      <main>
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
                PAC est un parti politique dont les membres sont en action. Il
                est dirigé par l'honorable Andé Amundala, le chef de l'état LOL.
                Notre objectif est d'ameliorer la politique en RDC et de voler
                l'argent du pays, Merci pour la comprehension, objectif est
                d'ameliorer la politique en RDC et de voler l'argent du pays,
                Merci pour la comprehension, objectif est d'ameliorer la
                politique en RDC et de voler l'argent du pays, Merci pour la
                comprehension.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2>Plus sur PAC</h2>
          <p>
            Beaucoup des bla bla bla bla, l'argent du pays, Merci pour la
            comprehension, objectif est d'ameliorer la politique en RDC et de
            voler l'argent du pays, Merci pour la comprehension, objectif est
            d'ameliorer la politique en RDC et de voler l'argent du pays, Merci
            pour la comprehension. l'argent du pays, Merci pour la
            comprehension, objectif est d'ameliorer la politique en RDC et de
            voler l'argent du pays, Merci pour la comprehension politique en RDC
          </p>
        </section>
        {user && user.idFonction != null && (
          <section className="apropos2">
            <div>
              <h2>Comment utiliser ?</h2>
              <p>
                Si vous voulez savoir comment utiliser cette application web,
                vous pouvez telecharger le manuel utilisateur ci dessous
              </p>
            </div>
            <center>
                <button className="voir-plus">Manuel utilisateur</button>
            </center>
          </section>
        )}
        <center>
          <footer>
            <p>
              <strong> Crée par : </strong>
              <br />
              <br />
              <a href="https://wa.me/+243826114378">André Amundala</a>{" "}
              <span
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "0.3em",
                  fontWeight: "bold",
                  marginLeft: "1em",
                  fontSize: "0.8rem",
                }}
              >
                Analyste
              </span>{" "}
              <br /> <br />
              <a href="https://wa.me/+243812879044">Phradel Katambua</a>{" "}
              <span
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "0.3em",
                  fontWeight: "bold",
                  marginLeft: "1em",
                  fontSize: "0.8rem",
                }}
              >
                Concepteur
              </span>{" "}
              <br /> <br />
              <a href="https://wa.me/+243898652101">Camillo Pande</a>{" "}
              <span
                style={{
                  backgroundColor: "orangered",
                  color: "white",
                  padding: "0.3em",
                  fontWeight: "bold",
                  marginLeft: "1em",
                  fontSize: "0.8rem",
                }}
              >
                Programmeur
              </span>
            </p>
          </footer>
        </center>
      </main>
    </MainLayout>
  );
}

export default PageAbout;
