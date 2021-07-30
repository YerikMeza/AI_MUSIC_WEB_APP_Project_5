leftWristX = 0;
leftWristY = 0;

status = "";
score_1 = 0;
score_2 = 0;
song_1 = "";
song_2 = "";

rightWristX = 0;
rightWristY = 0;

function preload() {
 song_1 = loadSound("Harry_potter.mp3");
 song_2 = loadSound("Space_Jam.mp3");
}

function setup() {
   canvas = createCanvas(650, 500);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}

function modelLoaded() {
   console.log("Model Loaded");
}

function gotPoses(results) {
   if (results.length > 0) {
      console.log(results);

      score_1 = results[0].pose.keypoints[9].score;
      score_2 = results[0].pose.keypoints[10].score;
      console.log(score_1);
      console.log(score_2);

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX =" + leftWristX + "leftWristY" + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("rightWristX =" + rightWristX + "rightWristY" + rightWristY);
   }
}

function draw() {
   image(video, 0, 0, 650, 500)

   fill("#3C8FA6");
   stroke("#3C8FA6");

   

      if (score_1 > 0.2) 
      {
         circle(leftWristX, leftWristY, 20);
         leftWristY_number = Number (leftWristY);
         remove_decimal_leftWristY = floor(leftWristY_number);
         console.log(remove_decimal_leftWristY);
         document.getElementById("Song_Name").innerHTML = "Song Name = Harry Potter Theme song";
         if (status == "song_2") 
         {
         song_2.stop()
         song_1.play()
         status = "song_1"
         }
         else if (status == "") 
         {
            song_1.play()
            status = "song_1";
         }
      }


      if (score_2 > 0.2) 
      {
         circle(rightWristX, rightWristY, 20);
         rightWristY_number = Number (rightWristY);
         document.getElementById("Song_Name").innerHTML = "Song Name = Space Jam Song";
         if (status == "song_1") 
         {
         song_1.stop()
         song_2.play()
         status = "song_2"
         }
         else if (status == "") 
         {
         song_2.play()
         status = "song_2";
         }
      }
   }