import { useState } from "react";
import Link from "next/link";
import DashboardNav from "../Components/DashboardNav";
import styles from "../styles/dashboard.module.css";
import { withPrivate } from "../Hooks/Routes";
import { db } from "../firebase";
import { v4 } from "uuid";
import {
  doc,
  collection,
  setDoc,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import Header from "../Components/Header";

function Create({ user }) {
  let [link, setLink] = useState("");
  let [Loading, setLoading] = useState(false);
  let dbRef = collection(db, "users");
  let mid = v4();

  let createQuickLink = async () => {
    setLoading(true);
    let userRef = doc(dbRef, user.uid);
    let messageRef = collection(userRef, "messages");

    await setDoc(doc(messageRef, mid), {
      date: Timestamp.now(),
      messages: [],
      isQuestions: false,
    });

    updateDoc(userRef, {
      anonymousLength: increment(1),
      recentActivities: arrayUnion(
        `Created an anonymous poll at ${new Date().toString()}`
      ),
    })
      .then(() => {
        setLoading(false);
        navigator.clipboard.writeText(
          `https://resox-m.vercel.app/write?uid=${user?.uid}&mid=${mid}&qa=false`
        );
        setLink(
          `https://resox-m.vercel.app/write?uid=${user?.uid}&mid=${mid}&qa=false`
        );
        let box = document.querySelector("#link_copied");
        box.style.display = "block";
        box.style.opacity = "1";
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  let close = () => {
    let box = document.querySelector("#link_copied");
    box.style.display = "none";
    box.style.opacity = "0";
  };
  return (
    <>
      {Loading && <div id="Gloader"></div>}
      <DashboardNav />
      <Header title="Create - Redox" />
      <div className={styles.create}>
        <div>
          <h2>
            Create and share a quick link to receive anonymous messages from
            friends
          </h2>
          <button title="copy link" onClick={createQuickLink}>
            Quick link
          </button>
        </div>
        <fieldset>
          <legend>Or</legend>
        </fieldset>
        <div>
          <h2>Ask questions</h2>
          <p>
            Get anonymous answers on questions you create from your friends.
          </p>
        </div>
        <Link href="/create-questions">Create</Link>
        <div className={styles.copied} id="link_copied">
          <span className={styles.close} onClick={close}>
            X
          </span>
          <h3>Link has been copied to your clipboard</h3>
          <div className={styles.circle}>
            <span></span>
          </div>
          <p
            style={{
              width: "fit-content",
              margin: "20px 0 10px",
              wordBreak: "break-word",
              fontSize: ".8rem",
            }}
          >
            Share the link (<b style={{ display: "inline-block" }}>{link}</b>)
            with you friends.
          </p>
        </div>
      </div>
    </>
  );
}

export default withPrivate(Create);
