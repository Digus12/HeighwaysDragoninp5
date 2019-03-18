var binaryTree = null;
var level = 8;
var onlyLastLevel = false;
var input, button, text, checkbox; 

function setup() { 
  createCanvas(600, 600);
	binaryTree = new BinaryTree();
	noLoop();
	
	input = createInput();
  input.position(440, 510);
	input.attribute("placeholder","Detail Level");
	
	button = createButton('Submit');
	button.position(440, 550);
	button.mousePressed(update);
	
	checkbox =  createInput();
	checkbox.attribute("type","checkbox");     
	checkbox.position(440, 532);
	
	text = createElement('span', "Only Last Level").addClass('input');
	text.position(460, 535);
} 

function update(){
	var l = input.value();
	level = parseInt(l);
	onlyLastLevel = checkbox.elt.checked;
	draw();
}

function draw() { 
  background(21);
	
	var start = createVector(500,100);
	var end = createVector(100,500);
	
	stroke(255);
	strokeWeight(1);
	push();
  scale(0.7,0.7);
	translate(120, 180);
 
	
	binaryTree = new BinaryTree();
  stroke(0, 200, 255);
	strokeWeight(level);
	binaryTree.push(iterate(start, end, false));
	var sum = 0;
	
	// noprotect
	for(var i = 0; i < binaryTree.tree.length; i++){
		if(sum >= pow(2, level) - 1){
			break;
		}
		// level to sum = 2^level - 1
		// sum to level = log2(sum + 1)
		sum++;
		//console.log(binaryTree.tree.length);
		colorMode(HSB, 255);
		var currentLevel = floor(Math.log2(binaryTree.tree.length + 1.0));
		
		stroke(currentLevel * 30, 200, 255, 180);
		strokeWeight(level - currentLevel);

		
		var value = binaryTree.tree[i];
		binaryTree.push(iterate(value[0], value[1], false));
  	binaryTree.push(iterate(value[2], value[3], true));
 
		if(currentLevel < level-1 && onlyLastLevel){
			background(21);
		}
	}
	pop();
}

function iterate(start, end, second){
	var points = getPerpendicularPoints(start, end);
	if(second){
		points.splice(0, 2);
	}
  else{
		points.splice(2,2);
	}
	line(start.x, start.y, points[0], points[1]);
	line(end.x, end.y, points[0], points[1]);
  return [start, createVector(points[0], points[1]), createVector(points[0], points[1]), end];
}


function getPerpendicularPoints(start, end){
	dx = start.x - end.x;
	dy = start.y - end.y;
	dist = sqrt(dx*dx + dy*dy)
	dx /= dist
	dy /= dist
	var N = dist; 
	x3 = (start.x + end.x)/2 + (N/2)*dy
	y3 = (start.y + end.y)/2 - (N/2)*dx
	x4 = (start.x + end.x)/2 - (N/2)*dy
	y4 = (start.y + end.y)/2 + (N/2)*dx
	
	return [x3, y3, x4, y4];
}

