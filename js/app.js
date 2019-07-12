

const game = {

	flippedCard1: 0,
	flippedCard2: 0,
	selectingCard1: true,
	selectingCard2: false,
	score: 0,
	remainingPairs: 15,
	time: 120,
	scoremultiplier: 10,

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
			this.arrayofCards.push(new Card(card1 + 1, arrayOfShapes[shape], arrayOfShapeTags[shape], true));

			index2 = Math.floor(Math.random() * this.cardDeck.length);
			card2 = this.cardDeck[index2]
			this.cardDeck.splice(index2, 1);
			this.arrayofCards.push(new Card(card2 + 1, arrayOfShapes[shape], arrayOfShapeTags[shape], true));

		}

		this.displayCards();

		
		this.displayShapes();
		setTimeout(() => {
			this.hideShapes();
			this.setTimer();
		}, 4000);




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
			this.score += change * this.scoremultiplier;
		}
		if(direction == 'subtract'){
			this.score -= change;
		}
		if(this.score < 0){
			this.score = 0;
		}
		$('#score').text(`Score: ${this.score}`);
	},
	displayWin(){
		$('main').hide();
		$div = $('<div></div>').attr('id', 'endBox');
		$div.text(`Congratulations! You Matched All The Squares! Your final score: ${this.score}`);
		// $div.append('<img id="star" src="images/star.jpg />');
		$('body').append($div);
		$img = $('<img/>').attr('src', 'images/star.png')
		$img.css({
			'width': '200px',
			'height': '200px',
		});
		$('body').append($img);

	},
	displayEnding() {
		$('main').hide();
		$div = $('<div></div>').attr('id', 'endBox');
		$div.text(`Game Over! Your final score: ${this.score}`);
		$('body').append($div);
	},
	setTimer(){
		const timer = setInterval(() => {
        	this.time --;
        	if(this.time == 0){
          		clearInterval(timer);
          		this.displayEnding();
        	}
      		$('#timer').text(`Time: ${this.time}s`);

      		if(this.time % 3 == 0){
      			this.scoremultiplier--;
      		}

      		if(this.scoremultiplier <= 0){
      			this.scoremultiplier = 1;
      		}

    	}, 1000);
	}

}

$('#parent_container').on("click", function (e) {

	let cssString = "";

	

	if(game.selectingCard2){
		console.log("Card2");
		for(let i = 0; i < game.arrayofCards.length; i++){
			if(((e.target.id) == game.arrayofCards[i].name) && game.arrayofCards[i].cardOn){
				cssString = game.arrayofCards[i].shape
				game.flippedCard2 = i;
				game.selectingCard2 = false;	
			}
		}
	}

	if(game.selectingCard1){
		console.log("Card1");
		for(let i = 0; i < game.arrayofCards.length; i++){
			if(((e.target.id) == game.arrayofCards[i].name) && game.arrayofCards[i].cardOn){
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
		console.log("Match");
		game.selectingCard1 = true;
		if(game.arrayofCards[game.flippedCard1].shapeTag == game.arrayofCards[game.flippedCard2].shapeTag){
			game.arrayofCards[game.flippedCard1].cardOn = false;
			game.arrayofCards[game.flippedCard2].cardOn = false;
			game.updateScore(10, 'add');
			game.remainingPairs--;
			console.log(`Remaining pairs: ${game.remainingPairs}`);
			if(game.remainingPairs == 0){
				game.displayWin();
			}
		} else {
			setTimeout(() => {
				if(game.arrayofCards[game.flippedCard1].cardOn){
					console.log("Card 1 flip");
					$(`#${game.arrayofCards[game.flippedCard1].name}`).css({
					'background': 'rgb(161,10,10)',
					'background': '-moz-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
					'background': '-webkit-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
					'background': 'linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)'
					})
				};
				if(game.arrayofCards[game.flippedCard2].cardOn){
					console.log("Card 2 flip");
					$(`#${game.arrayofCards[game.flippedCard2].name}`).css({
					'background': 'rgb(161,10,10)',
					'background': '-moz-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
					'background': '-webkit-linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)',
					'background': 'linear-gradient(180deg, rgba(161,10,10,1) 0%, rgba(252,70,107,1) 61%)'
					})
				};
				
				game.updateScore(1, 'subtract');
			}, 500);
			
		}

	}


})

$('#start_button').on("click", function(){
	$('#game_start').hide();
	game.generateCards();
})
