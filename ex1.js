const fs = require('fs');

const fichierSource = process.argv[2];
const fichierDestination = 'résultat.txt';

fs.readFile(fichierSource, "utf-8", (err, data) => {
    if (err !== null) {
        console.error(err);
    } else {
        let contenu = data;
        contenu = contenu.toLowerCase();
        console.log(contenu);
        fs.writeFile(fichierDestination, contenu, (errEcriture) => {
            console.error(errEcriture);
        });
    }
});