var numCircles = 6;
var colors = [];
var pickedColor;
var circles = document.querySelectorAll(".circle");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var banner = document.querySelector("#banner");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var soundOn = true;
var sounds =
	{
		correct: {
			sound: new Howl({
				urls: ['sounds/prism-2.mp3']
			})
		},
		wrong: {
			sound: new Howl({
				urls: ['sounds/moon.mp3']
			})
		},
		buttons: {
			sound: new Howl({
			  urls: ['sounds/wipe.mp3']
			})
		}
	};

$(function() {
	$('#volume').on('click', function() {
		if ($(this).hasClass('fa-volume-up')) {
			$(this).removeClass('fa-volume-up').addClass('fa-volume-off');
			soundOn = false;
		} else if ($(this).hasClass('fa-volume-off')) {
			$(this).removeClass('fa-volume-off').addClass('fa-volume-up');
			soundOn = true;
		}
	});
})

init();

function init(){
	setupModeButtons();		// Add click event listeners to mode buttons
	setupCircles();			// Add click event listeners to circles
	reset();				// Generate random colors, pick a solution color, show and color the circles.
}

/* Set up on click event listener on mode buttons, add 'selected' css class, set numCircles, reset colors. */
function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numCircles = 3 : numCircles = 6;
			reset();
		});
	}
}

function setupCircles(){
	for (var i = 0; i < circles.length; i++){
		// add click listeners to circles
		circles[i].addEventListener("click", function() {
			//grab color of clicked circle
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			console.log(clickedColor);
			console.log(pickedColor);
			if (clickedColor === pickedColor) {
				if (soundOn)
					sounds['correct'].sound.play();
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);		// When the answer is correct, change all circles to the correctly guessed color.
				banner.style.background = clickedColor;
			} else {
				if (soundOn)
					sounds['wrong'].sound.play();
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

/* Generate random colors, pick a solution color, show and color the circles. */
function reset() {
	if (soundOn)
		sounds['buttons'].sound.play();
	colors = generateRandomColors(numCircles);	
	pickedColor = pickColor();	// pick a new random color from array. It is a string like rgb(r, g, b)
	colorDisplay.textContent = pickedColor; // change colorDisplay to match picked color
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";

	// change colors of circles
	for (var i = 0; i < circles.length; i++){
		if (colors[i]) {
			circles[i].style.display = "block"
			circles[i].style.background = colors[i];
		} else {
			circles[i].style.display = "none";	// hide other circles if mode is easy
		}
	}

	banner.style.background = "steelblue";
}

/* Add reset button click event listener. */
resetButton.addEventListener("click", function(){
	reset();
})

/* When the answer is correct, change all circles to the correctly guessed given color. */
function changeColors(color) {
	for (var i = 0; i < circles.length; i++)
		circles[i].style.background = color;
}

/* Pick a random color from the generated 3 or 6 colors. Picked color is the solution. */
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);

	return colors[random];
}

/* Pick random colors and return them in an array. */
function generateRandomColors(num) {
	var arr = []
	for (var i = 0; i < num; i++)
		arr.push(randomColor()) // get random color and push into arr

	return arr;
}

/* Generate random rgb colors and return as a string. */
function randomColor(){	
	var r = Math.floor(Math.random() * 256);	// pick a "red" from 0 - 255	
	var g = Math.floor(Math.random() * 256);	// pick a "green" from  0 - 255
	var b = Math.floor(Math.random() * 256);	// pick a "blue" from  0 - 255

	return "rgb(" + r + ", " + g + ", " + b + ")";
}