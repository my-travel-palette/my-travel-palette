import { auth } from "../firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, login, password)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        setError("Invalid email or password.");
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-md p-5 mx-auto mt-10">
      <div className="card-body">
        <h2 className="card-title">Login</h2>

        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Login:</legend>
            <input
              type="text"
              className="input"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
