

document.addEventListener('DOMContentLoaded',function(){
    var headdiv = readTextFile('./common/headdiv.html');
    document.getElementsByClassName("container").innerHTML = headdiv;
    var header = readTextFile('./common/header.html');
    document.getElementsByClassName("header").innerHTML = header;
    // var foot
});



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