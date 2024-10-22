import { useNavigate } from "react-router-dom";
import Actualite from "../components/actualite";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import connection from "../data/connection";
import Header from "../components/header";
import MainLayout from "../layout/mainlayout";
function PageMembres() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [niveauType, setNiveauType] = useState("");
  const [niveauId, setNiveauId] = useState("");
  const [dialogChoix, setDialogChoix] = useState(false);
  const [selectValues, setSelectValues] = useState([]);

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

  const handleNiveauType = (event) => {
    let clickedButton = event.target.name;
    setNiveauType(clickedButton);
    closeDialog();
  };

  const handleSelectNiveau = () => {
    setNiveauId(document.getElementById("selectNiveau").value);
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
                {membre.id_du_niveau && membre.id_du_niveau != niveauId && (
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

  useEffect(() => {
    const fetchNiveauType = async () => {
      setLoading(true);
      setSearch("");
      if (loading) document.getElementById("txtSearch").value = "";
      try {
        let res;
        if (niveauType != "" && niveauId == "") {
          res = await axios.get(
            connection + "/lire-membres-niveauType/" + niveauType
          );
          setNiveauId("");
        } else if (niveauId != "") {
          res = await axios.get(
            connection + "/lire-membres-niveauId/" + niveauId
          );
        } else {
          res = await axios.get(connection + "/lire-membres/");
          setNiveauId("");
        }
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchNiveauType();
  }, [niveauType, niveauId]);

  useEffect(() => {
    const fetchSelect = async () => {
      setNiveauId("");
      setSearch("");
      if (!loading) document.getElementById("txtSearch").value = "";
      try {
        let values;
        setLoading(true);
        if (niveauType != "") {
          values = await axios.get(
            connection + "/lire-tous-niveauType/" + niveauType
          );
          setSelectValues(values.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchSelect();
  }, [niveauType]);
  console.log("idNiveau : " + niveauId);
  let listeMembres = [];
  listeMembres = [];
  console.log(data);
  data &&
    data.forEach((membre) => {
      if (membre.id) {
        console.log(membre.nom + " " + membre.fonction);
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

  let listeSelectValues = [];
  selectValues &&
    selectValues.forEach((value) => {
      if (value.id) {
        listeSelectValues.push(
          <option key={value.id} value={value.id}>
            {value.libelle}{" "}
            {value.type == "section"
              ? value.commune
              : value.type == "federation"
              ? value.province
              : ""}
            {value.nombre > 0 && value.nombre != 1
              ? " (" + value.nombre + " membres)"
              : value.nombre == 1
              ? " (" + value.nombre + " membre)"
              : ""}
          </option>
        );
      }
    });

  const goToHome = () => {
    navigate("/");
  };
  const goToNewEvent = () => {
    if (niveauId) {
      navigate("/membre-ajout/" + niveauId);
    } else {
      navigate("/membre-ajout/0");
    }
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
            {user && user.niveauType != "cellule" && (
              <button
                className="btn-dark"
                onClick={openDialog}
                style={{
                  fontWeight: "bold",
                  marginBottom: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                AFFICHER PAR
              </button>
            )}
            <p>
              {data.length > 0 ? (
                <h4
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                  }}
                  onClick={() => {
                    console.log("selects : " + selectValues);
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
            {niveauType != "" && niveauType != "secretariat general" && (
              <div>
                {selectValues && (
                  <div className="selectNiveau">
                    <label htmlFor="selectNiveau">
                      Choisir {niveauType} :{" "}
                    </label>

                    <select
                      name="selectNiveau"
                      id="selectNiveau"
                      onChange={handleSelectNiveau}
                    >
                      <option value="">Tous les {niveauType}s</option>
                      {listeSelectValues}
                    </select>
                  </div>
                )}
              </div>
            )}
            {niveauType == "Mon niveau" && (
              <h2 style={{ marginTop: "0.1em", textTransform: "uppercase" }}>
                {user.niveauType + " : " + user.libelle}
              </h2>
            )}
            {niveauType == "" && (
              <h2 style={{ marginTop: "0.1em", textTransform: "uppercase" }}>
                Tous les membres
              </h2>
            )}
            {niveauType == "aucun niveau" && (
              <h2 style={{ marginTop: "0.1em", textTransform: "uppercase" }}>
                Pas de niveau
              </h2>
            )}
            {niveauType == "secretariat general" && (
              <h2 style={{ marginTop: "0.1em", textTransform: "uppercase" }}>
                Secretariat
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
          ) : !data ? (
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
          ) : (
            <div></div>
          )}
          <img
            src="../icon/add.png"
            className="add-button"
            onClick={goToNewEvent}
          />
          <dialog
            id="modal"
            style={{
              fontWeight: "bold",
              width: "90%",
              maxWidth: "500px",
              padding: "1.2em 2em",
            }}
          >
            <img
              src="../icon/close.png"
              width="30px"
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
              onClick={closeDialog}
            />
            <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
              Afficher par :
            </p>
            <div
              className="choices"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  maxWidth: "300px",
                }}
                name=""
                onClick={handleNiveauType}
                className="dialog-btn"
              >
                Tous les membres
              </button>
              <button
                className="dialog-btn"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  maxWidth: "300px",
                }}
                name="secretariat general"
                onClick={handleNiveauType}
              >
                Secretariat General
              </button>
              <button
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  maxWidth: "300px",
                }}
                className="dialog-btn"
                name="federation"
                onClick={handleNiveauType}
              >
                Federation
              </button>
              <button
                className="dialog-btn"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  maxWidth: "300px",
                }}
                name="section"
                onClick={handleNiveauType}
              >
                Section
              </button>
              <button
                className="dialog-btn"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.2em 1em",
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  maxWidth: "300px",
                }}
                name="cellule"
                onClick={handleNiveauType}
              >
                Cellule
              </button>
            </div>
          </dialog>
        </section>
      </MainLayout>
    </>
  );
}

export default PageMembres;
