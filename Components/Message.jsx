import styles from "../styles/dashboard.module.css";

function Message({ message }) {
  const dateFunc = (date) => {
    let current = new Date().getDate();
    if (date.getDate() === current) {
      return "Today";
    } else if (date.getDate() + 1 === current) {
      return "Yesterday";
    } else {
      return `${date.toString()}`;
    }
  };
  return (
    <div className={styles.msg}>
      <span className={styles.ball}></span>
      <h4>{dateFunc(new Date(message?.date.toDate().toString()))}</h4>
      <div className={styles.msg__single}>
        {message.isQuestion
          ? message?.messages.map((_, i) => {
              return (
                <div key={i} className={styles.single}>
                  <input
                    type="checkbox"
                    name="box"
                    id=""
                    className={styles.single__checkbox}
                  />
                  <span>
                    <h5>Message from anonymous sender</h5>
                    <p style={{ fontSize: ".6em" }}>
                      {_.date.toDate().toString()}
                    </p>
                  </span>

                  <p className={styles.single__text}>
                    <span>
                      <b>Message: </b>
                    </span>
                    {_.message}
                  </p>
                </div>
              );
            })
          : message?.answers.map((_, i) => {
              return (
                <div key={i} className={styles.single}>
                  <input
                    type="checkbox"
                    name="box"
                    id=""
                    className={styles.single__checkbox}
                  />
                  <span>
                    <h5>Answers from anonymous sender</h5>
                    <p style={{ fontSize: ".6em" }}>
                      {_.date.toDate().toString()}
                    </p>
                  </span>
                  {_.response.map((ans, id) => {
                    return (
                      <p className={styles.single__text} key={id}>
                        <span style={{ display: "block" }}>
                          <b>
                            Question {id + 1}: {ans.answer.question}
                          </b>
                        </span>
                        {ans.answer.answer}
                      </p>
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Message;
