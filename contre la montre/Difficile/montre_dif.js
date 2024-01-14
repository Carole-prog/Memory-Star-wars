
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
		var carte = document.getElementById('carte-'+(this.x*7+this.y).toString() );
		
		if(this.id>0){
			if(this.isRevealed == false){
				carte.setAttribute('class','pile');
				carte.setAttribute('src',('../../Images/Pile/pile.png'));
			}else{
				carte.setAttribute('class','face');
				carte.setAttribute('src',('../../Images/Face/Difficile (7x7)/'+this.id.toString()+'.png'));
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
		this.largeur = 7;
		this.hauteur = 7;
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
		var score=0;
		var tentative=0;
		var face;

		var plateau = document.getElementsByClassName("plateau")[0];
		plateau.innerHTML = "";

		var temps = 300;
    	var timerElement = document.getElementById("timer");

		var timer = setInterval(() => {
			let minutes = parseInt(temps / 60, 10)
			let secondes = parseInt(temps % 60, 10)
		  
			minutes = minutes < 10 ? "0" + minutes : minutes
			secondes = secondes < 10 ? "0" + secondes : secondes
		  
			timerElement.innerText = "Timer : " +`${minutes}:${secondes}`
			if (temps == 0){
				plateau.innerHTML = "<h1> vous avez perdu </h1>";
			}
			temps = temps <= 0 ? 0 : temps - 1
			
		  }, 1000);

		for( i=0 ; i < this.largeur ; i+=1 ){
			cases = document.createElement('div');
			cases.setAttribute('class','ligne');
			plateau.appendChild(cases);

			for ( j = 0 ; j < this.hauteur ; j+=1){
				block = document.createElement('div');
				block.setAttribute('class','carte');

				block.addEventListener('click', function(e){
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
							tentative++;
							if(reveal[0].id == reveal[1].id){
								reveal.forEach(function(element){
									element.id = 0;
									element.isRevealed = false;
									element.display();
								});
								score+=1;
								//on les retourne si elles ne sont pas pareil
							}else{
								setTimeout(function(){
									reveal.forEach(function(element){
									element.flipTile();
									});
								}, 500);
							}
							//Si il reste une carte alors la partie est gagnée
							if (board.count() < 2){
								clearInterval(timer);
								
								// Temps
								var text = timerElement.innerHTML;
								var minute = text.split(":")[1];
								var seconde = text.split(":")[2];

								var time = minute.toString() + ":" + seconde.toString();

								//Pseudo
								var pseudo = prompt("Entrez votre pseudo");

								//ajout dans le tableau
								var table1 = document.getElementById("temps");
								var table2 = document.getElementById("coups");
								
								let ligne_coups = document.createElement("tr");
								let cellule = document.createElement("td");
								let cellule2 = document.createElement("td");
								let cellule3 = document.createElement("td");

								let ligne_temps = document.createElement("tr");
								let cellule_bis = document.createElement("td");
								let cellule2_bis = document.createElement("td");
								let cellule3_bis = document.createElement("td");

								cellule.innerHTML = "1";
								ligne_coups.appendChild(cellule);

								cellule_bis.innerHTML = "1";
								ligne_temps.appendChild(cellule_bis);

								cellule2.innerHTML = pseudo;
								ligne_coups.appendChild(cellule2);

								cellule2_bis.innerHTML = pseudo;
								ligne_temps.appendChild(cellule2_bis);

								cellule3.innerHTML = tentative;
								ligne_coups.appendChild(cellule3);

								cellule3_bis.innerHTML = time ;
								ligne_temps.appendChild(cellule3_bis);

								table2.appendChild(ligne_coups);
								table1.appendChild(ligne_temps);
	
								
								plateau.innerHTML = "<h1> You Win ! </h1> <br></br> <h1> Tentatives : "+ tentative + "</h1> <br></br> <h1> Score : "+score+"</h1>";
							}
						}
					}
				},true);
				
			face =  document.createElement('img');
			face.setAttribute('id','carte-'+(i*7+j).toString());
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
				this.tiles[i*7+j].setCoord(i,j);
			}
		}
	}
}

function main(){
	plateau = new Board;
	plateau.display();
}

window.onload = main;

