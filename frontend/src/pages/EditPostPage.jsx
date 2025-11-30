import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`posts/${id}/`)
      .then((res) => {
        setForm({
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.put(`posts/${id}/`, {
        title: form.title,
        content: form.content,
        published: true,
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Page Heading */}
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900">
        Edit Post
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-8 shadow-sm"
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Title
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Content
          </label>
          <textarea
            className="w-full min-h-[180px] rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700 leading-relaxed"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
