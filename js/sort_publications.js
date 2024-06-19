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
            var acceptedMatch = entries[i].match(/accepted\s*=\s*{([^}]*)}/);
            var pagesMatch = entries[i].match(/pages\s*=\s*{([^}]*)}/);
            var pdfMatch = entries[i].match(/pdf\s*=\s*{([^}]*)}/);

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
            if (acceptedMatch){
                reference.accepted = parseInt(acceptedMatch[1].trim(), 10);
            } else {
                reference.accepted = reference.year;
            }
            if (pagesMatch){
                reference.pages = pagesMatch[1].trim();
            }
            if (pdfMatch){
                reference.pdf = pdfMatch[1].trim();
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
            } else if (newref[j].year==newref[idmax].year && newref[j].month==newref[idmax].month && newref[j].day>newref[idmax].day){
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

function sortSeminars(references) {
    var newref = [], savedtitle = [], n=references.lenght ;
    for (var i=0; i<n; i++) {
        if (!(savedtitle.includes(references[i].title))) {
            var instref = {} ;
            instref.years = [] ;
            instref.locations = [] ;
            instref.url = []
            var ititle = i ;
            instref.title = references[ititle].title ;
            instref.journal = references[ititle].journal ;
        } else {
            var ititle = newref.findIndex(function (element) {element.title==references[i].title} );
        }
        instref.years.push(references[ititle].year) ;
        instref.locations.push(references[ititle].location) ;

        if (references[ititle].url) {
            var insurl = references[ititle].url ;
        } else {
            var insurl = '' ;
        }
        instref.url.push(insurl) ;
        newref.push(instref) ;
    }
    return newref ;
}

var bib_dicts = {};
function funct_dict(key){
    alert(bib_dicts[key]);
}

function listtoHTML(sorted_references) {
    var htmltext = '';
    var i=0;
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
                    htmltext = htmltext + '(' + reference.number+'). ';
                } else {
                    htmltext = htmltext + '. ';
                }
            }
            if (reference.accepted) {
                htmltext = htmltext + reference.accepted + '. ';
            }
            if (reference.pages) {
                htmltext = htmltext + 'pp '+ reference.pages +'. ';
            }
            var IdName = 'cl'+reference.year+i.toString() ;
            htmltext = htmltext + '<em class="circle" id="'+IdName+'"><i class="fa fa-plus-circle" aria-hidden="true"></i>' ;
            htmltext = htmltext + '<div class="mytext">';
            if (reference.pdf) {
                htmltext = htmltext + '<a class="link-hid-" id="pdf" href="'+reference.pdf+'">pdf</a>' ;
            }
            htmltext = htmltext + '<a class="link-hid-" id="bib" href="#" onclick="'+"funct_dict('+IdName+')"+'">bibtex</a>' ;
            var bib_n = '@'+reference.type+'{'+reference.authors[0].split(',')[0].replace(/\s+/g, '')+reference.accepted+',\n' ;
            bib_n = bib_n + 'authors = {' ;
            for (var l=0; l<reference.authors.length; l++) {
                if (l>0){
                    bib_n = bib_n + ' and ';
                }
                bib_n = bib_n + reference.authors[l] ;
            }
            bib_n = bib_n + '},\n';
            entries = ["title","volume","number","pages","doi","url"] ;
            function addEntry(tableau,chaine) {
                var st = chaine ;
                for (const entry of tableau){
                    if (reference[entry]){
                        st = st + entry + ' = {'+reference[entry]+'},\n';
                    }
                }
                return st ;
            }
            if (reference.type=='article'){
                entries.push('journal');
            } else if (reference.entryType=='inproceedings') {
                reference.booktitle = reference.journal ;
                entries.push('booktitle');
                entries.push('location');
                entries.push('publisher');
            }
            bib_n = addEntry(entries, bib_n) ;
            bib_n = bib_n + 'year = {'+reference.accepted+'},\n' ;
            bib_n = bib_n + '}';
            bib_dicts[IdName] = bib_n ;
            htmltext = htmltext + '</div></em>';
            htmltext = htmltext + '</li>';
            i++;
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


function listtoHTML_seminars(sorted_references) {
    var htmltext = '';
    for (const reference of sorted_references) {
        if (reference.type=='seminar') {
            htmltext = htmltext + '<strong title="'+reference.journal+'">'+reference.title+'</strong> ('+reference.year+' <em>'+ reference.location +'</em>). ';
            /*var link1 = '', link2 = '';
            if (reference.url) {
                link1 = '<a href="'+ reference.url +'">' ;
                link2 = '</a>';
            }*/
            /*htmltext = htmltext + '<strong>' + reference.title + '</strong> (' + reference.journal+'). ';
            htmltext = htmltext + '<em id="titlearticle">'+link1+reference.contribution+link2+'</em>. ';
            htmltext = htmltext + reference.location + ', ' + reference.date + '.</li>';*/
        }
    }
    return htmltext;
}

// function listtoHTML_seminars_grouped()





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

var ht_seminar_nat = listtoHTML_seminars(sort_contrib_nat);
console.log(ht_seminar_nat);
document.getElementById("ullistseminars").innerHTML = ht_seminar_nat;

