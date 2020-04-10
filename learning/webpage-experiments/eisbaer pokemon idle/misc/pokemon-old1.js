var data_pokemon = [
    {
        "id": 1,
        "name": "Bulbasaur",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
                "trigger": {
                    "type": "level",
                    "value": "16"
                },
                "result": 2
            }
        ],
        "power": 57,
        "base-hp": 45,
        "locations": [
            {
                "id": 1,
                "method": "gift",
                "min-lv": 5,
                "max-lv": 5
            },
            {
                "id": -1,
                "method": "trade",
                "min-lv": 5,
                "max-lv": 5
            }
        ]
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
                "trigger": {
                    "type": "level",
                    "value": "32"
                },
                "result": 3
            }
        ],
        "power": 71.25,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 3,
        "name": "Venusaur",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [],
        "power": 91.25,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 4,
        "name": "Charmander",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "16"
            },
            "result": 5
            }
        ],
        "power": 51.25,
        "base-hp": 39,
        "locations": []
        },
        {
        "id": 5,
        "name": "Charmeleon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "36"
            },
            "result": 6
            }
        ],
        "power": 66.75,
        "base-hp": 58,
        "locations": []
        },
        {
        "id": 6,
        "name": "Charizard",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
        "type-1": "fire",
        "type-2": "flying",
        "evolution": [],
        "power": 89,
        "base-hp": 78,
        "locations": []
        },
        {
        "id": 7,
        "name": "Squirtle",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "16"
            },
            "result": 8
            }
        ],
        "power": 56.75,
        "base-hp": 44,
        "locations": []
        },
        {
        "id": 8,
        "name": "Wartortle",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "36"
            },
            "result": 9
            }
        ],
        "power": 72,
        "base-hp": 59,
        "locations": []
        },
        {
        "id": 9,
        "name": "Blastoise",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 93.25,
        "base-hp": 79,
        "locations": []
        },
        {
        "id": 10,
        "name": "Caterpie",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png",
        "type-1": "bug",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "7"
            },
            "result": 11
            }
        ],
        "power": 26.25,
        "base-hp": 45,
        "locations": []
        },
        {
        "id": 11,
        "name": "Metapod",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/11.png",
        "type-1": "bug",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "10"
            },
            "result": 12
            }
        ],
        "power": 31.25,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 12,
        "name": "Butterfree",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/12.png",
        "type-1": "bug",
        "type-2": "flying",
        "evolution": [],
        "power": 66.25,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 13,
        "name": "Weedle",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/13.png",
        "type-1": "bug",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "7"
            },
            "result": 14
            }
        ],
        "power": 26.25,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 14,
        "name": "Kakuna",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/14.png",
        "type-1": "bug",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "10"
            },
            "result": 15
            }
        ],
        "power": 31.25,
        "base-hp": 45,
        "locations": []
        },
        {
        "id": 15,
        "name": "Beedrill",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/15.png",
        "type-1": "bug",
        "type-2": "poison",
        "evolution": [],
        "power": 63.75,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 16,
        "name": "Pidgey",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/16.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "18"
            },
            "result": 17
            }
        ],
        "power": 38.75,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 17,
        "name": "Pidgeotto",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/17.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "36"
            },
            "result": 18
            }
        ],
        "power": 53.75,
        "base-hp": 63,
        "locations": []
        },
        {
        "id": 18,
        "name": "Pidgeot",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/18.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [],
        "power": 73.75,
        "base-hp": 83,
        "locations": []
        },
        {
        "id": 19,
        "name": "Rattata",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/19.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "20"
            },
            "result": 20
            }
        ],
        "power": 37.75,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 20,
        "name": "Raticate",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/20.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 65.25,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 21,
        "name": "Spearow",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/21.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "20"
            },
            "result": 22
            }
        ],
        "power": 38,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 22,
        "name": "Fearow",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/22.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [],
        "power": 69.25,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 23,
        "name": "Ekans",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/23.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "22"
            },
            "result": 24
            }
        ],
        "power": 49.5,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 24,
        "name": "Arbok",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/24.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [],
        "power": 77,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 25,
        "name": "Pikachu",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "thunder"
            },
            "result": 26
            }
        ],
        "power": 48.75,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 26,
        "name": "Raichu",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/26.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [],
        "power": 78.75,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 27,
        "name": "Sandshrew",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/27.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "22"
            },
            "result": 28
            }
        ],
        "power": 52.5,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 28,
        "name": "Sandslash",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/28.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [],
        "power": 77.5,
        "base-hp": 75,
        "locations": []
        },
        {
        "id": 29,
        "name": "Nidoran-f",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/29.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "16"
            },
            "result": 30
            }
        ],
        "power": 44.75,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 30,
        "name": "Nidorina",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/30.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "moon"
            },
            "result": 31
            }
        ],
        "power": 59.75,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 31,
        "name": "Nidoqueen",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/31.png",
        "type-1": "poison",
        "type-2": "ground",
        "evolution": [],
        "power": 84.75,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 32,
        "name": "Nidoran-m",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/32.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "16"
            },
            "result": 33
            }
        ],
        "power": 44.25,
        "base-hp": 46,
        "locations": []
        },
        {
        "id": 33,
        "name": "Nidorino",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/33.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "moon"
            },
            "result": 34
            }
        ],
        "power": 59.75,
        "base-hp": 61,
        "locations": []
        },
        {
        "id": 34,
        "name": "Nidoking",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/34.png",
        "type-1": "poison",
        "type-2": "ground",
        "evolution": [],
        "power": 84.75,
        "base-hp": 81,
        "locations": []
        },
        {
        "id": 35,
        "name": "Clefairy",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "moon"
            },
            "result": 36
            }
        ],
        "power": 54.5,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 36,
        "name": "Clefable",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/36.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 82,
        "base-hp": 95,
        "locations": []
        },
        {
        "id": 37,
        "name": "Vulpix",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/37.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "fire"
            },
            "result": 38
            }
        ],
        "power": 49,
        "base-hp": 38,
        "locations": []
        },
        {
        "id": 38,
        "name": "Ninetales",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/38.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [],
        "power": 83,
        "base-hp": 73,
        "locations": []
        },
        {
        "id": 39,
        "name": "Jigglypuff",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/39.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "moon"
            },
            "result": 40
            }
        ],
        "power": 33.75,
        "base-hp": 115,
        "locations": []
        },
        {
        "id": 40,
        "name": "Wigglytuff",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/40.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 62.5,
        "base-hp": 140,
        "locations": []
        },
        {
        "id": 41,
        "name": "Zubat",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/41.png",
        "type-1": "poison",
        "type-2": "flying",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "22"
            },
            "result": 42
            }
        ],
        "power": 37.5,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 42,
        "name": "Golbat",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/42.png",
        "type-1": "poison",
        "type-2": "flying",
        "evolution": [],
        "power": 72.5,
        "base-hp": 75,
        "locations": []
        },
        {
        "id": 43,
        "name": "Oddish",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/43.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "21"
            },
            "result": 44
            }
        ],
        "power": 61.25,
        "base-hp": 45,
        "locations": []
        },
        {
        "id": 44,
        "name": "Gloom",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/44.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "leaf"
            },
            "result": 45
            }
        ],
        "power": 73.75,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 45,
        "name": "Vileplume",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/45.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [],
        "power": 91.25,
        "base-hp": 75,
        "locations": []
        },
        {
        "id": 46,
        "name": "Paras",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/46.png",
        "type-1": "bug",
        "type-2": "grass",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "24"
            },
            "result": 47
            }
        ],
        "power": 56.25,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 47,
        "name": "Parasect",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/47.png",
        "type-1": "bug",
        "type-2": "grass",
        "evolution": [],
        "power": 78.75,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 48,
        "name": "Venonat",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/48.png",
        "type-1": "bug",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "31"
            },
            "result": 49
            }
        ],
        "power": 50,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 49,
        "name": "Venomoth",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/49.png",
        "type-1": "bug",
        "type-2": "poison",
        "evolution": [],
        "power": 72.5,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 50,
        "name": "Diglett",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/50.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "26"
            },
            "result": 51
            }
        ],
        "power": 40,
        "base-hp": 10,
        "locations": []
        },
        {
        "id": 51,
        "name": "Dugtrio",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/51.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [],
        "power": 67.5,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 52,
        "name": "Meowth",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/52.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "28"
            },
            "result": 53
            }
        ],
        "power": 40,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 53,
        "name": "Persian",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/53.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 65,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 54,
        "name": "Psyduck",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "33"
            },
            "result": 55
            }
        ],
        "power": 53.75,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 55,
        "name": "Golduck",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/55.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 83.75,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 56,
        "name": "Mankey",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/56.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "28"
            },
            "result": 57
            }
        ],
        "power": 48.75,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 57,
        "name": "Primeape",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/57.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [],
        "power": 73.75,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 58,
        "name": "Growlithe",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/58.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "fire"
            },
            "result": 59
            }
        ],
        "power": 58.75,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 59,
        "name": "Arcanine",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/59.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [],
        "power": 92.5,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 60,
        "name": "Poliwag",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/60.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "25"
            },
            "result": 61
            }
        ],
        "power": 42.5,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 61,
        "name": "Poliwhirl",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/61.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "water"
            },
            "result": 62
            }
        ],
        "power": 57.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 62,
        "name": "Poliwrath",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/62.png",
        "type-1": "water",
        "type-2": "fighting",
        "evolution": [],
        "power": 87.5,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 63,
        "name": "Abra",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/63.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "16"
            },
            "result": 64
            }
        ],
        "power": 48.75,
        "base-hp": 25,
        "locations": []
        },
        {
        "id": 64,
        "name": "Kadabra",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/64.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "trade",
                "value": "none"
            },
            "result": 65
            }
        ],
        "power": 63.75,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 65,
        "name": "Alakazam",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/65.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [],
        "power": 81.25,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 66,
        "name": "Machop",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/66.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "28"
            },
            "result": 67
            }
        ],
        "power": 50,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 67,
        "name": "Machoke",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/67.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "trade",
                "value": "none"
            },
            "result": 68
            }
        ],
        "power": 70,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 68,
        "name": "Machamp",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/68.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [],
        "power": 90,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 69,
        "name": "Bellsprout",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/69.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "21"
            },
            "result": 70
            }
        ],
        "power": 52.5,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 70,
        "name": "Weepinbell",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/70.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "leaf"
            },
            "result": 71
            }
        ],
        "power": 67.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 71,
        "name": "Victreebel",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/71.png",
        "type-1": "grass",
        "type-2": "poison",
        "evolution": [],
        "power": 85,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 72,
        "name": "Tentacool",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/72.png",
        "type-1": "water",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "30"
            },
            "result": 73
            }
        ],
        "power": 56.25,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 73,
        "name": "Tentacruel",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/73.png",
        "type-1": "water",
        "type-2": "poison",
        "evolution": [],
        "power": 83.75,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 74,
        "name": "Geodude",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/74.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "25"
            },
            "result": 75
            }
        ],
        "power": 60,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 75,
        "name": "Graveler",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/75.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [
            {
            "trigger": {
                "type": "trade",
                "value": "none"
            },
            "result": 76
            }
        ],
        "power": 75,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 76,
        "name": "Golem",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/76.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [],
        "power": 92.5,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 77,
        "name": "Ponyta",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/77.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "40"
            },
            "result": 78
            }
        ],
        "power": 67.5,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 78,
        "name": "Rapidash",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/78.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [],
        "power": 82.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 79,
        "name": "Slowpoke",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/79.png",
        "type-1": "water",
        "type-2": "psychic",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "37"
            },
            "result": 80
            }
        ],
        "power": 52.5,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 80,
        "name": "Slowbro",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/80.png",
        "type-1": "water",
        "type-2": "psychic",
        "evolution": [],
        "power": 91.25,
        "base-hp": 95,
        "locations": []
        },
        {
        "id": 81,
        "name": "Magnemite",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/81.png",
        "type-1": "electric",
        "type-2": "steel",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "30"
            },
            "result": 82
            }
        ],
        "power": 63.75,
        "base-hp": 25,
        "locations": []
        },
        {
        "id": 82,
        "name": "Magneton",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/82.png",
        "type-1": "electric",
        "type-2": "steel",
        "evolution": [],
        "power": 86.25,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 83,
        "name": "Farfetchd",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/83.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [],
        "power": 66.25,
        "base-hp": 52,
        "locations": []
        },
        {
        "id": 84,
        "name": "Doduo",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/84.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "31"
            },
            "result": 85
            }
        ],
        "power": 50,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 85,
        "name": "Dodrio",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/85.png",
        "type-1": "normal",
        "type-2": "flying",
        "evolution": [],
        "power": 75,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 86,
        "name": "Seel",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/86.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "34"
            },
            "result": 87
            }
        ],
        "power": 53.75,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 87,
        "name": "Dewgong",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/87.png",
        "type-1": "water",
        "type-2": "ice",
        "evolution": [],
        "power": 78.75,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 88,
        "name": "Grimer",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/88.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "38"
            },
            "result": 89
            }
        ],
        "power": 55,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 89,
        "name": "Muk",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/89.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [],
        "power": 86.25,
        "base-hp": 105,
        "locations": []
        },
        {
        "id": 90,
        "name": "Shellder",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/90.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "water"
            },
            "result": 91
            }
        ],
        "power": 58.75,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 91,
        "name": "Cloyster",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/91.png",
        "type-1": "water",
        "type-2": "ice",
        "evolution": [],
        "power": 101.25,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 92,
        "name": "Gastly",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/92.png",
        "type-1": "ghost",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "25"
            },
            "result": 93
            }
        ],
        "power": 50,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 93,
        "name": "Haunter",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/93.png",
        "type-1": "ghost",
        "type-2": "poison",
        "evolution": [
            {
            "trigger": {
                "type": "trade",
                "value": "none"
            },
            "result": 94
            }
        ],
        "power": 66.25,
        "base-hp": 45,
        "locations": []
        },
        {
        "id": 94,
        "name": "Gengar",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png",
        "type-1": "ghost",
        "type-2": "poison",
        "evolution": [],
        "power": 82.5,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 95,
        "name": "Onix",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/95.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [],
        "power": 70,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 96,
        "name": "Drowzee",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/96.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "26"
            },
            "result": 97
            }
        ],
        "power": 56.5,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 97,
        "name": "Hypno",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/97.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [],
        "power": 82.75,
        "base-hp": 85,
        "locations": []
        },
        {
        "id": 98,
        "name": "Krabby",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/98.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "28"
            },
            "result": 99
            }
        ],
        "power": 61.25,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 99,
        "name": "Kingler",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/99.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 86.25,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 100,
        "name": "Voltorb",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/100.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "30"
            },
            "result": 101
            }
        ],
        "power": 47.5,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 101,
        "name": "Electrode",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/101.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [],
        "power": 70,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 102,
        "name": "Exeggcute",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/102.png",
        "type-1": "grass",
        "type-2": "psychic",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "leaf"
            },
            "result": 103
            }
        ],
        "power": 56.25,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 103,
        "name": "Exeggutor",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/103.png",
        "type-1": "grass",
        "type-2": "psychic",
        "evolution": [],
        "power": 95,
        "base-hp": 95,
        "locations": []
        },
        {
        "id": 104,
        "name": "Cubone",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/104.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "28"
            },
            "result": 105
            }
        ],
        "power": 58.75,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 105,
        "name": "Marowak",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/105.png",
        "type-1": "ground",
        "type-2": "none",
        "evolution": [],
        "power": 80,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 106,
        "name": "Hitmonlee",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/106.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [],
        "power": 79.5,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 107,
        "name": "Hitmonchan",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/107.png",
        "type-1": "fighting",
        "type-2": "none",
        "evolution": [],
        "power": 82.25,
        "base-hp": 50,
        "locations": []
        },
        {
        "id": 108,
        "name": "Lickitung",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/108.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 66.25,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 109,
        "name": "Koffing",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/109.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "35"
            },
            "result": 110
            }
        ],
        "power": 66.25,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 110,
        "name": "Weezing",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/110.png",
        "type-1": "poison",
        "type-2": "none",
        "evolution": [],
        "power": 91.25,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 111,
        "name": "Rhyhorn",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/111.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "42"
            },
            "result": 112
            }
        ],
        "power": 60,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 112,
        "name": "Rhydon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/112.png",
        "type-1": "rock",
        "type-2": "ground",
        "evolution": [],
        "power": 85,
        "base-hp": 105,
        "locations": []
        },
        {
        "id": 113,
        "name": "Chansey",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/113.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 37.5,
        "base-hp": 250,
        "locations": []
        },
        {
        "id": 114,
        "name": "Tangela",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/114.png",
        "type-1": "grass",
        "type-2": "none",
        "evolution": [],
        "power": 77.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 115,
        "name": "Kangaskhan",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/115.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 73.75,
        "base-hp": 105,
        "locations": []
        },
        {
        "id": 116,
        "name": "Horsea",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/116.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "32"
            },
            "result": 117
            }
        ],
        "power": 51.25,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 117,
        "name": "Seadra",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/117.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 75,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 118,
        "name": "Goldeen",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/118.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "33"
            },
            "result": 119
            }
        ],
        "power": 53,
        "base-hp": 45,
        "locations": []
        },
        {
        "id": 119,
        "name": "Seaking",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/119.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 75.5,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 120,
        "name": "Staryu",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/120.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "water"
            },
            "result": 121
            }
        ],
        "power": 56.25,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 121,
        "name": "Starmie",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/121.png",
        "type-1": "water",
        "type-2": "psychic",
        "evolution": [],
        "power": 86.25,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 122,
        "name": "Mr-mime",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/122.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [],
        "power": 82.5,
        "base-hp": 40,
        "locations": []
        },
        {
        "id": 123,
        "name": "Scyther",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/123.png",
        "type-1": "bug",
        "type-2": "flying",
        "evolution": [],
        "power": 81.25,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 124,
        "name": "Jynx",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/124.png",
        "type-1": "ice",
        "type-2": "psychic",
        "evolution": [],
        "power": 73.75,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 125,
        "name": "Electabuzz",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/125.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [],
        "power": 80,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 126,
        "name": "Magmar",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/126.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [],
        "power": 84.25,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 127,
        "name": "Pinsir",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/127.png",
        "type-1": "bug",
        "type-2": "none",
        "evolution": [],
        "power": 87.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 128,
        "name": "Tauros",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/128.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 76.25,
        "base-hp": 75,
        "locations": []
        },
        {
        "id": 129,
        "name": "Magikarp",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/129.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "20"
            },
            "result": 130
            }
        ],
        "power": 25,
        "base-hp": 20,
        "locations": []
        },
        {
        "id": 130,
        "name": "Gyarados",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png",
        "type-1": "water",
        "type-2": "flying",
        "evolution": [],
        "power": 91,
        "base-hp": 95,
        "locations": []
        },
        {
        "id": 131,
        "name": "Lapras",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/131.png",
        "type-1": "water",
        "type-2": "ice",
        "evolution": [],
        "power": 86.25,
        "base-hp": 130,
        "locations": []
        },
        {
        "id": 132,
        "name": "Ditto",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 48,
        "base-hp": 48,
        "locations": []
        },
        {
        "id": 133,
        "name": "Eevee",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "stone",
                "value": "water"
            },
            "result": 134
            },
            {
            "trigger": {
                "type": "stone",
                "value": "thunder"
            },
            "result": 135
            },
            {
            "trigger": {
                "type": "stone",
                "value": "fire"
            },
            "result": 136
            }
        ],
        "power": 53.75,
        "base-hp": 55,
        "locations": []
        },
        {
        "id": 134,
        "name": "Vaporeon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/134.png",
        "type-1": "water",
        "type-2": "none",
        "evolution": [],
        "power": 82.5,
        "base-hp": 130,
        "locations": []
        },
        {
        "id": 135,
        "name": "Jolteon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/135.png",
        "type-1": "electric",
        "type-2": "none",
        "evolution": [],
        "power": 82.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 136,
        "name": "Flareon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/136.png",
        "type-1": "fire",
        "type-2": "none",
        "evolution": [],
        "power": 98.75,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 137,
        "name": "Porygon",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/137.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 72.5,
        "base-hp": 65,
        "locations": []
        },
        {
        "id": 138,
        "name": "Omanyte",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/138.png",
        "type-1": "rock",
        "type-2": "water",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "40"
            },
            "result": 139
            }
        ],
        "power": 71.25,
        "base-hp": 35,
        "locations": []
        },
        {
        "id": 139,
        "name": "Omastar",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/139.png",
        "type-1": "rock",
        "type-2": "water",
        "evolution": [],
        "power": 92.5,
        "base-hp": 70,
        "locations": []
        },
        {
        "id": 140,
        "name": "Kabuto",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/140.png",
        "type-1": "rock",
        "type-2": "water",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "40"
            },
            "result": 141
            }
        ],
        "power": 67.5,
        "base-hp": 30,
        "locations": []
        },
        {
        "id": 141,
        "name": "Kabutops",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/141.png",
        "type-1": "rock",
        "type-2": "water",
        "evolution": [],
        "power": 88.75,
        "base-hp": 60,
        "locations": []
        },
        {
        "id": 142,
        "name": "Aerodactyl",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/142.png",
        "type-1": "rock",
        "type-2": "flying",
        "evolution": [],
        "power": 76.25,
        "base-hp": 80,
        "locations": []
        },
        {
        "id": 143,
        "name": "Snorlax",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png",
        "type-1": "normal",
        "type-2": "none",
        "evolution": [],
        "power": 87.5,
        "base-hp": 160,
        "locations": []
        },
        {
        "id": 144,
        "name": "Articuno",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/144.png",
        "type-1": "ice",
        "type-2": "flying",
        "evolution": [],
        "power": 101.25,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 145,
        "name": "Zapdos",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/145.png",
        "type-1": "electric",
        "type-2": "flying",
        "evolution": [],
        "power": 97.5,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 146,
        "name": "Moltres",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/146.png",
        "type-1": "fire",
        "type-2": "flying",
        "evolution": [],
        "power": 100,
        "base-hp": 90,
        "locations": []
        },
        {
        "id": 147,
        "name": "Dratini",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/147.png",
        "type-1": "dragon",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "30"
            },
            "result": 148
            }
        ],
        "power": 52.25,
        "base-hp": 41,
        "locations": []
        },
        {
        "id": 148,
        "name": "Dragonair",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/148.png",
        "type-1": "dragon",
        "type-2": "none",
        "evolution": [
            {
            "trigger": {
                "type": "level",
                "value": "55"
            },
            "result": 149
            }
        ],
        "power": 72.25,
        "base-hp": 61,
        "locations": []
        },
        {
        "id": 149,
        "name": "Dragonite",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png",
        "type-1": "dragon",
        "type-2": "flying",
        "evolution": [],
        "power": 107.25,
        "base-hp": 91,
        "locations": []
        },
        {
        "id": 150,
        "name": "Mewtwo",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [],
        "power": 111,
        "base-hp": 106,
        "locations": []
        },
        {
        "id": 151,
        "name": "Mew",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
        "image-shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/151.png",
        "type-1": "psychic",
        "type-2": "none",
        "evolution": [],
        "power": 100,
        "base-hp": 100,
        "locations": []
        }
    ];