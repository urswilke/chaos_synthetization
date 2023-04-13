import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
export default function plotLines(parent, data, allScaleNotes) {
    let show_random_vals = document.querySelector("#show-scaled-random").checked;
    let plotElement = Plot.plot({
        color: {
            type: "categorical"
        },
        marks: [
            Plot.ruleY(allScaleNotes, { stroke: "red", strokeWidth: 0.2 }),
            Plot.line(data, {
                x: "t",
                y: "midi",
                curve: "step",
                stroke: "i"
            }),
            // https://talk.observablehq.com/t/plot-conditional-control-over-marks/6499/2
            Plot.dot((show_random_vals) ? data : [], {
                x: "t",
                y: "scaled_random",
                stroke: "i",
                r: 0.5
            }),
            Plot.text(data, Plot.selectLast({
                x: "t",
                y: "midi",
                z: "i",
                text: "i",
                fill: "i",
                textAnchor: "start",
                dx: 3
            }))
        ]
    })
    document.getElementById('stepPlot').innerHTML = '';
    document.getElementById("stepPlot").appendChild(plotElement)
}
