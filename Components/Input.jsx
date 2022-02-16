function Input({ name, type, Ref = "", handle = () => {}, ml = "0" }) {
  return (
    <label>
      {name}
      <input
        type={type}
        name={name}
        ref={Ref}
        min="0"
        minLength={ml}
        onInput={handle}
        required
      />
    </label>
  );
}

export default Input;
