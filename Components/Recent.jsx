import styles from "../styles/dashboard.module.css";

function Recent({ activity }) {
  return <li style={{ fontSize: ".9rem" }}>{activity}</li>;
}

export default Recent;
