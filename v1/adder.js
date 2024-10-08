// Select the SVG container
const svg = d3.select("#adder-circuit")
    .attr("width", 800)
    .attr("height", 600);

// Set up nodes (inputs, gates, outputs) and links (connections between them)
const nodes = [
    { id: "A", type: "input", label: "A" },
    { id: "B", type: "input", label: "B" },
    { id: "NOR1", type: "gate", label: "NOR" },
    { id: "NOR2", type: "gate", label: "NOR" },
    { id: "Sum", type: "output", label: "Sum" },
    { id: "Carry", type: "output", label: "Carry" }
];

const links = [
    { source: "A", target: "NOR1" },
    { source: "B", target: "NOR1" },
    { source: "A", target: "NOR2" },
    { source: "B", target: "NOR2" },
    { source: "NOR1", target: "Sum" },
    { source: "NOR2", target: "Carry" }
];

// Set up a simulation with D3's force layout
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-500))
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

// Add circles for input and output nodes, but load SVG for gates
node.filter(d => d.type === "input" || d.type === "output")
    .append("circle")
    .attr("r", 20)
    .attr("fill", d => d.type === "input" ? "lightblue" : "lightgreen");

// Add labels to the nodes
node.append("text")
    .attr("dy", ".35em")
    .attr("x", 0)
    .attr("y", d => d.type === "gate" ? 40 : 0)
    .text(d => d.label);

// Function to load NOR gate SVG for gate nodes
function loadGateSVG(gateNodeId) {
    d3.xml("nor.svg").then(data => {
        let norGate = d3.select(data.documentElement)
            .attr("width", 50)
            .attr("height", 50);

        d3.select(`#${gateNodeId}`).node().append(norGate.node());
    });
}

// Load NOR gate SVGs for gate nodes
loadGateSVG("NOR1");
loadGateSVG("NOR2");

// Update positions on each tick of the simulation
function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
}
