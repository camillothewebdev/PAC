import { resolvePath, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";
import MainLayout from "../layout/mainlayout";
import QrScanner from "react-qr-scanner";

function PageLogin() {
  const [data, setData] = useState();
  const [serverError, setServerError] = useState(false);
  const [qrError, setQrError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const goToHome = () => {
    navigate("/");
  };

  const handleScan = async (result) => {
    if (result) {
      console.log(result.text);
      try {
        const response = await login(result.text);
        if (response.data.login) {
          setData(response.data.membre);
          openDialog();
        } else {
          setQrError(true);
        }
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setQrError(true);
  };

  const showScanner = () => {
    setQrError(false);
  };

  const openDialog = () => {
    document.getElementById("modal-qr").showModal();
  };

  const closeDialog = () => {
    navigate("/");
  };

  if (serverError) {
    return (
      <div>
        <img
          className="server-error"
          src="../img/no-wifi.png"
          alt="Erreur de connexion"
          width={"80%"}
          height={"230px"}
        />
        <center>
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
      <main>
        <section style={{ position: "relative" }}>
          <img
            onClick={goToHome}
            src="../icon/back.png"
            style={{
              backgroundColor: "white",
              filter: "invert(100%)",
              position: "absolute",
              top: 0,
              left: 0,
              margin: "0.8em",
            }}
          />
          <div className="zoneqr">
            <center>
              <h2>Scannez QR :</h2>
            </center>
            <br />

            {qrError && (
              <center
                style={{
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px black solid",
                }}
              >
                <h3>Le code QR est incorrect </h3>
                <br />
                <br />
                <img
                  className="qr-error"
                  src="../icon/retry.png"
                  width={"20%"}
                  alt="réesayer"
                  onClick={showScanner}
                />
              </center>
            )}

            {loading && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
              </>
            )}
            <center>
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                onLoad={handleLoad}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                }}
              />
            </center>

            <dialog
              id="modal-qr"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {data && (
                <center>
                  <img
                    id="membre_image_qr"
                    src={data.photo}
                    alt="profile"
                    style={{ borderRadius: "50%", width: "80px" }}
                  />
                  <br />
                  <small>
                    {data.nom} {data.prenom}
                  </small>
                  <br />
                  <br />
                  <h3>Vous etes connecté</h3>
                  <br />
                  <button
                    onClick={closeDialog}
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      marginTop: "1em",
                      padding: "0.2em 1em",
                    }}
                  >
                    Continuer
                  </button>
                </center>
              )}
            </dialog>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

export default PageLogin;
