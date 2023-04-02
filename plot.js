import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
export default function plotLines(parent, data, allScaleNotes) {
    let plotElement = Plot.plot({
        color: {
            type: "categorical"
        },
        marks: [
            Plot.ruleY(allScaleNotes, { stroke: "red", strokeWidth: 0.2 }),
            Plot.line(data, {
                x: "i",
                y: "midi",
                curve: "step",
                stroke: "l"
            }),
            Plot.dot(data, {
                x: "i",
                y: "r",
                stroke: "l",
                r: 0.5
            }),
            Plot.text(data, Plot.selectLast({
                x: "i",
                y: "midi",
                z: "l",
                text: "l",
                textAnchor: "start",
                dx: 3
            }))
        ]
    })
    document.getElementById('stepPlot').innerHTML = '';
    document.getElementById("stepPlot").appendChild(plotElement)
}