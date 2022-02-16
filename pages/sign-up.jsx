import Image from "next/image";
import Router, { useRouter } from "next/router";
import styles from "../styles/Lsg.module.css";
import Input from "../Components/Input";
import { useRef, useState } from "react";
import Link from "next/Link";
import Header from "../Components/Header";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { withPublic } from "../Hooks/Routes";

function SignUp() {
  let { _uid } = useRouter().query;
  console.log(_uid);
  let email = useRef("");
  let password = useRef("");
  let confirmPassword = useRef("");

  let [same, setSame] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  const signUp = () => {
    if (password.current.value === confirmPassword.current.value) {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          let user = userCredential.user;

          await setDoc(doc(db, "users", user.uid), {
            earnings: 0,
            messagesLength: 0,
            anonymousLength: 0,
            recentActivities: [],
            referrals: 0,
          });

          if (_uid) {
            let userPaymentRef = doc(db, "users", _uid);
            updateDoc(userPaymentRef, {
              earnings: increment(0.5),
              referrals: increment(1),
            });
          }
          setLoading(false);
          //Router.push("/");
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  };
  const handle = (e) => {
    if (e.target.value !== password.current.value) {
      setSame("password must be the same");
    } else {
      setSame("");
    }
  };

  return (
    <div className={styles.lg}>
      <Header title="Sign up a new account" />
      <Image
        src="/images-removebg-preview.png"
        alt="logo"
        width={80}
        height={40}
        onClick={() => {
          Router.push("/");
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
              signUp();
            }}
          >
            <h3>Sign up a new account</h3>
            {error && (
              <p className={styles.err}>
                {
                  error?.message
                    .split(" ")[2]
                    .replace("(", "")
                    .replace(")", "")
                    .split("/")[1]
                }{" "}
                Please try again.
              </p>
            )}
            <Input name="email" type="email" Ref={email} />
            <Input
              name="password"
              type="password"
              Ref={password}
              ml={8}
              handle={handle}
            />
            <Input
              name="confirm password"
              type="password"
              Ref={confirmPassword}
              ml={8}
              handle={handle}
            />
            {same && (
              <p
                style={{
                  color: "rgb(238, 82, 82)",
                  marginTop: "-15px",
                  marginBottom: "20px",
                }}
              >
                {same}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{ position: "relative" }}
            >
              {!loading ? "Sign Up" : <div className={styles.loader}></div>}
            </button>
          </form>
          <p>
            Have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withPublic(SignUp);
