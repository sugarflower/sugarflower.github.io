var img;
var cnt;

var idx = [ 0,1,0,2 ];

var pos = 0;

function setup(){
	var canvas = createCanvas(720,100);
	canvas.parent("p5");
	frameRate(8);
	noSmooth();
	cnt = 0;
	img = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAMAAABncAyDAAAAS1BMVEUAAAD///8AAADBhsitb6SGZm4A/30A//8Agv8AAP95AP/PAP//ANeWPBjHXgP/fQDLmkWWPBhhAAD/94LD/4KC/4KC/76C//+Cw/9eGZ2/AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiAgwNHSEckxPgAAAAnUlEQVQoz42SCw6EMAhEB+b+d94K1PKpyWJsMg3zBAQAqCR1HfgvVu6Tra+lA27aDcobYOiVbc92TEDTDH/cdMAAwr+WDR1QNKDek4iocAKGhkk5hg7o2qcgFsoroGrs+s6UKqDrMNBL/QLkpp/6vC3RDrAxNZ0YjP9mBFaezUliN3ak3TJiwb3aQyBnG+lz3Aiei7SyKMvNeLP24wdqKQSpXyK6PQAAAABJRU5ErkJggg==");
}

function draw(){
	background(100,100,100);
	image(img,pos*16,30,64,64, idx[cnt] * 16,0, 16,16);

	if( keyIsPressed == true ){
		pos = pos + (keyCode == 100 ) - (keyCode == 97 );
		if( 0 > pos ) {
			pos=0;
		}
		if( 41 < pos ){
			pos=41;
		}
		cnt ++;
		cnt = cnt % 4;
	} else {
		cnt = 0;
	}
}