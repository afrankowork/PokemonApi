let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
let nextUrl;
let prevUrl;

const pokeContainer = document.getElementById('pokeContainer'); 
let btnSubmit = document.getElementById('submit');
let btnNext = document.getElementById('next');
let btnPrev = document.getElementById('prev');
btnPrev.hidden = true;
btnNext.hidden = true;



pokeForm.addEventListener('submit', fetchPokemon);
btnNext.addEventListener('click', nextPage);
btnPrev.addEventListener('click', prevPage);



let pageNumber = 1;
console.log(pageNumber);





function fetchPokemon(e) {
    
    
   e.preventDefault();

    btnSubmit.hidden = true;

    //fetch first 20 pokemon from pokeAPI
    fetch(pokeUrl).then(function(results) {
     
        return results.json();
    })
    .then(function(json) {
        
        
        nextUrl = json.next;
        prevUrl = json.previous;

        displayPokemon(json);
        
        
        


    })
    
};
//fetch individual pokemon info 
function displayPokemon (info){
    
    for (let i = 0; i < info.results.length; i++) {
        pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
        pokemonID = pokeUrl + info.results[i].name;
    
    fetch(pokemonID).then(function(response) {
        return response.json()
    } ).then(function(json2) {
        
        displayStats(json2);
    })
    
    function displayStats(info){
    
    pokeDiv = document.createElement('div');
    pokeHpContain = document.createElement('div');
    pokeHpBar = document.createElement('div');
    sprite = document.createElement('img');
    pokemonName = document.createElement('p');
    pokeAbility = document.createElement('p');
    pokeType = document.createElement('p');
    pokeHP = document.createElement('p');
    pokeID = document.createElement('p');

            //Setting element ids and text
        pokemonName.setAttribute('id', 'name');
        pokeID.setAttribute('id', 'pokeID');
        pokeID.innerText = info.id;
        
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
        pokeHpBar.innerText = `${info.stats[0].base_stat}`;
        pokeHP.innerText = 'HP: ';
    
        info.types.length > 1 ? pokeType.innerText = 'Types: ' + info.types[0].type.name + ' ' + info.types[1].type.name : pokeType.innerText = 'Type: ' + info.types[0].type.name;

      
        

        //appending elements to parent
        pokeContainer.appendChild(pokeDiv);
        pokeDiv.appendChild(pokeID);
        pokeDiv.appendChild(sprite);
        pokeDiv.appendChild(pokemonName);
        pokeDiv.appendChild(pokeAbility);
        pokeDiv.appendChild(pokeType);
        pokeDiv.appendChild(pokeHP);
        pokeDiv.appendChild(pokeHpContain);
        pokeHpContain.appendChild(pokeHpBar);
        
        
        btnNext.hidden = false;

        
}
}
    

};

function nextPage(e) {
    document.getElementById('pokeContainer').innerHTML = '';
    pokeUrl = nextUrl;
    pageNumber += 1;

    pageNumber > 1 ? btnPrev.hidden = false : btnPrev.hidden = true;
    
    fetchPokemon(e);
    
};

function prevPage(e){
    document.getElementById('pokeContainer').innerHTML = '';
    pageNumber -= 1;
    pageNumber > 1 ? btnPrev.hidden = false : btnPrev.hidden = true;
    pokeUrl = prevUrl;
    
    fetchPokemon(e);
}
