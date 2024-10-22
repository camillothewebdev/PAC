import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import PageHome from "./pages/pageHome";
import PageActualite from "./pages/pageActualite";
import Page404 from "./pages/page404";
import PageAdhesion from "./pages/pageAdhesion";
import PagePaiement from "./pages/pagePaiement";
import PageInformation from "./pages/pageInformation";
import PageAbout from "./pages/pageAbout";
import PageActualites from "./pages/pageActualites";
import ScrollToTop from "./components/scrolltotop";
import "./style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context/authContext";
import PageProfile from "./pages/pageProfile";
import PageActivitesAjout from "./pages/pageActivitesAjout";
import PageMembres from "./pages/pageMembres";
import PageCarte from "./pages/pageCarte";
import PageMembreAjout from "./pages/PageMembreAjout";
import PageNotification from "./pages/pageNotification";
import PageForum from "./pages/PageForum";
import PageParametres from "./pages/PageParametres";
import PageMembreInfo from "./pages/pagemembreinfo";
import PageMembreModifier from "./pages/pageMembreModifier";
import PageActivitesModifier from "./pages/pageActivitesModifier";
import PageModifierCompte from "./pages/pageModifierCompte";
import PageAdmin from "./pages/pageAdmin";
import PageChoisirAdmin from "./pages/pageChoisirAdmin";
import Header from "./components/header";
import PageDemander from "./pages/pageDemander";
import PageFederation from "./pages/pageFederation";
import PageSection from "./pages/pageSection";
import PageCellule from "./pages/pageCellule";
import PageLogin from "./pages/pagelogin";
import PageMembresNiveau from "./pages/pageMembreNiveau";
import PageSymboles from "./pages/pageSymboles";
import PageFonction from "./pages/pageFonction";
import PageTypeMembre from "./pages/pageTypeMembre";
import PageTheme from "./pages/pageTheme";
import PageInformationCommande from "./pages/pageInformationCommande";

function PageRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="home" element={<PageHome />} />
            <Route path="adhesion" element={<PageAdhesion />} />
            <Route path="login" element={<PageLogin />}></Route>
            <Route path="membres" element={<PageMembres />} />
            <Route path="demander" element={<PageDemander />} />
            <Route path="membre-ajout/:id" element={<PageMembreAjout />} />
            <Route path="federation" element={<PageFederation />} />
            <Route path="section/:id" element={<PageSection />} />
            <Route path="cellule/:id" element={<PageCellule />} />
            <Route
              path="membre-modifier/:id"
              element={<PageMembreModifier />}
            />
            <Route
              path="compte-modifier/:id"
              element={<PageModifierCompte />}
            />
            <Route path="admin" element={<PageAdmin />} />
            <Route path="choisir-admin" element={<PageChoisirAdmin />} />
            <Route path="membre-info/:id" element={<PageMembreInfo />} />
            <Route path="membres-niveau/:id" element={<PageMembresNiveau />} />
            <Route path="carte-membre/:id" element={<PageCarte />} />
            <Route path="activites" element={<PageActualites />} />
            <Route path="actualite/:id" element={<PageActualite />} />
            <Route path="activites-ajout" element={<PageActivitesAjout />} />
            <Route path="symboles" element={<PageSymboles />} />
            <Route path="fonction" element={<PageFonction />} />
            <Route path="type-membre" element={<PageTypeMembre />} />
            <Route
              path="activites-modifier/:id"
              element={<PageActivitesModifier />}
            />
            <Route path="paiement" element={<PagePaiement />} />
            <Route path="information" element={<PageInformation />} />
            <Route
              path="information-commande"
              element={<PageInformationCommande />}
            />
            <Route path="profile" element={<PageProfile />} />
            <Route path="forum" element={<PageForum />} />
            <Route path="notifications" element={<PageNotification />} />
            <Route path="parametres" element={<PageParametres />} />
            <Route path="about" element={<PageAbout />} />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </AuthContextProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <PageRouter />
  </>
);
