import { useState } from "react";
import "./App.css";

function App() {
  // Malayalam words with their transliterations
  // Each object has the word in Malayalam, its transliteration, and audio file path
  const [playingId, setPlayingId] = useState(null);
  const [words] = useState([
    {
      id: 1,
      word: "ഞാൻ",
      transliteration: "Njan",
      audio: "/audio/njan.mp3",
    },
    {
      id: 2,
      word: "എന്റെ",
      transliteration: "Ente",
      audio: "/audio/ente.mp3",
    },
    {
      id: 3,
      word: "എനിക്ക്",
      transliteration: "Enikku",
      audio: "/audio/enikku.mp3",
    },
    {
      id: 4,
      word: "ആണ്",
      transliteration: "Aanu",
      audio: "/audio/aanu.mp3",
    },
    {
      id: 5,
      word: "ഉണ്ട്",
      transliteration: "Undu",
      audio: "/audio/undu.mp3",
    },
  ]);

  // Function to play audio
  const playAudio = (audioPath, id) => {
    if (!audioPath) {
      alert("No audio file available for this word");
      return;
    }
    // When you have actual audio files:
    const audio = new Audio(audioPath);
    // Set the playing state when playing starts
    setPlayingId(id);

    // Add event listener to reset playing state when audio completes
    audio.addEventListener("ended", () => {
      setPlayingId(null);
    });

    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
      setPlayingId(null);
    });
  };

  return (
    <div className="container">
      <h1>Malayalam Pronunciation Guide</h1>
      <div className="word-list">
        {words.map((item) => (
          <div key={item.id} className="word-item">
            <div className="word-text">
              <span className="malayalam">{item.word}</span>
              <span className="transliteration">({item.transliteration})</span>
            </div>
            <button
              className={`play-button ${
                playingId === item.id ? "playing" : ""
              }`}
              onClick={() => playAudio(item.audio, item.id)}
              aria-label={`Listen to pronunciation of ${item.transliteration}`}
            >
              {playingId === item.id ? "🔊" : "🔈"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
