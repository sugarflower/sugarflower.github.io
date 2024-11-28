var splitter_mouse_state;
var menuEl;
var contentEl;
var splitterEl;

function folder_click(id) {
    console.log(id);
}

var imgs = {
    "img202410": {
        "src": "img/Halloween_pt2.png",
        "description": "Happy Halloween! 2024.10"
    },
    "img202411": {
        "src": "img/autmn.png",
        "description": "Autumn means Beaujolais and mushrooms 2024.11"
    },
    "img202412": {
        "src": "img/2412_01.png",
        "description": "Fuyu Tsubaki"
    }
}


window.addEventListener("DOMContentLoaded", () => {
    var targets = document.getElementsByClassName("label");
    for( var i=0; i< targets.length ; i ++ ){
        targets[i].addEventListener("click", (e) => {
            var target = document.getElementsByClassName(e.target.id)[0];
            var label = document.getElementById(e.target.id);
            if (target.classList.contains("opened")) {
                target.classList.remove("opened");
                target.classList.add("closed");
                label.classList.remove("opened");
                label.classList.add("closed");
            } else {
                target.classList.remove("closed");
                target.classList.add("opened");
                label.classList.remove("closed");
                label.classList.add("opened");
            }
        });
    }
    splitter_mouse_state="";
    menuEl = document.querySelector("#menu");
    contentEl = document.querySelector("#content");
    splitterEl = document.querySelector("#splitter");

    splitterEl.addEventListener("mousedown", (e) => {
        if ( splitter_mouse_state == "" ) {
            splitter_mouse_state="mousedown";
            document.body.style.userSelect = "none";
        }
    });
    document.addEventListener("mouseup", (e) => {
        splitter_mouse_state = "";
        document.body.style.userSelect = "auto";
    });
    document.addEventListener("mousemove", (e) => {
        if (splitter_mouse_state == "mousedown" ) {
            if ( e.x > 100 ){ 
                menuEl.style.width = e.x + 'px';
                contentEl.style.left = e.x + 'px';
                contentEl.style.width = "calc(100% - " + e.x + 'px)';
                splitterEl.style.left = e.x + 'px';
            }
        }
    });

    const ulElement = document.getElementById("backup_image_block");
    const keys = Object.keys(imgs);
    keys.sort((a, b) => b.localeCompare(a));

    keys.forEach(v => {
        const liElement = document.createElement("li");
        liElement.innerHTML = "<span class='img_description'>" + v + "</span>";
        liElement.id = v;
        liElement.classList.add("imgbtn");
        ulElement.appendChild(liElement); 
    });

    // 毎月の画像をどうにかする部分
    function dispImage(key) {
        var dat = imgs[key];
        document.getElementById("image").src=dat["src"];
        document.getElementById("description").innerText=dat["description"];
    }

    var imgbtns = document.getElementsByClassName("imgbtn");
    Array.from(imgbtns).forEach(v => {
        v.addEventListener("click", (e) => {
            dispImage(e.target.id);
        });
    });
    const keyNumbers = Object.keys(imgs).map(key => Number(key.match(/\d+/g)[0]));
    const maxKeyNumber = Math.max(...keyNumbers);
    dispImage("img"+maxKeyNumber);
});

const palette = [
    [  0,   0,   0], 
    [ 29,  43,  83], 
    [126,  37,  83], 
    [  0, 135,  81], 
    [171,  82,  54], 
    [ 95,  87,  79], 
    [194, 195, 199], 
    [255, 241, 232], 
    [255,   0,  77], 
    [255, 163,   0], 
    [255, 236,  39], 
    [  0, 228,  54], 
    [ 41, 173, 255], 
    [131, 118, 156], 
    [255, 119, 168], 
    [255, 204, 170], 
    [ 28,  94, 172], 
    [  0, 165, 161], 
    [117,  78, 151], 
    [ 18,  83,  89], 
    [116,  47,  41], 
    [ 73,  45,  56], 
    [162, 136, 121], 
    [255, 172, 197], 
    [195,   0,  76],
    [235, 107,   0], 
    [144, 236,  66], 
    [  0, 178,  81], 
    [100, 223, 246], 
    [189, 154, 223], 
    [228,  13, 171],
    [255, 133, 109] 
]

document.getElementById("copy").addEventListener("click", function() {
    navigator.clipboard.writeText(document.getElementById("result").value);
    alert("Data copied");
});
document.getElementById('fileInput').addEventListener('change', function(event) {
    const fi = event.target;
    if (fi.files.length == 0) { return };
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            var buf = "";
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];
                var cidx = find_palette_color(r, g, b);
                if (cidx == "-1") {
                    console.log(r + ", " + g + ", " + b );
                    //alert("Incorrect colors (only images drawn with picotron palette colors can be converted)");
                    //return;
                    cidx = "00";
                }
                buf = buf + cidx;
            }
            buf = 'userdata("u8",' + canvas.width + "," + canvas.height + ',"' + buf + '")';
            document.getElementById("result").value = buf;
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
});

function find_palette_color(pr, pg, pb) {
    var col_idx = -1;
    palette.forEach(function(pal, idx) {
        if (pr == pal[0] && pg == pal[1] && pb == pal[2]) {
            col_idx = idx;
        }
    });
    return col_idx.toString(16).padStart(2, "0");
}


