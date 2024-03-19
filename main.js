img="";
status = ""
objects = []
function setup(){
    canvas=createCanvas(380,380);
    canvas.center()
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status: detecting objects"
}
function preload(){
    img=loadImage("dog_cat.jpg");

}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "" ){
        objectDetector.detect(video, gotresult);
        r=random(255);
        g=random(255);
        b=random(255);
        
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: objects detected"
            document.getElementById("num").innerHTML = "number of objects detected are: "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "  + percent + "%", objects[i].x +10, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelloaded(){
    console.log("modelloaded")
    status = true

    
}
function gotresult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results) 
        objects=results
    }
}