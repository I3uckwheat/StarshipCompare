document.getElementById("compare").addEventListener("click", () => {
  run(compareStarships);
})

//***************************************************************

function run(genFunc){
  const genObject = genFunc();

  function iterate(iteration){
    if(iteration.done) return Promise.resolve(iteration.value);
    return Promise.resolve(iteration.value)
              .then(result => iterate(genObject.next(result)))
              .catch(error => iterate(genObject.throw(error)));
  }

  try {
    return iterate(genObject.next());
  } catch(ex) {
    return Promise.reject(ex);
  }
}

function *compareStarships(){
  let ship1 = yield fetch("https://swapi.co/api/starships/" + document.getElementById("ships1").value);
  let ship2 = yield fetch("https://swapi.co/api/starships/" +  document.getElementById("ships2").value);

  ship1 = yield ship1.json()
  ship2 = yield ship2.json()

  console.log(ship1, ship2)

}
