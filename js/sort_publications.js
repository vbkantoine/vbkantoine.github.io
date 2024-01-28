function extractReferencesFromBibtex(bibtex) {
    // Tableau pour stocker les références extraites
    var references = [];
    var papers = [];
    var proceedings = [];

    // Diviser le fichier BibTeX en entrées séparées
    var entries = bibtex.split('\n@');

    // Parcourir chaque entrée et extraire les informations nécessaires
    for (var i = 1; i < entries.length; i++) {
        // Extraire le type d'entrée (article, book, etc.)
        var entryType = entries[i].substring(0, entries[i].indexOf('{')).trim().toLowerCase();

        // Extraire les champs (author, title, year) de chaque entrée
        var authorMatch = entries[i].match(/author\s*=\s*{([^}]*)}/);
        var titleMatch = entries[i].match(/title\s*=\s*{([^}]*)}/);
        var yearMatch = entries[i].match(/year\s*=\s*{([^}]*)}/);
        var journalMatch = entries[i].match(/journal\s*=\s*{([^}]*)}/);
        var volumeMatch = entries[i].match(/volume\s*=\s*{([^}]*)}/);
        var numberMatch = entries[i].match(/number\s*=\s*{([^}]*)}/);
        var doiMatch = entries[i].match(/doi\s*=\s*{([^}]*)}/);
        var urlMatch = entries[i].match(/url\s*=\s*{([^}]*)}/);
        var monthMatch = entries[i].match(/month\s*=\s*{([^}]*)}/);

        // Créer un dictionnaire pour stocker les informations de référence
        var reference = {};

        reference.type = entryType;

        // Remplir le dictionnaire avec les informations extraites
        if (authorMatch) {
            reference.authors = authorMatch[1].split(' and ').map(function(author) {
                return author.trim();
            });
        }

        if (titleMatch) {
            reference.title = titleMatch[1].trim();
        }
        if (yearMatch) {
            reference.year = parseInt(yearMatch[1].trim(), 10);
        }
        if (journalMatch) {
            reference.journal = journalMatch[1].trim();
        }
        if (volumeMatch) {
            reference.volume = parseInt(volumeMatch[1].trim(), 10);
        }
        if (numberMatch) {
            reference.number = parseInt(numberMatch[1].trim(), 10);
        }
        if (doiMatch) {
            reference.doi = doiMatch[1].trim();
        }
        if (urlMatch) {
            reference.url = urlMatch[1].trim();
        }
        if (monthMatch) {
            reference.month = parseInt(monthMatch[1].trim(), 10);
        } else {
            reference.month = 0;
        }

        // Ajouter la référence au tableau
        for (const author of reference.authors) {
            //if (author.toLowerCase().match('biesbroeck')) {
            if (true) {
                references.push(reference);
            }
        
        }
    }

    return references;
}

function sortYearMonth(references) {
    var newref = [], n=references.length, idmax=0;
    for (const reference of references) {
        newref.push(reference);
    }
    for (var i=0; i<n; i++) {
        idmax = i;
        for (var j=0; j<n; j++) {
            if (newref[j].year<newref[idmax].year) {
                idmax=j;
            } else if (newref[j].year==newref[idmax].year && newref[j].month<newref[idmax].month){
                idmax=j;
            }
        }
        li = newref[i];
        lm = newref[idmax];
        newref[i] = lm;
        newref[idmax] = li;
    }
    return newref;
}

function listtoHTML(sorted_references) {
    var htmltext = '';
    for (const reference of sorted_references) {
        htmltext = htmltext + '<li><strong>'+reference.year+'</strong>. ';
        var auths = '';
        for (const author of reference.authors) {
            var lastfirst = author.split(',').map(function(name) {
                return name.trim();
            });
            auths = auths + lastfirst[1].substring(0,1).toUpperCase() + '. ' + lastfirst[0] + ', ';
        }
        htmltext = htmltext+auths
        var link1 = '', link2 = '';
        if (reference.doi) {
            link1 = '<a href="https://doi.org/'+reference.doi+'">';
            link2 = '</a>';
        } else if (reference.url) {
            link1 = '<a href="'+ reference.url +'">' ;
            link2 = '</a>';
        }
        htmltext = htmltext + '<em id="titlearticle">'+link1+reference.journal+link2+'</em>';
        htmltext = htmltext + '</li>';
    }
    return htmltext;
}




// Exemple d'utilisation
var bibtexExample = `
@article{author2020,
    author = {John, Doe and Jane, Smith},
    title = {Sample Article},
    year = {2020},
    journal = {test1}
}

@book{smith2018,
    author = {Jane, Smith},
    title = {Sample Book},
    year = {2018},
    journal = {test2}
}
`;



function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4)  {
        if(rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          console.log(allText);
         }
      }
    }
    rawFile.send(null);
  }
 // readTextFile("demo.txt");



/*const fs = require("fs");

fs.readFile("demo.txt", (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
  });
*/

//fetch('demo.txt')
//.then(response => response.text())
//.then(text => console.log(text))
  // outputs the content of the text file


  function read(textFile){
    var xhr=new XMLHttpRequest;
    xhr.open('GET',textFile);
    xhr.onload=show;
    xhr.send()
}

function show(){
    var pre=document.createElement('pre');
    pre.textContent=this.response;
    document.body.appendChild(pre)
}

read('./demo.txt');




  const input = document.getElementById("test34");
  const inputValue = input.defaultValue;
  console.log(input);


var extractedReferences = extractReferencesFromBibtex(bibtexExample);
var sorted_references = sortYearMonth(extractedReferences);
var httext = listtoHTML(sorted_references);
//alert(console.log(sorted_references));
//console.log(httext);

//document.getElementById("ullistpublications").innerHTML = httext;