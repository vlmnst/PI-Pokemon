const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

//img: sprites.other.dream_world.front_default
//height = altura
//weight = peso

const getPokemons = async (req, res) => {
  try {
    let json = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    let array = json.data.results;
    let promises = array.map(async (e) => {
      const info = await axios.get(e.url);
      return {
        id: info.data.id,
        name: info.data.name,
        types: info.data.types.map((t) => t.type.name),
        image: info.data.sprites.other.dream_world.front_default,
        attack: info.data.stats[1].base_stat,
      };
    });
    const result = await Promise.all(promises);
    //--database
    const database = await Pokemon.findAll({ include: Type });
    console.log(database);
    const resDatabase = database.map((info) => {
      return {
        id: info.dataValues.id,
        name: info.dataValues.name,
        types: info.dataValues.types.map((t) => t.name),
        image: info.dataValues.image,
        attack: info.dataValues.attack
      };
    });
    let concat = [...result, ...resDatabase];
    //console.log(resDatabase);
    //console.log(concat);
    return res.json(concat);
  } catch (error) {
    console.log(error);
  }
};

const getPokemonBySearch = async (req, res, next) => {
  let { name } = req.query;
  if (name) {
    try {
      let pokeFind = await Pokemon.findAll({
        where: { name: name.toLowerCase() },
        include: Type,
      });
      //console.log(pokeFind)
      if (pokeFind.length > 0){
        const pokeDb = pokeFind.map((info) => {
          return {
            id: info.dataValues.id,
            name: info.dataValues.name,
            types: info.dataValues.types.map((t) => t.name),
            image: info.dataValues.image,
            attack: info.dataValues.attack
          };
        });
        //console.log(pokeDb)
        return res.json(pokeDb);
      } 
      
   
      const URL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
      const { data } = await axios.get(`${URL}`);
      let elPokemon;
      
      
      
      if (data) {
        elPokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          types: data.types.map((t) => t.type.name),
        };
        return res.json([elPokemon]);
      }
      
    } catch (error) {
      return res.status(404).send({ error: error });
    }
  }
  console.log("salí");
  next();
};

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && id.length < 16) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      const { data } = await axios.get(`${URL}`);
      const { name, sprites, types, weight, height, stats } = data;
      //Estadísticas (vida0, ataque1, defensa2, velocidad5, ) --> peso imagen, nombre y tipos y id Altura
      let detailPokemon = {
        id: id,
        name: name,
        image: sprites.other.dream_world.front_default,
        types: types.map(
          (cadaType) => (cadaType.type.name + ' ')
        ),
        weight: weight,
        height: height,
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
      };
      return res.json(detailPokemon);
    }

    if (id && id.length > 10) {
      const pokedb = await Pokemon.findByPk(id);
      return res.json(pokedb);
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

const getTypes = async (req, res) => {
  try {
    let URL = "https://pokeapi.co/api/v2/type";
    const { data } = await axios.get(`${URL}`);
    let types = data.results;
    await types.map(async (result) => {
      const [type, created] = await Type.findOrCreate({
        where: { name: result.name },
        defaults: {
          name: result.name,
        },
      });
      if (created) console.log(type.name);
    });
    const allTypes = await Type.findAll();
    return res.json(allTypes);
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

const addPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  if (
    name &&
    image &&
    defense &&
    speed &&
    hp &&
    height &&
    attack &&
    weight &&
    types
  ) {
    try {
      const newPokemon = await Pokemon.create({
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        image: image,
      });
      let typeDb = await Type.findAll({ where: { name: types } });
      await newPokemon.addType(typeDb);
      //console.log(newPokemon)
      const database = await Pokemon.findAll({ where:{name:name}, include: Type });
    //console.log(database);
      const resDatabase = database.map((info) => {
      return {
        id: info.dataValues.id,
        name: info.dataValues.name,
        types: info.dataValues.types.map((t) => t.name),
        image: info.dataValues.image,
        attack: info.dataValues.attack
      };
    });
      return res.json(resDatabase);
    } catch (error) {
      return res.status(422).json({ error: error });
    }
  } else {
    return res.status(500).json({ error: "Faltó algún dato" });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params
  try {
    //console.log(id)
    await Pokemon.destroy({
      where: {
        id: id
      },
      force: true
    });
    return(id)
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonBySearch,
  getTypes,
  addPokemon,
  deletePokemon
};
