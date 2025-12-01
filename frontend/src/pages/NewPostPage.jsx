import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function NewPostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("posts/", {
        title: form.title,
        content: form.content,
        image: form.image,
      });
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error(err);
      setError("Create failed. Are you logged in?");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Page Heading */}
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900">
        New Post
      </h1>

      {/* Form Container */}
      <form
        className="rounded-xl border bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Title
          </label>
          <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

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
            className="w-full min-h-[200px] rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm leading-relaxed focus:border-blue-700 focus:ring-blue-700"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
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
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
