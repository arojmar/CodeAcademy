/** MOSTRAR INFORMACION **/

/* FUNCION DE IMPRIMIR LA BIBLIOTECA DE JUEGOS */
function printLibrary(){
	// se resetea la tabla
	document.getElementById("table-tbody").innerHTML = "";
	
	let library = getGamesLibrary();
	// se resetea la cabecera de la tabla
	document.getElementById("table-head").style.display = "";
	
	// se ejecuta la impresion de cada juego
	for (let game of library){
		printGame(game);
	}
	
}

/* FUNCION DE IMPRIMIR UN JUEGO */
function printGame(game){
		
	// Creo la fila de la tabla
	let tr = document.createElement("tr");
	// se añade el id a la fila, asi se tiene el tr identificado esta 
	// identificacion sirve para que luego al modificar datos en la tabla,
	// se sepa que fila se tiene que modificar
	tr.id = game.id; 
	
	// se pinta el color del texto y del background en funcion de la
	// disponibilidad del juego
	if (game.getAvailability() == Videogame.AVAILABILITY_RENT){
		tr.setAttribute("class", "text-primary bg-rented");	// AZUL-ALQUILADO	
	}
	if(game.getAvailability() == Videogame.AVAILABILITY_SOLD){
		tr.setAttribute("class", "text-danger bg-sold"); //ROJO-VENDIDO
	}
	// Se definen las celdas que se van a crear
	let tdEdit = document.createElement("td");
	let tdName = document.createElement("th");
	let tdPrice = document.createElement("td");
	let tdVideoconsole = document.createElement("td");
	let tdGenre = document.createElement("td");

	/* PINTAR LA TABLA PARA EDITAR */
	// Si se encuentra el id del juego que se quiere editar (variable global)
	if (game.id == currentGameId){
		
		// se asigna la clase para pintar el color de la fila en estado Vendido
		tr.setAttribute("class", "text-primary bg-warning");
		// se da el rol de formulario a la fila, para poder utilizar la fila
		// para editar
		tr.setAttribute('role','form');
		// Aqui se cambia el icono, que sirve para guardar y de submit del form
		tdEdit.innerHTML = "<i class='far fa-save'></i>";
		
		// se coloca el rol de submit para que al clickar sobre esta celda
		// sirva como boton 
		tdEdit.setAttribute('role', 'button');
		tdEdit.setAttribute('class', 'text-center h3');
		
		// se asigna el evento click para que se ejecute la funcion editGame
		// cuando se hace click pasandole el ID
		tdEdit.setAttribute('onclick', 'editGame("'+ game.id +'");');
		tr.appendChild(tdEdit);
		
		// Se crea el input del nombre, y se mete como valor el actual
		// y se coloca debajo del tr (el input se crea con la funcion
		// inputToReplace()
		tdName.appendChild(inputToReplace(game.name, "name"));
		tr.appendChild(tdName);
		
		// Se crea el input de Price , y se mete como valor el actual
		tdPrice.appendChild(inputToReplace(game.price, "price"));
		tr.appendChild(tdPrice);
		
		// Se crea el input de Videoconsole, y se mete como valor el actual
		tdVideoconsole.appendChild(
			selectToReplace(game.videoconsole, "videoconsole"));
		tr.appendChild(tdVideoconsole);
		
		// Se crea el input de Genre, y se mete como valor el actual
		tdGenre.appendChild(selectToReplace(game.genre, "genre"));
		tr.appendChild(tdGenre);
		tr.appendChild(document.createElement("td"));		
		
		// Una vez añadido todo a la fila se pinta debajo de la etiqueta table
		document.getElementById("table-tbody").appendChild(tr);
		
	}
	else {
		// Si no se va a editar y no esta vendido, se pinta normalmente
		if (!currentGameId && 
			game.getAvailability() != Videogame.AVAILABILITY_SOLD){
			// Se añade la imagen, el evento click con la llamada de funcion y  
			// el rol de boton para que al pinchar sobre ella (img) se ejecute
			tdEdit.innerHTML = "<i class='fas fa-edit'></i>";
			tdEdit.setAttribute('onclick', 'editGame("'+ game.id +'");');
			tdEdit.setAttribute('role', 'button');
		}
		// si esta vendido, se pinta el boton eliminar de la base de datos
		if(game.getAvailability() == Videogame.AVAILABILITY_SOLD){
			tdEdit.innerHTML = "<i class='fas fa-trash-alt'></i>";
			tdEdit.setAttribute('onclick', 'deleteGame("'+ game.id +'");');
			tdEdit.setAttribute('role', 'button');
		}
		// se da formato a la celda
		tdEdit.setAttribute('class', 'text-center h3');
		tr.appendChild(tdEdit);
		// se añade la celda con el nombre
		tdName.innerHTML = game.name;
		tr.appendChild(tdName);
		// se añade la celda con el precio y se añade el simbolo del euro
		tdPrice.innerHTML = game.price + "€";
		tr.appendChild(tdPrice);
		// se añade la celda con el nombre de la videoconsola
		tdVideoconsole.innerHTML = game.printVideoconsole();
		tr.appendChild(tdVideoconsole);
		// se añade la celda con el genero
		tdGenre.innerHTML = game.printGenre();
		tr.appendChild(tdGenre);
		// se imprime los botones
		tr.appendChild(getButtonsToPrint(game));
		document.getElementById("table-tbody").appendChild(tr);
	}	
}

