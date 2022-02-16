import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/Link";
import DashboardNav from "../Components/DashboardNav";
import Header from "../Components/Header";
import styles from "../styles/dashboard.module.css";
import Messages from "../Components/Message";
import Recent from "../Components/Recent";
import { withPrivate } from "../Hooks/Routes";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import ReactCurrencyFormatter from "react-currency-formatter";
import { useStateValue } from "../Hooks/StateProvider";

function Dashboard({ user }) {
  let [, dispatch] = useStateValue();
  let [data, setData] = useState({});
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      let userRef = collection(db, "users");
      let userDoc = doc(userRef, user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setData({ ...docSnap.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      dispatch({
        type: "earnings",
        item: data?.earnings || 0,
      });

      let messagesRef = collection(doc(userRef, user.uid), "messages");

      let q = query(messagesRef, limit(1), orderBy("date"));

      const querySnapshot = await getDocs(q);
      let messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });

      setMessages(messagesData);
    }

    getData();
  }, [user, data, dispatch]);

  return (
    <div>
      <DashboardNav />
      <Header title="Dashboard - Redox" />
      <div className={styles.dashboard}>
        <div>
          <h1>Welcome {user.email.split("@")[0]}</h1>

          <div className={styles.dashboard__card}>
            <div>
              <h5>Earnings</h5>
              <h2>
                <ReactCurrencyFormatter
                  quantity={data?.earnings ? data?.earnings : 0}
                  currency={"NGN"}
                />
              </h2>
              <Link href="/withdraw">Withdraw</Link>
            </div>
            <div>
              <h5>Anonymous Polls</h5>
              <h2>{data?.anonymousLength || 0}</h2>
            </div>
            <div>
              <h5>Messages Received</h5>
              <h2>{data?.messagesLength || 0}</h2>
            </div>
            <div>
              <h5>Referrals</h5>
              <h2>{data?.referrals || 0}</h2>
            </div>
          </div>
          <p style={{ width: "100%", fontSize: "0.9em" }}>
            Referrals link:{" "}
            <a
              href={`http://localhost:3000/?referral=true&_uid=${user.uid}`}
              target="_blank"
              style={{
                display: "inline-block",
                color: "#575a89",
                maxWidth: "100%",
              }}
              rel="noreferrer"
            >
              http://localhost:3000/?referral=true&amp;_uid=${user.uid}
            </a>
          </p>
        </div>
        <div className={styles.msgs}>
          <h3>Messages</h3>
          {messages.length <= 0 ? (
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
          ) : (
            <div style={{ paddingLeft: "15px" }}>
              {messages.map((message) => {
                return <Messages key={message.id} message={message} />;
              })}

              <Link href="/messages">See more</Link>
            </div>
          )}
        </div>
        <div className={styles.recent}>
          <h3>Recent Activities</h3>
          {Object.keys(data).length <= 0 ||
          data?.recentActivities.length <= 0 ? (
            <div>
              <p style={{ textAlign: "center" }}>No activity recorded yet.</p>
              <div className={styles.recent__img}>
                <Image
                  src="/undraw_Messaging_fun_re_vic9.png"
                  width={200}
                  height={150}
                  alt="recent activities"
                />
              </div>
            </div>
          ) : (
            <ul className={styles.rct}>
              {data?.recentActivities.map((activity, i) => {
                return <Recent key={i} activity={activity} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default withPrivate(Dashboard);
