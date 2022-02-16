import React, { useState } from "react";
import DashboardNav from "../Components/DashboardNav";
import styles from "../styles/dashboard.module.css";
import Question from "../Components/Question";
import Header from "../Components/Header";
import { withPrivate } from "../Hooks/Routes";
import { useStateValue } from "../Hooks/StateProvider";
import { db } from "../firebase";
import {
  doc,
  collection,
  Timestamp,
  updateDoc,
  setDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { v4 } from "uuid";

function Questions({ user }) {
  let qid = v4();
  let [link, setLink] = useState("");
  let [{ data }] = useStateValue();
  let dbRef = collection(db, "users");
  let [question__number, setQuestion__number] = useState(1);
  let [isCreating, setCreating] = useState(false);

  let add = () => {
    setQuestion__number(++question__number);
  };
  let remove = (e) => {
    let target = e.currentTarget.parentElement.parentElement;

    document.getElementById("qol").removeChild(target);
  };
  let close = () => {
    let box = document.querySelector("#form_ready");
    box.style.display = "none";
    box.style.opacity = "0";

    add();
  };

  let uploadData = async () => {
    let userRef = doc(dbRef, user.uid);
    setCreating(true);
    let messageRef = collection(userRef, "messages");

    await setDoc(doc(messageRef, qid), {
      date: Timestamp.now(),
      answers: [],
      isQuestions: true,
    });
    updateDoc(userRef, {
      question: { date: Timestamp.now(), questions: [...data], id: qid },
      anonymousLength: increment(1),
      recentActivities: arrayUnion(
        `Created an questions at ${new Date().toString()}`
      ),
    })
      .then(() => {
        setCreating(false);
        navigator.clipboard.writeText(
          `https://resox-m.vercel.app/write?uid=${user?.uid}&qid=${qid}&qa=true`
        );
        setLink(
          `https://resox-m.vercel.app/write?uid=${user?.uid}&qid=${qid}&qa=true`
        );
        let box = document.querySelector("#form_ready");
        box.style.display = "block";
        box.style.opacity = "1";
        setQuestion__number(0);
      })
      .catch((err) => {
        console.error(err);
        setCreating(false);
      });
  };

  return (
    <div>
      <DashboardNav />
      <Header title="Create Questions - Redox" />
      <div className={styles.questions}>
        <div className={styles.questions__heading}>
          <h3>Questions</h3>
          <button onClick={add}>+ Add question</button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadData();
          }}
        >
          <ol id="qol">
            {Array(question__number)
              .fill()
              .map((_, i) => {
                return <Question key={i} index={i} remove={remove} />;
              })}
          </ol>
          <button
            type="submit"
            disabled={isCreating}
            style={{ opacity: isCreating ? "0.5" : "1" }}
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </form>
        <div className={styles.ready} id="form_ready">
          <span className={styles.close} onClick={close}>
            X
          </span>
          <h3>Form is ready.</h3>
          <div className={styles.circle}>
            <span></span>
          </div>
          <p style={{ wordBreak: "break-word" }}>
            Copied. Share link (<b>{link}</b>) with friends
          </p>
        </div>
      </div>
    </div>
  );
}

export default withPrivate(Questions);
