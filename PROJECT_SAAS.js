const prompt = require("prompt-sync")();

let livres = [];
let abonnes = [];
let emprunts=[];


let compt1 = 1;
let compt2 = 1;


function ajouterLivre() {
  let titre = prompt("Titre :");
  let auteur = prompt("Auteur :");
  let annee = parseInt(prompt("Année de publication :"));
  livres.push({ id_livre: compt1++, titre, auteur, annee, disponible: true });
  console.log("le livre a ete ajoutee");
}

function afficherLivres() {
  if(livres.length===0){
    console.log("aucun livre trouvee")
    return;
  }
  console.log(" Liste des livres :");
  for(let i=0;i<livres.length;i++){
    console.log(livres[i])

  }
}

function trierLivresParTitre() {
  let choix = parseInt(prompt("Tapez 1 pour tri ascendant (A → Z),Tapez 2 pour tri descendant (Z → A) :"));

  if (choix === 1) {
    
    livres.sort(function(a, b) {
      if (a.titre < b.titre) return -1;
      if (a.titre > b.titre) return 1;
      return 0;
    });
   
  } else if (choix === 2) {
    
    livres.sort(function(a, b) {
      if (a.titre < b.titre) return 1;
      if (a.titre > b.titre) return -1;
      return 0;
    });
    
  } else {
    console.log("Choix invalide. Veuillez entrer 1 ou 2.");
    return;
  }

  afficherLivres();
}
function trierLivresParAnnee() {
  livres.sort((a, b) => a.annee - b.annee);
  afficherLivres();
}

function afficherLivresDisponibles() {
  console.log(" Livres disponibles :");
  for(let i=0;i<livres.length;i++){
       if(livres[i].disponible==true){
            console.log(livres[i].id_livre,livres[i].titre)
           
       }
    
    }
 
}

function rechercherLivreParId() {
  let id = parseInt(prompt("Id du livre à rechercher :"));
  for(let i=0;i<livres.length;i++){
    if(id==livres[i].id_livre){
        console.log(" Livre trouvé :",livres[i]);
        return; }
  }
  console.log("aucun Livre avec ce ID");
}



function ajouterAbonne() {
  let nom = prompt("Nom :");
  let prenom = prompt("Prénom :");
  let email = prompt("Email :");
  abonnes.push({ id: compt2++, nom, prenom, email });
  console.log("Abonné a ete ajoute");
}

function afficherAbonnes() {
  console.log(" Liste des abonnés :");
  for(let i=0;i<abonnes.length;i++){
    console.log(abonnes[i])
  }
 
}


function emprunterLivre() {
  let id_abonne = parseInt(prompt("Id de l’abonné :"));
  let id_livree = parseInt(prompt("Id du livre :"));
  let livre = livres.find(l => l.id_livre === id_livree && l.disponible);
  if (!livre) {
    console.log(" Livre non disponible ou inexistant");
    return;
  }
  emprunts.push({ id_abonne, id_livree });
  console.log("Livre" ,livre.titre, "emprunté par abonné" ,id_abonne);
   livre.disponible = false;
}

function retournerLivre() {}

function afficherEmpruntsParAbonne() {}


function menu() {
  let choix;
  do {
    
   
console.log("1. Ajouter un livre");
console.log("2. Afficher tous les livres");
console.log("3. Trier les livres par titre");
console.log("4. Trier les livres par année");
console.log("5. Afficher livres disponibles");
console.log("6. Rechercher livre par ID");
console.log("7. Ajouter un abonné");
console.log("8. Afficher tous les abonnés");
console.log("9. Emprunter un livre");
console.log("10. Retourner un livre");
console.log("11. Afficher emprunts d’un abonné");
console.log("0. Quitter");
    choix = prompt("Choisissez une option :");




    switch (choix) {
      case "1": ajouterLivre(); break;
      case "2": afficherLivres(); break;
      case "3": trierLivresParTitre(); break;
      case "4": trierLivresParAnnee(); break;
      case "5": afficherLivresDisponibles(); break;
      case "6": rechercherLivreParId(); break;
      case "7": ajouterAbonne(); break;
      case "8": afficherAbonnes(); break;
      case "9": emprunterLivre(); break;
      case "10": retournerLivre(); break;
      case "11": afficherEmpruntsParAbonne(); break;
      case "0": console.log(" Fin du programme"); break;
      default: console.log(" Choix invalide");
    }
  }while (choix !== "0");
  } 



menu();
