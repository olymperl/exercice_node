const fs = require('fs');

const fichierSource = process.argv[2]; // nom de fichier récupéré depuis arguments de ligne de commande
const fichierDestination = 'résultat.txt';

async function lireFichier(nomFichier) {
  return await fs.promises.readFile(nomFichier, "utf-8");

}

(async function () {

    try {
        let contenu = await lireFichier(fichierSource);
        contenu = contenu.toLowerCase();
        console.log(contenu);

        await fs.promises.writeFile(fichierDestination, contenu);

    } catch (err) {
        console.error(err);
    }
})();