function showtext(oEvent) {
  //On change la class et c'est la CSS qui fait le reste
  if (this.classList.contains("fa-plus-circle")) {
    this.classList.replace("fa-plus-circle", "fa-minus-circle");
  } else {
    this.classList.replace("fa-minus-circle", "fa-plus-circle");
  }
}//fct



//Quand les Elements sont accesssibles 
// Dom loaded
document.addEventListener('DOMContentLoaded',function(){
//////////////////////////////////////////////
// EXEMPLE 1
//////////////////////////////////////////////
//On prende le bloc d'id exempleA colone 1
let oExemple =  document.getElementById("ullistpublicationsregular"),
        //On recherche les éléments de class fa soit tes boutons
        aCircle = oExemple.getElementsByClassName("fa");
//Pour tous éléments trouvé ont leur assigne l'événement click
// et la fonction à exécuter au click
for(let oBt of aCircle){
        oBt.addEventListener('click',showtext);
}//for
});

document.addEventListener('DOMContentLoaded',function(){
let oExemple =  document.getElementById("ullistpublicationsprocs"),
        aCircle = oExemple.getElementsByClassName("fa");
for(let oBt of aCircle){
        oBt.addEventListener('click',showtext);
}
});

/*
function addOnClick(IdName) {
  let oExemple = document.getElementById(IdName),
    //On recherche les éléments de class fa soit tes boutons
    aCircle = oExemple.getElementsByClassName("fa");
  //Pour tous éléments trouvé ont leur assigne l'événement click
  // et la fonction à exécuter au click
  for (let oBt of aCircle) {
    oBt.addEventListener('click', showtext);
  }
}

*/
