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
      console.log(data);

      setPerson(data);
    }
    fetchData();
  }, []);

  return (
    <table>
      <caption>PhoneBook!</caption>
      <tbody>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col">Mobile</th>
        </tr>
        {persons.map((i) => (
          <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.first_name}</td>
            <td>{i.last_name}</td>
            <td>{i.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
