import React, { useEffect, useState } from "react";
import DashboardNav from "../Components/DashboardNav";
import Message from "../Components/Message";
import styles from "../styles/dashboard.module.css";
import { withPrivate } from "../Hooks/Routes";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import Header from "../Components/Header";
import Image from "next/image";

function Messages({ user }) {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      let userRef = collection(db, "users");

      let messagesRef = collection(doc(userRef, user.uid), "messages");

      let q = query(messagesRef, orderBy("date", "desc"));

      const querySnapshot = await getDocs(q);
      let messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });

      setMessages(messagesData);
    }

    getData();
  }, [user]);

  return (
    <div>
      <DashboardNav />
      <Header title="Messages from Anonymous Sender - Redox" />
      <div className={styles.msg__heading}>
        <h3>Anonymous messages</h3>
        <button>Clear messages</button>
      </div>
      <div className={styles.messages}>
        {messages.length > 0 ? (
          messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>No messages yet.</p>
            <div className={styles.msgs__img}>
              <Image
                src="/undraw_New_message_re_fp03.png"
                width={200}
                height={150}
                alt="messages"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withPrivate(Messages);
