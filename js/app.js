$('span').on("click", function (e) {
	$(e.currentTarget).css({'background-color': 'midnightblue',
		'background-image': 'url(images/GreenCircle.png)'})

	console.log(e.currentTarget.id);

})

$('#start_button').on("click", function(){
	console.log(this);
	$('#game_start').hide();
	game.generateCards();
})


const game = {

	// Generate Variables for game
	flippedCard1: "",
	flippedCard2: "",

	cardDeck: {},

	generateCards() {
		for(let i = 1; i <= 30; i++){
			const $div = $('<span></span>').attr('id', `${i}`).addClass('playingcards');
			$("#parent_container").append($div); 
		}
	}
}

