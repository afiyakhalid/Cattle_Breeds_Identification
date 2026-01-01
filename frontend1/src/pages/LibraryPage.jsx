import React, { useState, useEffect } from "react";

const LibraryPage = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/breeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-6">Breed Library</h2>
      <ul>
        {breeds.map((breed) => (
          <li key={breed.id} className="mb-4 p-2 bg-blue-100 rounded shadow">
            <h3>{breed.name}</h3>
            <p>{breed.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryPage;