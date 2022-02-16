import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Answer from "../Components/Answer";
import styles from "../styles/write.module.css";
import { db } from "../firebase";
import {
  doc,
  collection,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import Header from "../Components/Header";
import { useStateValue } from "../Hooks/StateProvider";

function Write() {
  let message = useRef("");
  let dbRef = collection(db, "users");
  let { uid, mid, qa, qid } = useRouter().query;
  let [{ answers }] = useStateValue();
  let [sent, setSent] = useState(false);
  let [questions, setQuestions] = useState({});

  useEffect(() => {
    async function getData() {
      let userRef = collection(db, "users");
      let userDoc = doc(userRef, uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setQuestions({ ...docSnap.data().question });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getData();
  }, [uid]);

  // console.log(questions);

  const sendmessage = () => {
    let userRef = doc(dbRef, uid);
    let messageRef = collection(userRef, "messages");

    updateDoc(userRef, {
      messagesLength: increment(1),
      earnings: increment(0.5),
    });
    updateDoc(doc(messageRef, mid), {
      messages: arrayUnion({
        id: v4(),
        message: message.current.value,
        date: Timestamp.now(),
      }),
    })
      .then(() => {
        let box = document.querySelector("#msg__sent");
        box.style.display = "block";
        box.style.opacity = "1";
        message.current.value = "";
      })
      .catch((err) => console.error(err));
  };
  let sendAnswers = () => {
    let userRef = doc(dbRef, uid);
    let messageRef = collection(userRef, "messages");

    if (answers.length > 0) {
      updateDoc(userRef, {
        messagesLength: increment(1),
        earnings: increment(0.5),
      });

      updateDoc(doc(messageRef, qid), {
        answers: arrayUnion({
          id: v4(),
          response: [...answers],
          date: Timestamp.now(),
        }),
      })
        .then(() => {
          let box = document.querySelector("#msg__sent");
          box.style.display = "block";
          box.style.opacity = "1";
          setSent(true);
        })
        .catch((err) => console.error(err));
    }
  };

  let close = () => {
    let box = document.querySelector("#msg__sent");
    box.style.display = "none";
    box.style.opacity = "0";
  };
  return (
    <div className={styles.write}>
      <Header title="Write Anonymously - Redox" />
      <Image
        src="/images-removebg-preview.png"
        alt="logo"
        width={80}
        height={40}
        onClick={() => {
          Router.push("/");
        }}
      />
      {qa === "false" ? (
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            sendmessage();
          }}
        >
          <h3 style={{ margin: "0 auto", textAlign: "center" }}>
            Send an anonymous message (Reply anonymously)
          </h3>
          <label htmlFor="txt">
            Write message
            <textarea
              name="message"
              id="txt"
              cols="30"
              rows="10"
              required
              ref={message}
            ></textarea>
          </label>
          <button type="submit">Send</button>
        </form>
      ) : sent ? (
        <p style={{ textAlign: "center" }}>
          Your answer to the question have been sent.{" "}
          <span
            style={{
              display: "inline-block",
              textDecoration: "underline",
            }}
          >
            <Link href="/">Go to home</Link>
          </span>
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendAnswers();
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Answer anonymous questions (answer anonymously)
          </h3>
          <ol>
            {Object.keys(questions).length > 0 ? (
              questions?.questions.map((q, i) => {
                return <Answer key={i} question={q} index={i} id={q.id} />;
              })
            ) : (
              <p style={{ margin: "0 auto", textAlign: "center" }}>
                Question not available anymore or failed to load. Try refreshing
                after 30secs.{" "}
                <span
                  style={{
                    display: "inline-block",
                    textDecoration: "underline",
                  }}
                >
                  <Link href="/">Go to home</Link>
                </span>
              </p>
            )}
          </ol>
          {Object.keys(questions).length > 0 && (
            <button type="submit">Send</button>
          )}
        </form>
      )}
      <div className={styles.sent} id="msg__sent">
        <span className={styles.close} onClick={close}>
          X
        </span>
        <h3>Sent</h3>
        <div className={styles.circle}>
          <span></span>
        </div>
        <p style={{ wordBreak: "break-word" }}>
          You too can start creating, earning and sharing with just few steps.{" "}
          <Link href="/">Start here</Link>
        </p>
      </div>
    </div>
  );
}

export default Write;
