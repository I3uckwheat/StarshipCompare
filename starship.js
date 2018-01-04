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
  const ships = [ship1, ship2]
  const tableRows = document.getElementById("compareTable").rows;
  const names = tableRows[1].children;
  const cost = tableRows[2].children;
  const speed = tableRows[3].children;
  const cargo = tableRows[4].children;
  const passangers = tableRows[5].children;

  console.log(ship1);

  for(let i = 1; i <= 2; i++){
    names[i].textContent = ships[i - 1].name
    cost[i].textContent = ships[i - 1].cost_in_credits;
    speed[i].textContent = ships[i - 1].max_atmosphering_speed;
    cargo[i].textContent = ships[i - 1].cargo_capacity;
    passangers[i].textContent = ships[i - 1].passengers;
  }
}
