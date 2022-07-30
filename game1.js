
let width = 800; 
let height = 500;

let highScore = 0;

const massHeight = 200;

function setup(){
	createCanvas(width, height);
	highScore = localStorage.getItem('birdScore');
	//for (let i = 0; i < count; i += 1)
	//{
	//	mass.push(randomInteger(30, 500 - 70 - massHeight));
	//}
}

let x = 0;
let y = 100;
let gravity = 0.5;
let yV = 0;

let count = 10;

let mass = [randomInteger(30, 500 - 70 - massHeight)]
let massX = [0]

let gameInProgress = 1;

const massWight = 10;

function draw(){
	if (gameInProgress == 1)
	{
		checkScreen();
		checkBird();
		background(200, 200, 200); 
		drawBird();
		if (x % 100 == 0)
		{
			massX.push(x - 100 * massX.length);
			mass.push(randomInteger(30, 400));
		}
		for (let i = 0; i < massX.length; i+=1)
		{
			drawRect(massX[i], mass[i]);
		}	

		stroke(100, 100, 100);
		strokeWeight(0);
		fill(0, 0, 0);
		text(score, 55, 30);
		text('Score:', 15, 30);
		if (highScore != null){
			text(highScore, 80, 470);
			text('High Score:', 15, 470);
		}
	}
	if (gameInProgress == 0){
		stroke(100, 100, 100);
		strokeWeight(0);
		fill(0, 0, 0);
		text('Game end, press r', width/2, height/2);
		if (highScore == null)
		{
			highScore = score;
		}
		if (score > highScore)
		{
			highScore = score;
		}
		localStorage.setItem('birdScore', highScore);
	}		
}
	
function drawRect(xi, yi){
	rectMode(CORNERS);
	stroke(250, 100, 0);
	strokeWeight(2);
	fill(250, 100, 0);
	rect(800 - massWight - xi, 0, 800 - xi, yi);
	rect(800 - massWight - xi, yi + massHeight, 800 - xi, 500);
}

function drawBird(){
	stroke(0, 0, 255);
	strokeWeight(3);
	fill(0, 0, 255);
	ellipse(400, y, 10 * 2);
	
	x += 1;
	for (let i = 0; i < massX.length; i += 1)
	{
		massX[i] += 1;
	}
	yV +=gravity;
	y += yV;
}

function checkScreen(){
	if (y >= 500)
	{
		gameInProgress = 0;
	}
	if (y <= 0)
	{
		gameInProgress = 0;
	}
}

function checkBird()
{
	let maxNumber = 0;
	for (let i = 0; i < massX.length; i += 1)
	{
		if (massX[i] > 410){
			maxNumber = i + 1;
		}
		if (massX[i] <= 410 && massX[i] >= 380)
		{
			if (y + 10 < mass[i])
			{
				gameInProgress = 0;
			}
			if (y - 10 > mass[i] + massHeight)
			{
				gameInProgress = 0;
			}
		}
	}
	score = maxNumber;
}

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function keyPressed(){
	if (keyCode == 32)
	{
		yV = -10;
	}
	if (keyCode == 82){
		window.location.reload()
	}
}