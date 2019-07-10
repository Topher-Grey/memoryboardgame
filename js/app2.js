

const game = {

	// Generate Variables for game
	flippedCard1: "",
	flippedCard2: "",

	cardDeck: [],
	// shapeValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	arrayofCards: [],

	generateCards() {

		// let card1 = 0;
		// let card2 = 0;


		// card1 = Math.ceil(Math.random() * this.cardDeck.length);
		// this.cardDeck.splice(card1, 1);
		// card2 = Math.ceil(Math.random() * this.cardDeck.length);
		// this.cardDeck.splice(card2, 1);

		// shape = Math.floor(Math.random() * this.shapeValue.length);
		// this.shapeValue.splice(shape, 1);

		console.log(this.arrayofCards);

		// loop up to 15

			this.arrayofCards.push(new Card(i, arrayOfShapes[i], arrayOfShapeTags[i]));
			this.arrayofCards.push(new Card(i, arrayOfShapes[i], arrayOfShapeTags[i]));

		// randomize -- fisher yates

		this.displayCards();

	},
	displayCards(){

		// loop over cards
			// card.print()
		for(let i = 1; i <= 30; i++){
			
			// create 2
			// push into array
			// randomize array
			// move this logic into game.printCards()

			const $div = $('<span></span>').attr('id', `${i}`).addClass('playingcards');
			$("#parent_container").append($div); 
		}
	}
}

$('#parent_container').on("click", function (e) {
	console.log(e.currentTarget);
	console.log(e.target);
	let cssString = "";
	for(let i = 0; i < game.arrayofCards; i++){
		console.log(game.arrayofCards[i].name);

		if((e.target.id) == game.arrayofCards[i].name){
			cssString = game.arrayofCards[i].shape
		}
	}
	console.log(cssString);
	$(e.target.id).css({
		'background-color': 'midnightblue',
		'background-image': cssString
	})

	console.log(e.target.id);

})

$('#start_button').on("click", function(){
	$('#game_start').hide();
	game.generateCards();
})
