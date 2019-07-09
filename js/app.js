for (let i = 1; i <= 6; i++){
	for(let j = 1; j <= 6; j++){
		const $div = $('<span></span>').attr('id', `#square${i}${j}`).addClass('playingcards');
		$("#parent_container").append($div); 

	}
}

$('span').mouseover(function () {
	$(this).css({'background-color': 'midnightblue',
		'background-image': 'url(images/GreenCircle.png)'})
	})

