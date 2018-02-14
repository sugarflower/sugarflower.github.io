var bg;
var img;

var keys = new Array(256);
var keyCount;

var idx = [ 0,1,0,2 ];
var cnt;

var pos = {
	x : 0,
	y : 5,
	vec : 1,
	vecy : 0,
	lv : 1
};

var audio;
var state;


function setup(){
	var canvas = createCanvas(720,384);
	canvas.parent("p5");
	noSmooth();

	bg = createGraphics(240,128) // 3x
	k8x12init();
	frameRate(16);

	cnt = 0;
	img = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAMAAABncAyDAAAAS1BMVEUAAAD///8AAADBhsitb6SGZm4A/30A//8Agv8AAP95AP/PAP//ANeWPBjHXgP/fQDLmkWWPBhhAAD/94LD/4KC/4KC/76C//+Cw/9eGZ2/AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiAgwNHSEckxPgAAAAnUlEQVQoz42SCw6EMAhEB+b+d94K1PKpyWJsMg3zBAQAqCR1HfgvVu6Tra+lA27aDcobYOiVbc92TEDTDH/cdMAAwr+WDR1QNKDek4iocAKGhkk5hg7o2qcgFsoroGrs+s6UKqDrMNBL/QLkpp/6vC3RDrAxNZ0YjP9mBFaezUliN3ak3TJiwb3aQyBnG+lz3Aiei7SyKMvNeLP24wdqKQSpXyK6PQAAAABJRU5ErkJggg==");

	for(var i=0;i<256;i++){
		keys[i] = false;
	}

	audio = new Audio("./lib/audio/new.mp3");
	audio.loop = true;
	audio.play();

	//cc = s2c(0x889f);
	state = 0;
	keyCount = 0;

	audiomax = 0;
}

function draw(){
	if(state < 3){
		if( state > 0 ){
			// first time drawing
			bg.noStroke();
			bg.fill(50,50,50);
			bg.rect(0,0,240,128);
			klocate(1,1);
			kprint([0x834c,0x815b,0x837b,0x815b,0x8368,0x82cc,0x8260,0x82c6,0x8263,
				0x82c5,0x8db6,0x8945,0x82c9,0x93ae,0x82a9,0x82b9,0x82dc,0x82b7,0x8142]);
		}
		state ++;
	} else {
		// looping
		image(bg,0,0,720,384);

		push();
		translate(pos.x*12+24, pos.y*12+24);
		scale(pos.lv,1);
		image(img,-24,-24,48,48, idx[Math.floor(cnt/3)] * 16,0, 16,16);
		pop();
		
		if( keyCount > 0 && keys[65] || keys[68] || keys[87] || keys[83] ){
			if( !(keys[65] & keys[68]) & !(keys[87] & keys[83])){
				pos.vec = keys[68] - keys[65];
				pos.vecy = keys[83] - keys[87];
				if( pos.vec != 0 ) pos.lv = pos.vec;
				if( (0 <= pos.x + pos.vec) && ( 56 >= pos.x + pos.vec ) ) pos.x = pos.x + pos.vec;
				if( (0 <= pos.y + pos.vecy) && ( 28 >= pos.y + pos.vecy ) ) pos.y = pos.y + pos.vecy;
				cnt = ( (cnt + 1 ) % 12 );
			} else {
				cnt = 0;
			}
			
		} else {
			cnt = 0;
		}
	}
}

function keyPressed() {
	keys[keyCode] = true;
	//text(keyCode,10,20);
	keyCount ++;
}

function keyReleased(){
	keys[keyCode] = false;
	keyCount --;
	if(keyCount < 0 ) keyCount = 0;
}

/*
function mouseClicked(){
}
*/
