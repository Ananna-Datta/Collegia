"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6e7fdb, #a8c0ff)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "#333",
          }}
        >
          Welcome Back
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.8rem 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.8rem 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.8rem 0",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            background: "#6e7fdb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => signIn("google")}
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.8rem 0",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            background: "#dd4b39",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#6e7fdb",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
