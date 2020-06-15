/** MOCK DEL SERVIDOR **/

/* FUNCION PARA GUARDAR LOS DATOS EN EL SERVER */
function sendDataToServer(videogame){
	
	console.log("En el server");
	console.log(videogame);
	let position = -1;
	// Busca el ID dentro de la base de datos (array) que coincida con el ID 
	// suministrado y guarda la posicion
	for (let i = 0; i < gamesLibrary.length && position == -1; i ++){
		if(videogame.id == gamesLibrary[i].id){
			position = i;
		}
	}  
	// si no existe la posicion, se guarda al final del array
	if (position == -1){
		gamesLibrary.push(videogame);
	}
	else {
		// si por el contrario existe, se actualiza en la posicion almacenada
		gamesLibrary[position] = videogame;
	}
}
// Obtiene la informacion de un juego en concreto dentro de la base de datos
function getDataVideogameInServer(id){
	let gameToFind = null;
	
	// Busca dentro de la biblioteca y si coincide el ID se extrae el juego 
	for(let game of gamesLibrary){
		if(game.id == id){
			gameToFind = game;
		}
	}
	return gameToFind;
}

// Funcion que devuelve toda la libreria de juegos (SELECT * FROM library;)
function getGamesLibrary(){
	return gamesLibrary;
}

function deleteVideogame(id){
	let position = -1;
	// Busca el ID dentro de la base de datos (array) que coincida con el ID 
	// suministrado y guarda la posicion
	for (let i = 0; i < gamesLibrary.length && position == -1; i ++){
		if(gamesLibrary[i].id == id){
			position = i;
		}
	}  
	//Se elimina el elemento del array que hay en esa posicion
	gamesLibrary.splice(position, 1);
}