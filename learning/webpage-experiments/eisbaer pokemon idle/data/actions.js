var data_actions = [
    {
        "id": 0,
        "text": "Check PC",
        "response": [
            {
                "objectiveType": "mini",
                "objectiveId": 0,
                "text": "Your PC is empty.",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You received a Potion",
                "result": [
                    {
                        "type": "miniObjective",
                        "value": 0
                    },
                    {
                        "type": "item",
                        "value": 0,
                        "count": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 1,
        "text": "Talk to Mom",
        "response": [
            {
                "objectiveType": "main",
                "objectiveId": 1,
                "text": "You look tired! Rest for a quick minute",
                "result": [
                    {
                        "type": "heal"
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Oh, you're awake! Didn't Professor Oak want to see you today?",
                "result": [
                    {
                        "type": null
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "text": "Go outside",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Pallet Town",
                "result": [
                    {
                        "type": "travel",
                        "value": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "text": "Enter Your House",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Your House",
                "result": [
                    {
                        "type": "travel",
                        "value": 0
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "text": "Enter Your Rival's House",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Your Rival's House",
                "result": [
                    {
                        "type": "travel",
                        "value": 2
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "text": "Enter Professor Oak's Laboratory",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Professor Oak's Laboratory",
                "result": [
                    {
                        "type": "travel",
                        "value": 3
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "text": "Go north to Route 1",
        "response": [
            {
                "objectiveType": "main",
                "objectiveId": 1,
                "text": "You find yourself at Route 1",
                "result": [
                    {
                        "type": "travel",
                        "value": 4
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 0,
                "text": "You should visit Professor Oak's Laboratory",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Professor Oak: \"Stop! Don't go into tall grass without a Pokemon! Come visit me in my laboratory.",
                "result": [
                    {
                        "type": "objective",
                        "value": 0
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "text": "Go south to Route 21",
        "response": [
            {
                "objectiveType": "future",
                "objectiveId": 999,
                "text": "You find yourself at Route 21",
                "result": [
                    {
                        "type": "travel",
                        "value": 999
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Water blocks your path. You need a way to cross it.",
                "result": [
                    {
                        "type": null
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "text": "Talk to your Rival's sister",
        "response": [
            {
                "objectiveType": "mini",
                "objectiveId": 1,
                "text": "Have fun on your adventure!",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 3,
                "text": "You're going on an adventure? Cool! Here, take this map with you!",
                "result": [
                    {
                        "type": "miniObjective",
                        "value": 1
                    },
                    {
                        "type": "item",
                        "value": 4,
                        "count": 1
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "My grandpa's probably at his lab or on Route 1 studying Pokemon.",
                "result": [
                    {
                        "type": null
                    }
                ]
            }
        ]
    },
    {
        "id": 9,
        "text": "Talk to Professor Oak",
        "response": [
            {
                "objectiveType": "main",
                "objectiveId": 3,
                "text": "Good luck! Please fulfill my dream of completing the Pokedex!",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 2,
                "text": "Oh, thank you for delivering my parcel! Have a Pokedex and some Pokeballs.",
                "result": [
                    {
                        "type": "objective",
                        "value": 3
                    },
                    {
                        "type": "item",
                        "value": 1,
                        "count": -1
                    },
                    {
                        "type": "item",
                        "value": 2,
                        "count": 1
                    },
                    {
                        "type": "item",
                        "value": 3,
                        "count": 5
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 1,
                "text": "You should head north to Viridian City",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 0,
                "text": "Here! Choose a Pokemon!",
                "result": [
                    {
                        "type": "objective",
                        "value": 1
                    },
                    {
                        "type": "special",
                        "value": 0
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Weird, Professor Oak isn't here...",
                "result": [
                    {
                        "type": null
                    }
                ]
            }
        ]
    },
    {
        "id": 10,
        "text": "Go south to Pallet Town",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Pallet Town",
                "result": [
                    {
                        "type": "travel",
                        "value": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 11,
        "text": "Look for Pokemon",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Walking around in the tall grass...",
                "result": [
                    {
                        "type": "wilderness",
                        "value": 1
                    }
                ]
            }
        ]
    },
    {
        "id": 12,
        "text": "Go north to Viridian City",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Viridian City",
                "result": [
                    {
                        "type": "travel",
                        "value": 5
                    }
                ]
            }
        ]
    },
    {
        "id": 13,
        "text": "Go south to Route 1",
        "response": [
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "You find yourself in Route 1",
                "result": [
                    {
                        "type": "travel",
                        "value": 4
                    }
                ]
            }
        ]
    },
    {
        "id": 14,
        "text": "Go to the Pokemart",
        "response": [
            {
                "objectiveType": "main",
                "objectiveId": 3,
                "text": "Welcome to the Pokemart!",
                "result": [
                    {
                        "type": "mart",
                        "value": 5
                    }
                ]
            },
            {
                "objectiveType": "main",
                "objectiveId": 2,
                "text": "Have you delivered Oak's parcel yet?",
                "result": [
                    {
                        "type": null
                    }
                ]
            },
            {
                "objectiveType": "none",
                "objectiveId": -1,
                "text": "Hey, did you come from Pallet Town? Please deliver this parcel to Professor Oak",
                "result": [
                    {
                        "type": "objective",
                        "value": 2
                    },
                    {
                        "type": "item",
                        "value": 1,
                        "count": 1
                    }
                ]
            }
        ]
    }
];