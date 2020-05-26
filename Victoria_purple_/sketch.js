// points for drawing flower
let pointA_Open = [115, 210, 94, 240, 70, 260];
let pointB_Open = [95, 280, 118, 285, 150, 280];
let pointC_Open = [164, 308, 186, 316, 210, 330];
let pointD_Open = [219, 256, 213, 288, 190, 200];

let pointA_Closed = [187, 260, 188, 235, 181, 286];
let pointB_Closed = [173, 274, 175, 281, 167, 265];
let pointC_Closed = [161, 270, 157, 276, 150, 279];
let pointD_Closed = [157, 248, 170, 221, 190, 200];

let pointE_Open = [223, 260, 248, 275, 284, 302];
let pointF_Open = [289, 266, 286, 279, 290, 242];
let pointG_Open = [316, 213, 308, 224, 337, 188];
let pointH_Open = [256, 177, 284, 185, 190, 200];

let pointE_Closed = [193, 239, 195, 271, 200, 285];
let pointF_Closed = [205, 281, 209, 277, 213, 268];
let pointG_Closed = [219, 270, 227, 271, 234, 270];
let pointH_Closed = [225, 248, 211, 223, 190, 200];

let pointL_Open = [133, 149, 145, 164, 108, 97];
let pointM_Open = [131, 95, 147, 97, 172, 99];
let pointN_Open = [189, 91, 213, 82, 230, 81];
let pointO_Open = [229, 131, 219, 162, 190, 200];

let pointL_Closed = [184, 242, 177, 278, 175, 301];
let pointM_Closed = [180, 299, 186, 293, 190, 287];
let pointN_Closed = [194, 293, 200, 299, 204, 302];
let pointO_Closed = [202, 275, 197, 244, 190, 200];

// weather stuff
let weather;
let weather2;
let temp = 0;
let humidity = 0;
let temp2 = 0;
let humidity2 = 0;


let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = 'london';
let city2 = 'brasilia';
let apiKey = '&APPID=18de72c23159748d9aed1cbcfc8ae6af';
let units = '&units=metric';

//gradient
const Y_AXIS = 1;
let c1, c2;

let sliderVal;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 200);
  
  let url = api + city + apiKey + units;
  let url2 = api + city2 + apiKey + units;
  background(0);

  // Define colors
  c2 = color(47, 0, 110);
  c1 = color(249, 62, 255);

 
   
  text1= 'slide'
  //textSize);
  sliderVal = width/2;

  loadJSON(url, gotData);
  loadJSON(url2, gotData2);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  }


function gotData(data) {
  weather = data;

}

function gotData2(data) {
  weather2 = data;

}

function draw() {
push();
  if (weather) {
    temp = weather.main.temp;
    humidity = weather.main.humidity;
  }
  if (weather2) {
    temp2 = weather2.main.temp;
    humidity2 = weather2.main.humidity;
  }

  let d = day();

  let yr = year();

  //if hr is < 
  let hr = hour() - 1;
  if (hr < 0) {
    hr += 24;
  }
  sliderVal =  map(hr, 0, 24, 0, width);
   if(mouseIsPressed){
      sliderVal = mouseX;
     hr = map(sliderVal, 0, width, 0, 24);
  }
  
  let hrB = hr - 4;

  if (hrB < 0) {
    hrB += 24; 
  }
  

  let mn = minute();
  let sc = second();
  background(0);
  stroke(255);
  line(140, 180, 140, 575);
  line(135, 179, 145, 179);
  line(145, 575, 135, 575);

  //gradient////////////////////////
  setGradient(30, 180, 20, 395, c1, c2, Y_AXIS);

  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
      
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }

      textSize(12);
      textFont('Helvetica');
      noStroke();
      fill(255);
      text('0°C', 60, 575);
      text('15°C', 60, 380);
      text('35°C', 60, 188);
      text('0%', 150, 575);
      text('100%', 150, 188);
      text('London', 320, 600);
      text('Humidity', 120, 600);
      text('Temperature', 10, 600);
      fill(255);
      text('Brasilia', 540, 600);
      textSize(25);
      text('\n' + d, 300, 50);
      text('May', 345, 82);
      text('\n' + yr, 410, 50);
      
      //get the time
      let date = new Date();

      let waveHoursLND = Math.abs(hr);

