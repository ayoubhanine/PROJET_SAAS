const prompt = require("prompt-sync")({ sigint: true });

let taxis = [];
let requests = [];

// === SAISIE DES TAXIS ===
let nbTaxis = parseInt(prompt("Combien de taxis ? "));
for (let i = 0; i < nbTaxis; i++) {
  console.log(`\nTaxi ${i + 1}:`);
  let position = parseInt(prompt("  Position du taxi : "));
  taxis.push({
    id: i + 1,
    position: position,
    available: true,
    timeRemaining: 0,
    totalRides: 0
  });
}

// === SAISIE DES DEMANDES ===
let nbRequests = parseInt(prompt("\nCombien de demandes (courses) ? "));
for (let i = 0; i < nbRequests; i++) {
  console.log(`\nDemande ${i + 1}:`);
  let position = parseInt(prompt("  Position du client : "));
  let duration = parseInt(prompt("  Durée de la course (en minutes) : "));
  let time = parseInt(prompt("  Temps d’apparition de la demande (minute) : "));
  requests.push({
    reqId: i + 1,
    position,
    duration,
    time
  });
}

console.log("\n=== DÉBUT DE LA SIMULATION ===");

function findNearestAvailableTaxi(position) {
  let availableTaxis = taxis.filter(t => t.available);
  if (availableTaxis.length === 0) return null;
  return availableTaxis.reduce((prev, curr) => {
    let prevDist = Math.abs(prev.position - position);
    let currDist = Math.abs(curr.position - position);
    return currDist < prevDist ? curr : prev;
  });
}

let totalRides = 0;
let waitingQueue = [];

function assignRequestToTaxi(request, taxi) {
  const distance = Math.abs(taxi.position - request.position);
  console.log(
    `🚕 Demande ${request.reqId} (position ${request.position}) assignée au Taxi ${taxi.id}, distance ${distance}`
  );
  taxi.available = false;
  taxi.timeRemaining = request.duration;
  taxi.totalRides++;
  taxi.position = request.position;
  totalRides++;
}

function updateTaxis() {
  for (let taxi of taxis) {
    if (!taxi.available && taxi.timeRemaining > 0) {
      taxi.timeRemaining--;
      if (taxi.timeRemaining === 0) {
        taxi.available = true;
        console.log(`✅ Taxi ${taxi.id} a terminé sa course et est libre.`);
        if (waitingQueue.length > 0) {
          let nextRequest = waitingQueue.shift();
          console.log(
            `➡️  Taxi ${taxi.id} prend la demande ${nextRequest.reqId} depuis la file d’attente.`
          );
          assignRequestToTaxi(nextRequest, taxi);
        }
      }
    }
  }
}

let allRequestsHandled = false;
let comptTime = 0;

while (!allRequestsHandled) {
  console.log(`\n Minute ${comptTime}:`);
  let newRequests = requests.filter(r => r.time === comptTime);
  newRequests.forEach(request => {
    let taxi = findNearestAvailableTaxi(request.position);
    if (taxi) {
      assignRequestToTaxi(request, taxi);
    } else {
      console.log(
        `❌ Tous les taxis sont occupés → demande ${request.reqId} ajoutée à la file d’attente.`
      );
      waitingQueue.push(request);
    }
  });

  updateTaxis();

  const allRequestsDone =
    totalRides === requests.length && waitingQueue.length === 0;
  const allTaxisFree = taxis.every(t => t.available);

  if (allRequestsDone && allTaxisFree) {
    allRequestsHandled = true;
  } else {
    comptTime++;
  }
}

console.log("\n=== STATISTIQUES FINALES ===");
taxis.forEach(taxi => {
  console.log(
    `Taxi ${taxi.id}: ${taxi.totalRides} courses, position finale ${taxi.position}`
  );
});
console.log(`Total des courses : ${totalRides}`);
console.log(`Durée totale de la simulation : ${comptTime} minutes`);