/** BOTONES **/
/* FUNCION PARA IMPRIMIR LOS BOTONES */
function getButtonsToPrint(game){
	
	// Se crea la celda donde se imprimiran los botones
	let tdButtons = document.createElement("td");
	// Se le da formato con bootstrap, creando una capa para los botones
	let divButtons = document.createElement("div");
	divButtons.setAttribute("class", "col d-flex");
	// se crea la capa para el boton ALQUILER
	let divInputRent = document.createElement("div");
	divInputRent.setAttribute("class", "col mr-2");
	// se crea la capa para el boton VENDER
	let divInputSell = document.createElement("div");
	divInputSell.setAttribute("class", "col ml-2");
	
	// Si el videojuego no esta vendido, se añaden las capas de los botones
	if (game.getAvailability() != Videogame.AVAILABILITY_SOLD){
		// se añade la capa de alquiler
		divButtons.appendChild(divInputRent);
		// se le añade el boton con la funcion getRentButtonToPrint
		divInputRent.appendChild(getRentButtonToPrint(game));
	}
	//se añade la capa de vender y el boton con la misma funcion que en alquiler
	divButtons.appendChild(divInputSell);
	divInputSell.appendChild(getSellButtonToPrint(game));
	
	// se añade el contenido dentro de la celda
	tdButtons.appendChild(divButtons);
	
	return tdButtons;
	
}

/* FUNCION BOTON DE ALQUILER */
function getRentButtonToPrint(game){
	
	let rentButton = document.createElement("input");
	// Se cambia el color del boton en funcion de la disponibilidad
	let colorButtonRent = null;
	//Se pinta de color verde el boton, si esta disponible o si el status es 
	// disponible para vender
	if (game.getAvailability() == Videogame.AVAILABILITY_AVAILABLE) {
		colorButtonRent = "btn-success";	
	}
	else {
		colorButtonRent = "btn-primary";
	}
	// se da formato al boton en funcion de si esta disponible o para alquilar
	rentButton.setAttribute("class", 
		"btn col font-weight-bold m-0 " + colorButtonRent + "");
	// otra forma de poner los atributos al html (lo mismo que si ponemos
	// el codigo rentButton.setAtributte('type','button')
	rentButton.type = "button";
	// se imprime dentro del boton el valor que tiene la disponibilidad del 
	// juego en ese momento, es decir "Disponible" o "Alquilado"
	rentButton.value = game.printAvailability();
	// otra forma de poner el atributo de añadir un evento al html
	// al igual que rentButton.setAtributte('onclick', 'rentVideogame(game.id)')
	rentButton.addEventListener("click", 
		function(){
			rentVideogame(game.id);
		} 
	);	
	return rentButton;
}

