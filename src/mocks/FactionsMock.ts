import { Player } from '../interfaces/Player';

interface FactionsPlayers {
    'dravocar': Player[],
    'kaotika': Player[],
}

export const factions: FactionsPlayers = {
  'dravocar': [
    {
      '_id': '66dec0006301a115d494bd0d',
      'name': 'ASIER ARGUINCHONA LORENZO',
      'nickname': 'Sr. Polimorfias',
      'avatar': 'https://lh3.googleusercontent.com/a/ACg8ocIqIoDtJVejSbjrzV889fEhqGR-ILGc99C0-YgY88b11zuiXfk=s96-c',
      'email': 'asier.arguinchona@ikasle.aeg.eus',
      'level': 21,
      'role': 'acolyte',
      'socketId': 'k-aqkFEM_w6cAip7AABd',
      'isBetrayer': false,
      'profile': {
        'name': 'Juggler'
      },
      'attributes': {
        'charisma': 67,
        'constitution': 58,
        'dexterity': 114,
        'insanity': 49,
        'intelligence': 66,
        'strength': 26,
        'resistance': 100,
        'attack': 1,
        'hit_points': 147,
        'defense': 205,
        'magic_resistance': 133,
        'CFP': 49,
        'BCFA': 75
      },
      'base_attributes': {
        'charisma': 67,
        'constitution': 58,
        'dexterity': 114,
        'insanity': 49,
        'intelligence': 66,
        'strength': 26,
        'resistance': 100,
        'attack': 1,
        'hit_points': 147,
        'defense': 205,
        'magic_resistance': 133,
        'CFP': 49,
        'BCFA': 75
      },
      'equipment': {
        'healing_potion': {
          'modifiers': {
            'hit_points': 40,
            'intelligence': -5,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0754',
          'name': 'Essence of Rejuvenation',
          'description': 'This revitalizing potion restores energy and vitality to the drinker.',
          'type': 'essence',
          'image': '/images/equipment/potions/healing/healing_2.png',
          'value': 10,
          'min_lvl': 1
        },
        'antidote_potion': {
          'modifiers': {
            'hit_points': 0,
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 12,
            'insanity': 0,
            'charisma': 8,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff075e',
          'name': 'Antidote of Frostbane Fever',
          'description': 'A potent concoction brewed from the rare Lumina flowers that only bloom under the full moon. The elixir emits a radiant glow and, when consumed, floods the body with purifying light, banishing the shadows and restoring the natural hue of the skin.',
          'type': 'antidote',
          'image': '/images/equipment/potions/antidote/antidote_1.png',
          'value': 10,
          'recovery_effect': {
            'modifiers': {
              'hit_points': 0,
              'intelligence': 0,
              'dexterity': 0,
              'insanity': 0,
              'charisma': -8,
              'constitution': -12,
              'strength': 0
            },
            '_id': '6693fd5846527d0df5f0efe8',
            'name': 'Frostbane Fever',
            'description': 'A chilling illness that lowers the body temperature drastically, causing frost to form on the skin and organs to freeze.',
            'type': 'illness',
            'antidote_effects': [
              'restore_constitution',
              'lesser_restore_charisma'
            ],
            'poison_effects': [
              'damage_constitution',
              'lesser_damage_charisma'
            ]
          },
          'min_lvl': 1
        },
        'enhancer_potion': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 20,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca135319ea9afdff076b',
          'name': 'Elixir of Madness',
          'description': 'A dangerous brew that plunges the drinker into a frenzy, this potion unleashes chaotic energy.',
          'type': 'elixir',
          'image': '/images/equipment/potions/enhancer/enhancer_2.png',
          'value': 10,
          'duration': 2,
          'min_lvl': 1
        },
        'weapon': {
          'modifiers': {
            'intelligence': 10,
            'dexterity': 12,
            'constitution': 10,
            'insanity': 0,
            'charisma': 5,
            'strength': 0
          },
          '_id': '66fa608285f0d4f8e349dadb',
          'name': 'Sword of the Frosted Veil',
          'description': 'A blade that freezes the air around it.',
          'type': 'weapon',
          'image': '/images/equipment/weapons/sword_76.png',
          'value': 16000,
          'base_percentage': 18,
          'min_lvl': 20,
          'die_faces': 20,
          'die_modifier': 2,
          'die_num': 5,
          'isUnique': true,
          'isActive': false
        }
      },
      'inventory': {
        'healing_potions': [],
        'antidote_potions': [],
        'enhancer_potions': []
      },
      'status': {
        'ethaziumCurse': false,
        'common_diseases': [],
        'tired': false
      }
    }
  ],
  'kaotika': [
    {
      '_id': '66deb3668bf95849f32ef444',
      'name': 'JON PAZOS HIDALGO',
      'nickname': 'PAZUS-DESPISTADUS',
      'avatar': 'https://lh3.googleusercontent.com/a/ACg8ocKv9Y5Dz6QO2KJ95C7L8eJibPF_rngDcF8nW3c66uWH363Yslw=s96-c',
      'email': 'jon.pazos@ikasle.aeg.eus',
      'level': 17,
      'role': 'acolyte',
      'socketId': 'dNng3T9InLpvRzfxAABb',
      'isBetrayer': true,
      'profile': {
        'name': 'Bumbler'
      },
      'attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'base_attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'equipment': {
        'healing_potion': {
          'modifiers': {
            'hit_points': 70,
            'intelligence': -15,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0759',
          'name': 'Essence of Restoration',
          'description': 'The Essence of Restoration is a potent elixir that accelerates healing and revitalizes the body.',
          'type': 'essence',
          'image': '/images/equipment/potions/healing/healing_3.png',
          'value': 10,
          'min_lvl': 1
        },
        'antidote_potion': {
          'modifiers': {
            'hit_points': 0,
            'intelligence': 10,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0761',
          'name': 'Antidote of Ethereal Consumption',
          'description': 'A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.',
          'type': 'antidote',
          'image': '/images/equipment/potions/antidote/antidote_2.png',
          'value': 10,
          'recovery_effect': {
            'modifiers': {
              'hit_points': 0,
              'intelligence': -10,
              'dexterity': 0,
              'insanity': 6,
              'charisma': 0,
              'constitution': 0,
              'strength': 0
            },
            '_id': '6693fd5846527d0df5f0efeb',
            'name': 'Ethereal Consumption',
            'description': 'A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.',
            'type': 'illness',
            'antidote_effects': [
              'restore_intelligence',
              'lesser_restore_insanity'
            ],
            'poison_effects': [
              'damage_intelligence',
              'lesser_damage_insanity'
            ]
          },
          'min_lvl': 1
        },
        'enhancer_potion': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 20,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca135319ea9afdff076f',
          'name': 'Elixir of Increase Constitution',
          'description': 'This hearty elixir enhances the drinker\'s physical resilience and endurance.',
          'type': 'elixir',
          'image': '/images/equipment/potions/enhancer/enhancer_3.png',
          'value': 10,
          'duration': 2,
          'min_lvl': 1
        },
        'weapon': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 5,
            'insanity': 30,
            'charisma': 10,
            'strength': 0
          },
          '_id': '67616050317c38e05431c530',
          'name': 'Dagger of Venomous Promises',
          'description': 'A poisoned blade that cuts through both flesh and trust.',
          'type': 'weapon',
          'image': '/images/betrayar/weapon.png',
          'value': 60,
          'base_percentage': 40,
          'min_lvl': 2,
          'die_faces': 100,
          'die_modifier': 0,
          'die_num': 1,
          'isUnique': true,
          'isActive': false
        }
      },
      'inventory': {
        'healing_potions': [],
        'antidote_potions': [],
        'enhancer_potions': []
      },
      'status': {
        'ethaziumCurse': false,
        'common_diseases': [],
        'tired': false
      }
    },
    {
      '_id': '66deb3668bf95849f32ef444',
      'name': 'JON PAZOS HIDALGO',
      'nickname': 'PAZUS-DESPISTADUS',
      'avatar': 'https://lh3.googleusercontent.com/a/ACg8ocKv9Y5Dz6QO2KJ95C7L8eJibPF_rngDcF8nW3c66uWH363Yslw=s96-c',
      'email': 'jon.pazos@ikasle.aeg.eus',
      'level': 17,
      'role': 'acolyte',
      'socketId': '',
      'isBetrayer': true,
      'profile': {
        'name': 'Bumbler'
      },
      'attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'base_attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'equipment': {
        'healing_potion': {
          'modifiers': {
            'hit_points': 70,
            'intelligence': -15,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0759',
          'name': 'Essence of Restoration',
          'description': 'The Essence of Restoration is a potent elixir that accelerates healing and revitalizes the body.',
          'type': 'essence',
          'image': '/images/equipment/potions/healing/healing_3.png',
          'value': 10,
          'min_lvl': 1
        },
        'antidote_potion': {
          'modifiers': {
            'hit_points': 0,
            'intelligence': 10,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0761',
          'name': 'Antidote of Ethereal Consumption',
          'description': 'A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.',
          'type': 'antidote',
          'image': '/images/equipment/potions/antidote/antidote_2.png',
          'value': 10,
          'recovery_effect': {
            'modifiers': {
              'hit_points': 0,
              'intelligence': -10,
              'dexterity': 0,
              'insanity': 6,
              'charisma': 0,
              'constitution': 0,
              'strength': 0
            },
            '_id': '6693fd5846527d0df5f0efeb',
            'name': 'Ethereal Consumption',
            'description': 'A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.',
            'type': 'illness',
            'antidote_effects': [
              'restore_intelligence',
              'lesser_restore_insanity'
            ],
            'poison_effects': [
              'damage_intelligence',
              'lesser_damage_insanity'
            ]
          },
          'min_lvl': 1
        },
        'enhancer_potion': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 20,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca135319ea9afdff076f',
          'name': 'Elixir of Increase Constitution',
          'description': 'This hearty elixir enhances the drinker\'s physical resilience and endurance.',
          'type': 'elixir',
          'image': '/images/equipment/potions/enhancer/enhancer_3.png',
          'value': 10,
          'duration': 2,
          'min_lvl': 1
        },
        'weapon': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 5,
            'insanity': 30,
            'charisma': 10,
            'strength': 0
          },
          '_id': '67616050317c38e05431c530',
          'name': 'Dagger of Venomous Promises',
          'description': 'A poisoned blade that cuts through both flesh and trust.',
          'type': 'weapon',
          'image': '/images/betrayar/weapon.png',
          'value': 60,
          'base_percentage': 40,
          'min_lvl': 2,
          'die_faces': 100,
          'die_modifier': 0,
          'die_num': 1,
          'isUnique': true,
          'isActive': false
        }
      },
      'inventory': {
        'healing_potions': [],
        'antidote_potions': [],
        'enhancer_potions': []
      },
      'status': {
        'ethaziumCurse': false,
        'common_diseases': [],
        'tired': false
      }
    },
    {
      '_id': '66deb3668bf95849f32ef444',
      'name': 'JON PAZOS HIDALGO',
      'nickname': 'PAZUS-DESPISTADUS',
      'avatar': 'https://lh3.googleusercontent.com/a/ACg8ocKv9Y5Dz6QO2KJ95C7L8eJibPF_rngDcF8nW3c66uWH363Yslw=s96-c',
      'email': 'jon.pazos@ikasle.aeg.eus',
      'level': 17,
      'role': 'acolyte',
      'socketId': '',
      'isBetrayer': true,
      'profile': {
        'name': 'Bumbler'
      },
      'attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'base_attributes': {
        'charisma': 81,
        'constitution': 102,
        'dexterity': 17,
        'insanity': 80,
        'intelligence': 8,
        'strength': 62,
        'resistance': 100,
        'attack': 22,
        'hit_points': 79,
        'defense': 123,
        'magic_resistance': 89,
        'CFP': 80,
        'BCFA': 142
      },
      'equipment': {
        'healing_potion': {
          'modifiers': {
            'hit_points': 70,
            'intelligence': -15,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0759',
          'name': 'Essence of Restoration',
          'description': 'The Essence of Restoration is a potent elixir that accelerates healing and revitalizes the body.',
          'type': 'essence',
          'image': '/images/equipment/potions/healing/healing_3.png',
          'value': 10,
          'min_lvl': 1
        },
        'antidote_potion': {
          'modifiers': {
            'hit_points': 0,
            'intelligence': 10,
            'dexterity': 0,
            'constitution': 0,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca125319ea9afdff0761',
          'name': 'Antidote of Ethereal Consumption',
          'description': 'A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.',
          'type': 'antidote',
          'image': '/images/equipment/potions/antidote/antidote_2.png',
          'value': 10,
          'recovery_effect': {
            'modifiers': {
              'hit_points': 0,
              'intelligence': -10,
              'dexterity': 0,
              'insanity': 6,
              'charisma': 0,
              'constitution': 0,
              'strength': 0
            },
            '_id': '6693fd5846527d0df5f0efeb',
            'name': 'Ethereal Consumption',
            'description': 'A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.',
            'type': 'illness',
            'antidote_effects': [
              'restore_intelligence',
              'lesser_restore_insanity'
            ],
            'poison_effects': [
              'damage_intelligence',
              'lesser_damage_insanity'
            ]
          },
          'min_lvl': 1
        },
        'enhancer_potion': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 20,
            'insanity': 0,
            'charisma': 0,
            'strength': 0
          },
          '_id': '668bca135319ea9afdff076f',
          'name': 'Elixir of Increase Constitution',
          'description': 'This hearty elixir enhances the drinker\'s physical resilience and endurance.',
          'type': 'elixir',
          'image': '/images/equipment/potions/enhancer/enhancer_3.png',
          'value': 10,
          'duration': 2,
          'min_lvl': 1
        },
        'weapon': {
          'modifiers': {
            'intelligence': 0,
            'dexterity': 0,
            'constitution': 5,
            'insanity': 30,
            'charisma': 10,
            'strength': 0
          },
          '_id': '67616050317c38e05431c530',
          'name': 'Dagger of Venomous Promises',
          'description': 'A poisoned blade that cuts through both flesh and trust.',
          'type': 'weapon',
          'image': '/images/betrayar/weapon.png',
          'value': 60,
          'base_percentage': 40,
          'min_lvl': 2,
          'die_faces': 100,
          'die_modifier': 0,
          'die_num': 1,
          'isUnique': true,
          'isActive': false
        }
      },
      'inventory': {
        'healing_potions': [],
        'antidote_potions': [],
        'enhancer_potions': []
      },
      'status': {
        'ethaziumCurse': false,
        'common_diseases': [],
        'tired': false
      }
    }
  ]
};