import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");

  const handleFile = (e) => {
    e.preventDefault();

    setUsername(e.target[0].value);

    console.log("Username:", username);
  };

  return (
    <>
      <form onSubmit={handleFile}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
