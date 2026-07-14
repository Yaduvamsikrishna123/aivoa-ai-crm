import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-6 border-b border-slate-700">
        AI CRM
      </h1>

      <nav className="flex flex-col p-4 gap-4">
        <Link
          to="/dashboard"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/hcps"
          className="hover:bg-slate-700 p-3 rounded"
        >
          HCPs
        </Link>

        <Link
          to="/interactions"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Interactions
        </Link>

        <button
          onClick={handleLogout}
          className="text-left hover:bg-red-600 p-3 rounded mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;