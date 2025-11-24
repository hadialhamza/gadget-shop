"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let imageUrl = "";

    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      try {
        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imgbbData = await imgbbRes.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        setError("Could not upload image. Please try again.");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: imageUrl || "https://i.ibb.co/5GzXkwq/user.png",
        }),
      });

      if (res.ok) {
        alert("Registration Successful! Please Login.");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left pl-10">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">Join us to explore the best gadgets in town.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Image Upload Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="link link-primary">
                Login
              </Link>
            </p>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="btn btn-outline btn-secondary w-full"
            >
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
