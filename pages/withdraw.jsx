import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Lsg.module.css";
import Input from "../Components/Input";
import { useRef } from "react";
import Header from "../Components/Header";
import { withPrivate } from "../Hooks/Routes";
import ReactCurrencyFormatter from "react-currency-formatter";
import { useStateValue } from "../Hooks/StateProvider";

function Withdraw({ user }) {
  let router = useRouter();
  let accountName = useRef("");
  let accountNumber = useRef("");
  let bank = useRef("");
  let amount = useRef("");
  let [{ earnings }] = useStateValue();
  console.log(earnings);

  return (
    <div className={styles.lg}>
      <Header title="Withdraw your Redox earnings" />
      <Image
        src="/images-removebg-preview.png"
        alt="logo"
        width={80}
        height={40}
        onClick={() => {
          router.push("/");
        }}
        className={styles.logo}
      />
      <div className={styles.lg__dv}>
        <div>
          <Image
            src="/undraw_wallet_aym5.png"
            width={600}
            height={500}
            alt="login"
          />
        </div>
        <div>
          <form
            className={styles.lg__form}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3>Payment Details</h3>
            <p>
              NB: Minimium withdrawal is{" "}
              <ReactCurrencyFormatter quantity={500} currency={"NGN"} />.
            </p>
            {/* <p className={styles.err}></p> */}
            <Input name="account name" type="text" Ref={accountName} />
            <Input name="account number" type="text" Ref={accountNumber} />
            <label htmlFor="bnk">
              Bank
              <select name="bank" id="bnk" Ref={bank}></select>
            </label>
            <Input name="amount" type="number" Ref={amount} />
            <button
              type="submit"
              disabled={earnings >= 500 ? false : true}
              style={{
                opacity: earnings >= 500 ? "1" : "0.5",
                cursor: earnings >= 500 ? "pointer" : "default",
              }}
            >
              Request withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withPrivate(Withdraw);
