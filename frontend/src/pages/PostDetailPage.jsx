import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../components/AuthContext";

export default function PostDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api
      .get(`posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`posts/${id}/`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  if (!post) {
    return (
      <p className="text-gray-500 text-sm">Loading…</p>
    );
  }

  const isAuthor = user && user.username === post.author_username;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      
      {/* Title */}
      <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900">
        {post.title}
      </h1>

      {/* Metadata */}
      <div className="mb-8 text-sm text-gray-500">
        by{" "}
        <span className="font-medium text-gray-700">
          {post.author_username}
        </span>{" "}
        · {new Date(post.created_at).toLocaleString()}
      </div>

      {/* Content */}
      <div
        className="prose prose-gray max-w-none leading-relaxed text-gray-800"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {post.content}
      </div>

      {/* Actions (Edit / Delete) */}
      {isAuthor && (
        <div className="mt-10 flex gap-3">
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
