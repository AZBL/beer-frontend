import { useState } from "react";
import { signUp } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../authStyles.module.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, firstName, lastName);
      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form className={styles.FormWrapper} onSubmit={handleSignUp}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password (minimum 6 characters)</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.FormButton}>Sign Up</button>
      {error && <p>Error signing up.</p>}
    </form>
  );
};
export default SignUp;
