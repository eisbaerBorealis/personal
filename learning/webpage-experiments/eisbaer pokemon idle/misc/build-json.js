function buildPokemonJson() {
    console.log('JesseDebug@buildPokemonJson, started!');

    let intervalDuration = 2000;
    let id = 1;
    let pokemonCount = 151;
    let newJson = '{"pokemon": [';

    let jsonInterval = setInterval(() => {
		if (id > pokemonCount)
		{
            clearInterval(jsonInterval);
            console.log('JesseDebug@buildPokemonJson, completed!');
            newJson += ']}';
            writeJson(newJson, 'pokemon.json');
            document.getElementById('downloadlink').click();
		} else {
            console.log('JesseDebug@buildPokemonJson, id is ' + id);

            let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
            fetch(url)
                .then(res => res.json())
                .then((out) => {
                    // console.log('Checkout this JSON!', out);

                    // Figure out stuff
                    let name = out.name[0].toUpperCase() + out.name.slice(1);
                    let type1 = out.types[0].type.name;
                    let type2 = 'none';
                    if(out.types.length > 1) {
                        type2 = out.types[1].type.name;
                    }
                    // TODO, swap dumb pairs

                    if((type1 === 'poison' && type2 === 'grass') ||
                       (type1 === 'poison' && type2 === 'bug') ||
                       (type1 === 'ground' && type2 === 'poison') ||
                       (type1 === 'grass' && type2 === 'bug') ||
                       (type1 === 'fighting' && type2 === 'water') ||
                       (type1 === 'poison' && type2 === 'water') ||
                       (type1 === 'ground' && type2 === 'rock') ||
                       (type1 === 'psychic' && type2 === 'water') ||
                       (type1 === 'steel' && type2 === 'electric') ||
                       (type1 === 'ice' && type2 === 'water') ||
                       (type1 === 'poison' && type2 === 'ghost') ||
                       (type1 === 'psychic' && type2 === 'grass') ||
                       (type1 === 'psychic' && type2 === 'ice') ||
                       (type1 === 'water' && type2 === 'rock') ||
                       (type1 === 'flying'))
                    {
                        let typeSwap = type1;
                        type1 = type2;
                        type2 = typeSwap;
                    }
                    if(type1 === 'fairy') {
                        if(type2 === 'psychic') {
                            type1 = 'psychic';
                            type2 = 'none';
                        } else {
                            type1 = 'normal';
                            type2 = 'none';
                        }
                    }

                    let power = ((out.stats[1].base_stat + out.stats[2].base_stat +
                        out.stats[3].base_stat + out.stats[4].base_stat) / 4);

                    // Adding json!
                    newJson += '\n\t{\n\t\t"id": ' + id + ',' +
                        // '\n\t\t"name": "' + out.name[0].toUpperCase() + out.name.slice(1) + '", ' +
                        '\n\t\t"name": "' + name + '",' +
                        '\n\t\t"image": "' + out.sprites.front_default + '",' +
                        '\n\t\t"image-shiny": "' + out.sprites.front_shiny + '",' +
                        '\n\t\t"type-1": "' + type1 + '",\n\t\t"type-2": "' + type2 + '",' +
                        '\n\t\t"evolution": [],\n\t\t"power": ' + power +
                        ',\n\t\t"base-hp": ' + out.stats[5].base_stat + ', \n\t\t"locations": [],' +
                        '\n\t\t"male-chance": 0.5';

                    newJson += '\n\t}';
                    if(id < pokemonCount) {
                        newJson += ',';
                    }
                    id++;
                })
                .catch(err => { throw err });
        }
	}, intervalDuration);
}

function makeTextFile(text) {
    let data = new Blob([text], {type: 'text/plain'});
    
    let textFile = null;
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
}

function writeJson(jsonText, fileName) {
    // https://stackoverflow.com/questions/21012580
  
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<a download="' +
                fileName + '" id="downloadlink" style="display: none">Download</a>');

    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(jsonText);
}

/**
 *  Type combinations to swap
 *      Poison/Grass
 *      Poison/Bug
 *      Ground/Poison
 *      Grass/Bug
 *      Fighting/Water
 *      Poison/Water
 *      Ground/Rock
 *      Psychic/Water
 *      Steel/Electric
 *      Ice/Water
 *      Poison/Ghost
 *      Psychic/Grass
 *      Psychic/Ice
 *      Water/Rock
 * 
 *      Flying/Fire
 *      Flying/Bug
 *      Flying/Normal
 *      Flying/Poison
 *      Flying/Water
 *      Flying/Rock
 *      Flying/Ice
 *      Flying/Electric
 *      Flying/Dragon
 * 
 *      Fairy/none -> Normal/none (clefairy/clefable)
 *      Fairy/Normal -> Normal/none (jigglypuff/wigglytuff)
 *      Fairy/Psychic -> Psychic/none (mr.mime)
 */