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

  fillStarshipTable(ship1, ship2);
}

function fillStarshipTable(ship1, ship2){
  const names = document.getElementById("name").children;
  const cost = document.getElementById("cost").children;
  const speed = document.getElementById("speed").children;
  const cargo = document.getElementById("cargo").children;
  const passengers = document.getElementById("passengers").children;

    names[1].textContent = ship1.name
    cost[1].textContent = ship1.cost_in_credits;
    speed[1].textContent = ship1.max_atmosphering_speed;
    cargo[1].textContent = ship1.cargo_capacity;
    passengers[1].textContent = ship1.passengers;

    names[2].textContent = ship2.name;
    cost[2].textContent = ship2.cost_in_credits;
    speed[2].textContent = ship2.max_atmosphering_speed;
    cargo[2].textContent = ship2.cargo_capacity;
    passengers[2].textContent = ship2.passengers;
}
