import { useStateValue } from "../Hooks/StateProvider";
import styles from "../styles/write.module.css";
import Options from "./Options";

function Answer({ question, index, id }) {
  let [, dispatch] = useStateValue();

  let updateOption = (value) => {
    if (value) {
      dispatch({
        type: "answers",
        item: {
          id: `2022${index}`,
          answer: { question: question.question, answer: value },
        },
      });
    }
  };
  return (
    <li>
      <h3 className={styles.questions__text}>{question?.question}</h3>
      {question.isText === true ? (
        <input
          type="text"
          name="answer"
          required
          onChange={(e) => {
            dispatch({
              type: "answers",
              item: {
                id: `2022${index}`,
                answer: { question: question.question, answer: e.target.value },
              },
            });
          }}
        />
      ) : (
        <ul className={styles.questions__answers}>
          {question.options.map((_, i) => {
            return (
              <Options
                key={i}
                text={_}
                updateOption={updateOption}
                index={id}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default Answer;
