export interface PlayerToUpdate {
  _id: string;
  attributes: {
    charisma: number;
    constitution: number;
    dexterity: number;
    insanity: number;
    intelligence: number;
    strength: number;
    resistance: number;
    attack: number;
    hit_points: number;
    defense: number;
    magic_resistance: number;
    CFP: number;
    BCFA: number;
  };
  isBetrayer: boolean;
  totalDamage: number;
}