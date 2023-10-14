import { useNavigate } from "react-router-dom";
import { signOutFromFirebase } from "../firebase";
import { useUser } from "../UserContext";

const useSignOut = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const signOutUser = async () => {
    try {
      await signOutFromFirebase();
      logout();
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return signOutUser;
};
export default useSignOut;
