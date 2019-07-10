for (let i = 1; i <= 6; i++){
	for(let j = 1; j <= 6; j++){
		const $div = $('<span></span>').attr('id', `${i}${j}`).addClass('playingcards');
		// $div.text(`${i}${j}`)
		$("#parent_container").append($div); 

	}
}

const flippedSquares = [];
let stringNumbers = "";

// $('span').mouseover(function () {
// 	$(this).css({'background-color': 'midnightblue',
// 		'background-image': 'url(images/GreenCircle.png)'})
// 	})

$('span').mouseenter(function () {
	$(this).css({'background-color': 'midnightblue',
		'background-image': 'url(images/GreenCircle.png)'})

	console.log(this.id);
	flippedSquares.push(this.id);

	console.log(flippedSquares);
	})

// function roundTimer () {
// 	const timer = setInterval(() => {

// 		this.time++;

//         if(this.time === 120){
//           clearInterval(timer);



          
//         }

//       $('#timer').text(`Round Time: ${this.time}s`);

// 	}, 1000);
// }


// time = 0;


// roundTimer();