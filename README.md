# horloge

Ce projet est un projet d'horloge responsive, avec création et gestion d'alarmes

Niveau BDD il faut une BDD MongoDB avec cette configuration : mongodb://localhost:27017/volta pour le faire tourner en local

Pour lancer le backend : npm start
Pour lancer le frontend : npm start

Le frontend est accessible sur localhost:3000
Le backend est accessible sur localhost:3001

Axe d'améliorations :
Backend, meilleure gestion des erreurs, test, ajout de validations et de mappeurs, finir l'archi hexagonale ..

Frontend, clean du code existant (pas mal de création de fonctions, variables que je n'ai pas forcément eu le temps de faire, certaines sont notés avec un TODO), ajout de nouvelles fonctionalités comme le changement d'horaires, gestion des exceptions renvoyées par le backend, changement de musique et du temps de musique, possibilité d'arrêter l'alarme, réglage de l'algorithme qui calcule la prochaine alarme...

Déploiement simplifié avec docker et ou kubernetes
