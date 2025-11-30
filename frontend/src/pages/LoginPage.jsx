import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      {/* Heading */}
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900">
        Sign In
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-8 shadow-sm"
      >
        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Username
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            autoComplete="current-password"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          No account yet?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
