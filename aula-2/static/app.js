console.log('exemplo service worker')
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./serviceworker.js',{scope:'./'})
    .then(function(registratior){
        console.log('service workers registered');
    }).catch(function(e){
        console.log('service worker failed to register')
    })
}

// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
.then(function(response){
    return response.json()
})
.then(function(parsed){
    console.log(parsed.name)
    var img = document.createElement('img')
    img.src = parsed.sprites.other.dream_world.front_default
    document.querySelector('#teste').appendChild(img)
})