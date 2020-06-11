/*
*	Gestion de la bibilioteca de videojuegos
*/


/* MOCK SERVIDOR */

//Sirve para guardar en la base de datos un videojuego
function sendDataToServer(videogame){
	let position = -1;
	//Busca el ID dentro de la base de datos (array) que coincida con el ID 
	//suministrado y guarda la posicion
	for (let i = 0; i < gamesLibrary.length && position == -1; i ++){
		if(videogame.id == gamesLibrary[i].id){
			position = i;
		}
	}  
	//si no existe la posicion, se guarda al final del array
	if (position == -1){
		gamesLibrary.push(videogame);
	}
	else {
		//si por el contrario existe, se actualiza en la posicion almacenada
		gamesLibrary[position] = videogame;
	}
}
//Obtiene la informacion de un juego en concreto dentro de la base de datos
function getDataVideogameInServer(id){
	let gameToFind = null;
	
	//Busca dentro de la biblioteca y si coincide el ID se extrae el juego 
	for(let game of gamesLibrary){
		if(game.id == id){
			gameToFind = game;
		}
	}
	return gameToFind;
}

//Funcion que nos devuelve toda la libreria de juegos (SELECT * FROM library;)
function getGamesLibrary(){
	return gamesLibrary;
}

/* FUNCIONALIDADES PRINCIPALES */

//Se encarga de añadir los videojuegos a la base de datos
function addVideoGame() {
	
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
	let videoconsole = document.getElementById("videoconsole").value;
	let genre = document.querySelector('input[name="genre"]:checked').value;
	
	let game = new Videogame(name, price, videoconsole, genre);
	//Compruebo que estan todos los campos y el precio es un numero
	if(checkFieldsForm(game)){
		game.setAvailability(Videogame.AVAILABILITY_AVAILABLE);
		sendDataToServer(game);
		printLibrary();
		document.getElementsByTagName("form")[0].reset();
	}	
	//	else {
	//		game = getDataVideogameInServer(currentGameId);
	//		
	//		game.name = name;
	//		game.price = parseFloat(price);
	//		game.videoconsole = parseInt(videoconsole);
	//		game.genre = parseInt(genre);
	//	}
}

function checkFieldsForm(game) {
	let checking = false;
	if(game.name && game.price && game.videoconsole && game.genre
		&& !isNaN(game.price)){
			checking = true;
	}
	//Hago las comprobaciones para no introducir datos incorrectos y para que 
	//los campos no esten vacios
	else {
		if (!game.name){
			document.getElementById("name").style.border= '2px solid red';
		}
		if (!game.price || isNaN(game.price)){
			document.getElementById("price").style.border= '2px solid red';
		}
		if (!game.videoconsole){
			document.getElementById("videoconsole").style.border= '2px solid red';
		}
		if (!game.genre){
			document.getElementById("genre").style.border= '2px solid red';
		}
	}
	return checking;
}

function rentVideogame(id){

	for (let game of gamesLibrary){
		if (game.id == id){
			if (game.getAvailability() == Videogame.AVAILABILITY_RENT){
				game.setAvailability(Videogame.AVAILABILITY_AVAILABLE);
			}
			else {
				game.setAvailability(Videogame.AVAILABILITY_RENT);
			}
		}
	} 
	printLibrary();
	
}

function sellVideogame(id){
	
	/* SI SE QUIERE REMOVER DE LA BIBLIOTECA
	for (let i = 0; i < gamesLibrary.length; i++){
		if (gamesLibrary[i].id == id){
			if (gamesLibrary[i].getAvailability() 
				== Videogame.AVAILABILITY_AVAILABLE){
				gamesLibrary.splice(i, 1);
			}
		}
	} */
	
	for (let game of gamesLibrary){
		if (game.id == id){
			if (game.getAvailability() == Videogame.AVAILABILITY_AVAILABLE){
				game.setAvailability(Videogame.AVAILABILITY_SOLD);
			}
		}
	} 
	printLibrary();
	
}

/* COMPROBACIONES */
//Devuelve el estado inicial a los input que fueron transformados cuando fueron 
//evaluados y no encontraron la info adecuada o estaban vacios
function restoreStatus(elementToRestore) {
	document.getElementById(elementToRestore).style.border = "solid grey";
}

/* MOSTRAR INFORMACION */

//Aqui pinto todo lo hay dentro de la biblioteca
function printLibrary(){
	document.getElementById("table-tbody").innerHTML = "";
	
	let library = getGamesLibrary();
	document.getElementById("table-head").style.display = "";
	for (let game of library){
		printGame(game);
	}
	
}

function orderByName(){
	
	for (let game of gamesLibrary){
		
	}
}


