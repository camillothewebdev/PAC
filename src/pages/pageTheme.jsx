import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import connection from "../data/connection";
import MainLayout from "../layout/mainlayout";

function PageTheme(data) {
  const navigate = useNavigate();
  const { user, update } = useContext(AuthContext);
  const [userTheme, setUserTheme] = useState(user.theme);

  const handleChange = (e) => {
    setUserTheme(e.target.value);
    handleSubmit();
  };
  const handleSubmit = async () => {
    try {
      await axios.put(connection + "/modifier-theme/" + user.id, {
        theme: document.getElementById("sexe").value,
      });
      update(user.id);
      navigate("/parametres");
    } catch (error) {
      console.log("error");
    }
  };

  const goBack = () => {
    navigate("/parametres");
  };

  const goToFonction = () => {
    navigate("/fonction");
  };

  const goToTypeMembre = () => {
    navigate("/type-membre");
  };

  return (
    <MainLayout>
      <div className="header-title">
        <img src="../icon/back.png" className="back-btn" onClick={goBack} />
      </div>
      <div className="form-adhesion">
        <center
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <br />
          <br />
          <div className="choix-theme"></div>
        </center>
      </div>
    </MainLayout>
  );
}

export default PageTheme;
