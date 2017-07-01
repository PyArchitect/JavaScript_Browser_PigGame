/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, diceRollPast, diceRollPresent, winScore;



init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying)
        {
            //1.Random number
            var dice1 = Math.floor(Math.random() *6) +1;
            var dice2 = Math.floor(Math.random() *6) +1;
            
            //2.Display the result
            
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
            document.getElementById('dice-2').src = 'dice-'+dice1 + '.png';
            document.getElementById('dice-2').src = 'dice-'+dice2 + '.png';
            
            //diceRollPresent = dice;
            
            //3.Update the round score IF the rolled number was NOT a 1
            
            
            if(dice1 !== 1 && dice2 !== 1){
                //Add score
                roundScore += (dice1 + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                
            } else {
                nextPlayer();

            }
            
            /*
            if(dice !== 1 && diceRollPresent === 6 && diceRollPast === 6) {
                    roundScore = 0;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();

                }
            else if(dice !== 1){
                //Add score
                diceRollPresent = dice;
                roundScore += dice
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                diceRollPast = diceRollPresent;
            } else {
                nextPlayer();

            }
            */
            
        }
    
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) 
        {
                    //Add current score to the player global score
            scores[activePlayer] += roundScore;

            //Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                
            var input = document.querySelector('.final-score').value;
            
            //Undefined , 0 , Null, empty string are COERCED to false
            if(input) {
                var winningScore = input;
            } else {
                winningScore = 100;
            }
            
            //Check if player won the game
            
            if(scores[activePlayer] >= winningScore)
            {
                document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
                document.getElementById('dice-1').style.display = 'none';
                document.getElementById('dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
                //We should not mess with JS style code , rather we should change the active class of elements defined in css
            } else {
                //Next player
                nextPlayer();
                
            }
        }
    
    
});

document.querySelector('.btn-new').addEventListener('click',  init);

//DRY principle dont repeat yourself

function nextPlayer() {
    //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //remove active class from this element
        
        roundScore = 0;
        //Mullify previous and present roll states
        diceRollPast = 0;
        diceRollPresent = 0;
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceRollPresent = 0;
    diceRollPast = 0;
    
    gamePlaying = true;
    
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



















//SELECTION # by ID . by class

//query to score-0 element via text.Content method SETTER
//document.querySelector('#current-'+activePlayer).textContent = dice;

//Two ways to change the context: textContent - only plain text
//The other way is innerHTML
// Example with italic HTML tags
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//WE can also assign value to variables from out pages GETTER
//var x = document.querySelector('#score-0').textContent;






