var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false;

$(document).on('keydown', function() {
   if (started == false) {
      started = true;
      nextSequence();
   }
});

function changeHeading() {
   $('h1').text('level ' + level);
}

function nextSequence() {
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   addAnimation(randomChosenColor);
   addSound(randomChosenColor);
   level++;
   changeHeading();
   userClickedPattern = [];
}

function checkUserAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
     if (gamePattern[i] != userClickedPattern[i]) {
        return false;
     }
  }
  return true;
}

$('.btn').on('click', function() {
   var userChosenColor = this.id;
   userClickedPattern.push(userChosenColor);
   if ( checkUserAnswer() ) {
      addSound(userChosenColor);
      animatePress(userChosenColor);
      if (userClickedPattern.length == gamePattern.length) {
         setTimeout( function() {
            nextSequence();
         }, 1000);
      }
   }
   else {
      startOver();
   }
});

function startOver() {
   var audio = new Audio('sounds/wrong.mp3');
   audio.play();
   $('body').addClass('game-over');
   setTimeout( function() {
      $('body').removeClass('game-over');
   }, 200);
   $('h1').text('Game Over, Press A key to restart');
   gamePattern = [];
   userClickedPattern = [];
   started = false;
   level = 0;
}

//animation and sound stuff

function addAnimation(color) {
   $('#' + color).fadeOut(100).fadeIn(100);
}

function animatePress(color) {
   $('#' + color).addClass('pressed');
   setTimeout( function() {
      $('#' + color).removeClass('pressed');
   }, 100);
}

function addSound(color) {
   if (color == 'blue') {
      var audio = new Audio('sounds/blue.mp3');
      audio.play();
   }
   else if(color == 'green') {
      var audio = new Audio('sounds/green.mp3');
      audio.play();
   }
   else if(color == 'red') {
      var audio = new Audio('sounds/red.mp3');
      audio.play();
   }
   else if(color == 'yellow') {
      var audio = new Audio('sounds/yellow.mp3');
      audio.play();
   }
}
