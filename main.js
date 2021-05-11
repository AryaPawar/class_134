song="";

leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
scoreleftWrist= 0;
scorerightWrist= 0;
function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on( 'pose',gotposes);
}

function modelLoaded(){
    console.log('posNet is intialized')
}

function preload(){
song= loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate();
}

function gotposes(results){
if(results.length > 0)
{
    scorerightWrist= results[0].pose.keypoints[10].score;
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist="+scoreleftWrist);
console.log(results);;
leftWristY = results[0].pose.leftWrist.y;
leftWristX = results[0].pose.leftWrist.x;
 rightWristY = results[0].pose.rightWrist.y;
 rightWristX  = results[0].pose.rightWrist.x;
 console.log("leftWristX = " + leftWristX +"leftWristY" + leftWristY);
 console.log("rightWristX = "+ rightWristX + "rightWristY" + rightWristY);
}
}
function draw(){
    image(video, 0,0,600,500);   
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20)
        if(rightWristY >0 && rightWristY <=100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1.0x";
            song.rate(1.0);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 2.0x";
            song.rate(2.0);
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InnNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InnNumberleftWristY);
        volume = remove_decimals/500;
        song.setVolume(volume);
        
  }
 } 
