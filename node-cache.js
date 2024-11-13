const axios = require("axios");
const NodeCache = require("node-cache");

// Create a new cache instance with a default TTL (Time to Live) of 1 hour
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Helper function to fetch data for Pikachu and cache it
async function getPikachuData() {
  const cacheKey = "pokemon:pikachu";
  const start = Date.now();

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`🟢 Pikachu: Retrieved from cache`);
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return cachedData;
  }

  // Fetch data from Pokémon API if not in cache
  try {
    console.log(`🔴 Pikachu: Data not in cache. Fetching from API...`);
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemonData = response.data;

    // Store in cache with a TTL of 1 hour (3600 seconds)
    cache.set(cacheKey, pokemonData);

    console.log(`🟢 Pikachu: Data fetched from API and stored in cache`);
    console.log(`⏱️ Time taken: ${Date.now() - start} ms`);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return null;
  }
}

// Main function to fetch Pikachu data and cache it
(async () => {
  await getPikachuData();
  await getPikachuData();
  await getPikachuData();
  await getPikachuData();
  await getPikachuData();
  await getPikachuData();
  await getPikachuData();

  // Exit after processing
  process.exit();
})();
