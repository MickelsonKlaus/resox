import Image from "next/image";
import Link from "next/Link";
import { useRouter } from "next/router";
import styles from "../styles/Nav.module.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Nav({ id = "" }) {
  let router = useRouter();
  let [user] = useAuthState(auth);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__ln}>
        <ul className={styles.cats}>
          <li>
            <Image
              src="/images-removebg-preview.png"
              alt="logo"
              width={80}
              height={40}
              className={styles.nav__logo}
              onClick={() => {
                router.push("/");
              }}
            />
          </li>
        </ul>
        {user ? (
          <ul>
            <li className={styles.nav__ctr}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/login" replace>
                Log In
              </Link>
            </li>
            <li className={styles.nav__ctr}>
              <Link
                href={id ? `sign-up?referral=true&_uid=${id}` : "/sign-up"}
                replace
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
