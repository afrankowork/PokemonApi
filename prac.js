let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';

const pokeContainer = document.getElementById('pokeContainer'); 

pokeForm.addEventListener('submit', fetchPokemon)

function fetchPokemon(e) {
   e.preventDefault();

    

    //fetch indiviual pokemon info based on name
    fetch(pokeUrl).then(function(results) {
        return results.json();
    })
    .then(function(json) {
        console.log(json);
        displayPokemon(json);

    })
    
};

let displayPokemon = (info) => {
    for (let i = 0; i < info.results.length; i++) {
    pokemonID = pokeUrl + info.results[i].name;
    fetch(pokemonID).then(function(response) {
        return response.json()
    } ).then(function(json2) {
        displayStats(json2);
    })
    
    let displayStats = (info) => {
    pokeDiv = document.createElement('div');
    pokeHpContain = document.createElement('div');
    pokeHpBar = document.createElement('div');
    sprite = document.createElement('img');
    pokemonName = document.createElement('p');
    pokeAbility = document.createElement('p');
    pokeType = document.createElement('p');
    pokeHP = document.createElement('p');

            //Setting element ids and text
        pokemonName.setAttribute('id', 'name');
        pokeDiv.setAttribute('id', 'pokediv');
        pokemonName.innerText = 'Name: ' + info.name;
        pokeAbility.setAttribute('id', 'ability');
        pokeAbility.innerText = 'Ability: ' + info.abilities[0].ability.name;
        sprite.src = info.sprites.front_default;
        pokeHpContain.setAttribute('class', 'progress');
        pokeHpBar.setAttribute('class','progress-bar');
        pokeHpBar.setAttribute('role', 'progressbar');
        pokeHpBar.setAttribute('style',`width: ${info.stats[0].base_stat}%`);
        pokeHpBar.setAttribute('aria-valuenow', `${info.stats[0].base_stat}`);
        pokeHpBar.setAttribute('aria-valuemin','0');
        pokeHpBar.setAttribute('aria-valuemax','100');
        pokeHpBar.innerText = `${info.stats[0].base_stat}%`;
        pokeHP.innerText = 'HP: ';
    
        info.types.length > 1 ? pokeType.innerText = 'Types: ' + info.types[0].type.name + ' ' + info.types[1].type.name : pokeType.innerText = 'Type: ' + info.types[0].type.name;


        //appending elements to parent
        pokeContainer.appendChild(pokeDiv);
        pokeDiv.appendChild(sprite);
        pokeDiv.appendChild(pokemonName);
        pokeDiv.appendChild(pokeAbility);
        pokeDiv.appendChild(pokeType);
        pokeDiv.appendChild(pokeHP);
        pokeDiv.appendChild(pokeHpContain);
        pokeHpContain.appendChild(pokeHpBar);
}
}
}
