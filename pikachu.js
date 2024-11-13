const axios = require("axios");
const { setCache, getCache } = require("./cache");

async function getPokemonData(name) {
  const cacheKey = `pokemon:${name}`;
  const start = Date.now();

  // Check cache first
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log("🟢 Retrieved from cache");
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return cachedData;
  }

  // Fetch data from Pokémon API if not in cache
  try {
    console.log("🔴 Data not in cache. Fetching from API...");
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;

    // Store in cache with a TTL of 1 hour (3600 seconds)
    await setCache(cacheKey, pokemonData, 3600);

    console.log("🟢 Data fetched from API and stored in cache");
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return null;
  }
}

// Example usage
(async () => {
  console.log("First call (should fetch from API):");
  await getPokemonData("pikachu");

  console.log("\nSecond call (should retrieve from cache):");
  await getPokemonData("pikachu");

  console.log("\nThird call with different Pokémon (should fetch from API):");
  await getPokemonData("charmander");

  console.log("\nFourth call with Pikachu again (should retrieve from cache):");
  await getPokemonData("pikachu");

  // Exit the process once all operations complete
  process.exit();
})();
