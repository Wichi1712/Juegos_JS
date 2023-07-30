//TODO remove event listeners from hard and easy mode

var difficulty = 6
var colors             = generateColorArray(difficulty);
var pickedColor        = pickColor();
var squares            = document.querySelectorAll(".square");
var colorTitle         = document.getElementById("colortitle");
var message            = document.getElementById("message");
var stripe             = document.querySelector(".stripe");
var gameTitleContainer = document.querySelector("#gameTitleContainer");
var resetButton        = document.querySelector("#reset");
var easyBtn            = document.querySelector("#easybtn");
var hardBtn            = document.querySelector("#hardbtn");

colorTitle.textContent = pickedColor;

fillSquares();

easyBtn.addEventListener("click", function(){
  message.textContent = "";
  difficulty = 3;
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  colors = generateColorArray(difficulty);
  pickedColor = pickColor();
  colorTitle.textContent = pickedColor;

  for (var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.backgroundColor = colors[i];
    }
    else{
      squares[i].style.display = "none";
    }
  }

});


//refactor
hardBtn.addEventListener("click", function(){
  message.textContent = "";
  difficulty = 6;
  easyBtn.classList.remove("selected");
  hardBtn.classList.add("selected");
  colors = generateColorArray(difficulty);
  pickedColor = pickColor();
  colorTitle.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block";
  }
});

resetButton.addEventListener("click", function(){
  message.textContent = "";
  this.textContent = "New Game";
  colors = generateColorArray(6);
  pickedColor = pickColor();
  colorTitle.textContent = pickedColor;
  fillSquares();
  gameTitleContainer.style.backgroundColor = "#5dcb72";
})

function fillSquares(){
  for (var i = 0; i < squares.length; i++){

    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function(){
      if (this.style.backgroundColor === pickedColor){
        message.textContent = "You win!";
        changeColor(pickedColor);
        resetButton.textContent = "Play Again";
      }
      else {
        this.style.backgroundColor = "#232323";
        message.textContent = "Wrong choice";
      }
    });
  }
}

function setDifficulty(){

}

function changeColor(color){
  for (var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
  gameTitleContainer.style.backgroundColor = color;
}

function pickColor(){
  var randomNumber = Math.floor((Math.random() * colors.length));
  var pickedColor  = colors[randomNumber];

  return pickedColor;
}

function generateColorArray(num){
  var colorArray = [];
  for (var i = 0; i < num; i++){
    colorArray.push(genereateRandomColor());
  }
  return colorArray;
}

function genereateRandomColor(){
  var red   = Math.floor((Math.random() * 256));
  var green = Math.floor((Math.random() * 256));
  var blue  = Math.floor((Math.random() * 256));

  var color = "rgb(" + red + ", "+ green +", "+ blue +")";

  return color;
}
