var userClickedPattern =[];
var started = true;
var level = 0 ;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
function nextSequence(){
    userClickedPattern =[]; 
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour); 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 
    animatePress(randomChosenColour); 
    level++;
    $("h1").text("Level " + level); 
    console.log(gamePattern);
}

$(".btn").click( function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length); 
})
function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
      $("#" + currentColour).addClass("pressed");
      setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
      },100);
}

$(document).keydown(function(event){
    if(started && (event.key === 'A' || event.key === 'a')){
    // $("h1").text("Level002 " + level);
        nextSequence(); 
        started = false; 
    }
})
function checkAnswer(currentLevel){
        if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]){ 
                console.log("suceess");
                if(userClickedPattern.length === gamePattern.length){ 
                    setTimeout(function(){
                        nextSequence();
                    },1000)
        }
}
else{
    var wrong = new Audio("sounds/wrong.mp3"); 
    wrong.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
    startOver();
}
}
function startOver(){
            level = 0;
            gamePattern = [];
            started = true;
            $(document).keydown(function(event){

                if(event.key){
                    // level++;
                    if(level===0){
                       $("h1").text("Press A Key to Start");
                    }
                    else{
                    $("h1").text("Level " + level);
                    }
                }
            })
}