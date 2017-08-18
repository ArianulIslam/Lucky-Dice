
alert('GAME RULES:\n-The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n- BUT, if the player rolls a 1 all his ROUND score gets lost. After that, its the next players turn\n- The player can choose to Hold, which means that his ROUND score gets added to his GLBAL score. After that, its the next players turn\n- The first player to reach 50 points on GLOBAL score wins the game\n'
);
var score,roundScore, activePlayer,dice,gamePlaying=true;

function init (){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.querySelector('.dice').style.display = 'none';
 document.querySelector('#name-0').textContent = 'Player 1'
document.querySelector('#name-1').textContent = 'Player 2'
    
     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
}
init();
 

/*document.querySelector('#current-' +activePlayer).textContent = dice;
 document.querySelector('#current-' +activePlayer).innerHTML = '<em>' +dice+'<em>'*/
 

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        
           dice = Math.floor(Math.random()*6)+1;
    var diceDom = document.querySelector('.dice');
    diceDom.style.display ='block';
    diceDom.src = 'dice-'+dice+'.png'
     
     if(dice!==1){
         //add scpre
         roundScore+=dice;
         document.querySelector('#current-' +activePlayer).textContent = roundScore;
     }
     
     else{
        //nextPlayer 
         nextPlayer();    
     }
     
     
    }
 
 });
function nextPlayer(){
         activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
         roundScore = 0;
         document.getElementById('current-0').textContent='0';
         document.getElementById('current-1').textContent='0';
         document.querySelector('.player-0-panel').classList.toggle('active');
         document.querySelector('.player-1-panel').classList.toggle('active');
         document.querySelector('.dice').style.display ='none';
}

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlaying){  
    // add curent score to global score
    scores[activePlayer]+=roundScore;

    
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      if(scores[activePlayer]>=50){
             
         document.querySelector('#name-'+activePlayer).textContent = 'Winner!'
         document.querySelector('.dice').style.display ='none';
         document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
         document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
         gamePlaying =false;
          
          
         }else{
               nextPlayer();
         }
    //check if player won the game
  }
});

           document.querySelector('.btn-new').addEventListener('click',init);
       





 

 
