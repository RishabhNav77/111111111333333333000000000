song = "";
song2 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotPoses);
}

function draw() {
    image(video,0,0,600,500);
    fill("#FFFFFF");
    stroke("#FFFFFF");
    if(scoreleftwrist >0.2) {
        circle(leftWristx,leftWristy,20);
        num_leftWristy = Number(leftWristy);
        remove_decimal = floor(num_leftWristy);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "volume = " + volume; 
        song.setVolume(volume)
    }
}

function Playsonggiven() {
    song.Play();
    song2.Play();
    song.setVolume(1);
    song2.setVolume(1);
    song.rate(1);
    song2.rate(1);
}

function modelloaded() {
    console.log("Model is Initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Left wristx  = "+ leftWristx + "left wristy" + leftWristy);
        console.log("Right wristx  = "+ rightWristx + "Right wristy" + rightWristy); 
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = "+ scoreleftwrist);
    }
}
