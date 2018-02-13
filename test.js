var bg;
var img;


var idx = [ 0,1,0,2 ];
var cnt;

var pos = 0;
var vec = 1;
var ere;

var audio;

var state;


function setup(){
	var canvas = createCanvas(720,384);
	canvas.parent("p5");
	noSmooth();

	bg = createGraphics(240,128) // 3x
	k8x12init();
	frameRate(8);

	cnt = 0;
	img = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAMAAABncAyDAAAAS1BMVEUAAAD///8AAADBhsitb6SGZm4A/30A//8Agv8AAP95AP/PAP//ANeWPBjHXgP/fQDLmkWWPBhhAAD/94LD/4KC/4KC/76C//+Cw/9eGZ2/AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiAgwNHSEckxPgAAAAnUlEQVQoz42SCw6EMAhEB+b+d94K1PKpyWJsMg3zBAQAqCR1HfgvVu6Tra+lA27aDcobYOiVbc92TEDTDH/cdMAAwr+WDR1QNKDek4iocAKGhkk5hg7o2qcgFsoroGrs+s6UKqDrMNBL/QLkpp/6vC3RDrAxNZ0YjP9mBFaezUliN3ak3TJiwb3aQyBnG+lz3Aiei7SyKMvNeLP24wdqKQSpXyK6PQAAAABJRU5ErkJggg==");

	audio = new Audio("./lib/audio/Untitled3.mp3");
	audio.loop = true;
	audio.play();

	//cc = s2c(0x889f);
	state = 0;
}

function draw(){
	if(state < 2){
		if( state == 1 ){
			// first draw
			bg.noStroke();
			bg.fill(100,100,100);
			bg.rect(0,0,240,128);
			klocate(1,1);
			kprint([0x834c,0x815b,0x837b,0x815b,0x8368,0x82cc,0x8260,0x82c6,0x8263,
				0x82c5,0x8db6,0x8945,0x82c9,0x93ae,0x82a9,0x82b9,0x82dc,0x82b7,0x8142]);
		}
		state ++;
	} else {
		// normal looping
		image(bg,0,0,720,384);
	
		push();
		translate(pos*24+24,48*5);
		scale(vec,1);
		image(img,-24,0,48,48, idx[cnt] * 16,0, 16,16);
		pop();
	
		if( keyIsPressed == true && (keyCode == 100 || keyCode == 97)){
			vec = (keyCode == 100 ) - (keyCode == 97 );
			if( (0 <= pos + vec) && ( 42 >= pos + vec ) ) pos = pos + vec;
			cnt ++;
			cnt = cnt % 4;
		} else {
			cnt = 0;
		}
	}
}
