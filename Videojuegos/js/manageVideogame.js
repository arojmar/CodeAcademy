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
	gamesLibrary.sort(
		function(a, b){
 			let result = a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
	}
	);
	document.getElementById("head-id-down").style.display = "none";
	document.getElementById("head-id-up").style.display = "";
	printLibrary();
}

function printGame(game){

	let tr = document.createElement("tr");
	tr.id = game.id;
	if (game.getAvailability() == Videogame.AVAILABILITY_RENT){
		tr.setAttribute("class", "text-primary bg-rented");		
	}
	if(game.getAvailability() == Videogame.AVAILABILITY_SOLD){
		tr.setAttribute("class", "text-danger bg-sold");
	}
	
	let tdName = document.createElement("th");
	tdName.innerHTML = game.name;
	tr.appendChild(tdName);
	
	let tdPrice = document.createElement("td");
	tdPrice.innerHTML = game.price + "€";
	tr.appendChild(tdPrice);
	
	let tdVideoconsole = document.createElement("td");
	tdVideoconsole.innerHTML = game.printVideoconsole();
	tr.appendChild(tdVideoconsole);
	
	let tdGenre = document.createElement("td");
	tdGenre.innerHTML = game.printGenre();
	tr.appendChild(tdGenre);
	
	
	//Boton de alquiler
	let rentButton = document.createElement("input");
	//Cambio el color del boton en funcion de la disponibilidad
	let colorButtonRent = null;
	if (game.getAvailability() == Videogame.AVAILABILITY_AVAILABLE) {
		colorButtonRent = "btn-success";	
	}
	else {
		colorButtonRent = "btn-primary";
	}

	rentButton.setAttribute("class", 
		"btn col font-weight-bold m-0 " + colorButtonRent + "");
	rentButton.type = "button";
	rentButton.value = game.printAvailability();
	rentButton.addEventListener("click", 
		function(){
			rentVideogame(game.id);
		} 
	);	
	//Boton de vender
	
	let sellButton = document.createElement("input");
	if (game.getAvailability() == Videogame.AVAILABILITY_SOLD){
		sellButton.value = game.printAvailability();
		sellButton.setAttribute("disabled", true);
	}
	else {
		sellButton.value = "Vender";
		if (game.getAvailability() == Videogame.AVAILABILITY_RENT) {
			sellButton.setAttribute("disabled", true);
		}
	}
	sellButton.setAttribute("class", 
		"btn btn-danger col font-weight-bold m-0");
	sellButton.type = "button";
	sellButton.addEventListener("click", 
		function(){
			sellVideogame(game.id);
		} 
	);
	
	let tdButtons = document.createElement("td");
	
	let divButtons = document.createElement("div");
	divButtons.setAttribute("class", "col d-flex");
	let divInputRent = document.createElement("div");
	divInputRent.setAttribute("class", "col mr-2");
	let divInputSell = document.createElement("div");
	divInputSell.setAttribute("class", "col ml-2");
	
	if (game.getAvailability() != Videogame.AVAILABILITY_SOLD){
		divButtons.appendChild(divInputRent);
		divInputRent.appendChild(rentButton);
	}
	divButtons.appendChild(divInputSell);
	divInputSell.appendChild(sellButton);
	tdButtons.appendChild(divButtons);
	tr.appendChild(tdButtons);

	document.getElementById("table-tbody").appendChild(tr);
	
}

function loadData(){
	
	let games = [
		["Video	juego numero 2",10,2,1],
		["Video	juego numero 7",40,2,1],
		["Video	juego numero 3",19,2,1],
		["Video	juego numero 1",12,1,2],
		["Video	juego numero 4",20,3,2],
		["Video	juego numero 13",49,1,1],
		["Video	juego numero 6",18,1,3],
		["Video	juego numero 11",11,2,3],
		["Video	juego numero 15",38,3,3],
		["Video	juego numero 9",28,2,2],
		["Video	juego numero 10",52,3,3],
		["Video	juego numero 14",23,3,2],
		["Video	juego numero 8",39,1,2],
		["Video	juego numero 12",17,2,1],
		["Video	juego numero 5",32,3,3]];
	
	document.getElementById("table-head").style.display = "";	
	for (let game of games){
		let videogame = new Videogame(name, price, videoconsole, genre);
		videogame.setAvailability(Videogame.AVAILABILITY_AVAILABLE);
		videogame.name = game[0]; 
		videogame.price = game[1]; 
		videogame.videoconsole = game[2]; 
		videogame.genre = game[3]; 
		gamesLibrary.push(videogame);
	}
	
	printLibrary();
}

function resetData(){
	
	let games = [];
	gamesLibrary = games;
	printLibrary();
	document.getElementById("table-head").style.display = "none";	
}



