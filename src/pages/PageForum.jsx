import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import connection from "../data/connection";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import io from "socket.io-client";
import MainLayout from "../layout/mainlayout";

const socket = io.connect(connection);

function PageForum() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const pushData = async () => {
    try {
      await axios.post(connection + "/ajouter-message", {
        idEmetteur: user && user.id,
        contenu: document.getElementById("txt_message").value,
      });
      setScroll(true);
      fetchData();
      socket.emit("send_message");
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(connection + "/lire-messages");
      console.log(res.data);
      setData(res.data);
      setScroll(true);
    } catch (error) {
      console.log(error);
      setServerError(true);
    }
    setLoading(false);
  };

  socket.on("receive_message", () => {
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    goDown();
  }, [scroll]);

  const goToHome = () => {
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/parametres");
  };

  const handleSubmit = () => {
    if (document.getElementById("txt_message").value == "") {
      return;
    }
    document.getElementById("btn_send").disabled = true;
    document.getElementById("txt_message").disabled = true;
    pushData();
    document.getElementById("txt_message").value = "";
    document.getElementById("btn_send").disabled = false;
    document.getElementById("txt_message").disabled = false;
  };

  const goDown = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setScroll(false);
  };

  let listMessages = [];
  listMessages =
    data &&
    data.map((message) => {
      if (message.id) {
        let classPosition =
          user && message.idEmetteur == user.id ? "right" : "left";
        let messageNom =
          user && message.idEmetteur == user.id ? "Vous" : message.nom;

        return (
          <div key={message.id} className={`message ${classPosition}`}>
            <div className="sender-info">
              <img
                className="sender-photo"
                src={message.photo || "../img/profile.png"}
              />
              {message.idFonction != null && <p className="user-type">Admin</p>}
              <p className="name">{messageNom}</p>
            </div>
            <p className="contenu">{message.contenu}</p>
            {messageNom == "Vous" && (
              <div className="edit-delete">
                <img src="../icon/edit.png" />
                <img src="../icon/delete.png" />
              </div>
            )}
          </div>
        );
      }
    });

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
    <MainLayout>
      <center>
        <div className="main-forum">
          <br />
          <div className="message-list">
            {listMessages.length ? (
              listMessages
            ) : loading ? (
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
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Aucun message
              </div>
            )}
          </div>
          {user && (
            <div className="txt_message">
              <input
                type="text"
                name=""
                placeholder="Ecrit un message"
                id="txt_message"
              />
              <img
                className="send-button"
                onClick={handleSubmit}
                src="../icon/sendMessage.png"
                alt="send"
                id="btn_send"
              />
            </div>
          )}
        </div>
      </center>
    </MainLayout>
  );
}

export default PageForum;
