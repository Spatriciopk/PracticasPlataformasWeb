// https://observablehq.com/@d3/mona-lisa-histogram@280
function _1(md){return(
md`# Mona Lisa Histogram

A [brush](https://github.com/d3/d3-brush) interactively defines a rectangular zone of a famous painting. We extract the pixel values from that zone and display a histogram atop.`
)}

function _chart(d3,DOM,width,height,image,y,area,line,html)
{
  const r = new Uint16Array(257);
  const g = new Uint16Array(257);
  const b = new Uint16Array(257);

  const brush = d3.brush()
      .on("start brush", brushed);

  const context = DOM.context2d(width, height, 1);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const histogram = svg.append("g")
      .style("isolation", "isolate");

  const histoarea = histogram
    .selectAll("path")
    .data([r, g, b])
    .join("path")
      .style("mix-blend-mode", "screen")
      .attr("fill", (d, i) => d3.hsl(i * 120, 1, 0.5));

  const histoline = histoarea.clone()
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("shape-rendering", "crispEdges")
      .style("mix-blend-mode", null)
      .raise();

  context.drawImage(image, 0, 0, width, height);

  svg.append("g")
      .call(brush)
      .call(brush.move, [[width * 0.3, height * 0.1], [width * 0.7, height * 0.4]]);

  function brushed({selection: [[x0, y0], [x1, y1]]}) {
    x0 = Math.round(x0), y0 = Math.round(y0);
    x1 = Math.round(x1), y1 = Math.round(y1);
    const dx = x1 - x0, dy = y1 - y0;

    r.fill(0);
    g.fill(0);
    b.fill(0);

    if (x1 > x0 && y1 > y0) {
      const data = context.getImageData(x0, y0, dx, dy).data;
      let max = 0;
      for (let i = 0, k = -1; i < dx; ++i) {
        for (let j = 0; j < dy; ++j, ++k) {
          max = Math.max(max, ++r[data[++k]], ++g[data[++k]], ++b[data[++k]]);
        }
      }
      y.domain([0, max]);
    }

    histoarea.attr("d", area);
    histoline.attr("d", line);
  }

  return html`
  ${Object.assign(context.canvas, {style: "position: absolute;"})}
  ${Object.assign(svg.node(), {style: "position: relative;"})}
`;
}


function _x(d3,width){return(
d3.scaleLinear()
    .domain([0, 256])
    .rangeRound([0, width])
)}

function _y(d3,height){return(
d3.scaleLinear()
    .rangeRound([0, height / 4])
)}

function _area(d3,x,y){return(
d3.area()
    .curve(d3.curveStepAfter)
    .x((d, i) => x(i))
    .y0(y(0))
    .y1(y)
)}

function _line(d3,curveStepBelow,x,y){return(
d3.line()
    .curve(curveStepBelow)
    .x((d, i) => x(i))
    .y(y)
)}

function _7(md){return(
md`A custom curve that wraps the area a bit more generously than d3.curveStepAfter.`
)}

function _curveStepBelow(){return(
function curveStepBelow(context) {
  let y0, i;
  return {
    lineStart: () => { y0 = NaN, i = 0; },
    lineEnd: () => {},
    point: (x, y) => {
      x -= y0 < y ? -0.5 : +0.5;
      y += 0.5;
      if (++i === 1) {
        context.moveTo(x, y0 = y);
      } else {
        context.lineTo(x, y0);
        context.lineTo(x, y0 = y);
      }
    }
  };
}
)}

function _image(){return(
new Promise((resolve, reject) => {
  const image = new Image;
  image.style = "height: 60px; display: block;";
  image.crossOrigin = "anonymous";
  image.onerror = reject;
  image.onload = () => resolve(image);
  image.src = "https://gist.githubusercontent.com/mbostock/9511ae067889eefa5537eedcbbf87dab/raw/944b6e5fe8dd535d6381b93d88bf4a854dac53d4/mona-lisa.jpg";
})
)}

function _height(width,image){return(
Math.round(width / image.naturalWidth * image.naturalHeight)
)}

function _d3(require){return(
require("d3@7")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","image","y","area","line","html"], _chart);
  main.variable(observer("x")).define("x", ["d3","width"], _x);
  main.variable(observer("y")).define("y", ["d3","height"], _y);
  main.variable(observer("area")).define("area", ["d3","x","y"], _area);
  main.variable(observer("line")).define("line", ["d3","curveStepBelow","x","y"], _line);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("curveStepBelow")).define("curveStepBelow", _curveStepBelow);
  main.variable(observer("image")).define("image", _image);
  main.variable(observer("height")).define("height", ["width","image"], _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
