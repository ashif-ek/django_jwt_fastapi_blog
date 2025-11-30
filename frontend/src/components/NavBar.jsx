import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-gray-900 hover:text-blue-700 transition"
        >
          SignalBlog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-blue-700 transition"
          >
            Feed
          </Link>

          {isAuthenticated && (
            <Link
              to="/posts/new"
              className="rounded-md bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 transition"
            >
              New Post
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md border border-blue-700 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-800">
                {user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
