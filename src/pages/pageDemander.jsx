import { useNavigate } from "react-router-dom";
import React from "react";
import MainLayout from "../layout/mainlayout";

function PageDemander(data) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToPaiement = () => {
    navigate("/paiement");
  };

  const annuler = () => {
    alert("Adhesion non finalisée");
    navigate("/home");
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
          <br />
          <br />
          <h4>Payez la carte</h4>
          <br />
          <img src="../icon/card.png" width="50%" />
          <p>La carte coûte 10$</p>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2em",
              marginBottom: "1em",
            }}
          >
            <button onClick={annuler}>REFUSER</button>
            <button onClick={goToPaiement}>ACCEPTER</button>
          </div>
        </center>
      </div>
    </MainLayout>
  );
}

export default PageDemander;
