let outerRadius = 30; // Default outer radius
let innerRadius = outerRadius/2; // Default inner radius
let stars = []; // Array to store star data

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight * (70 / 100));
    canvas.parent('data-viz'); 
	fill(94, 255, 0);
}

function draw() {
    background(237, 244, 255); // Set the background color
    stroke(77, 7, 163); // Set the stroke color for the stars

    // Draw all stars from the stars array
    for (let starData of stars) {
        fill(94, 255, 0); // Set the fill color to #5eff00 (bright green)
        star(starData.x, starData.y, starData.innerRadius, starData.outerRadius, starData.npoints);

        // Display the input length as text above the star
        fill(77, 7, 163); // Set text color
        textAlign(CENTER); // Center align the text
        textSize(16); // Set text size
        text(`Input Length: ${starData.text}`, starData.x, starData.y - starData.outerRadius - 40);

        // Display the label
        text(`Label: ${starData.label}`, starData.x, starData.y + starData.outerRadius + 20);

        // Display the weight
        textSize(14);
        text(`Weight: ${starData.weight}g`, starData.x, starData.y - starData.outerRadius - 25);

        // Display the LED equivalent hours
        textSize(14);
        text(`LED Eq: ${starData.ledHours} hrs`, starData.x, starData.y - starData.outerRadius - 10);
    }
}


// Function to create a star
function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function calculateWeight(label, npoints) {
    let BrowserWeight =(Math.round(random((0.3), 1)*10)); //gram value for each search method
    let AISmallWeight = (Math.round(random(5, 15)*10));
    let AIBigWeight = (Math.round(random(15, 50)*10));
    let VideoWeight = (Math.round(random(400, 500)*10));

    if (label === 'Browser') {
        return BrowserWeight; // Return numeric weight
    } else if (label === 'AI') {
        if (npoints < 10) {
            return AISmallWeight;
        } else {
            return AIBigWeight;
        }
    } else if (label === 'Video Streaming') {
        return VideoWeight;
    }
    return 30; // Fallback to a default radius
}

function addStar() {
    const errorMessage = document.getElementById('error-message');
    const selectedOption = document.querySelector('input[name="selection"]:checked');

    if (!selectedOption) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Please choose a search method';
        return;
    }

    errorMessage.style.display = 'none';

    let input = document.querySelector('#search-input').value;
    let numPoints = input.length;

    if (numPoints <= 0) {
        console.log('Please type some input to create a star.');
        return;
    }

    let x = random(0 + outerRadius / 2, width - outerRadius / 2);
    let y = random(0 + outerRadius*2, height - outerRadius - 10);

    let label = selectedOption.value;
    let weight = calculateWeight(label, numPoints); // Get the numeric weight

    // Calculate hours of LED use equivalent
    const LED_PER_HOUR = 4; // Assume 4 grams CO2 per hour of LED use
    let ledHours = (weight / LED_PER_HOUR).toFixed(2); // Calculate hours and round to 2 decimal places

    console.log(`Weight for ${label}: ${weight}g, LED Equivalent: ${ledHours} hours`); // Log the details

    // Push star data, including LED equivalent
    stars.push({ 
        x, 
        y, 
        innerRadius: weight / random(2, 4), // Adjust innerRadius as a fraction of outerRadius
        outerRadius: weight, 
        npoints: numPoints, 
        text: input.length, 
        label: label,
        weight: weight, // Store the calculated weight
        ledHours: ledHours // Store LED equivalent hours
    });
}
