const fs = require('fs');

// Function to decode a value from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to calculate the Lagrange interpolation polynomial
function lagrangeInterpolation(points) {
    const n = points.length;
    let c = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += li * yi;
    }

    return c;
}

// Main function to process the JSON input and compute the constant term
function main() {
    // Read the JSON file
    const inputFile = 'input.json'; // Change to your file name
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    const n = data.keys.n;
    const k = data.keys.k;

    if (k > n) {
        console.error("Not enough roots provided");
        return;
    }

    const points = [];

    // Decode the Y values and prepare points for Lagrange interpolation
    for (let key in data) {
        if (key !== 'keys') {
            const base = data[key].base;
            const value = data[key].value;
            const x = parseInt(key);
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    // Calculate the constant term c
    const c = lagrangeInterpolation(points.slice(0, k));

    // Print the result
    console.log("The constant term c is:", c);
}

// Run the main function
main();