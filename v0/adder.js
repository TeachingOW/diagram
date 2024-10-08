// Select the SVG container
const svg = d3.select("#adder-circuit")
    .attr("width", 800)
    .attr("height", 600);

// Load the NOR gate SVG and place it on the circuit
function loadNORGate(x, y, id) {
    d3.xml("nor.svg").then(function(data) {
        let norGate = d3.select(data.documentElement)
                        .attr("width", 50)
                        .attr("height", 50)
                        .attr("x", x)
                        .attr("y", y)
                        .attr("id", id);
        
        svg.node().append(norGate.node());
    });
}

// Draw input/output circles and labels
function drawInput(x, y, label) {
    // Draw input circle
    svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .attr("fill", "lightblue");

    // Draw input label
    svg.append("text")
        .attr("x", x)
        .attr("y", y + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .text(label);
}

// Draw output circles and labels
function drawOutput(x, y, label) {
    // Draw output circle
    svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .attr("fill", "lightgreen");

    // Draw output label
    svg.append("text")
        .attr("x", x)
        .attr("y", y + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .text(label);
}

// Draw connections (wires)
function createWire(x1, y1, x2, y2) {
    svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
}

// Step 1: Draw Inputs (A, B)
drawInput(50, 150, "A");
drawInput(50, 250, "B");

// Step 2: Place NOR Gates
loadNORGate(200, 100, "nor1");  // NOR gate 1
loadNORGate(200, 200, "nor2");  // NOR gate 2
loadNORGate(400, 150, "nor3");  // NOR gate 3 (for final sum)

// Step 3: Draw Outputs (Sum, Carry)
drawOutput(600, 150, "Sum");
drawOutput(600, 250, "Carry");

// Step 4: Connect the Gates (Wires)
// Connect inputs A, B to NOR gates
createWire(70, 150, 200, 125);  // Input A to NOR1
createWire(70, 250, 200, 225);  // Input B to NOR2

// Connect NOR gates to the output
createWire(250, 125, 400, 150);  // NOR1 to NOR3 (Sum)
createWire(250, 225, 600, 250);  // NOR2 to Carry output
createWire(450, 150, 600, 150);  // NOR3 to Sum output

// Step 5: Logic Simulation (Optional)
let inputs = {
    A: 0,
    B: 0
};

function calculateAdder(A, B) {
    function NOR(a, b) {
        return !(a || b);
    }

    // XOR using NOR gates (Sum)
    let A_nor_A = NOR(A, A);
    let B_nor_B = NOR(B, B);
    let A_nor_B = NOR(A, B);
    let A_XOR_B = NOR(A_nor_A, B_nor_B);

    // AND using NOR gates (Carry)
    let A_AND_B = NOR(A_nor_B, A_nor_B);

    // Return sum and carry
    return {
        sum: A_XOR_B,
        carry: A_AND_B
    };
}

// Example: Simulate inputs A = 1, B = 0
let result = calculateAdder(1, 0);
console.log("Sum: ", result.sum, "Carry: ", result.carry);
