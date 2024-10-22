function About() {
  return (
    <section>
      <div className="address-contact">
        <p>
          <strong>C'est quoi PAC ? </strong> <br />
          PAC est un parti politique dont les membres sont en action. Il est
          dirigé par l'honorable Andé Amundala, le chef de l'état LOL. Notre
          objectif est d'ameliorer la politique en RDC et de voler l'argent du
          pays, Merci pour la comprehension !
        </p>
        <p>
          <strong>Adresse :</strong> <br /> c/Kasavubu av/Miami n°133
        </p>
        <p>
          <strong>Contact :</strong> <br /> + 243 894 429 245
        </p>
        <p>
          <br />
          <strong>Autorité morale :</strong>
        </p>
      </div>

      <div className="autorite-morale">
        <div className="profile">
          <img src="../img/mark.jpg" alt="Nadine ngalula" />
          <p>Nadine Ngalula</p>
        </div>
        <small>{"<< PAC toujours la loyauté ! >> "}</small>
      </div>
    </section>
  );
}

export default About;
