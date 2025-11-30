import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import NewPostPage from "./pages/NewPostPage";
import EditPostPage from "./pages/EditPostPage";
import { AuthProvider, useAuth } from "./components/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PostListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route
              path="/posts/new"
              element={
                <PrivateRoute>
                  <NewPostPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <PrivateRoute>
                  <EditPostPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
