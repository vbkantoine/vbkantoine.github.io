function extractReferencesFromBibtex(bibtex) {
    // Tableau pour stocker les références extraites
    var references = [];
    var papers = [];
    var proceedings = [];

    // Diviser le fichier BibTeX en entrées séparées
    var entries = bibtex.split('\n@');

    // Parcourir chaque entrée et extraire les informations nécessaires
    for (var i = 0; i < entries.length; i++) {
        // Extraire le type d'entrée (article, book, etc.)
        if (entries[i].match('{')) {
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
            var dayMatch = entries[i].match(/day\s*=\s*{([^}]*)}/);
            //var booktitleMatch = entries[i].match(/booktitle\s*=\s*{([^}]*)}/);
            var locationMatch = entries[i].match(/location\s*=\s*{([^}]*)}/);
            var dateMatch = entries[i].match(/date\s*=\s*{([^}]*)}/);
            var contributionMatch = entries[i].match(/contribution\s*=\s*{([^}]*)}/);

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
            if (dayMatch) {
                reference.day = parseInt(dayMatch[1].trim(), 10);
            } else {
                reference.day = 0;
            }
            //if (booktitleMatch) {
            //    reference.booktitle = booktitleMatch[1].trim();
            //}
            if (locationMatch) {
                reference.location = locationMatch[1].trim();
            }
            if (dateMatch) {
                reference.date = dateMatch[1].trim();
            }
            if (contributionMatch){
                reference.contribution = contributionMatch[1].trim();
            }

            // Ajouter la référence au tableau
            if (authorMatch) {
                for (const author of reference.authors) {
                    if (author.toLowerCase().match('biesbroeck')) {
                    // if (true) {
                        references.push(reference);
                    }
                }
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
        for (var j=i; j<n; j++) {
            if (newref[j].year>newref[idmax].year) {
                idmax=j;
            } else if (newref[j].year==newref[idmax].year && newref[j].month>newref[idmax].month){
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
        if (reference.type=='article' || reference.type=='inproceedings') {
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
            htmltext = htmltext + '<em id="titlearticle">'+link1+reference.title+link2+'</em>, ';
            htmltext = htmltext + reference.journal +'. ';
            if (reference.volume) {
                htmltext = htmltext + reference.volume;
                if (reference.number) {
                    htmltext = htmltext + '(' + reference.number+').';
                } else {
                    htmltext = htmltext + '.';
                }
            }
            htmltext = htmltext + '</li>';
        }
    }
    return htmltext;
}

function listtoHTML_contrib(sorted_references) {
    var htmltext = '';
    for (const reference of sorted_references) {
        if (reference.type=='conference') {
            htmltext = htmltext + '<li><strong>'+reference.year+'</strong>. ';
            var link1 = '', link2 = '';
            if (reference.url) {
                link1 = '<a href="'+ reference.url +'">' ;
                link2 = '</a>';
            }
            htmltext = htmltext + '<strong>' + reference.title + '</strong> (' + reference.journal+'). ';
            htmltext = htmltext + '<em id="titlearticle">'+link1+reference.contribution+link2+'</em>. ';
            htmltext = htmltext + reference.location + ', ' + reference.date + '.</li>';
        }
    }
    return htmltext;
}





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

/*
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
}*/

//console.log(read('./bibtex.bib'));

var bibtext = readTextFile('./bibtext.bib') ;
console.log(typeof bibtext);
console.log(String(bibtext));

/*
  const input = document.getElementById("test34");
  const inputValue = input.defaultValue;
  //console.log(input);
*/

var extractedReferences = extractReferencesFromBibtex(bibtext);
var sorted_references = sortYearMonth(extractedReferences);
var httext = listtoHTML(sorted_references);
//alert(console.log(sorted_references));
console.log(httext);

document.getElementById("ullistpublications").innerHTML = httext;

var bib_contrib_inter = readTextFile('./bibcontribinter.bib') ;
var extr_contrib_inter = extractReferencesFromBibtex(bib_contrib_inter);
var sort_contrib_inter = sortYearMonth(extr_contrib_inter);
var ht_contrib_inter = listtoHTML_contrib(sort_contrib_inter);
console.log(ht_contrib_inter);
document.getElementById("ullistcontribinter").innerHTML = ht_contrib_inter;

var bib_contrib_nat = readTextFile('./bibcontribnat.bib') ;
var extr_contrib_nat = extractReferencesFromBibtex(bib_contrib_nat);
var sort_contrib_nat = sortYearMonth(extr_contrib_nat);
var ht_contrib_nat = listtoHTML_contrib(sort_contrib_nat);
console.log(ht_contrib_nat);
document.getElementById("ullistcontribnat").innerHTML = ht_contrib_nat;
