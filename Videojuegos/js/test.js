//Carga de pruebas
function loadData(){
	
	resetData();
	//Juego de datos
	let games = [
		["Videojuego numero 2" , 10,2,1],
		["Videojuego numero 7" , 40,2,1],
		["Videojuego numero 3" , 19,2,1],
		["Videojuego numero 1" , 12,1,2],
		["Videojuego numero 4" , 20,3,2],
		["Videojuego numero 13", 49,1,1],
		["Videojuego numero 6" , 18,1,3],
		["Videojuego numero 11", 11,2,3],
		["Videojuego numero 15", 38,3,3],
		["Videojuego numero 9" , 28,2,2],
		["Videojuego numero 10", 52,3,3],
		["Videojuego numero 14", 23,3,2],
		["Videojuego numero 8" , 39,1,2],
		["Videojuego numero 12", 17,2,1],
		["Videojuego numero 5" , 32,3,3]];
	
	//Muestro la cabecera
	document.getElementById("table-head").style.display = "";	
	//cargo el array de juegos en la biblioteca
	for (let game of games){
		let videogame = new Videogame(name, price, videoconsole, genre);
		//Genero un estado de disponibilidad aleatorio entre 1 y 3
		videogame.setAvailability(parseInt(Math.random() * 3) + 1);
		videogame.name = game[0]; 
		videogame.price = game[1]; 
		videogame.videoconsole = game[2]; 
		videogame.genre = game[3]; 
		gamesLibrary.push(videogame);
	}

	printLibrary();
}

//Limpiar la biblioteca
function resetData(){
	//genero un array vacio que sera el que guarde en la biblioteca
	currentGameId = null;
	gamesLibrary = [];
	printLibrary();
	//oculto la cabecera
	document.getElementById("table-head").style.display = "none";	
}
