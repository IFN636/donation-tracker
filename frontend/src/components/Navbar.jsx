import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="text-black p-4 flex justify-between items-center border-b border-gray-200">
            <Link to="/" className="text-2xl font-bold">
                Donation App
            </Link>
            <div>
                {user ? (
                    <>
                        <Link to="/tasks" className="mr-4">
                            CRUD
                        </Link>
                        <Link to="/profile" className="mr-4">
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-green-600 py-2 rounded-lg hover:bg-green-700 font-bold px-6"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
