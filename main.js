
video = "";
status = "";
objects = [];

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function setup()
{
    canvas = createCanvas(420, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(420, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 420, 380);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detected Objects";
            document.getElementById("number_object").innerHTML = "Number of objects: "+objects.length;

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            strokeWeight(2);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error();
    }
    else
    {
        console.log(results);
        objects = results;
    }
}











