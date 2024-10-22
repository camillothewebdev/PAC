import { useLocation, useNavigate } from "react-router-dom";
import Actualite from "../components/actualite";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import Header from "../components/header";
import MainLayout from "../layout/mainlayout";
function PageMembresNiveau() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const locationId = useLocation().pathname.split("/")[2];
  const niveauId = useLocation().pathname.split("-")[3];
  const previewLocation = `${locationId.split("-")[0]}-${
    locationId.split("-")[1]
  }`;
  console.log("sqdfdsf :" + previewLocation);
  const [niveau, setNiveau] = useState();

  const removeAccents = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const openDialog = () => {
    document.getElementById("modal").showModal();
  };

  const closeDialog = () => {
    document.getElementById("modal").close();
  };

  const handleClear = () => {
    document.getElementById("txtSearch").value = "";
    setSearch("");
  };

  const handleSearchChange = (e) => {
    setSearch(removeAccents(e.target.value.toUpperCase().replace(" ", "")));
    let listeSearch = [];
    search &&
      data &&
      data.forEach((membre) => {
        let nom = removeAccents(membre.nom.toUpperCase());
        let postnom = removeAccents(membre.postnom.toUpperCase());
        let prenom = removeAccents(membre.prenom.toUpperCase());
        let complet1 = nom + postnom + prenom;
        let complet2 = nom + prenom;
        let complet3 = prenom + nom;
        let complet4 = nom + postnom;
        let complet5 = nom;
        let complet6 = prenom;
        let complet7 = postnom;
        console.log(complet1);
        if (
          complet1.includes(search) ||
          complet2.includes(search) ||
          complet3.includes(search) ||
          complet4.includes(search) ||
          complet5.includes(search) ||
          complet6.includes(search) ||
          complet7.includes(search)
        ) {
          listeSearch.push(
            <div
              className="membre"
              key={membre.id}
              onClick={() => {
                navigate("/membre-info/" + membre.id);
              }}
            >
              <img src={membre.photo || "../img/profile.png"} alt="" />
              <div className="membre-informations">
                <h4 className="nom">
                  {membre.id == user.id
                    ? "Vous"
                    : membre.nom + " " + membre.prenom}
                </h4>
                {membre.id_du_niveau && (
                  <small>
                    {membre.type} : {membre.libelle}
                  </small>
                )}
                {membre.fonction ? (
                  <h5 className="auth">{membre.fonction}</h5>
                ) : (
                  <h5 className="invisible-man">membre</h5>
                )}
              </div>
            </div>
          );
        }
      });
    console.log(search);
    console.log(listeSearch);
    setSearchResult(listeSearch);
  };

  const fetchNiveauType = async () => {
    setSearch("");
    if (loading) document.getElementById("txtSearch").value = "";
    try {
      let res = await axios.get(
        connection + "/lire-membres-niveauId/" + niveauId
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const fetchNiveau = async () => {
    try {
      let res = await axios.get(connection + "/lire-niveau/" + niveauId);
      setNiveau(res.data);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNiveau();
    fetchNiveauType();
    setLoading(false);
  }, []);

  let niveauActuelle = "";
  let listeMembres = [];
  listeMembres = [];
  console.log(data);
  data &&
    data.forEach((membre) => {
      if (membre.id) {
        console.log(membre.nom + " " + membre.fonction);
        niveauActuelle = membre.libelle;
        listeMembres.push(
          <div
            className="membre"
            key={membre.id}
            onClick={() => {
              navigate("/membre-info/" + membre.id);
            }}
          >
            <img src={membre.photo || "../img/profile.png"} alt="" />
            <div className="membre-informations">
              <h4 className="nom">
                {membre.id == user.id
                  ? "Vous"
                  : membre.nom + " " + membre.prenom}
              </h4>
              {membre.id_du_niveau ? (
                <small>
                  {membre.type} : {membre.libelle}
                </small>
              ) : (
                <small className="invisible-man">membre</small>
              )}
              {membre.fonction ? (
                <h5 className="auth">{membre.fonction}</h5>
              ) : (
                <h5 className="invisible-man">membre</h5>
              )}
            </div>
          </div>
        );
      }
    });

  const goToHome = () => {
    navigate("/cellule/" + previewLocation);
  };
  const goToNewEvent = () => {
    navigate("/membre-ajout/" + niveauId);
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
        <section className="header-list-membre">
          <div>
            <p>
              {data.length > 0 ? (
                <h4
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                  }}
                >
                  {data.length} membres
                </h4>
              ) : data.length == 1 ? (
                <h4
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                  }}
                >
                  1 membre
                </h4>
              ) : (
                <h4
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                  }}
                ></h4>
              )}
            </p>
            <img
              src="../icon/back.png"
              style={{
                background: "white",
                filter: "invert(100%)",
                padding: "0.2em",
              }}
              width="40px"
              onClick={goToHome}
            />
            {niveau && (
              <h2 style={{ margin: "0.5em 0em", textTransform: "uppercase" }}>
                {niveau[0].libelle}
              </h2>
            )}
          </div>
          <div className="searchbar">
            <div className="search">
              <img src="../icon/search.png" alt="search" />
              <input
                type="text"
                placeholder="Rechercher membre"
                id="txtSearch"
                onKeyDown={handleSearchChange}
              />
              {search.length > 3 && (
                <img
                  src="../icon/clear.png"
                  alt="clear"
                  class="clear"
                  onClick={handleClear}
                />
              )}
            </div>
          </div>
        </section>
        <section className="list-membres">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
          ) : listeMembres.length > 0 && search.length < 3 ? (
            listeMembres
          ) : search && searchResult.length > 0 ? (
            searchResult
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
              Aucun membre
            </div>
          )}
          <img
            src="../icon/add.png"
            className="add-button"
            onClick={goToNewEvent}
          />
        </section>
      </MainLayout>
    </>
  );
}

export default PageMembresNiveau;
