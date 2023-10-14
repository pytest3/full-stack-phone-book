import React from "react";

export default function ContactForm() {
  const [inputs, setInputs] = React.useState({ name: "", number: "" });

  function handleSubmit(e) {
    e.preventDefault();
    window.alert(JSON.stringify(inputs, null, 4));
    setInputs({ name: "", number: "" });
  }

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Save a new contact</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={inputs.name}
        onChange={handleChange}
      ></input>
      <label htmlFor="number">Number</label>
      <input
        type="number"
        id="number"
        name="number"
        value={inputs.number}
        onChange={handleChange}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
globalThis;
