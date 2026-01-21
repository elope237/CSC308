// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const user = characters[index];

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Delete failed");
        }
        const updated = characters.filter((_, i) => i !== index);
        setCharacters(updated);
      })
      .catch((error) => console.log(error));
  }

  //localhost:8000/users ???
  function fetchUsers() {
    return fetch("http://localhost:3001/users");
  }

  function postUser(person) {
    return fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.log(error));
  }, []);

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("User not created");
        }
        return res.json();
      })
      .then((createdUser) => {
        setCharacters([...characters, createdUser]);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
