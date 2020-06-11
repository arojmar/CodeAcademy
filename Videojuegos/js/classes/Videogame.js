function Videogame(name, price, videoconsole, genre){
	this.id = new Date().getTime() + setTimeout(Math.random());
	this.name = name;
	this.price = parseFloat(price);
	this.videoconsole = parseInt(videoconsole);	
	this.genre = parseInt(genre);
	this.availability = null;

	Videogame.prototype.printVideoconsole = function(){
		let result = "ERROR";
		
		switch(this.videoconsole){
			case Videogame.CONSOLE_XBOX:
				result = "Xbox 360";
				break;
			case Videogame.CONSOLE_PS4:
				result = "PlayStation 4";
				break;
			case Videogame.CONSOLE_SWITCH:
				result = "Nintendo Switch";
				break;
		}
		
		return result;
	}
	
	Videogame.prototype.printGenre = function(){
		let result = "ERROR";
		
		switch(this.genre){
			case Videogame.GENRE_ACTION:
				result = "Acción";
				break;
			case Videogame.GENRE_PLATFORM:
				result = "Plataforma";
				break;
			case Videogame.GENRE_FPS:
				result = "FPS";
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
				result = "Disponible";
				break;
			case Videogame.AVAILABILITY_RENT:
				result = "Alquilado";
				break;
			case Videogame.AVAILABILITY_SELL:
				result = "Vender";
				break;
			case Videogame.AVAILABILITY_SOLD:
				result = "Vendido";
				break;
		}
		
		return result;
	}

}

Videogame.CONSOLE_XBOX = 1;
Videogame.CONSOLE_PS4 = 2;
Videogame.CONSOLE_SWITCH = 3;


Videogame.GENRE_ACTION = 1;
Videogame.GENRE_PLATFORM = 2;
Videogame.GENRE_FPS = 3;

Videogame.AVAILABILITY_AVAILABLE = 1;
Videogame.AVAILABILITY_RENT = 2;
Videogame.AVAILABILITY_SELL = 3;
Videogame.AVAILABILITY_SOLD = 4;