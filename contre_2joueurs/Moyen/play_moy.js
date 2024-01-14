
//Shuffle Tableau
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}
// Constructor Tile

class Tile{
	constructor(id){
		this.id = id;
		this.x = 0;
		this.y = 0;
		this.isRevealed = false;
	}
	setCoord(x,y){
		this.x = x;
		this.y = y;
	}
	
	display(){
		var carte = document.getElementById('carte-'+(this.x*5+this.y).toString() );
		
		if(this.id>0){
			if(this.isRevealed == false){
				carte.setAttribute('class','pile');
				carte.setAttribute('src',('../../Images/Pile/pile.png'));
			}else{
				carte.setAttribute('class','face');
				carte.setAttribute('src',('../../Images/Face/Moyen(5x5)/'+this.id.toString()+'.png'));
			}
		}

	}

	flipTile(){
		this.isRevealed = !(this.isRevealed);
		this.display();
	}

}

class Board {
	constructor(){
		this.tiles = [];
		this.largeur = 5;
		this.hauteur = 5;
		this.reset();
	}
	
	reveal(){
		return this.tiles.filter(function(t){
			return t.isRevealed;
		});
	}
	count(){
		return this.tiles.reduce(function(acc,element){
			if( element.id > 0){
				return acc +1;

			}else{
				return acc;
			}
		},0);
	}


	display(){
		var i , j ,k;
		var board = this;
		var cases;
		var block;
		var face;
		var joueur1 = 0;
		var joueur2 = 1;
		var joueur = 0;

		var score_joueur1=0;
		var score_joueur2=0;

		var score1 = document.getElementById("score1");
		score1.innerHTML = 0;
		var score2 = document.getElementById("score2");
		score2.innerHTML = 0;

		var plateau = document.getElementsByClassName("plateau")[0];
		plateau.innerHTML = "";

		var tower = document.getElementById("tour");
		tower.innerHTML = 1;

		for( i=0 ; i < this.largeur ; i+=1 ){
			cases = document.createElement('div');
			cases.setAttribute('class','ligne');
			plateau.appendChild(cases);

			for ( j = 0 ; j < this.hauteur ; j+=1){
				block = document.createElement('div');
				block.setAttribute('class','carte');

				block.addEventListener('click', function(e){
					if(joueur == joueur1){
						tower.innerHTML = 1;
						var index;
						if(e.target.id !== ""){
							index = e.target.id;
						}else{
							index = e.target.parentNode.id;
						}
						//on recup index
						index = parseInt(index.split('-')[1]);
						//on crée une liste vide
						var reveal = board.reveal();
						//On regarde si id existe , si elle n'a pas déjà était révélé et qu'il n'y a pas plus de 2 cartes révélé
						if(board.tiles[index].id > 0 && !board.tiles[index].isRevealed && reveal.length < 2){
							//on retourne la carte
							board.tiles[index].flipTile();
							//on la "sauvegarde"
							reveal.push(board.tiles[index]);
							//Quand on a nos deux carte on regarde si elles ont le même id
							if (reveal.length == 2){
								if(reveal[0].id == reveal[1].id){
									reveal.forEach(function(element){
										element.id = 0;
										element.isRevealed = false;
										element.display();
									});
									score_joueur1 +=1;
									score1.innerHTML = score_joueur1 ;
									//on les retourne si elles ne sont pas pareil
								}else{
									setTimeout(function(){
										reveal.forEach(function(element){
										element.flipTile();
										});
									}, 500);
									tower.innerHTML = 2;
									score1.innerHTML = score_joueur1 ;
									joueur = joueur2;
								}
								//Si il reste une carte alors la partie est gagnée
								if (board.count() < 2){
									if (score_joueur2 > score_joueur1){
										plateau.innerHTML = "<h1> Bravo ! Joueur 2 vous avez gagné ! </h1>";
									}else if(score_joueur2 == score_joueur1){
										plateau.innerHTML = "<h1> L'équilibre de la force vous avez ! </h1>"
									}else{
										plateau.innerHTML = "<h1> Bravo ! Joueur 1 vous avez gagné ! </h1>";
									}
								}
							}
						}
					}else if (joueur != joueur1){
						tower.innerHTML = 2;
						var index;
						if(e.target.id !== ""){
							index = e.target.id;
						}else{
							index = e.target.parentNode.id;
						}
						//on recup index
						index = parseInt(index.split('-')[1]);
						//on crée une liste vide
						var reveal = board.reveal();
						//On regarde si id existe , si elle n'a pas déjà était révélé et qu'il n'y a pas plus de 2 cartes révélé
						if(board.tiles[index].id > 0 && !board.tiles[index].isRevealed && reveal.length < 2){
							//on retourne la carte
							board.tiles[index].flipTile();
							//on la "sauvegarde"
							reveal.push(board.tiles[index]);
							//Quand on a nos deux carte on regarde si elles ont le même id
							if (reveal.length == 2){
								if(reveal[0].id == reveal[1].id){
									reveal.forEach(function(element){
										element.id = 0;
										element.isRevealed = false;
										element.display();
									});
									score_joueur2 +=1;
									score2.innerHTML = score_joueur2;
									//on les retourne si elles ne sont pas pareil
								}else{
									setTimeout(function(){
										reveal.forEach(function(element){
										element.flipTile();
										});
									}, 500);
									tower.innerHTML = 1;
									score2.innerHTML = score_joueur2;
									joueur = joueur1;

								}
								//Si il reste une carte alors la partie est gagnée
								if (board.count() < 2){
									if (score_joueur2 > score_joueur1){
										plateau.innerHTML = "<h1> Bravo ! Joueur 2 vous avez gagné ! </h1>";
									}else if(score_joueur2 == score_joueur1){
										plateau.innerHTML = "<h1> L'équilibre de la force vous êtes ! </h1>"
									}else{
										plateau.innerHTML = "<h1> Bravo ! Joueur 1 vous avez gagné ! </h1>";
									}
								}
							}
						}
					}
				});
				
			face =  document.createElement('img');
			face.setAttribute('id','carte-'+(i*5+j).toString());
			face.setAttribute('class','image');

			block.appendChild(face);
			plateau.appendChild(block);

			}
		}
		for (k=0; k < this.tiles.length ; k++){
			this.tiles[k].display();
		}
	}

	reset(){
		var carte;
		var tiles =[];
		var id = 1;
		var i = 0, j=0 , k = 0;
		
		//On attribut des id au carte
		for( k = 0; k < (this.largeur*this.hauteur);k++){
			carte = new Tile(id);
			tiles.push(carte);
			if( k %2 == 1){
				id +=1;
			}
		}
		//On mélange le deck
		this.tiles= shuffleArray(tiles);

		//Ensuite on lui attribues des nouvelles coordonnées
		
		for( i =0 ; i < this.largeur ; i+=1){
			for( j=0 ; j <this.hauteur;j+=1){
				this.tiles[i*5+j].setCoord(i,j);
			}
		}
	}
}

function rechargez(){
	window.location.reload(false);
}
function main(){
	plateau = new Board;
	plateau.display();
	var rejouez = document.getElementById("play");
	rejouez.addEventListener('click',rechargez,false);
}

window.onload = main;

