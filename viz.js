// let brazil = [500, -70, -16, "brazil", "#922B21"];
// let congo = [1260, 5, -0.72, "congo", "#922B21"];
// let angola = [1010, 7, -12, "angola", "#922B21"];
// let indonesia = [560, 102, -3, "indonesia", "#922B21"];
// let tanzania = [1100, 25, -6, "tanzania", "#C0392B"];
// let myanmar = [1000, 86, 19, "mynamar", "#C0392B"];
// let colombia = [1100, -86, 3, "colombia", "#C0392B"];
// let argentina = [480, -94, -42, "argentina", "#C0392B"];
// let nigeria = [880, -4, 8, "nigeria", "#C0392B"];
// let venezuela = [980, -78, 7.1, "venezuela", "#C0392B"];


let countryList = [
  [550, -50, -17, "brazil", "#922B21", "Brazil"],
  [1400, 17, -1.5, "congo", "#922B21", "Congo"],
  [1200, 20, -13, "angola", "#922B21", "Angola"],
  [700, 120, -5, "indonesia", "#922B21", "Indonesia"],
  [1200, 35, -8, "tanzania", "#C0392B", "Tanzania"],
  [1100, 100, 18, "myanmar", "#C0392B", "Myanmar"],
  [1100, -69, 3, "colombia", "#C0392B", "Colombia"],
  [520, -60, -42, "argentina", "#C0392B", "Argentina"],
  [1100, 10, 8, "nigeria", "#C0392B", "Nigeria"],
  [1300, -66, 5, "venezuela", "#C0392B", "Venezuela"],
];


let chartWidth = window.innerWidth / 2;
let chartHeight = window.innerHeight;

const margin = { left: 50, right: 0, top: 65, bottom: 0 };
const lineChartWidth = chartWidth;
const lineChartHeight = chartHeight / 2.8 - margin.top - margin.bottom;

let countryViz = d3
  .select("#countryViz")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let countriesMap = d3
  .select("#countryMap")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%");

function mapGenerator(c) {
  let projection = d3.geoMercator().scale(c[0]).center([c[1], c[2]]);
  const countryMapPath = d3.geoPath().projection(projection);
  d3.json(`./data/country/geojson/${c[3]}.geojson`).then((data) => {
    countriesMap.selectAll("path").remove();
    countriesMap
      .selectAll("path")
      .exit()
      .remove()
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", countryMapPath)
      .attr("fill", c[4])
      .attr("fill-opacity", 0.6);
  });
}

function mapFilterHandler(t) {
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i][3] === t) {
      mapGenerator(countryList[i]);
    }
  }
}

function barGenerator() {
  d3.csv("./data/topFive.csv").then((data) => {
    data.forEach((d) => {
      d["2010"] = +d["2010"];
      d["2020"] = +d["2020"];
      d["changes"] = +d["changes"];
    });

    let x = d3
      .scaleBand()
      .padding(0.03)
      .domain(data.map((d) => d.country))
      .range([0, lineChartWidth]);
    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => +d["changes"]))])
      .range([lineChartHeight, 0]);

    const xAxis = countryViz.append("g").attr("class", "xAxis");
    const yAxis = countryViz.append("g").attr("class", "yAxis");

    xAxis
      .attr("transform", "translate(0," + lineChartHeight + ")")
      .call(d3.axisBottom(x))
      .call((g) => {
        g.select(".domain").remove();
      });
    yAxis
      .append("g")
      .call(d3.axisLeft(y))
      .call((g) => {
        g.select(".domain").remove();
      });

    xAxis.selectAll("text").style("fill", "white").style("font-size", 14);
    yAxis.selectAll("text").style("fill", "white");

    function colorFilter(d) {
      return d > 5000 ? "#922B21" : "#C0392B";
    }

    countryViz
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.country);
      })
      .attr("y", function (d) {
        return y(d.changes);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return lineChartHeight - y(d.changes);
      })
      .attr("fill", (d) => colorFilter(d.changes))
      .attr("id", (d) => d.country)
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("50").attr("opacity", ".85");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("50").attr("opacity", "1");
      })
      .on("click", function (d, i) {
        let rectID = d3.select(this)["_groups"][0][0].id;
        console.log("a");
        mapFilterHandler(rectID);
      });

    let numbers = countryViz
      .selectAll("texts")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.changes)
      .attr("y", (d) => {
        return y(d.changes) - 8;
      })
      .attr("x", (d) => {
        return x(d.country) + x.bandwidth() / 2;
      })
      .style("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "12px");
  });
}

barGenerator();
mapGenerator(countryList[0]);


const countryName = document.querySelector(".name");
const viz = document.querySelector("#countryViz");

viz.addEventListener("click", (e) => {
  let target = e.target.id;
  for(let i =0; i< countryList.length; i++){
    if (target === countryList[i][3] ) {
      countryName.innerHTML = countryList[i][5]
    }
  }

});


