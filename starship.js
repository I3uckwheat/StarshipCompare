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

  ship1Obj = yield ship1.json()
  ship2Obj = yield ship2.json()

  fillStarshipTable(ship1Obj, ship2Obj);
}


function fillStarshipTable(ship1, ship2){
  const ships = [ship1, ship2]
  const names = document.getElementById("name").children;
  const cost = document.getElementById("cost").children;
  const speed = document.getElementById("speed").children;
  const cargo = document.getElementById("cargo").children;
  const passengers = document.getElementById("passengers").children;

  ships.forEach((ship, i) => {
    const j = i + 1;

    names[j].textContent      = ship.name;
    cost[j].textContent       = ship.cost_in_credits;
    speed[j].textContent      = ship.max_atmosphering_speed;
    cargo[j].textContent      = ship.cargo_capacity;
    passengers[j].textContent = ship.passengers;
  })
}
