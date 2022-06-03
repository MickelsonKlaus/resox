import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  orderBy,
  query,
} from "firebase/firestore";
import ReactCurrencyFormatter from "react-currency-formatter";
import { useStateValue } from "../Hooks/StateProvider";

function Dashboard({ user }) {
  let [{ userData, latestMessage }, dispatch] = useStateValue();

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      async function getData() {
        let userRef = collection(db, "users");
        let userDoc = doc(userRef, user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          dispatch({ type: "userData", item: { ...docSnap.data() } });
        } else {
          console.log("No such document!");
        }

        let messagesRef = collection(doc(userRef, user.uid), "messages");

        let q = query(messagesRef, orderBy("date", "desc"));

        const querySnapshot = await getDocs(q);
        let messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        if (messagesData.length > 0) {
          let latestMessage = [messagesData[0]];
          dispatch({ type: "latest", item: latestMessage });
        }
      }

      getData();
    }
  }, [user, userData, dispatch]);

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
                  quantity={userData.earnings ? userData?.earnings : 0}
                  currency={"NGN"}
                />
              </h2>
              <Link href="/withdraw">Withdraw</Link>
            </div>
            <div>
              <h5>Anonymous Polls</h5>
              <h2>{userData?.anonymousLength || 0}</h2>
            </div>
            <div>
              <h5>Messages Received</h5>
              <h2>{userData?.messagesLength || 0}</h2>
            </div>
            <div>
              <h5>Referrals</h5>
              <h2>{userData?.referrals || 0}</h2>
            </div>
          </div>
          <p style={{ width: "100%", fontSize: "0.9em" }}>
            Referrals link:{" "}
            <a
              href={`https://resox-m.vercel.app/?referral=true&_uid=${user.uid}`}
              target="_blank"
              style={{
                display: "inline-block",
                color: "#575a89",
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
              rel="noreferrer"
            >
              https://resox-m.vercel.app/?referral=true&amp;_uid=${user.uid}
            </a>
          </p>
        </div>
        <div className={styles.msgs}>
          <h3>Messages</h3>
          {latestMessage.length <= 0 ? (
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
              {latestMessage.map((message) => {
                return <Messages key={message.id} message={message} />;
              })}

              <Link href="/messages">See more</Link>
            </div>
          )}
        </div>
        <div className={styles.recent}>
          <h3>Recent Activities</h3>
          {Object.keys(userData).length <= 0 ||
          userData?.recentActivities.length <= 0 ? (
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
              {userData?.recentActivities.map((activity, i) => {
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
