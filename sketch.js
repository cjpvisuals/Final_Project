
let tracker
let brush = "nose"
let stars = []

var capture;

function setup() {

    createCanvas(800, 600).parent('p5')

    // start capturing video
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    noStroke()
    // capture.hide()

    // create the tracker
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)
    for (let i=0; i<10; i++) {
        let new_star = {    x: random(width),
                            y: random(height),
                            vx: random(-2, 2),
                            vy: random(-2, 2),
                            radius: random(10),
                            radius_v: 1
                        }
        stars.push(new_star)
      }

}

function draw() {
  capture.loadPixels();
    var stepSize = floor(map(mouseX, 0, width, 5, 20));
    for (var x = 0; x < capture.width; x += stepSize) {
      for (var y = 0; y < capture.height; y += stepSize) {
        var index = ((y*capture.width) + x) * 4;
        var redVal = capture.pixels[index];
        var greenVal = capture.pixels[index + 1];
        var blueVal = capture.pixels[index + 2];
        fill(redVal, greenVal, blueVal);
        ellipse(x, y, stepSize, stepSize);
      }
    }
    // draw background stuff
    // background(0)

    // show the mirrored video feed
    // showFlippedCapture()

    // get new data from tracker
    let features = tracker.getCurrentPosition()



    // sometimes the tracker doesn't capture anything
    // in that case, we want to stop the function right here using 'return'


    // 'features' is an array of objects with x, y properties
    // for (let feature of features) {
    //     stroke(255)
    //     fill(255)
    //     circle(feature.x, feature.y, 4)
    //     text(feature.label, feature.x, feature.y)
    // }

    if(mouseIsPressed) {

filter(POSTERIZE,5)

    if (features.length == 0) {
        return
      }

    // the nose is feature 62
    let nose = features[62]
    fill(200)
    circle(nose.x,nose.y,12)
    noStroke()




    }



}



// this function flips the webcam and displays it
function showFlippedCapture() {
    push()
    translate(capture.width, 0)
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height)
    pop()
}
