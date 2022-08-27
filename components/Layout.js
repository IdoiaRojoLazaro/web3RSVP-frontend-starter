import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-serif flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
