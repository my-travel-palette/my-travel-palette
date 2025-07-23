import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user info with name and default "user" role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        role: "user", // Always "user" for new registrations
      });

      setSuccessMsg("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect after delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-md p-6 sm:p-8 rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-xl text-center mb-6">
            Create an Account
          </h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {successMsg && (
            <p className="text-green-600 text-center mb-4">{successMsg}</p>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
