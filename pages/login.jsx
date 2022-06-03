import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Lsg.module.css";
import Input from "../Components/Input";
import { useRef } from "react";
import Link from "next/link";
import Header from "../Components/Header";
import { auth } from "../firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { withPublic } from "../Hooks/Routes";

function Login() {
  let router = useRouter();
  let email = useRef("");
  let password = useRef("");

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const login = () => {
    try {
      signInWithEmailAndPassword(email.current.value, password.current.value);
    } catch (err) {
      console.error(err);
    }
  };

  const loginF = () => {
    fetch("api/login", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then(() => {
        //if the user exists
      })
      .catch(() => {
        //if the user does not exist
      });
  };

  return (
    <div className={styles.lg}>
      <Header title="Log into your account" />
      <Image
        src="/images-removebg-preview.png"
        alt="logo"
        width={80}
        height={40}
        onClick={() => {
          router.push("/");
        }}
        className={styles.logo}
      />
      <div className={styles.lg__dv}>
        <div>
          <Image
            src="/undraw_New_message_re_fp03.png"
            width={500}
            height={500}
            alt="login"
          />
        </div>
        <div>
          <form
            className={styles.lg__form}
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <h3>Log into your account</h3>
            {error && (
              <p className={styles.err}>
                {/* {
                  error?.message
                    .split(" ")[2]
                    .replace("(", "")
                    .replace(")", "")
                    .split("/")[1]
                }{" "} */}
                Wrong password or email. Please try again
              </p>
            )}
            <Input name="email" type="email" Ref={email} />
            <Input name="password" type="password" Ref={password} />
            <button
              type="submit"
              disabled={loading}
              style={{ position: "relative" }}
            >
              {!loading ? "Login" : <div className={styles.loader}></div>}
            </button>
          </form>
          <p>
            Don&#39;t have an account? <Link href="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withPublic(Login);
