import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/mainlayout";

function PageInformationCommande(props) {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="main">
        <br />
        <center
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <div
            style={{
              margin: "1.5em",
              backgroundColor: "black",
              color: "white",
              padding: "1.3em",
            }}
          >
            <h3>Commande Effectué !</h3> <br />{" "}
            <p style={{ textAlign: "center", padding: "0.5em" }}>
              Conctatez ce numero pour finaliser votre commande.
              <br />
              <br />
            </p>
            <center>
              <strong style={{ textWrap: "nowrap" }}>+243 826 114 378</strong>
            </center>
            <br />
            <button
              style={{
                fontSize: 30,
                padding: "0em 1em",
                fontWeight: "bold",
                border: "black 2px solid",
              }}
              onClick={goToHome}
            >
              OK
            </button>
          </div>
        </center>
      </div>
    </MainLayout>
  );
}

export default PageInformationCommande;
