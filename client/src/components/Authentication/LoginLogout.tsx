import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

/**
 * A class that manages logging in and out of the REPL.
 */

export interface ILoginPageProps {
  authing: boolean;
  setAuthing: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * A function that handles logging the user in.
 * @param props 
 * @returns 
 */
const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const userEmail = response.user.email || "";

      // Check if the email ends with the allowed domain
      if (userEmail.endsWith("@brown.edu")) {
        console.log(response.user.uid);
        props.setAuthing(true);
      } else {
        // User is not allowed, sign them out and show a message
        await auth.signOut();
        console.log("User not allowed. Signed out.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login-header">
      <h1>Login Page</h1>
      <button
        className="google-login-button"
        aria-label="Login"
        onClick={() => signInWithGoogle()}
        disabled={props.authing}
      >
        Sign in with Google
      </button>
    </div>
  );
};
/**
 * A function that handles logging the user out.
 * @param props 
 * @returns 
 */
const Logout: React.FunctionComponent<ILoginPageProps> = (
  props,
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.key === "S" || event.key === "s") && event.ctrlKey) {
        props.setAuthing(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props]);
  return (
    <div className="logout-box">
      <button
        className="SignOut"
        aria-label="Sign Out"
        onClick={() => {
          props.setAuthing(false);
        
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <>{!props.authing ? <Login {...props} /> : <Logout {...props} />}</>;
};

export default LoginLogout;
