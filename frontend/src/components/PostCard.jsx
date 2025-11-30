import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article
      className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-700 transition">
        <Link to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      </h2>

      {/* Metadata */}
      <div className="mt-2 text-sm text-gray-500">
        by <span className="font-medium text-gray-700">{post.author_username}</span> ·{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 leading-relaxed">
        {post.content.length > 160
          ? post.content.slice(0, 160) + "…"
          : post.content}
      </p>

      {/* Action */}
      <div className="mt-5">
        <Link
          to={`/posts/${post.id}`}
          className="inline-block rounded-md border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-700 hover:text-white"
        >
          Read
        </Link>
      </div>
    </article>
  );
}
