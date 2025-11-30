import { useEffect, useState } from "react";
import api from "../api/client";
import PostCard from "../components/PostCard";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="page-heading">Latest posts</h1>
      {posts.length === 0 && (
        <p className="muted">No posts yet. Be the first to write.</p>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