/* FUNCION BOTON DE VENDER */
function getSellButtonToPrint(game){
		
	let sellButton = document.createElement("input");
	// Si el videojuego esta vendido
	if (game.getAvailability() == Videogame.AVAILABILITY_SOLD){
		// se imprime el valor "Vendido" en la etiqueta del boton
		sellButton.value = game.printAvailability();
		// se pone el boton como no disponible
		sellButton.setAttribute("disabled", true);
	}
	else {
		// si el juego no esta vendido, imprimira el valor Vender en el boton
		sellButton.value = "Vender";
		// Si esta alquilado, este boton se pondra como no disponible 
		if (game.getAvailability() == Videogame.AVAILABILITY_RENT) {
			sellButton.setAttribute("disabled", true);
		}
	}
	//se le da formato al boton con bootstrap y se le pasan los atributos
	sellButton.setAttribute("class", 
		"btn btn-danger col font-weight-bold m-0");
	sellButton.type = "button";
	sellButton.addEventListener("click", 
		function(){
			sellVideogame(game.id);
		});
	return sellButton;
}

/** MODO EDICION **/

/* FUNCION DE IMPRIMIR UN INPUT PARA EL MODO EDICION */
function inputToReplace(valueToReplace, elementName){
	// se crea el imnput y se le asigna el id + el nombre del elemento
	// esto nos sirve de identificador para cuando recojamos las modificaciones 
	// que se han hecho en el videojuego, tener localizado cada uno de ellos
	let inputToReplace = document.createElement("input");
	inputToReplace.setAttribute("id", currentGameId + elementName);
	inputToReplace.setAttribute("class", "form-control");
	inputToReplace.setAttribute("type", "text");
	
	// aqui se le añade el valor existente en esa celda de la tabla
	// es decir en la celda nombre, aparecera el nombre del juego y asi el resto
	inputToReplace.setAttribute("value", valueToReplace);
	
	return inputToReplace;
}


/* FUNCION QUE SIRVE PARA CREAR EL SELECT DEL MODO EDICION */
// Se crea un select dinamico, recibiendo las opciones y cual esta seleccionada
// se necesita dar un valor selected, para saber que opcion es por defecto
function selectToReplace(selected, elementName){
	// Se crea el elemento select
	let selectToReplace = document.createElement("select");
	
	// se le pasas el id que se compone del ID del juego mas el nombre del
	// elemento que se va a crear (tipo de consola o genero) 
	selectToReplace.setAttribute('id', currentGameId + elementName);
	
	// Se le da un formato visual con clases de bootstrap
	selectToReplace.setAttribute('class','form-control');
	
	//Se crean las opciones del mismo
	let option1 = document.createElement("option");
	option1.value = "1";
	let option2 = document.createElement("option");
	option2.value = "2";
	let option3 = document.createElement("option");
	option3.value = "3";

	// Si el elementName es genero, se imprime el genero, sino videoconsola
	if (elementName == "genre"){
		option1.innerHTML = Videogame.GENRE_ACTION_NAME;
		option2.innerHTML = Videogame.GENRE_PLATFORM_NAME;
		option3.innerHTML = Videogame.GENRE_FPS_NAME;
	}
	else {
		option1.innerHTML = Videogame.CONSOLE_XBOX_NAME ;
		option2.innerHTML = Videogame.CONSOLE_PS4_NAME;
		option3.innerHTML = Videogame.CONSOLE_SWITCH_NAME;
	}

	// en el caso de selected, es para recoger cual de los elementos esta
	// seleccionado previamente, que sera el que se muestre en el modo edicion
	switch(selected){
		case 1:
			option1.setAttribute('selected', true);
			break;
		case 2:
			option2.setAttribute('selected', true);
			break;
		case 3:
			option3.setAttribute('selected', true);
			break;
	}
	
	//se añaden las etiquetas option dentro del select
	selectToReplace.appendChild(option1);
	selectToReplace.appendChild(option2);
	selectToReplace.appendChild(option3);
	
	return selectToReplace;
}


