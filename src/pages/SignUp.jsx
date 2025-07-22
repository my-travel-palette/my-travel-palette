import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";

const handleSignUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Create user profile in Firestore with role
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role: "user", // or "admin" if needed
  });
};

function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    handleSignUp(login, password);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default SignUp;
