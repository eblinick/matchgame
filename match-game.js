var MatchGame = {};

$(document).ready(function() {
	var $game = $('#game');
	var randomCards = MatchGame.generateCardValues();	
	MatchGame.renderCards( randomCards, $game);
});


/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var cardValuesOrdUnplaced = [];

	// 24 25
	for (let i = 1; i <=8; i++) {
		cardValuesOrdUnplaced.push(i);
		cardValuesOrdUnplaced.push(i);
	}
	// 26 - 30
	var cardValuesRand = [];
	while (cardValuesOrdUnplaced.length > 0) {
		var j = Math.floor(Math.random() * cardValuesOrdUnplaced.length);
		cardValuesRand.push(cardValuesOrdUnplaced[j]);
		cardValuesOrdUnplaced.splice(j,1);
	}
	// console.log(cardValuesRand);	
	return cardValuesRand;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/


MatchGame.renderCards = function(cardValues, $game) {
	
	$game.empty();
	$game.data('flippedCards',[]);

	 console.log(cardValues);
	 console.log(cardValues.length);

	var colors =['hsl(25,85%,65%)', 
				 'hsl(55,85%,65%)',
				 'hsl(90,85%,65%)',
				 'hsl(160,85%,65%)',				
				 'hsl(220,85%,65%)',
				 'hsl(265,85%,65%)',
				 'hsl(310,85%,65%)',
				 'hsl(360,85%,65%)'];

	for (let i=0; i < cardValues.length; i++) {
		
		var $card = $('<div class="col-xs-3 card"></div');
		$card.data('value', cardValues[i]);
		$card.data('flipped', false);
		$card.data('color', colors[cardValues[i] -1]);
		$game.append($card);
		
	}
  
  	$('.card').click(function() {
  		MatchGame.flipCard($(this), $game);
    });
};


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	if($card.data('flipped')) {
		return;
	}

  
   $card.css('background-color',$card.data('color'));    
   $card.text($card.data('value'));
   $card.data('flipped',true);

  	var flippedCards = $game.data('flippedCards'); 
  	flippedCards.push($card);
  //	console.log(flippedCards);
  // 	console.log(Array.isArray($card));  

   
   
   if (flippedCards.length === 2 ) {

   		if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
   			
      		let same = {
        		backgroundColor: 'rgb(153,153,153)',
        	    color: 'rgb(204,204,204)'
      		};
 
      		flippedCards[0].css(same);
      		flippedCards[1].css(same);

    	} else {
      		let flippBack = {
        		backgroundColor: 'rgb(32,64,86)',
        		color: 'rgb(255,255,255)'
		      };
 			setTimeout(function() {
      		  flippedCards[0].css(flippBack);
      		  flippedCards[0].text('');
    		  flippedCards[0].data('flipped',false);

      		  flippedCards[1].css(flippBack);
    	  	  flippedCards[1].text('');
	    	  flippedCards[1].data('flipped',false);	   
    		 },600);
		      
    	}    

    	 $game.data('flippedCards',[]);	
 	}
 	
};
