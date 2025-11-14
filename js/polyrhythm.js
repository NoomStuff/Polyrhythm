// You can change values below, the value in [] will show the default/recommended value
const settings = {
    playOnLoad: false,          // [false] Start animation instantly 
    fullscreenOnStart: false,   // [false] Fullscreen on animation start 

    duration: 900,              // [900] Duration before returning to default position in seconds
    loops: 84,                  // [84] Amount of loops the inner most ball will make (Must be higher than the number of balls (21) / loopReduction)
    loopReduction: 1,           // [1] Amount of loops that will be subtracted from each ball for the stagger

    lineWidth: 4,               // [4] Thickness of all lines drawn
    showBaseline: true,         // [true] Show the bottom line
    showArcs: true,             // [true] Show the paths the balls take
    initialArcRadius: 0.05,     // [0.05] Starting size of the smallest arc compaired to the length of the line
    ballSize: 0.0075,           // [0.0075] Size of the balls compaired to the length of the line

    muteOnStart: false,         // [true] Waits until page is clicked to start playing audio
    muteOnUnfocus: true,        // [TRUE HIGHLY RECOMMENDED] Stops sounds from playing when the page is not focussed
    audioVolume: 20,            // [20] Volume of the ball bounces in %
    hitSounds: "vibraphone"     // ["vibraphone"] Sets a type of sound between "bell", "vibraphone", "hammond" & "marimba" by changing the folder it looks for
};

const canvas = document.getElementById("polyrhythm-canvas");
const canvasWriter = canvas.getContext("2d");

const startText = document.getElementById("start-text");
const muteText = document.getElementById("mute-text");
const bottomText = document.getElementById("bottom-text");

let soundEnabled = !settings.muteOnStart;

let animationStarted = false;

const initializeAnimation = () => {
    if (animationStarted) return;
    animationStarted = true;

    startText.remove();
    bottomText.style.display = "flex";

    if (settings.fullscreenOnStart) {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen();
        }
    }

    document.onvisibilitychange = () => {
        if (document.hidden && settings.muteOnUnfocus) {
            soundEnabled = false;
        }
    };

    canvas.onclick = () => soundEnabled = !soundEnabled;

    let startTime = new Date().getTime();

    const calculateNextImpactTime = (currentImpactTime, velocity) => {
        return currentImpactTime + (Math.PI / velocity) * 1000;
    };

    const arcs = [
        "#cce7ff", "#b3d4ff", "#99c1ff", "#80adff", "#668cff",
        "#4d7aff", "#3366ff", "#6699ff", "#66b2ff", "#66ccff",
        "#66e5ff", "#66ffe5", "#66ffb3", "#66ff99", "#66ff80",
        "#66ff66", "#80ff66", "#99ff66", "#b3ff66", "#ccff66",
        "#e5ff66"
    ].map((color, index) => {
        const audio = new Audio("sfx/" + settings.hitSounds + "/key" + index + ".mp3");
        audio.volume = (settings.audioVolume / 100);

        const numberOfLoops = settings.loops - (index * settings.loopReduction);
        const velocity = (2 * Math.PI) * numberOfLoops / settings.duration;

        return {
            color,
            audio,
            nextImpactTime: calculateNextImpactTime(startTime, velocity),
            velocity
        };
    });

    const draw = () => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

    muteText.style.display = soundEnabled ? "none" : "flex";

        const start = { x: canvas.width * 0.05, y: canvas.height * 0.9 + (canvas.height * (settings.ballSize * 2)) };
        const end = { x: canvas.width * 0.95, y: canvas.height * 0.9 + (canvas.height * (settings.ballSize * 2)) };
        const center = { x: canvas.width * 0.5, y: canvas.height * 0.9 };

        const length = end.x - start.x;
        const initialArcRadius = length * settings.initialArcRadius;
        const spacing = (length / 2 - initialArcRadius) / arcs.length;

        canvasWriter.strokeStyle = "white";
        canvasWriter.fillStyle = "white";
        canvasWriter.lineCap = "round";
        canvasWriter.lineWidth = settings.lineWidth;

        if (settings.showBaseline) {
            // Draw line
            canvasWriter.beginPath();
            canvasWriter.moveTo(start.x, start.y);
            canvasWriter.lineTo(end.x, end.y);
            canvasWriter.stroke();
        }

        arcs.forEach((arc, index) => {
            if (settings.showArcs) {
                // Draw arc
                canvasWriter.beginPath();
                canvasWriter.strokeStyle = arc.color;
                canvasWriter.arc(center.x, center.y, initialArcRadius + (index * spacing), Math.PI, 2 * Math.PI);
                canvasWriter.stroke();
            }

            const arcRadius = initialArcRadius + (index * spacing);
            const maxAngle = 2 * Math.PI;
            const distance = Math.PI + (elapsedTime * arc.velocity);
            const modDistance = distance % maxAngle;
            const adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

            // Draw circle
            const circleX = center.x + arcRadius * Math.cos(adjustedDistance);
            const circleY = center.y + arcRadius * Math.sin(adjustedDistance);

            canvasWriter.beginPath();
            canvasWriter.arc(circleX, circleY, length * settings.ballSize, 0, 2 * Math.PI);
            canvasWriter.fill();

            if (currentTime >= arc.nextImpactTime) {
                if (soundEnabled) {
                    arc.audio.play();
                }
                arc.nextImpactTime = calculateNextImpactTime(arc.nextImpactTime, arc.velocity);
            }
        });

        requestAnimationFrame(draw);
    };

    draw();
};

if (settings.playOnLoad) {
    initializeAnimation();
}
else {
    startText.style.display = "flex";
    canvas.onclick = initializeAnimation;
}
