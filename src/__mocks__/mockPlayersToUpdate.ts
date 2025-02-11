import { PlayerToUpdate } from '../interfaces/PlayerToUpdate';

export const dravokarPlayerToUpdate: PlayerToUpdate = {
  _id: '66decc4ff42d4a193db77e71',
  attributes: {
    charisma: 150,
    constitution: 70,
    dexterity: 25,
    insanity: 100,
    intelligence: 35,
    strength: 20,
    resistance: 110,
    attack: -25,
    hit_points: 40,
    defense: 100,
    magic_resistance: 170,
    CFP: 100,
    BCFA: 120,
  },
  isBetrayer: true,
  totalDamage: 10,
};

export const kaotikaPlayerToUpdate: PlayerToUpdate = {
  _id: '66dec6ab4c27dff822d80066',
  attributes: {
    charisma: 150,
    constitution: 70,
    dexterity: 25,
    insanity: 100,
    intelligence: 35,
    strength: 20,
    resistance: 110,
    attack: -25,
    hit_points: 40,
    defense: 100,
    magic_resistance: 170,
    CFP: 100,
    BCFA: 120,
  },
  isBetrayer: false,
  totalDamage: 10,
};

/*
  COMO FUNCIONA EL TESTEO DE UN 'SETTER'

  mock.calls de Jest almacena un historial de llamadas en forma de ARRAY DE ARRAYS

  setFactionsPlayers.kaotika.mock.calls[0] accede a la PRIMERA LLAMADA

  setFactionsPlayers.kaotika.mock.calls[0][0] accede al PRIMER ARGUMENTO DE LA PRIMERA LLAMADA

  En el caso de updatePlayers.test.ts, la declaración de updateFunction es la que modifica el array

  EJEMPLO:

  Si en la llamada hacemos algo como:

  setFactionsPlayers.kaotika((prevPlayers) => prevPlayers.map(player => ({
    ...player,
    attributes: { ...player.attributes, charisma: 150, constitution: 70 },
  })));

  updateFunction tendría el siguiente valor:

  (prevPlayers) => prevPlayers.map(player => ({
    ...player,
    attributes: { ...player.attributes, charisma: 150, constitution: 70 },
  }));

  Esto se obtiene de la siguiente manera en nuestro test:

  const updateFunction = setFactionsPlayers.dravocar.mock.calls[0][0];

  Luego guardamos el nuevo estado ACTUALIZADO en el updatedPlayers

  const updatedPlayers = updateFunction(initialPlayers); 

*/