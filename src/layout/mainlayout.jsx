import Header from "../components/header";
import Footer from "../components/footer";
function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
