// Select the SVG container
const svg = d3.select("#adder-circuit")
    .attr("width", 800)
    .attr("height", 600);

// Set up nodes (inputs, gates, outputs) and links (connections between them)
const nodes = [
    { id: "A", type: "input", label: "A" },
    { id: "B", type: "input", label: "B" },
    { id: "NOR1", type: "gate", label: "NOR" },
    { id: "NOR1-input1", type: "gate-input", gate: "NOR1" }, // Input node for NOR1
    { id: "NOR1-input2", type: "gate-input", gate: "NOR1" },
    { id: "NOR1-output", type: "gate-output", gate: "NOR1" }, // Output node for NOR1
    { id: "NOR2", type: "gate", label: "NOR" },
    { id: "NOR2-input1", type: "gate-input", gate: "NOR2" }, // Input node for NOR2
    { id: "NOR2-input2", type: "gate-input", gate: "NOR2" },
    { id: "NOR2-output", type: "gate-output", gate: "NOR2" }, // Output node for NOR2
    { id: "Sum", type: "output", label: "Sum" },
    { id: "Carry", type: "output", label: "Carry" }
];

const links = [
    { source: "A", target: "NOR1-input1" },
    { source: "B", target: "NOR1-input2" },
    { source: "A", target: "NOR2-input1" },
    { source: "B", target: "NOR2-input2" },
    { source: "NOR1-output", target: "Sum" },
    { source: "NOR2-output", target: "Carry" }
];

// Set up a simulation with D3's force layout
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(400, 300))
    .on("tick", ticked);

// Add links (wires) to the SVG
const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "black");

// Add nodes (inputs, gates, outputs) to the SVG
const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .attr("class", d => d.type)
    .attr("id", d => d.id);

// Add small circles for input and output nodes
node.filter(d => d.type === "input" || d.type === "output" || d.type === "gate-input" || d.type === "gate-output")
    .append("circle")
    .attr("r", 10) // Small circle radius
    .attr("fill", d => {
        if (d.type === "input") return "lightblue";
        if (d.type === "output") return "lightgreen";
        return "gray"; // For gate inputs and outputs
    });

// Add labels to the input/output nodes
node.filter(d => d.type === "input" || d.type === "output")
    .append("text")
    .attr("dy", ".35em")
    .attr("x", 0)
    .attr("y", 15)
    .text(d => d.label);

// Function to load NOR gate SVG for gate nodes
function loadGateSVG(gateNodeId) {
    d3.xml("nor.svg").then(data => {
        const norGate = d3.select(data.documentElement)
            .attr("width", 50)
            .attr("height", 50)
            .attr("id", "nor-gate");

        d3.select(`#${gateNodeId}`).node().append(norGate.node());
    });
}

// Load NOR gate SVGs for gate nodes
loadGateSVG("NOR1");
loadGateSVG("NOR2");

// Update positions on each tick of the simulation
function ticked() {
    // Position the wires (links)
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    // Position the main nodes (inputs, gates, outputs)
    node
        .attr("transform", d => `translate(${d.x},${d.y})`);

    // Position gate input/output nodes relative to the NOR gates
    node.filter(d => d.type === "gate-input" || d.type === "gate-output")
        .attr("transform", d => {
            const gate = nodes.find(n => n.id === d.gate);
            if (d.type === "gate-input" && d.id.endsWith("input1")) {
                return `translate(${gate.x - 25},${gate.y - 15})`; // Top-left input
            } else if (d.type === "gate-input" && d.id.endsWith("input2")) {
                return `translate(${gate.x - 25},${gate.y + 15})`; // Bottom-left input
            } else if (d.type === "gate-output") {
                return `translate(${gate.x + 50},${gate.y})`; // Right-side output
            }
        });
}
