function readTextFile2(file) {
  var rawFile = new XMLHttpRequest();
  var allText = ''
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4)  {
      if(rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
        console.log(allText);
       }
    }
  }
  //if (rawFile.responseText) {
  // var allText = rawFile.responseText;
  rawFile.send(null);
  return allText;
  //}
}


function add_commons(){
  var headdiv = readTextFile2('./common/headdiv.html');
  document.getElementById("container").innerHTML = headdiv;
  var header = readTextFile2('./common/header.html');
  document.getElementById("header").innerHTML = header;
  var aujd = new Date();
  var annee = aujd.getFullYear();
  var foot = "&copy;"+ annee +" - <strong>Antoine Van Biesbroeck&nbsp;</strong>";
  document.getElementsByClassName("copyright").innerHTML = foot;
  console.log(document.getElementsByClassName("copyright"));
}

document.addEventListener('DOMContentLoaded', add_commons);
  
  
  /*function(){
    var headdiv = readTextFile2('./common/headdiv.html');
    document.getElementById("container").innerHTML = headdiv;
    var header = readTextFile2('./common/header.html');
    document.getElementById("header").innerHTML = header;
    // var foot
});
*/





// add_commons()

/*
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText = ''
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4)  {
        if(rawFile.status === 200 || rawFile.status == 0) {
          allText = rawFile.responseText;
          console.log(allText);
         }
      }
    }
    //if (rawFile.responseText) {
    // var allText = rawFile.responseText;
    rawFile.send(null);
    return allText;
    //}
  }
*/
