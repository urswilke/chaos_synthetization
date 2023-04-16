import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from 'd3';
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
                curve: "step-before",
                stroke: "i"
            }),
            // https://talk.observablehq.com/t/plot-conditional-control-over-marks/6499/2
            Plot.dot((show_random_vals) ? data : [], {
                x: "t_dot",
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
            })),
            // see here how to update Plot with d3:
            // https://observablehq.com/d/fe07120a4ffbd1d1
            addUpdateX(Plot.ruleX([0]))

        ]
    })

    const step_plot_element = document.getElementById('stepPlot');
    step_plot_element.innerHTML = '';
    step_plot_element.appendChild(plotElement)
    return plotElement;
}

function addUpdateX(mark) {
    const {render} = mark;
    mark.render = function(data, {x}) {
      const g = render.apply(this, arguments);
      setTimeout(() => g.ownerSVGElement.update = update, 1);
      return g;
      function update(v) {
        d3.select(g).select("line").attr("x1", x(v)).attr("x2", x(v))
      }
    }
    return mark;
}


