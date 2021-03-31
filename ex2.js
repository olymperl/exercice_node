const fs = require('fs');

const fichierSource = process.argv[2];
const fichierDestination = 'résultat.txt';

function lireFichier(nomFichier) {
  const promise = fs.promises.readFile(nomFichier, "utf-8");
  return promise;
}
const promise = lireFichier(fichierSource);

promise

    .then((contenu) => {
        contenu = contenu.toLowerCase();
        console.log(contenu);
        return fs.promises.writeFile(fichierDestination, contenu);
    })
    .catch((err) => {
        console.error(err);
    });