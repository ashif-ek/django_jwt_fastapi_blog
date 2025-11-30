import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("auth/register/", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Pick another username?");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      {/* Page Heading */}
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900">
        Create Account
      </h1>

      {/* Form Card */}
      <form
        className="rounded-xl border bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
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

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            autoComplete="email"
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
            autoComplete="new-password"
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
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
