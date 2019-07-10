for (let i = 1; i <= 30; i++){
	
	const $div = $('<span></span>').attr('id', `${i}`).addClass('playingcards');
	$("#parent_container").append($div); 

}

const flippedSquares = [];
let stringNumbers = "";


$('span').on("click", function (e) {
	$(e.currentTarget).css({'background-color': 'midnightblue',
		'background-image': 'url(images/GreenCircle.png)'})

	console.log(e.currentTarget.id);

})



const game = {

	// Generate Variables for game
	let flippedCard1 = "",
	let flippedCard2 = "",




}


