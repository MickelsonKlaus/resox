import styles from "../styles/dashboard.module.css";
import { useState } from "react";
import { useStateValue } from "../Hooks/StateProvider";
import Options from "./Options";

function Question({ remove, index }) {
  let [options, setOptions] = useState([]);
  let [isText, setIsText] = useState(true);
  let [num, setNum] = useState(0);
  let [question, setQuestion] = useState("");

  let [, dispatch] = useStateValue();

  let addOption = (e) => {
    let target = e.target;
    setOptions([...options, target.innerText]);
    target.style.display = "none";
    setNum(++num);

    dispatch({
      type: "update",
      item: {
        id: `19032${index}`,
        options: [...options, target.innerText],
        isText,
        question,
      },
    });
  };

  let addExtraOption = (e) => {
    let target = e.target;
    setOptions([...options, target.innerText]);

    dispatch({
      type: "update",
      item: {
        id: `19032${index}`,
        options: [...options, target.innerText],
        isText,
        question,
      },
    });
  };

  return (
    <li>
      <div className={styles.questions__single}>
        <span className={styles.questions__close} onClick={(e) => remove(e)}>
          X
        </span>
        <input
          className={styles.questions__text}
          onChange={(e) => {
            setQuestion(e.target.value);
            dispatch({
              type: "update",
              item: {
                id: `19032${index}`,
                options,
                isText,
                question: e.target.value,
              },
            });
          }}
          required
        />
        <select
          name="options"
          id=""
          onChange={(e) => {
            if (e.target.value === "multiple options") {
              document.querySelector(`#questions_sap${index}`).style.display =
                "block";
              setIsText(false);
              dispatch({
                type: "update",
                item: {
                  id: `19032${index}`,
                  options,
                  isText: false,
                  question: e.target.value,
                },
              });
            } else {
              document.querySelector(`#questions_sap${index}`).style.display =
                "none";
              setIsText(true);
              dispatch({
                type: "update",
                item: {
                  id: `19032${index}`,
                  isText: true,
                  question: e.target.value,
                },
              });
            }
          }}
        >
          <option value="text field">Text field</option>
          <option value="multiple options">Multiple options</option>
        </select>
      </div>
      <div className={styles.qsa} id={`questions_sap${index}`}>
        {num < 3 && (
          <div className={styles.questions__suggestions}>
            Suggestions:
            <span onClick={addOption}>Yes</span>
            <span onClick={addOption}>No</span>
            <span onClick={addOption}>Maybe</span>
          </div>
        )}
        <ul className={styles.questions__answers}>
          {options
            .sort()
            .reverse()
            .map((_, i) => {
              return <Options key={i} text={_} index={i} />;
            })}
          <label htmlFor="">
            <input type="radio" name="answer" id="" />{" "}
            <span
              contentEditable="true"
              className={styles.questions__answers__extra}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  addExtraOption(e);
                  e.target.innerText = "";
                }
              }}
            ></span>
          </label>
        </ul>
      </div>
    </li>
  );
}

export default Question;
