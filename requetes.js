const { MongoClient } = require('mongodb');

// URL de connexion (ici on suppose que MongoDB est accessible depuis l'hôte)
const url = 'mongodb://localhost:27017';

// Nom de la base de données
const dbName = 'Eval_Foot';

async function main() {
    const client = new MongoClient(url);
    try {
        // Connexion au serveur MongoDB
        await client.connect();
        console.log("Connecté avec succès à MongoDB");
        
        const db = client.db(dbName);

        const joueurs = db.collection('Joueurs');
        const equipes = db.collection('Equipes');   
        const matchs = db.collection('Matchs');  

        // Requete permettant de trouver un joueur pour un poste donné à un age max. (Ici, on cherche les attaquants de plus de 28 ans)
        const result = await joueurs.find(
            { 
                $and: [
                    {"age" : {$gt:28}}, {"position" : "attaquant"}
                ]
            }
        ).toArray();

        // Afficher les résultats dans le terminal
        console.log("Joueurs trouvés :");
        result.forEach(joueur => {
            console.log(`- ${joueur.nom_joueur}, ${joueur.age} ans, ${joueur.position}`);
        });


    } catch (err) {
        console.error("Erreur:", err);
    } finally {
        // Fermer la connexion
        await client.close();
    }
}

main().catch(console.error);
