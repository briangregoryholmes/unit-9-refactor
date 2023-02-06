import { useState } from 'react';
import { Link } from 'react-router-dom';

const placeholders = {
  name: 'Give your character a name',
  height: '150',
  hair_color: 'Pink',
  skin_color: 'Ultramarine',
  eye_color: 'Yellow',
  birth_year: '2390',
};

const emptyForm = {
  name: '',
  height: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: '',
};

function CustomCharacter() {
  const [formData, setFormData] = useState(emptyForm);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('../api/characters', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    const data = await response.json();
    console.log(data);

    if (Object.keys(data).length <= 1) throw 'Incorrect shape of response';

    setFormData(emptyForm);
    return data;
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <section className="mainSection customCharContainer">
      <Link to="/" className="backLink">
        <button type="button" className="btnSecondary">
          Back to all characters
        </button>
      </Link>
      <form className="card customizeChar" onSubmit={handleSubmit}>
        <h2>Custom Character Info</h2>
        {Object.keys(formData).map((key) => (
          <CustomInput
            key={key}
            name={key}
            placeholder={placeholders[key]}
            value={formData[key]}
            label={`${key
              .replace('_', ' ')
              .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())}:`}
            onChange={handleInput}
          />
        ))}
        <button type="submit" className="btnMain customCharNickname">
          Create Character
        </button>
      </form>
    </section>
  );
}

function CustomInput({ label, name, value, onChange, placeholder }) {
  return (
    <div className="nicknameFields">
      <label htmlFor={name}>{label}</label>
      <input
        required
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CustomCharacter;
