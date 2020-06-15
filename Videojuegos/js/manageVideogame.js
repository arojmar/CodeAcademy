/*
*	Gestion de la bibilioteca de videojuegos
*/

/** COMPROBACIONES **/
// Devuelve el estado inicial a los input que fueron transformados cuando fueron 
// evaluados y no encontraron la info adecuada o estaban vacios
function restoreStatus(elementToRestore) {
	document.getElementById(elementToRestore).style.border = "solid grey";
}

/* FUNCION PARA COMPROBAR QUE LOS CAMPOS INTRODUCIDOS SON CORRECTOS */
function checkFieldsForm(game) {
	let checking = false;
	if(game.name && game.price && game.videoconsole && game.genre
		&& !isNaN(game.price)){
			checking = true;
	}
	// se hacen las comprobaciones para no introducir datos incorrectos y para 
	// que los campos no esten vacios
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

/** FUNCIONALIDADES PRINCIPALES **/

/* FUNCION AÑADIR JUEGO A LA BASE DE DATOS */
function addVideoGame() {
	// Se toman los elementos del formulario
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
	let videoconsole = document.getElementById("videoconsole").value;
	// Se comprueba que el checkbox esta selecionado
	let genre = document.querySelector('input[name="genre"]:checked').value;
	
	let game = new Videogame(name, price, videoconsole, genre);
	// se comprueba que estan todos los campos y el precio es un numero
	if(checkFieldsForm(game)){
		game.setAvailability(Videogame.AVAILABILITY_AVAILABLE);
		sendDataToServer(game);
		printLibrary();
		document.getElementsByTagName("form")[0].reset();
	}	
}

/* FUNCION EDITAR UN JUEGO*/
function editGame(id){
	// Si no existe el currentGameId, es que se va a habilitar los campos para 
	// editar, es decir, que apareceran las celdas con el input para meter los
	// datos
	if (currentGameId){	
		// busco el elemento a editar dentro de la bibilioteca
		for (let game of gamesLibrary){

			if (game.id == currentGameId){
				// si coincide, entonces le paso el valor de la celda al objeto
				// juego, que es el contendra la informacion ya modificada, de 
				// uno de los elementos (nombre, precio, consola y genero)
				game.name =
					document.querySelector("#" + currentGameId + "name").value;
				game.price = parseFloat(
					document.querySelector("#" +currentGameId + "price").value);
				game.videoconsole = parseInt(
					document.querySelector("#" + currentGameId + "videoconsole")	
					.value);
				game.genre = parseInt(
					document.querySelector("#" + currentGameId +"genre").value);
				// se envian los datos al servidor, para actualizar este nuevo
				// objeto juego dentro de la biblioteca
				sendDataToServer(game);
			}
		}
		// una vez actualizado, vuelvo a poner a null el valor del currentGameId 
		currentGameId = null;
	}
	else {
		// como se ha pinchado en editar, pues se asigna el valor del id
		// actualizado a la variable global, para que se pueda pintar
		currentGameId = id;
	}
		printLibrary();
}

/* FUNCION ALQUILAR JUEGO */
function rentVideogame(id){
	
	// se busca a traves del id el juego y se modifica el estado del mismo en 
	// la biblioteca
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

/* FUNCION VENDER JUEGO */
function sellVideogame(id){

	// se busca a traves del id el juego y se modifica el estado del mismo en 
	// la biblioteca
	for (let game of gamesLibrary){
		if (game.id == id){
			if (game.getAvailability() == Videogame.AVAILABILITY_AVAILABLE){
				game.setAvailability(Videogame.AVAILABILITY_SOLD);
			}
		}
	} 
	printLibrary();
	
}

/* FUNCION BORRAR JUEGO DE LA BASE DE DATOS */
function deleteGame(id){

	deleteVideogame(id);
	printLibrary();
}


/* FUNCION DE ORDENACION */
// se le pasa tanto el elemento a ordenar, que puede ser nombre, precio, etc..
// como el orden que se quiere, ascendente o descendente
function orderByName(name, order){
	// se utiliza la funcion sort, con la variacion de que dentro del array de
	// libreria, me seleccione el elemento a comparar dentro de cada 
	// array videojuegos y en funcion del orden, lo haga en un sentido o en otro
	gamesLibrary.sort(
			function(a, b){
				let result = 0;
				// se estable que elemento comparar (nombre, precio, consola,..)
				if(a[name] < b[name]){
					result = 1;
					// y aqui el orden que se tomara
					if(order == "desc"){
						result = -1;
					}
				}
				else if(a[name] > b[name]){
					result = -1;
					if(order == "desc"){
						result = 1;
					}
				}
				return result;
			});
	// se cambiara el estado del cada uno de los iconos en funcion de como se
	// vaya a ordenar
	if(order == "asc"){
		document.getElementById("head-" + name + "-down").style.display = "none";
		document.getElementById("head-" + name + "-up").style.display = "";
	}
	else {
		document.getElementById("head-" + name + "-down").style.display = "";
		document.getElementById("head-" + name + "-up").style.display = "none";
	}
	printLibrary();
}



