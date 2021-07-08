$(document).ready(function(){
    console.log('ready!');

    let info = getInfo(iso_slider.value, f_slider.value, ss_slider.value);
    $("#iso_val").text(info.iso_val);
    $("#f_val").text(info.f_val);
    $("#ss_val").text(info.ss_val);

    $("#type_title").text(img_type.charAt(0).toUpperCase() + img_type.slice(1));
});

const landscape_info = {
    "iso": ["200", "400", "800"],
    "f": ["3.5", "7.1", "10.0"],
    "ss": ["1/250", "1/500", "1/1000"],
    "iso_note": "Observe how ISO changes the brightness of the image",
    "f_note": "For landscape photos, aperture can also be used to control brightness",
    "ss_note": "Observe the changes in brightness with respect to shutter speed!"
};

const portrait_info = {
    "iso": ["200", "400", "800"],
    "f": ["3.5", "7.1", "10.0"],
    "ss": ["1/250", "1/500", "1/1000"],
    "iso_note": "Take note of how ISO changes the brightness!",
    "f_note": "Watch how the exposure and depth-of-field both change with aperture!",
    "ss_note": "Of the three, shutter speed is the most efficient way to control exposure."
};

const dynamic_info = {
    "iso": ["100", "400", "800"],
    "f": ["3.5", "7.1", "10"],
    "ss": ["1/60", "1/250", "1/500"],
    "iso_note": "Take note of how ISO changes the brightness!",
    "f_note": "Where depth-of-field is not important, aperture can be adjusted for exposure.",
    "ss_note": "Individual water droplets can be seen at faster shutter speeds!"
};

const lowlight_info = {
    "iso": ["200", "800", "1600"],
    "f": ["3.5", "7.1", "10"],
    "ss": ["2", "1/2", "1/200"],
    "iso_note": "Be careful of grainy (digital noise) pictures at high ISO",
    "f_note": "For the photo you want, get creative with aperture settings!",
    "ss_note": "Shutter speed is the best for lowlight photography. Remember to use a tripod!"
};

var info = {};
const img_type = location.href.substring(location.href.lastIndexOf('/')+1);

switch(img_type) {
    case "landscape":
        info = landscape_info;
        break;
    case "portrait":
        info = portrait_info;
        break;
    case "dynamic":
        info = dynamic_info;
        break;
    case "lowlight":
        info = lowlight_info;
        break;
};

const alert_loc = document.getElementById("alert_loc")

const iso_slider = document.getElementById('iso');
const f_slider = document.getElementById('aperture');
const ss_slider = document.getElementById('ss');
const hc_btn = document.getElementById("hc-btn");

var hc_mode = false;

hc_btn.addEventListener('click', () => {
    if (hc_mode){
        $("#hc1").removeClass("hi-contrast");
        $("#hc2").removeClass("hi-contrast");
        $("#hc3").removeClass("hi-contrast");
        if ($(".hi-contrast").length != 0){
            $(".hi-contrast").removeClass("hi-contrast");
        };
        hc_mode = false;
    } else {
        $("#hc1").addClass("hi-contrast");
        $("#hc2").addClass("hi-contrast");
        $("#hc3").addClass("hi-contrast");
        if ($(".show").length != 0){
            $(".show").addClass("hi-contrast");
        };
        hc_mode = true;
    };
    
});

iso_slider.addEventListener('change', () => {
    updateImage();
    displayAlerts("iso");
});
f_slider.addEventListener('change', () => {
    updateImage();
    displayAlerts("f");
});
ss_slider.addEventListener('change', () => {
    updateImage();
    displayAlerts("ss");
});

// $( function() {
//     $( ".setting" ).draggable();
// });

function updateImage(){
    var iso_value = iso_slider.value;
    var f_value = f_slider.value;
    var ss_value = ss_slider.value;

    let info = getInfo(iso_value, f_value, ss_value);
    var imgFileName = info.filename;
    $("#iso_val").text(info.iso_val);
    $("#f_val").text(info.f_val);
    $("#ss_val").text(info.ss_val);
    document.body.style.backgroundImage = "url('/static/experiment/"+ img_type +"/"+ imgFileName +"')";
    displayAlerts(imgFileName);
};

function displayAlerts(change) {
    var alert = null;
    if (!(alert_loc.firstChild)) {
        var newAlert = document.createElement("div");
        newAlert.classList.add("alert", "fade", "show");
        if (hc_mode) {
            newAlert.classList.add("hi-contrast");
        }
        newAlert.setAttribute("role", "alert");
        alert_loc.appendChild(newAlert);
        alert = newAlert;
    } else {
        alert = alert_loc.firstChild;
    }

    if (change === "iso") {
        alert.innerText = info["iso_note"];
    } else if (change === "f") {
        alert.innerText = info["f_note"];
    } else {
        alert.innerText = info["ss_note"];
    }
};

function getInfo(iso, f, ss){
    var iso_setting = "";
    var f_setting = "";
    var ss_setting = "";
    var iso_val = "";
    var f_val = "";
    var ss_val = "";

    switch(iso) {
        case "1":
            iso_setting = "L";
            iso_val = info["iso"][0];
            break;
        case "2":
            iso_setting = "M";
            iso_val = info["iso"][1];
            break;
        case "3":
            iso_setting = "H";
            iso_val = info["iso"][2];
            break;
    };

    switch(f) {
        case "1":
            f_setting = "L"
            f_val = info["f"][0];
            break;
        case "2":
            f_setting = "M";
            f_val = info["f"][1];
            break;
        case "3":
            f_setting = "H";
            f_val = info["f"][2];
            break;
    };

    switch(ss) {
        case "1":
            ss_setting = "L"
            ss_val = info["ss"][0];
            break;
        case "2":
            ss_setting = "M";
            ss_val = info["ss"][1];
            break;
        case "3":
            ss_setting = "H";
            ss_val = info["ss"][2];
            break;
    };

    var filename = iso_setting.concat(f_setting, ss_setting, ".jpg");

    return {
        filename,
        iso_val,
        f_val,
        ss_val
    };
};

const back_btn = document.querySelector("button");

back_btn.addEventListener("click", function(){
    location.href = "/experiment";
});