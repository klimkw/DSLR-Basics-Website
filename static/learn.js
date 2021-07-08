$(document).ready(function(){
    console.log('ready!');
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const next_btn = document.querySelector(".next");
const prev_btn = document.querySelector('.previous');

next_btn.addEventListener("click", function(){
    location.href = "/experiment";
});
prev_btn.addEventListener("click", function(){
    location.href = "/";
});

const frame = document.querySelector(".learn_frame");

$("#f_img").on("click", display);
$("#iso_img").on("click", display);
$("#exp_img").on("click", display);
$("#ss_img").on("click", display);

function display(e){
    e.preventDefault();
    var clickedImage = e.target.id;
    hideExcept(clickedImage);
    animate(clickedImage);
    describe(clickedImage);
};

function hideExcept(id){
    $("img").each(function(){
        $(this).off("click");
        if ($(this).attr('id') !== id) {
            $(this).addClass("hide");
            $(this).removeClass("zoom");
        }
    });
};

function animate(id){
    console.log($("#"+id));
    $("#"+id).removeClass("zoom");
    switch(id){

        case "iso_img":
            $("#"+id).addClass("isoAnimate");
            break;
        case "exp_img":
            $("#"+id).addClass("expAnimate");
            break;
        case "ss_img":
            $("#"+id).addClass("ssAnimate");
            break;
        case "f_img":
            $("#"+id).addClass("fAnimate");
            break;
    }
};

const iso_dcp = {
    "title": "ISO",
    "color": "iso_color",
    "def": "The sensor's sensitivity to light",
    "tip": "The lower the ISO, the better"
}

const exp_dcp = {
    "title": "Exposure",
    "color": "exp_color",
    "def": "The amount of light utilized to produce a photograph",
    "tip": "Consider all three settings when thinking about getting the right exposure"
}

const ss_dcp = {
    "title": "Shutter Speed",
    "color": "ss_color",
    "def": "How long the shutter is kept open",
    "tip": "Use a tripod if your shutter speed is slower than 1/250sec"
}

const f_dcp = {
    "title": "Aperture",
    "color": "f_color",
    "def": "The size of the lens opening",
    "tip": "The higher the f-number, the smaller the lens opening"
}

const title = document.getElementById("learn_title");
const dcp_frame = document.querySelector(".learn_dcp");

function describe(id){
    var dcp = {};
    var color = null;

    switch(id) {
        case "iso_img":
            dcp = iso_dcp;
            break;
        case "f_img":
            dcp = f_dcp;
            break;
        case "exp_img":
            dcp = exp_dcp;
            break;
        case "ss_img":
            dcp = ss_dcp;
            break;
    };

    // Update Title
    title.innerText = dcp["title"];
    $("#ctfom").remove();

    // Add Definition
    var def_title = document.createElement("div");
    def_title.innerText = "Definition";
    dcp_frame.appendChild(def_title);
    var definition = document.createElement("h2");
    def_title.classList.add(dcp["color"]);
    definition.innerText = dcp["def"];
    dcp_frame.appendChild(definition);

    // Add Tip
    var tip_title = document.createElement("div");
    tip_title.innerHTML = "<br><br>Tip";
    dcp_frame.appendChild(tip_title);
    var tip = document.createElement("h2");
    tip_title.classList.add(dcp["color"]);
    tip.innerText = dcp["tip"];
    dcp_frame.appendChild(tip);

    // Add Back Button
    var back_btn = document.createElement("button");
    back_btn.classList.add("btn", "btn-outline-light");
    back_btn.innerText = "Back to The Exposure Triangle";
    back_btn.addEventListener("click", reload);
    document.querySelector(".back_loc").appendChild(back_btn);
};

function reload(e){
    e.preventDefault();
    location.reload();
}