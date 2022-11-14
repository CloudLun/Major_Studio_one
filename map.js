mapboxgl.accessToken =
  "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2w4NmgxNjQ1MHFsOTNub2V5ZjNma3NnYyJ9.S2Uvtteen0hNKEXuwbuVGA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/cloudlun/cl89bhddq002g14n3mi9k8b10", // style URL
  center: [9.128, 7.815], // starting position [lng, lat]
  zoom: 2.13, // starting zoom
});

function projectPoint(lon, lat) {
  var point = map.project(new mapboxgl.LngLat(lon, lat));
  this.stream.point(point.x, point.y);
}

let transform = d3.geoTransform({ point: projectPoint });
let path = d3.geoPath().projection(transform);

let container = map.getCanvasContainer();
let svg = d3
  .select(container)
  .append("svg")
  .attr("width", "100%")
  .attr("height", "2000")
  .style("position", "absolute")
  .style("z-index", 2);

function polygonColor(d) {
  return 0 > d && d > -500
    ? "#D98880"
    : -500 > d && d > -1000
    ? "#CD6155"
    : -1000 > d && d > -5000
    ? "#C0392B"
    : -5000 > d
    ? "#922B21"
    : "#3b3b3b";
}

d3.json("./data/countries.geojson").then((data) => {
  // console.log(data)
  // data.features.forEach(d => console.log(d.properties.changes))

  let polygons = svg
    .selectAll("polygons")
    .data(data.features)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("stroke-width", 0.25)
    .attr("fill", (d) => polygonColor(d.properties.changes))
    .attr("fill-opacity", 0.8);

  function render() {
    polygons.attr("d", path);
  }

  render();
  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);
});
