const axios = require("axios");
const { setCache, getCache } = require("./cache");

// Helper function to fetch data for each Pokémon and cache it
async function getPokemonData(name) {
  const cacheKey = `pokemon:${name}`;
  const start = Date.now();

  // Check cache first
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log(`🟢 ${name}: Retrieved from cache`);
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return cachedData;
  }

  // Fetch data from Pokémon API if not in cache
  try {
    console.log(`🔴 ${name}: Data not in cache. Fetching from API...`);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;

    // Store in cache with a TTL of 1 hour (3600 seconds)
    await setCache(cacheKey, pokemonData, 3600);

    console.log(`🟢 ${name}: Data fetched from API and stored in cache`);
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return null;
  }
}

// Helper function to get all Pokémon names
async function getAllPokemonNames() {
  let allPokemon = [];
  let url = "https://pokeapi.co/api/v2/pokemon?limit=1000"; // Get a large batch of Pokémon names

  while (url) {
    try {
      const response = await axios.get(url);
      allPokemon = [...allPokemon, ...response.data.results.map(pokemon => pokemon.name)];
      url = response.data.next; // Get the URL for the next batch, if any
    } catch (error) {
      console.error("Error fetching Pokémon list", error);
      break;
    }
  }

  return allPokemon;
}

// Main function to fetch data for all Pokémon and cache it
(async () => {
  const allPokemon = await getAllPokemonNames();
  console.log(`Fetched ${allPokemon.length} Pokémon names`);

  // Loop through each Pokémon and fetch/store data
  for (const pokemon of allPokemon) {
    await getPokemonData(pokemon);
  }

  // Exit after processing all Pokémon
  process.exit();
})();
