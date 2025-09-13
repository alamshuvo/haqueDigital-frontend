import { Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar></Navbar>
      <main className="lg:p-8">
        {/* The Outlet component will render the child route's element here */}
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
