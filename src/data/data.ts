import { Potion } from "../interfaces/Potion";

export const potions: Potion[] = [
    {
        id: "potion_001",
        name: "Elixir of Eternal Flame",
        type: "consumable",
        rarity: "legendary",
        effects: {
            primary: {
                attribute: "fireResistance",
            },
        },
        image: "image_1.webp",
    },
    {
        id: "potion_002",
        name: "Essence of Frostbound Will",
        type: "consumable",
        rarity: "legendary",
        effects: {
            primary: {
                attribute: "iceResistance",
            },
        },
        image: "image_2.webp",
    },
    {
        id: "potion_003",
        name: "Elixir of Acolyte Terror",
        type: "consumable",
        rarity: "legendary",
        effects: {
            primary: {
                attribute: "fireResistance",
            },
        },
        image: "image_3.webp",
    },
];