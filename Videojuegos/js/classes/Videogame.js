function Videogame(name, price, videoconsole, genre){
	this.id = (new Date().getTime() + setTimeout(parseInt(Math.random())+1)).toString(36);
	this.name = name;
	this.price = parseFloat(price);
	this.videoconsole = parseInt(videoconsole);	
	this.genre = parseInt(genre);
	this.availability = null;

	Videogame.prototype.printVideoconsole = function(){
		let result = "ERROR";

		switch(this.videoconsole){
			case Videogame.CONSOLE_XBOX:
				result = Videogame.CONSOLE_XBOX_NAME;
				break;
			case Videogame.CONSOLE_PS4:
				result = Videogame.CONSOLE_PS4_NAME;
				break;
			case Videogame.CONSOLE_SWITCH:
				result = Videogame.CONSOLE_SWITCH_NAME;
				break;
		}
		
		return result;
	}
	
	Videogame.prototype.printGenre = function(){
		let result = "ERROR";
		
		switch(this.genre){
			case Videogame.GENRE_ACTION:
				result = Videogame.GENRE_ACTION_NAME;
				break;
			case Videogame.GENRE_PLATFORM:
				result = Videogame.GENRE_PLATFORM_NAME;
				break;
			case Videogame.GENRE_FPS:
				result = Videogame.GENRE_FPS_NAME;
				break;
		}
		
		return result;
	}
	Videogame.prototype.setAvailability = function(availability){
		this.availability = availability;
	}
	
	Videogame.prototype.getAvailability = function(){
		return this.availability;
	}
	
	Videogame.prototype.printAvailability = function(){
		let result = "ERROR";
		
		switch(this.availability){
			case Videogame.AVAILABILITY_AVAILABLE:
				result = Videogame.AVAILABILITY_AVAILABLE_NAME;
				break;
			case Videogame.AVAILABILITY_RENT:
				result = Videogame.AVAILABILITY_RENT_NAME;
				break;
			case Videogame.AVAILABILITY_SOLD:
				result = Videogame.AVAILABILITY_SOLD_NAME;
				break;
		}
		
		return result;
	}

}

Videogame.CONSOLE_XBOX = 1;
Videogame.CONSOLE_PS4 = 2;
Videogame.CONSOLE_SWITCH = 3;
Videogame.CONSOLE_XBOX_NAME = "Xbox 360";
Videogame.CONSOLE_PS4_NAME = "PlayStation 4";
Videogame.CONSOLE_SWITCH_NAME = "Nintendo Switch";

Videogame.GENRE_ACTION = 1;
Videogame.GENRE_PLATFORM = 2;
Videogame.GENRE_FPS = 3;
Videogame.GENRE_ACTION_NAME = "Acción";
Videogame.GENRE_PLATFORM_NAME = "Plataforma";
Videogame.GENRE_FPS_NAME = "FPS";

Videogame.AVAILABILITY_AVAILABLE = 1;
Videogame.AVAILABILITY_RENT = 2;
Videogame.AVAILABILITY_SOLD = 3;
Videogame.AVAILABILITY_AVAILABLE_NAME = "Disponible";
Videogame.AVAILABILITY_RENT_NAME = "Alquilado";
Videogame.AVAILABILITY_SOLD_NAME = "Vendido";
