import styles from "../styles/Home.module.css"
import Image from "next/image"
import Link from "next/link"
import Nav from "../Components/Nav";
import Header from "../Components/Header";
import { useRouter } from "next/router";

export default function Home() {
  let { _uid } = useRouter().query;
  return (
    <div>
      <Nav id={_uid} />
      <Header title="Redox - More than anonymous messaging" />
      <div className={styles.hmes}>
        <div>
          <p>More than just anonymous messaging.</p>
          <h1>Create, Earn and Share</h1>
          <p>Get paid for every messages you receive
            from your anonymous polls.</p>
          <Link href="/dashboard">Get Started</Link>
        </div>
        <Image src="/undraw_Anonymous_feedback_re_rc5v-removebg-preview.png" alt="hmes" width={600} height={600} />
      </div>
      <div className={styles.htw}>
        <h2>How it works</h2>
        <div className={styles.htw__dv}>
          <Image src="/undraw_Reminders_re_gtyb-removebg-preview.png" alt="how it works" width={450} height={350} />
          <div className={styles.fds}>
            <h3 style={{
              textAlign: "left",
              marginBottom: "30px"
            }}>Steps</h3>
            <div>
              <h4>Create an account</h4>
              <fieldset>
                <legend>1</legend>
              </fieldset>
            </div>
            <div>
              <h4>Create an anonymous message</h4>
              <fieldset>
                <legend>2</legend>
              </fieldset>
            </div>
            <div>
              <h4>Share with friends</h4>
              <fieldset>
                <legend>3</legend>
              </fieldset>
            </div>
            <div>
              <h4>Earn</h4>
              <fieldset>
                <legend>4</legend>
              </fieldset>
            </div>
          </div>
        </div>
        <div className={styles.htw__img} >
          <Image src="/undraw_wallet_aym5.png" alt="money" width={150} height={100} />
        </div>
      </div>
      <div className={styles.cn}>
        <p>Create anonymous messages on anything of your choice and share with your friends.</p>
        <div className={styles.cn__img}>
          <Image src="/undraw_Messaging_fun_re_vic9.png" alt="sending messages" width={250} height={200} />
        </div>
        <div>
          <Image src="/undraw_Studying_re_deca.png" alt="writing messages" width={650} height={600} />
        </div>
        <Link href="/create">Create now</Link>
      </div>
      <div className={styles.rft}>
        <div className={styles.rft__img}>
          <Image src="/undraw_real_time_collaboration_c62i-removebg-preview.png" alt="refer" width={350} height={300} />
        </div>
        <div className={styles.rft__txt}>
          <h3>Refer a friend</h3>
          <p>You can also earn by referring your friends to write anonymously using redox.</p>
          <Link href="/dashboard">Refer now</Link>
        </div>
        <div className={styles.rft__pg}>
          <Image src="/undraw_Message_sent_re_q2kl.png" alt="refer" width={150} height={100} />
        </div>
      </div>
      <footer className={styles.footer}>
        <Link href="/terms-conditions">Terms &amp; Conditions</Link>
        <p>Copywright &copy; {new Date().getFullYear()} | All rights reserved</p>
        <Link href="mailto:help@redox.com">help@redox.com</Link>
      </footer>
    </div>
  )
}
