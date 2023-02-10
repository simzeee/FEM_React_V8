import { useState, useEffect } from 'react';
import Pet from './Pet';
import useBreedList from './useBreedList';

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal)
  console.log("BREEDS", breeds)

  const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

  useEffect(() => {
    requestPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault();
        requestPets()
      }}>
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name=""
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed('');
            }}
          >
            <option>Please choose an option</option>
            {ANIMALS.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={breeds.length === 0}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option>Please choose an option</option>
            {breeds.map((breed) => {
              return <option key={breed}>{breed}</option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {
        pets.map(pet => (
          <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id}/>
        ))
      }
    </div>
  );
};

export default SearchParams;
