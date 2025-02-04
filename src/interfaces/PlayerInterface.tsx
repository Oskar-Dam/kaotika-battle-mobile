interface Attributes {
  intelligence: number;
  dexterity: number;
  insanity: number;
  charisma: number;
  constitution: number;
  strength: number;
  hit_points: number;
  resistance: number
}
interface BaseAttributes extends Attributes {}

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
  attributes: Attributes[];
}

interface PlayerInterface {
  attributes: Attributes;
  base_attributes: BaseAttributes;
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
  isBetrayer: boolean;
}

export default PlayerInterface;