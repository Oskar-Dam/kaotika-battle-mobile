interface Attributes {
  intelligence: number;
  dexterity: number;
  insanity: number;
  charisma: number;
  constitution: number;
  strength: number;
}

interface Equipment {
  helmet: object;
  weapon: object;
  armor: object;
  shield: object;
  artifact: object;
  boot: object;
  ring: object;
  antidote_potion: object;
  healing_potion: object;
  enhancer_potion: object;
}

interface Inventory {
  antidote_potions: object[];
  healing_potions: object[];
  enhancer_potions: object[];
}

interface Status {
  ethaziumCurse: boolean;
  common_diseases: object[];
  tired: boolean;
}

interface Profile {
  _id: string;
  name: string;
  description: string;
  image: string;
  attributes: any[];
}

interface PlayerInterface {
  attributes: Attributes;
  equipment: Equipment;
  inventory: Inventory;
  status: Status;
  _id: string;
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  level: number;
  profile: Profile;
  role: string;
  resistance: number;
  isBetrayer: Boolean;
}

export default PlayerInterface;