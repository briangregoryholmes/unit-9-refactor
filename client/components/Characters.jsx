import React, { useEffect, useState, useId } from 'react';
import { Link } from 'react-router-dom';

import CharacterCard from './CharacterCard';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [moreClicked, setMoreClicked] = useState(false);
  const [favs, setFavs] = useState({});

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setFavs(data.favs);
        setCharacters(data.characters);
      });
  }, []);

  async function getMoreCharacters() {
    const resopnse = await fetch('/api/more-characters');
    if (!resopnse.ok) throw new Error('Network response was not ok.');
    const data = await resopnse.json();
    setCharacters([...characters, ...data.moreCharacters]);
    setMoreClicked(true);
  }

  async function deleteCharacter(id) {
    console.log('Deleting', id);
    console.log();
    const response = await fetch(`/api/characters/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    setCharacters(characters.filter((char, index) => index !== id));
    return true;
  }

  return (
    <section className="mainSection">
      <header className="pageHeader">
        <h2>Characters</h2>
      </header>
      <div className="charContainer">
        {characters.map((characterData, index) => {
          const isFav = favs[index + 1] ? true : false;
          return (
            <CharacterCard
              key={`${index}/${characterData.name}`}
              id={index + 1}
              isFavProp={isFav}
              characterData={characterData}
              deleteCharacter={deleteCharacter}
            />
          );
        })}
      </div>
      {!moreClicked && (
        <div className="charactersPageOptions">
          <button
            type="button"
            className="btnSecondary btnLg"
            onClick={getMoreCharacters}
          >
            Get More Characters
          </button>
          <Link to="/custom">
            <button type="button" className="btnSecondary btnLg">
              Add Custom Character
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
export default Characters;
