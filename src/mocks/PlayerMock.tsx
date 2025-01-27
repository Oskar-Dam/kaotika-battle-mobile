import PlayerInterface from "../interfaces/PlayerInterface";

export const mockPlayer: PlayerInterface = {
  attributes: {
    intelligence: 10,
    dexterity: 10,
    insanity: 10,
    charisma: 10,
    constitution: 10,
    strength: 10,
  },
  equipment: {
    helmet: {},
    weapon: {},
    armor: {},
    shield: {},
    artifact: {},
    boot: {},
    ring: {},
    antidote_potion: {},
    healing_potion: {},
    enhancer_potion: {},
  },
  inventory: {
    antidote_potions: [{}],
    healing_potions: [{}],
    enhancer_potions: [{}],
  },
  status: {
    ethaziumCurse: false,
    common_diseases: [],
    tired: false,
  },
  _id: '1',
  name: 'Sr. Polimorfias',
  nickname: 'Sr. Polimorfias',
  email: 'asier.arguinchona@ikasle.aeg.eus',
  avatar: 'avatar_url',
  level: 21,
  profile: {
    _id: 'profile_1',
    name: 'Sr. Polimorfias',
    description: 'A skilled acolyte',
    image: 'profile_image_url',
    attributes: [],
  },
  role: 'ACOLYTE',
  resistance: 100,
};
