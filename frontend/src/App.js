import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Loading...");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response || data.error);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1>OpenAI Prompt</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <strong>Response:</strong>
        <div>{response}</div>
      </div>
    </div>
  );
}

export default App;