import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

function CharacterCard({ characterData, isFavProp, id, deleteCharacter }) {
  const { name, height, photo, nickname, fav_food, custom } = characterData;
  const [moreInfo, setMoreInfo] = useState();
  const [isFav, setIsFav] = useState(isFavProp);

  async function handleFavoriteClick() {
    setIsFav(!isFav);
    const response = await fetch(`/api/favs/${id}`, {
      method: isFav ? 'DELETE' : 'POST',
    });
    if (!response.ok) {
      setIsFav(!isFav);
      throw new Error('Network response was not ok.');
    }
  }

  async function getDetails() {
    const response = await fetch(`/api/characters/${id}`);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    setMoreInfo(data);
  }

  return (
    <article className="card charCard">
      <div className="charHeadContainer">
        <div>
          <h3 className="charName">{nickname || name}</h3>
          {nickname && (
            <small>
              <em>Original Name: {name}</em>
            </small>
          )}
        </div>
        <span className="favIcon">
          <FAIcon
            onClick={handleFavoriteClick}
            icon={isFav ? solidStar : regStar}
            style={{ color: isFav ? 'goldenrod' : 'lightgray' }}
          />
        </span>
      </div>
      {photo && (
        <figure className="charPhoto">
          <img src={`/assets/${photo}`} alt={`Character ${nickname || name}`} />
        </figure>
      )}
      <ul className="charDetailsList">
        <li className="charDetail">Height: {height} cm</li>
        {moreInfo && (
          <span>
            <li className="charDetail">Birth Year: {moreInfo.birth_year}</li>
            <li className="charDetail">Eye Color: {moreInfo.eye_color}</li>
            <li className="charDetail">Hair Color: {moreInfo.hair_color}</li>
            <li className="charDetail">Skin Color: {moreInfo.skin_color}</li>
          </span>
        )}
        {fav_food && (
          <li className="charDetail">
            <em>Favorite Food: {fav_food}</em>
          </li>
        )}
      </ul>
      <div className="charBtnOptions">
        {!moreInfo && !custom && (
          <button
            type="button"
            className="btnMain charAddlDetailsButton"
            onClick={getDetails}
          >
            Get More Info
          </button>
        )}
        {(id <= 10 || custom) && (
          <Link to={`/characters/${id}`} state={{ character: characterData }}>
            <button
              type="button"
              className="btnSecondary charCustomizeButton"
              style={{ marginTop: `${custom ? '0rem' : '1rem'}` }}
            >
              Customize Character
            </button>
          </Link>
        )}
        {custom && (
          <button
            onClick={() => deleteCharacter(id - 1)}
            className="charDeleteButton"
          >
            Delete Character
          </button>
        )}
      </div>
    </article>
  );
}

export default CharacterCard;
