const prompt = require("prompt-sync")();
let taxis=[];
let requests=[];
let compt1=1;
let compt2=1;
function AjouterTaxi(){
    let position=prompt("entrer la posision du taxi:");
    taxis.push({id_taxi:compt1++,position,available:true,timeremaing:0});
    AfficherTaxis();
}
function AfficherTaxis(){
    if(taxis.length===0){
        console.log("aucun taxi trouvee")
        return;
      }
    console.log(" Liste des taxis :");
    for(let i=0;i<taxis.length;i++){
      console.log(taxis[i])
    }}
function AjouterCommandes(){
    let position=prompt("entre la position du commandes")
    let duration=+prompt("entrer la duree de trajet de la commande en minute:");
    requests.push({id_request:compt2++,position,duration})
    AfficherCommandes()
}
function AfficherCommandes(){
    console.log("listes des commandes:");
    for (let i=0;i<requests.length;i++){
        console.log(requests[i]);
    }
}
function distanceplusproche() {
    if (taxis.length === 0 || requests.length === 0) {
        console.log("Aucun taxi ou commande disponible.");
        return;
    }

    let minDistance = Infinity;
    let bestTaxi = 0;
    let bestRequest = 0;

    for (let i = 0; i < taxis.length; i++) {
        for (let j = 0; j < requests.length; j++) {
            let distance = Math.abs(Number(taxis[i].position) - Number(requests[j].position));
            if (distance < minDistance) {
                minDistance = distance;
                bestTaxi = taxis[i];
                bestRequest = requests[j];
                
            }
        }
    }

    if (bestTaxi && bestRequest) {
                bestTaxi.available=false;
                bestTaxi.timeremaining=bestRequest.duration;
        console.log("Le taxi le plus proche est le taxi:" ,bestTaxi.id_taxi,"pour la commande" ,bestRequest.id_request,"à une distance de",minDistance);
    } else {
        console.log("Aucune correspondance trouvée.");
    }
}
 function menu() {
  let choix;
  do {
    
   
console.log("1. Ajouter un taxi a lapp");
console.log("2. Afficher tous les taxis");
console.log("3. Ajouter une commande a lapp");
console.log("4. Afficher tous les commandes");
console.log("5.dist plus proche:")
    choix = prompt("Choisissez une option :");




    switch (choix) {
      case "1": AjouterTaxi(); break;
      case "2": AfficherTaxis(); break;
      case "3": AjouterCommandes(); break;
      case "4": AfficherCommandes(); break;
      case "5": distanceplusproche(); break;
      case "0": console.log(" Fin du programme"); break;
      default: console.log(" Choix invalide");
    }
  }while (choix !== "0");
  }    
  menu()
