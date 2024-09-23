label = "";
music = "";
objects = [];
function preload(){
    music = loadSound("alarm.mp3");
}
function setup(){
    camera = createCapture(VIDEO);
    camera.size(300, 400);
    camera.position(700, 200);
    music.volume(1);
    music.rate(1);
}
function draw(){
    detector = ml5.objectDetector("cocossd", loaded)
    document.getElementById("status").innerHTML = "object detecting";
        for (var i = 0; i < objects.length; i++) {
            label = objects[i].label
            fill("red");
            text(label, x + 20, y + 20);
            noFill();
            stroke("red");
            rect(x, y, width, height);
            fill("red");
            text(label, x + 20, y + 20);
            noFill();
            stroke("red");
            rect(x, y, width, height);
            if(label == "person"){
                document.getElementById("babystatus").innerHTML = "baby detected";
                document.getElementById("status").innerHTML = "object detected";
                music.volume(0);
            }
            if(label != "person"){
                document.getElementById("babystatus").innerHTML = "baby not detected";
                document.getElementById("status").innerHTML = "object not detected";
                music.volume(1);
                music.play();
            }
        }
    }
function loaded(){
    console.log("the model is loaded");
    detector.detect(room, gotResults)
}
function gotResults(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}