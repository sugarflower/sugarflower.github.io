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
