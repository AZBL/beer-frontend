import { useState } from "react";
import { signIn } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import styles from "../authStyles.module.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      login();
      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form className={styles.FormWrapper} onSubmit={handleSignIn}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.FormButton}>Sign In</button>

      {error && <p>Error with email or password.</p>}
    </form>
  );
};
export default SignIn;
