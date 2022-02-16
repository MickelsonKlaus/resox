import React from "react";

function Options({ text, updateOption, index = 0 }) {
  return (
    <label htmlFor="">
      <input
        type="radio"
        name={`option${index}`}
        id=""
        value={text}
        onClick={() => {
          updateOption(text);
        }}
      />{" "}
      <span>{text}</span>
    </label>
  );
}

export default Options;
