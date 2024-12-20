# Pokémon API Caching Demo <img src="https://media0.giphy.com/media/10LKovKon8DENq/giphy.gif?cid=6c09b95244hkh65cdyfl4c4y3y5s7ggj1lkkxmjptx7wco93&ep=v1_gifs_search&rid=giphy.gif&ct=g" width="60" height="50" style="border-radius: 50%;" />

This project demonstrates caching with Node.js and Valkey, storing data fetched from the Pokémon API in an in-memory cache to improve retrieval times and reduce redundant API calls.

## Overview

The demo uses:
- **Node.js** for backend logic
- **Valkey** (an in-memory caching layer, Redis-compatible) for caching
- **Axios** to fetch data from the [Pokémon API](https://pokeapi.co/)
- **Docker Compose** to set up Valkey in a containerized environment

The cache stores Pokémon data for a specified time (TTL), so repeated requests for the same Pokémon name are served from the cache rather than the API.

## Project Structure

- **pikachu.js**: Main logic for fetching individual Pokémon data, either from cache or from the API.
- **allPokemon.js**: Main logic for fetching all Pokémon data, either from cache or from the API.
- **cache.js**: Utility functions to interact with Valkey/Redis for setting and getting cached data.
- **docker-compose.yml**: Configures Valkey service for in-memory caching.

## Getting Started

```npm install```

Make sure Docker dashboard is running

``` docker-compose up -d ```

``` docker-compose up --build```

Run file to see if it all works 

``` node pikachu.js```

``` node allPokemon.js```


### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 14+)
- **Docker** and **Docker Compose**

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/pokemon-cache-demo.git
   cd pokemon-cache-demo
