
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var start=false;

function startOver()
{
    level=0;
    start=false;
    gamePattern=[];
}
$(document).keypress(function()
{
    if(!start)
    {
        $("#level-title").text("level " + level);
        nextSequence();
        start=true;
    }
});

//event when button clicked 
$(".btn").on("click",function()
{
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}
);

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success")

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        var loser=new Audio("./sounds/wrong.mp3");
        loser.play();
        $("body").addClass("game-over");
        setTimeout(function()
        {
        $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();

    }
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("level " + level);
    var n= Math.random();
    n=n*4;
    n= Math.floor(n);
    var randomChosenColour= buttonColours[n];
    gamePattern.push(randomChosenColour); //adds the new color in the array

//selects id of color randomly generated and concatenates with #
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//adds sound effects
playSound(randomChosenColour);
}



function playSound(name)
{
    var tune= new Audio("./sounds/"+name+".mp3");
    tune.play();
}

function animatePress(currentcolour)
{
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function()
    {
    $("#"+currentcolour).removeClass("pressed");},100);

}


