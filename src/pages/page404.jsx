import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/mainlayout";

function Page404() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <main>
      <div className="actualite-header">
        <div className="title">
          <img src="../icon/back.png" alt="back" onClick={goToHome} />
          <h1></h1>
        </div>
      </div>
      <br /> <br /> <br />
      <center>
        <p>Cette page n'existe pas ou est encore en cours de construction</p>
        <br /> <br />
        <img src="../icon/construction.png" />
      </center>
    </main>
  );
}
export default Page404;
