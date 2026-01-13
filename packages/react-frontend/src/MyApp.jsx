// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring actress" },
    { name: "Dennis", job: "Bartender" },
  ]);

  function removeOneCharacter(index) {
    // Best practice: use a functional update so we always use the latest state
    setCharacters((prevCharacters) =>
      prevCharacters.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}

export default MyApp;
