import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";
import cardBack from "../data/card_back";
import etape from "../data/etape";
function PageCarte() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [attendre, setAttendre] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scanResult, setscanResult] = useState(null);
  let locationActualiteId = parseInt(location.pathname.split("/")[2]);
  let date = new Date();
  let dateNaturel = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const goToMembre = () => {
    navigate("/membre-info/" + locationActualiteId);
  };

  const downloadPDF = () => {
    document.getElementById("btn-imprimer").disabled = true;
    html2canvas(document.getElementById("carte-membre")).then((canvas) => {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgDataRetro = canvas.toDataURL("img/png");
      doc.addImage(imgDataRetro, "PNG", 0, 0, 85.6, 54.0);
      doc.addImage(cardBack, "PNG", 86.5, 0, 85.6, 54.0);
      doc.addImage(etape, "PNG", 10, 75, 180.6, 110.0);
      //doc.save(`carte ${data.nom} ${data.prenom}.pdf`);
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfWindow = window.open(pdfUrl);
      pdfWindow.onload = () => {
        pdfWindow.print();

        document.getElementById("btn-imprimer").disabled = false;
      };
    });
    // alert("La carte a été telecharger ! ");
    //btnImprimer.disabled = false;
    //navigate("/membres");
  };
  /*
    const capture = document.getElementById("carte-membre");
    const qr_code = document.getElementById("qr_code");
    var s = new XMLSerializer().serializeToString(qr_code);
    var encodedData = window.btoa(s);
    var qr_code_image = `data:image/svg+xml;base64,${encodedData}`;
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: [54, 86],
      });
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(qr_code_image, "svg", 0, 0, 40, 40);
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(data.nom + " " + data.prenom + ".pdf");
      alert("La carte a été telecharger ! ");
      navigate("/membres");
    });*/

  const goToActualites = () => {
    navigate("/membres");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          connection + "/lire-membre/" + locationActualiteId
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(true);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    navigate("/membre-modifier/" + locationActualiteId);
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
            <button>Réessayer</button>
          </div>
        </center>
      </div>
    );
  }

  return (
    <MainLayout>
      {loading ? (
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
      ) : (
        data && (
          <div>
            <div className="header-controls">
              <img
                src="../icon/back.png"
                className="back-btn"
                onClick={goToMembre}
              />
            </div>
            <div
              id="page"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1.8em",
              }}
            >
              <div className="carte-membre" id="carte-membre">
                <div className="header">
                  <img src="../img/logo.png" className="logo" alt="logo" />
                  <img src="../img/flag.png" className="flag" alt="drapeau" />
                  <span className="title1">
                    REPUBLIQUE DEMOCRATIQUE DU CONGO
                  </span>
                  <span className="title2">PATRIOTES EN ACTION</span>
                  <p className="party-data">
                    <span>Membre {data.type}</span>
                    <span> PROVINCE : KINSHASA</span>{" "}
                    <span>
                      {data.niveauType} : {data.niveau}
                    </span>
                  </p>
                </div>
                <div className="main">
                  <div className="info-carte">
                    <div className="zone-info">
                      <span className="libelle">NOM : </span>
                      <span>{data.nom}</span>
                    </div>
                    <div className="zone-info">
                      <span className="libelle">POSTNOM : </span>
                      <span>{data.postnom}</span>
                    </div>
                    <div className="zone-info">
                      <span className="libelle">PRENOM : </span>
                      <span>{data.prenom}</span>
                    </div>
                    <div className="zone-info">
                      <span className="libelle">SEXE :</span>
                      <span>{data.sexe}</span>
                    </div>
                    {data.fonction && (
                      <div className="zone-info">
                        <span className="libelle">FONCTION : </span>
                        <span>{data.fonction}</span>
                      </div>
                    )}
                    <div className="zone-info">
                      <span className="libelle">ADRESSE : </span>
                      <p style={{ width: "55%" }}>{data.adresse}</p>
                    </div>
                  </div>
                  <img
                    className="carte-photo"
                    src={data.photo || "../img/profile.png"}
                    alt="photo"
                  />
                  <div
                    className="carte-qr"
                    style={{
                      backgroundColor: "white",
                      padding: "0.3em 0.3em 0.2em 0.3em",
                    }}
                  >
                    <QRCode
                      id="qr_code"
                      style={{
                        width: "50px",
                        height: "auto",
                      }}
                      value={data.id + ""}
                    />
                  </div>
                  <small className="carte-date"></small>
                  <small className="signature">
                    SIGNATURE COORDINATEUR NATIONAL
                  </small>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
            <center>
              <div
                className="confirm-btn"
                style={{
                  width: "100%",
                  margin: "auto",
                  bottom: "0",
                }}
              >
                <button id="btn-imprimer" onClick={downloadPDF}>
                  IMPRIMER
                </button>
              </div>
            </center>
          </div>
        )
      )}
    </MainLayout>
  );
}
export default PageCarte;
