

const game = {

	// Generate Variables for game
	flippedCard1: 0,
	flippedCard2: 0,
	selectingCard1: true,
	selectingCard2: false,
	score: 0,

	cardDeck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
	shapeValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	arrayofCards: [],

	generateCards() {

		let card1 = null;
		let card2 = null;

		for(let x = 1; x <= 15; x++){

			indexS = Math.floor(Math.random() * this.shapeValue.length);
			shape = this.shapeValue[indexS]
			this.shapeValue.splice(indexS, 1);

			index1 = Math.floor(Math.random() * this.cardDeck.length);
			card1 = this.cardDeck[index1];
			this.cardDeck.splice(index1, 1);
			this.arrayofCards.push(new Card(card1 + 1, arrayOfShapes[shape], arrayOfShapeTags[shape]));

			index2 = Math.floor(Math.random() * this.cardDeck.length);
			card2 = this.cardDeck[index2]
			this.cardDeck.splice(index2, 1);
			this.arrayofCards.push(new Card(card2 + 1, arrayOfShapes[shape], arrayOfShapeTags[shape]));

		}

		this.displayCards();

		
		this.displayShapes();
		setTimeout(() => {
			this.hideShapes()
		}, 2000);



	},
	displayCards() {

		for(let i = 1; i <= 30; i++){

			const $div = $('<span></span>').attr('id', `${i}`).addClass('playingcards');
			$("#parent_container").append($div); 
		}
	},
	displayShapes() {

		let cssString = "";

		for(let s = 1; s <= 30; s++){
			for(let c = 0; c < this.arrayofCards.length; c++){
				if(this.arrayofCards[c].name == s){
					cssString = this.arrayofCards[c].shape
				}
				$(`#${s}`).css({
					'background-color': 'midnightblue',
					'background-image': cssString
				});
			}	
		}
	},
	hideShapes() {
		for(let c = 1; c <= 30; c++){
			$(`#${c}`).css({
				'background': 'rgb(161,10,10)',
				'background': '-moz-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': '-webkit-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': 'linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)'
			});
		}
	},
	updateScore(change, direction) {
		if(direction == 'add'){
			this.score += change;
		}
		if(direction == 'subtract'){
			this.score -= change;
		}
		$('#score').text(`Score: ${this.score}`);
	}

}

$('#parent_container').on("click", function (e) {

	let cssString = "";

	

	if(game.selectingCard2){
		console.log("Card2");
		for(let i = 0; i < game.arrayofCards.length; i++){
			if((e.target.id) == game.arrayofCards[i].name){
				cssString = game.arrayofCards[i].shape
				game.flippedCard2 = i;
				game.selectingCard2 = false;	
			}
		}
	}

	if(game.selectingCard1){
		console.log("Card1");
		for(let i = 0; i < game.arrayofCards.length; i++){
			if((e.target.id) == game.arrayofCards[i].name){
				cssString = game.arrayofCards[i].shape
				game.flippedCard1 = i;
				game.selectingCard1 = false;
				game.selectingCard2 = true;	
			}
		}
	}
	
	$(e.target).css({
		'background-color': 'midnightblue',
		'background-image': cssString
	})
	
	if(!game.selectingCard1 && !game.selectingCard2){
		game.selectingCard1 = true;
		if(game.arrayofCards[game.flippedCard1].shapeTag == game.arrayofCards[game.flippedCard2].shapeTag){
			game.updateScore(10, 'add');
			console.log("Match Found!");
		} else {
			setTimeout(() => {
				$(`#${game.arrayofCards[game.flippedCard1].name}`).css({
				'background': 'rgb(161,10,10)',
				'background': '-moz-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': '-webkit-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': 'linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)'
				})
				$(`#${game.arrayofCards[game.flippedCard2].name}`).css({
				'background': 'rgb(161,10,10)',
				'background': '-moz-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': '-webkit-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
				'background': 'linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)'
				})
				game.updateScore(1, 'subtract');
			}, 500);
			
		}

	}


})

$('#start_button').on("click", function(){
	$('#game_start').hide();
	game.generateCards();
})
