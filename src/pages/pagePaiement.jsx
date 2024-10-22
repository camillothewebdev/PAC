import { useNavigate } from "react-router-dom";
import React from "react";
import MainLayout from "../layout/mainlayout";

function PagePaiement(data) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToInformation = (choix) => {
    navigate("/information");
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
          <h4>Comment voulez vous payer ?</h4>
          <br />
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
            <img
              src="../img/operateurs/orange.jpg"
              width={100}
              height={100}
              alt="orange"
              onClick={goToInformation}
            />
            <img
              src="../../img/operateurs/africell.jpg"
              width={100}
              height={100}
              alt="mpesa"
              onClick={goToInformation}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2em",
            }}
          >
            <img
              src="../img/operateurs/vodacom.png"
              width={100}
              height={100}
              alt="orange"
              onClick={goToInformation}
            />
            <img
              src="../img/operateurs/airtel.jpg"
              width={100}
              height={100}
              alt="mpesa"
              onClick={goToInformation}
            />
          </div>
        </center>
      </div>
    </MainLayout>
  );
}

export default PagePaiement;
