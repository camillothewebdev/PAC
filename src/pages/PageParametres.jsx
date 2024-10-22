import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";

function PageParametres(data) {
  const navigate = useNavigate();
  const { user, update } = useContext(AuthContext);
  const [userTheme, setUserTheme] = useState(user.theme);

  const handleChange = (e) => {
    setUserTheme(e.target.value);
    handleSubmit();
  };
  const handleSubmit = async (event) => {
    try {
      await axios.put(connection + "/modifier-theme/" + user.id, {
        theme: event.target.name,
      });
      update(user.id);
      navigate("/parametres");
    } catch (error) {
      console.log("error");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToFonction = () => {
    navigate("/fonction");
  };

  const goToTheme = () => {
    navigate("/theme");
  };

  const goToTypeMembre = () => {
    navigate("/type-membre");
  };

  return (
    <MainLayout>
      <div className="form-adhesion">
        <center
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <br />
          <br />
          <h2>PARAMETRES</h2>
          <br />
          <div className="choix-theme">
            <img
              src="../icon/light.png"
              alt="light"
              className={user.theme == "clair" ? "selected" : ""}
              name="clair"
              onClick={handleSubmit}
            />
            <img
              src="../icon/dark.png"
              alt="dark"
              className={user.theme == "sombre" ? "selected" : ""}
              name="sombre"
              onClick={handleSubmit}
            />
          </div>
          {user && user.idFonction != null && (
            <>
              <div className="confirm-btn">
                <button onClick={goToFonction}>Fonctions</button>
              </div>
              <div className="confirm-btn">
                <button onClick={goToTypeMembre}>Type de membres</button>
              </div>
            </>
          )}
        </center>
      </div>
    </MainLayout>
  );
}

export default PageParametres;
