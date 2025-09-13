import { Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar></Navbar>
      <main className="lg:p-8">
        {/* The Outlet component will render the child route's element here */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
