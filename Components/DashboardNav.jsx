import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Nav.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function DashboardNav() {
  let router = useRouter();

  const logout = () => {
    signOut(auth);
    router.replace("/");
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__ln}>
        <ul className={styles.cats}>
          <li>
            <Link href="/dashboard" passHref>
              <a>
                <Image
                  src="/images-removebg-preview.png"
                  alt="logo"
                  width={80}
                  height={40}
                  className={styles.nav__logo}
                />
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </li>
          <li className={styles.nav__ctr}>
            <Link href="/create" replace>
              Create
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DashboardNav;
