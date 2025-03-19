
import { useLoginUserMutation, useRegisterUserMutation } from "../features/auth/authApiSlice";

export const useAuth = () => {
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  return {
    loginUser,
    registerUser,
  };
};