let waveSecondsLND = Math.abs(sc - 30);
      // between -30 and +30


      //var pct = map(sin(millis() * 0.0001 * temp), -1, 1, 0, 1);

      // hours of the day between 0-12
      var pct
      if (waveHoursLND > 20 || waveHoursLND < 7) {

        pct = 1
      } else {
        pct = cos(map(waveHoursLND, 7, 20, 0, 1) * TWO_PI);
        pct = constrain(pct, 0, 1);

      }

      stroke(255);
      noFill()
      beginShape()
      vertex(190, 200);
      translate(170, 120);

      // use the temperature to change the colour
      colorMode(HSB, 360, 100, 120);
      var Hue = map(temp, 0, 32, 269, 291);
      //console.log("temp is", temp);
      fill(Hue, 100, 100);

      // the humidity changes the postion
      line(190, 200 - humidity, 190, 455);
      push();
      translate(0, -humidity);

      bezierVertex(lerp(pointA_Open[0], pointA_Closed[0], pct),
        lerp(pointA_Open[1], pointA_Closed[1], pct),
        lerp(pointA_Open[2], pointA_Closed[2], pct),
        lerp(pointA_Open[3], pointA_Closed[3], pct),
        lerp(pointA_Open[4], pointA_Closed[4], pct),
        lerp(pointA_Open[5], pointA_Closed[5], pct)
      );
      bezierVertex(lerp(pointB_Open[0], pointB_Closed[0], pct),
        lerp(pointB_Open[1], pointB_Closed[1], pct),
        lerp(pointB_Open[2], pointB_Closed[2], pct),
        lerp(pointB_Open[3], pointB_Closed[3], pct),
        lerp(pointB_Open[4], pointB_Closed[4], pct),
        lerp(pointB_Open[5], pointB_Closed[5], pct)
      );
      bezierVertex(lerp(pointC_Open[0], pointC_Closed[0], pct),
        lerp(pointC_Open[1], pointC_Closed[1], pct),
        lerp(pointC_Open[2], pointC_Closed[2], pct),
        lerp(pointC_Open[3], pointC_Closed[3], pct),
        lerp(pointC_Open[4], pointC_Closed[4], pct),
        lerp(pointC_Open[5], pointC_Closed[5], pct)
      );
      bezierVertex(lerp(pointD_Open[0], pointD_Closed[0], pct),
        lerp(pointD_Open[1], pointD_Closed[1], pct),
        lerp(pointD_Open[2], pointD_Closed[2], pct),
        lerp(pointD_Open[3], pointD_Closed[3], pct),
        lerp(pointD_Open[4], pointD_Closed[4], pct),
        lerp(pointD_Open[5], pointD_Closed[5], pct)
      );

      bezierVertex(lerp(pointE_Open[0], pointE_Closed[0], pct),
        lerp(pointE_Open[1], pointE_Closed[1], pct),
        lerp(pointE_Open[2], pointE_Closed[2], pct),
        lerp(pointE_Open[3], pointE_Closed[3], pct),
        lerp(pointE_Open[4], pointE_Closed[4], pct),
        lerp(pointE_Open[5], pointE_Closed[5], pct)
      );
      bezierVertex(lerp(pointF_Open[0], pointF_Closed[0], pct),
        lerp(pointF_Open[1], pointF_Closed[1], pct),
        lerp(pointF_Open[2], pointF_Closed[2], pct),
        lerp(pointF_Open[3], pointF_Closed[3], pct),
        lerp(pointF_Open[4], pointF_Closed[4], pct),
        lerp(pointF_Open[5], pointF_Closed[5], pct)
      );
      bezierVertex(lerp(pointG_Open[0], pointG_Closed[0], pct),
        lerp(pointG_Open[1], pointG_Closed[1], pct),
        lerp(pointG_Open[2], pointG_Closed[2], pct),
        lerp(pointG_Open[3], pointG_Closed[3], pct),
        lerp(pointG_Open[4], pointG_Closed[4], pct),
        lerp(pointG_Open[5], pointG_Closed[5], pct)
      );
      bezierVertex(lerp(pointH_Open[0], pointH_Closed[0], pct),
        lerp(pointH_Open[1], pointH_Closed[1], pct),
        lerp(pointH_Open[2], pointH_Closed[2], pct),
        lerp(pointH_Open[3], pointH_Closed[3], pct),
        lerp(pointH_Open[4], pointH_Closed[4], pct),
        lerp(pointH_Open[5], pointH_Closed[5], pct)
      );

      bezierVertex(lerp(pointL_Open[0], pointL_Closed[0], pct),
        lerp(pointL_Open[1], pointL_Closed[1], pct),
        lerp(pointL_Open[2], pointL_Closed[2], pct),
        lerp(pointL_Open[3], pointL_Closed[3], pct),
        lerp(pointL_Open[4], pointL_Closed[4], pct),
        lerp(pointL_Open[5], pointL_Closed[5], pct)
      );
      bezierVertex(lerp(pointM_Open[0], pointM_Closed[0], pct),
        lerp(pointM_Open[1], pointM_Closed[1], pct),
        lerp(pointM_Open[2], pointM_Closed[2], pct),
        lerp(pointM_Open[3], pointM_Closed[3], pct),
        lerp(pointM_Open[4], pointM_Closed[4], pct),
        lerp(pointM_Open[5], pointM_Closed[5], pct)
      );
      bezierVertex(lerp(pointN_Open[0], pointN_Closed[0], pct),
        lerp(pointN_Open[1], pointN_Closed[1], pct),
        lerp(pointN_Open[2], pointN_Closed[2], pct),
        lerp(pointN_Open[3], pointN_Closed[3], pct),
        lerp(pointN_Open[4], pointN_Closed[4], pct),
        lerp(pointN_Open[5], pointN_Closed[5], pct)
      );
      bezierVertex(lerp(pointO_Open[0], pointO_Closed[0], pct),
        lerp(pointO_Open[1], pointO_Closed[1], pct),
        lerp(pointO_Open[2], pointO_Closed[2], pct),
        lerp(pointO_Open[3], pointO_Closed[3], pct),
        lerp(pointO_Open[4], pointO_Closed[4], pct),
        lerp(pointO_Open[5], pointO_Closed[5], pct)
      );

      endShape();
      pop();

      /////////////////second flower///////////////////////

      let hoursBRZ = hrB;// date.getHours() ;
      // //let hours = 16;
      let secondsBRZ = date.getSeconds();

      let waveHoursBRZ = Math.abs(hoursBRZ );
      //let waveHoursBRZ = 24;

      var pct2
      if (waveHoursBRZ > 20 || waveHoursBRZ < 7) {
        pct2 = 1
      } else {
        pct2 = cos(map(waveHoursBRZ, 7, 20, 0, 1) * TWO_PI);

        pct2 = constrain(pct2, 0, 1);

      }


      beginShape()
      vertex(190, 200);
      translate(220, 0);

      // use the temperature to change the colour
      colorMode(HSB, 360, 100, 100);
      var Hue2 = map(temp2, 0, 32, 269, 291);
      //console.log("humidity2 is", humidity2);
      fill(Hue2, 100, 100);

      //use the humidity to change the postion
      line(190, 200 - humidity2, 190, 455);
      push();
      translate(0, -humidity2);

      bezierVertex(lerp(pointA_Open[0], pointA_Closed[0], pct2),
        lerp(pointA_Open[1], pointA_Closed[1], pct2),
        lerp(pointA_Open[2], pointA_Closed[2], pct2),
        lerp(pointA_Open[3], pointA_Closed[3], pct2),
        lerp(pointA_Open[4], pointA_Closed[4], pct2),
        lerp(pointA_Open[5], pointA_Closed[5], pct2)
      );
      bezierVertex(lerp(pointB_Open[0], pointB_Closed[0], pct2),
        lerp(pointB_Open[1], pointB_Closed[1], pct2),
        lerp(pointB_Open[2], pointB_Closed[2], pct2),
        lerp(pointB_Open[3], pointB_Closed[3], pct2),
        lerp(pointB_Open[4], pointB_Closed[4], pct2),
        lerp(pointB_Open[5], pointB_Closed[5], pct2)
      );
      bezierVertex(lerp(pointC_Open[0], pointC_Closed[0], pct2),
        lerp(pointC_Open[1], pointC_Closed[1], pct2),
        lerp(pointC_Open[2], pointC_Closed[2], pct2),
        lerp(pointC_Open[3], pointC_Closed[3], pct2),
        lerp(pointC_Open[4], pointC_Closed[4], pct2),
        lerp(pointC_Open[5], pointC_Closed[5], pct2)
      );
      bezierVertex(lerp(pointD_Open[0], pointD_Closed[0], pct2),
        lerp(pointD_Open[1], pointD_Closed[1], pct2),
        lerp(pointD_Open[2], pointD_Closed[2], pct2),
        lerp(pointD_Open[3], pointD_Closed[3], pct2),
        lerp(pointD_Open[4], pointD_Closed[4], pct2),
        lerp(pointD_Open[5], pointD_Closed[5], pct2)
      );

      bezierVertex(lerp(pointE_Open[0], pointE_Closed[0], pct2),
        lerp(pointE_Open[1], pointE_Closed[1], pct2),
        lerp(pointE_Open[2], pointE_Closed[2], pct2),
        lerp(pointE_Open[3], pointE_Closed[3], pct2),
        lerp(pointE_Open[4], pointE_Closed[4], pct2),
        lerp(pointE_Open[5], pointE_Closed[5], pct2)
      );
      bezierVertex(lerp(pointF_Open[0], pointF_Closed[0], pct2),
        lerp(pointF_Open[1], pointF_Closed[1], pct2),
        lerp(pointF_Open[2], pointF_Closed[2], pct2),
        lerp(pointF_Open[3], pointF_Closed[3], pct2),
        lerp(pointF_Open[4], pointF_Closed[4], pct2),
        lerp(pointF_Open[5], pointF_Closed[5], pct2)
      );
      bezierVertex(lerp(pointG_Open[0], pointG_Closed[0], pct2),
        lerp(pointG_Open[1], pointG_Closed[1], pct2),
        lerp(pointG_Open[2], pointG_Closed[2], pct2),
        lerp(pointG_Open[3], pointG_Closed[3], pct2),
        lerp(pointG_Open[4], pointG_Closed[4], pct2),
        lerp(pointG_Open[5], pointG_Closed[5], pct2)
      );
      bezierVertex(lerp(pointH_Open[0], pointH_Closed[0], pct2),
        lerp(pointH_Open[1], pointH_Closed[1], pct2),
        lerp(pointH_Open[2], pointH_Closed[2], pct2),
        lerp(pointH_Open[3], pointH_Closed[3], pct2),
        lerp(pointH_Open[4], pointH_Closed[4], pct2),
        lerp(pointH_Open[5], pointH_Closed[5], pct2)
      );

      bezierVertex(lerp(pointL_Open[0], pointL_Closed[0], pct2),
        lerp(pointL_Open[1], pointL_Closed[1], pct2),
        lerp(pointL_Open[2], pointL_Closed[2], pct2),
        lerp(pointL_Open[3], pointL_Closed[3], pct2),
        lerp(pointL_Open[4], pointL_Closed[4], pct2),
        lerp(pointL_Open[5], pointL_Closed[5], pct2)
      );
      bezierVertex(lerp(pointM_Open[0], pointM_Closed[0], pct2),
        lerp(pointM_Open[1], pointM_Closed[1], pct2),
        lerp(pointM_Open[2], pointM_Closed[2], pct2),
        lerp(pointM_Open[3], pointM_Closed[3], pct2),
        lerp(pointM_Open[4], pointM_Closed[4], pct2),
        lerp(pointM_Open[5], pointM_Closed[5], pct2)
      );
      bezierVertex(lerp(pointN_Open[0], pointN_Closed[0], pct2),
        lerp(pointN_Open[1], pointN_Closed[1], pct2),
        lerp(pointN_Open[2], pointN_Closed[2], pct2),
        lerp(pointN_Open[3], pointN_Closed[3], pct2),
        lerp(pointN_Open[4], pointN_Closed[4], pct2),
        lerp(pointN_Open[5], pointN_Closed[5], pct2)
      );
      bezierVertex(lerp(pointO_Open[0], pointO_Closed[0], pct2),
        lerp(pointO_Open[1], pointO_Closed[1], pct2),
        lerp(pointO_Open[2], pointO_Closed[2], pct2),
        lerp(pointO_Open[3], pointO_Closed[3], pct2),
        lerp(pointO_Open[4], pointO_Closed[4], pct2),
        lerp(pointO_Open[5], pointO_Closed[5], pct2)
      );

      endShape();
      pop();
    }
  }
  
  pop();
  
  
   fill(255);
  noStroke();
       if(mouseIsPressed){
            hrB = hrB.toFixed(0);
              hr = hr.toFixed(0);
 }
  //textSize(12);
  text(hr + ':' + mn + ':' + sc, 380, 600);
  text(hrB + ':' + mn + ':' + sc, 598, 600);

  push()
  
  stroke(255)
  line(0, 625, width, 625);
  textSize(18);
  text(text1, sliderVal - 20, 618);
 circle(sliderVal, 625, 10,10);
  pop()

}