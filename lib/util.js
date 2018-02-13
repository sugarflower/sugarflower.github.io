var k8x12;
var k8x12_x, k8x12_y;
/*
function delay(ms) {
	var cur_d = new Date();
	var cur_ticks = cur_d.getTime();
	var ms_passed = 0;
	while(ms_passed < ms) {
		var d = new Date(); // Possible memory leak?
		var ticks = d.getTime();
		ms_passed = ticks - cur_ticks;
		// d = null; // Prevent memory leak?
	}
}
*/
function toHex(v) {
    return '0x' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
}

function uc8( s , d ){
	s += d;
	if( s > 0xff){
		s -= 255;
	}
	if(s < 0 ){
		s += 256;
	}
	return s;
}

function s2c( val ){
	hb = (val & 0xff00) >> 8;
	lb = val & 0x00ff;
	if( hb <= 0x9f ){
		hb = uc8(hb, -113);
	} else {
		hb = uc8(hb, -177);
	}
	hb = hb * 2 + 1;
	if(lb>0x7f) {
		lb = uc8(lb, -1);
	}
	if(lb>=0x9e) {
		lb = uc8(lb, -125);
		hb = uc8(hb, 1);
	} else {
		lb = uc8(lb, -31);
	}
	hb = uc8(hb, -32);
	lb = uc8(lb, -32);
	return hb*100 + lb;
}

function k8x12init(){
	k8x12 = loadImage(k8x12data);
	k8x12data = "";
	klocate(0,0);
}

function klocate(x,y){
	k8x12_x = x;
	k8x12_y = y;
}

function kput(code){
	word = Math.floor(code/100);
	point = code - word*100;
	bg.filter(INVERT);
	bg.image(k8x12, k8x12_x*8, k8x12_y*12, 8, 12, (point-1)*8, (word-1)*12, 8, 12 );
	bg.filter(INVERT);
	k8x12_x ++;
}

function kprint(ary){
	for(var i=0;i<ary.length;i++){
		kput(s2c(ary[i]));
	}
}