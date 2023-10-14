import React from "react";

// const URL = "http://localhost:3000/api/persons";
const baseURL = "/api/persons";

export default function PhoneBook() {
  const [persons, setPerson] = React.useState([
    { id: 83291831938, name: "charlee", number: "98776588" },
  ]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(baseURL);
      const data = await response.json();
      setPerson(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>PhoneBook!!</h1>
      {persons.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
}
