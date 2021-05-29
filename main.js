song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function setup()
{
   canvas = createCanvas(600,500);
   canvas.position(575,200);

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video , modelLoaded);
   poseNet.on('pose',gotPoses);
}

function modelLoaded() 
{
    console.log('PoseNet is Initialized !!');
}

function gotPoses(results) {

    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist (X)' + leftWristX);
        console.log('Left Wrist (Y)' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('right Wrist (X)' + rightWristX);
        console.log('right Wrist (Y)' + rightWristY);
    }
}


function draw()
{
    image(video, 0, 0 , 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreRightWrist > 0.2)
    {
circle(rightWristX,rightWristY,25);
if(rightWristY > 0 && rightWristY <= 100)
{
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
}

else if(rightWristY > 100 && rightWristY <= 200)
{
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
}
else if(rightWristY > 200 && rightWristY <= 300)
{
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}
else if(rightWristY > 300 && rightWristY <= 400)
{
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
}
else if(rightWristY > 400 && rightWristY <= 500)
{
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(2.5);
}
    }


if(scoreLeftWrist > 0.2)
{
circle(leftWristX,leftWristY,25);
InNumber_leftWristY = Number(leftWristY);
remove_decimals = floor(InNumber_leftWristY*2);
volume = remove_decimal/1000;
document.getElementById("volume").innerHTML = "Volume = " + volume;
song.setVolume(volume);
}


}

function preload()
{
    song = loadSound("music.mp3");
   
}

function play()
{
    song.play();
    song.setVolume(0.3);
    song.rate(1.3);
}

function stop()
{
    song.stop();
}

function plause()
{
    song.pause();
}