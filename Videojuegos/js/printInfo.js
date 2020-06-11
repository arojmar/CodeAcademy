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

function printGame(game){
	
	
	//Creo al fila
	let tr = document.createElement("tr");
	tr.id = game.id; //le añado el id a la fila, asi tengo la tengo identificada
	//pinto el color del texto y del background dependiendo de la disponibilidad
	if (game.getAvailability() == Videogame.AVAILABILITY_RENT){
		tr.setAttribute("class", "text-primary bg-rented");		
	}
	if(game.getAvailability() == Videogame.AVAILABILITY_SOLD){
		tr.setAttribute("class", "text-danger bg-sold");
	}
	//Defino los elementos que voy a crear
	let tdEdit = document.createElement("td");
	let tdName = document.createElement("th");
	let tdPrice = document.createElement("td");
	let tdVideoconsole = document.createElement("td");
	let tdGenre = document.createElement("td");

	//PINTAR LA TABLA PARA EDITAR
	if (game.id == currentGameId){
		
		//Defino el formulario sobre el que se va a cargar los valores actuales
		//y sobre el que vamos a editar
		//let formUpdate = document.createElement("form");
		tr.setAttribute("class", "text-primary bg-warning");
		tr.setAttribute('role','form');
		//Aqui se cambia el icono, que nos sirve para guardar y como submit
		tdEdit.innerHTML = "<i class='far fa-save'></i>";
		
		//le coloco el rol de submit para que me sirva para actualizar los datos
		tdEdit.setAttribute('role', 'button');
		tdEdit.setAttribute('class', 'text-center h3');
		tdEdit.setAttribute('onclick', 'editGame("'+ game.id +'");');
		tr.appendChild(tdEdit);
		//Creo el input del nombre, y le meto como valor el actual
		//y lo coloco debaja del tr
		tdName.appendChild(inputToReplace(game.name, "name"));
		tr.appendChild(tdName);
		
		//Creo el input de Price y le meto como valor el actual
		tdPrice.appendChild(inputToReplace(game.price, "price"));
		tr.appendChild(tdPrice);
		
		//Creo el input de Videoconsole, y le meto como valor el actual
		tdVideoconsole.appendChild(
			selectToReplace(game.videoconsole, "videoconsole"));
		tr.appendChild(tdVideoconsole);
		
		//Creo el input de Genre, y le meto como valor el actual
		tdGenre.appendChild(selectToReplace(game.genre, "genre"));
		tr.appendChild(tdGenre);
		tr.appendChild(document.createElement("td"));		
		//formUpdate.appendChild(tr);
		document.getElementById("table-tbody").appendChild(tr);
		
	}
	else {//PINTA SOLO
		if (!currentGameId){
			tdEdit.innerHTML = "<i class='fas fa-edit'></i>";
			tdEdit.setAttribute('onclick', 'editGame("'+ game.id +'");');
		}
		//añado el boton de edicion
		tdEdit.setAttribute('class', 'text-center h3');
		tdEdit.setAttribute('role', 'button');
		tr.appendChild(tdEdit);
		//añado la celda con el nombre
		tdName.innerHTML = game.name;
		tr.appendChild(tdName);
		//añado la celda con el precio y le añado el simbolo del euro
		tdPrice.innerHTML = game.price + "€";
		tr.appendChild(tdPrice);
		//añado la celda con el nombre de la videoconsola
		tdVideoconsole.innerHTML = game.printVideoconsole();
		tr.appendChild(tdVideoconsole);
		//añado la celda con el genero
		tdGenre.innerHTML = game.printGenre();
		tr.appendChild(tdGenre);
		//imprimo los botones
		tr.appendChild(getButtonsToPrint(game));
		document.getElementById("table-tbody").appendChild(tr);
	}	
}

//Crea un select dinamico, recibiendo las opciones y cual esta seleccionado
function selectToReplace(selected, elementName){
	
	let selectToReplace = document.createElement("select");
	selectToReplace.setAttribute('id', currentGameId + elementName);
	selectToReplace.setAttribute('class','form-control');
	let option1 = document.createElement("option");
	option1.value = "1";
	let option2 = document.createElement("option");
	option2.value = "2";
	let option3 = document.createElement("option");
	option3.value = "3";

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
	
	selectToReplace.appendChild(option1);
	selectToReplace.appendChild(option2);
	selectToReplace.appendChild(option3);
	
	return selectToReplace;
}


function inputToReplace(valueToReplace, elementName){
	
	let inputToReplace = document.createElement("input");
	inputToReplace.setAttribute("id", currentGameId + elementName);
	inputToReplace.setAttribute("class", "form-control");
	inputToReplace.setAttribute("type", "text");
	inputToReplace.setAttribute("value", valueToReplace);
	
	return inputToReplace;
}

function getButtonsToPrint(game){
	
	let tdButtons = document.createElement("td");
	
	let divButtons = document.createElement("div");
	divButtons.setAttribute("class", "col d-flex");
	let divInputRent = document.createElement("div");
	divInputRent.setAttribute("class", "col mr-2");
	let divInputSell = document.createElement("div");
	divInputSell.setAttribute("class", "col ml-2");
	
	if (game.getAvailability() != Videogame.AVAILABILITY_SOLD){
		divButtons.appendChild(divInputRent);
		divInputRent.appendChild(getRentButtonToPrint(game));
	}
	divButtons.appendChild(divInputSell);
	divInputSell.appendChild(getSellButtonToPrint(game));
	tdButtons.appendChild(divButtons);
	
	return tdButtons;
	
}

//Boton de alquiler
function getRentButtonToPrint(game){
	let rentButton = document.createElement("input");
	//Cambio el color del boton en funcion de la disponibilidad
	let colorButtonRent = null;
	//Pinta de color verde el boton, si esta disponible o si el status es 
	//disponible para vender
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
	
	return rentButton;
}

//Boton de vender
function getSellButtonToPrint(game){
	

	
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
		});
	return sellButton;
}


