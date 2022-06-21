const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const {
  getPokemons,
  getPokemonById,
  getPokemonBySearch,
  getTypes,
  addPokemon,
  deletePokemon
} = require("../Controllers/index.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPokemonBySearch, getPokemons);

router.get("/pokemons/:id", getPokemonById);

router.get("/types", getTypes);

router.post("/pokemons", addPokemon);

router.delete('/pokemons/:id', deletePokemon)

module.exports = router;
