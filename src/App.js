import React, { useState } from "react";
import "./App.css"; // 👈 make sure this line is present to include styles

const defaultPrefs = {
  safety: 3,
  rent: 3,
  transport: 3,
  walkability: 3,
  green_areas: 3,
};

function App() {
  const [preferences, setPreferences] = useState(defaultPrefs);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    });

    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="container">
      <h2>🏙️ NeighborFit – Find Your Ideal Neighborhood</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(preferences).map((key) => (
          <div key={key}>
            <label>
              {key.replace("_", " ")}:
              <select name={key} value={preferences[key]} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button type="submit">Get Recommendations</button>
      </form>

      <h3>Top Matches:</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong> ({place.city}) – Score: {place.final_score}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results yet. Submit the form above.</p>
      )}
    </div>
  );
}

export default App;
