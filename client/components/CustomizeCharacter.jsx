import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

function CustomizeCharacter() {
  const location = useLocation();
  const { name, nickname, photo, fav_food } = location.state.character;
  const { id } = useParams();
  const [customProps, setCustomProps] = useState({
    nickname,
    fav_food,
  });
  const [newNickname, setNewNickname] = useState('');
  const [newFavFood, setNewFavFood] = useState('');

  const { nickname: currentNickname, fav_food: currentFavFood } = customProps;

  async function handleDelete(e) {
    const { name: property } = e.target;

    const response = await updateStore({
      nickname: property === 'nickname' ? 'delete' : 'keep',
      fav_food: property === 'fav_food' ? 'delete' : 'keep',
    });
    if (response) {
      const newCustomizations = {
        nickname: response.nickname,
        fav_food: response.fav_food,
      };
      setCustomProps(newCustomizations);
    }
  }

  async function saveUpdates() {
    const newCustomizations = {
      nickname: newNickname || 'keep',
      fav_food: newFavFood || 'keep',
    };
    const response = await updateStore(newCustomizations);
    setCustomProps({
      nickname: response.nickname,
      fav_food: response.fav_food,
    });
    setNewNickname('');
    setNewFavFood('');
  }

  async function updateStore(newData) {
    const response = await fetch(`../api/characters/${id - 1}`, {
      method: 'PATCH',
      body: JSON.stringify(newData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) return await response.json();
    throw new Error('Network response was not ok.');
  }

  return (
    <section className="mainSection customCharContainer">
      <Link to="/" className="backLink">
        <button type="button" className="btnSecondary">
          Back to all characters
        </button>
      </Link>
      <article className="card customizeChar">
        <h3>{name}</h3>
        {currentNickname && (
          <p>
            Current Nickname: {currentNickname}{' '}
            <button name="nickname" onClick={handleDelete}>
              x
            </button>
          </p>
        )}
        {currentFavFood && (
          <p>
            Current Favorite Food: {currentFavFood}{' '}
            <button name="fav_food" onClick={handleDelete}>
              x
            </button>
          </p>
        )}
        {photo && (
          <figure className="charPhoto">
            <img src={`/assets/${photo}`} alt={`Character ${name}`} />
          </figure>
        )}
        <div className="nicknameFields">
          <label htmlFor="nickname">{`${
            currentNickname ? 'New' : 'Give this character a'
          } nickname:`}</label>
          <input
            name="nickname"
            placeholder="Honeybun"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </div>
        <div className="nicknameFields">
          <label htmlFor="fav_food">{`${
            currentFavFood ? 'New' : 'Give this character a'
          } favorite food:`}</label>
          <input
            name="fav_food"
            placeholder="Spaghetti"
            value={newFavFood}
            onChange={(e) => setNewFavFood(e.target.value)}
          />
        </div>
        <button
          type="button"
          name="save"
          className="btnMain customCharNickname"
          onClick={saveUpdates}
        >
          Save Customization
        </button>
      </article>
    </section>
  );
}

export default CustomizeCharacter;
