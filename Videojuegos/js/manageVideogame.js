/*
*	Gestion de la bibilioteca de videojuegos
*/

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

//TO-DO
function editGame(id){

	if (currentGameId){	
		for (let game of gamesLibrary){

			if (game.id == currentGameId){
				game.name =
					document.querySelector("#" + currentGameId + "name").value;
				game.price = parseFloat(
					document.querySelector("#" +currentGameId + "price").value);
				game.videoconsole = parseInt(
					document.querySelector("#" + currentGameId + "videoconsole")	
					.value);
				game.genre = parseInt(
					document.querySelector("#" + currentGameId +"genre").value);
				console.log("Antes del server");
				console.log(game);
				sendDataToServer(game);
			}
			
		}
		
		currentGameId = null;
	}
	else {
		currentGameId = id;
	}
		printLibrary();
}

//Alquilar un juego
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
//vender un juego
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

//TO-DO
function orderByName(name){
	let newLibrary = [];
	let index = 0;
	console.log(gamesLibrary);
	switch(name){
		case "head-name":
			index = 1;
			break;
		case "head-price":
			index = 2;
			break;
		case "head-videoconsole":
			index = 3;
			break;
		case "head-genre":
			index = 4;
			break;
	}
	
	for (let i = 0; i < gamesLibrary.length; i++){
			newLibrary[i] = gamesLibrary[i];
	}
	console.log(newLibrary);
	
	for (let i = 0; i < gamesLibrary.length; i++){
		
		gamesLibrary.sort(
			function(a, b){
				let result = 0;
				if(gamesLibrary[i]["name"] < gamesLibrary[i+1]["name"]){
					result = -1;
				}
				else if(gamesLibrary[i]["name"] > gamesLibrary[i+1]["name"]){
					result = 1;
			}});
	}
		console.log(gamesLibrary);
	document.getElementById("" + name + "-down").style.display = "none";
	document.getElementById("" + name + "-up").style.display = "";
	printLibrary();
}

function orderByNumber(name){
	gamesLibrary.sort(
		function(a, b){
 			let result = a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
	}
	);
	document.getElementById("" + name + "-down").style.display = "none";
	document.getElementById("" + name + "-up").style.display = "";
	printLibrary();
}



/* COMPROBACIONES */
//Devuelve el estado inicial a los input que fueron transformados cuando fueron 
//evaluados y no encontraron la info adecuada o estaban vacios
function restoreStatus(elementToRestore) {
	document.getElementById(elementToRestore).style.border = "solid grey";
}




