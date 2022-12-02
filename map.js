mapboxgl.accessToken =
  "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/cloudlun/cl2eq8ceb000a15o06rah6zx5", // style URL
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

let g = {
  countries: svg.append("g").attr("id", "countries"),
  centroids: svg.append("g").attr("id", "centroids"),
  path: svg.append("g").attr("id", "paths"),
};

const data = {
  countries: "./data/raw/countries.geojson",
  centroids: "./data/raw/centroids.geojson",
  refugees: "./data/data.csv",
};

const promises = [
  d3.json(data.countries),
  d3.json(data.centroids),
  d3.csv(data.refugees),
];

const tooltip = d3.select("body").append("div").attr("class", "tooltip");

Promise.all(promises).then((data) => {
  countryCentroidCreator(data[1].features);

  function render() {
    centroids.attr("d", path.pointRadius(3));
  }

  render();
  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);
});

function countryCentroidCreator(data) {
  centroids = g.centroids
    .selectAll("centroids")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "centroid")
    .attr("data-country", (d) => `${d.properties.COUNTRY}`)
    .attr("stroke", "none")
    .attr("fill", "orange")
    .attr("stroke-width", 0.25)
    .attr("fill-opacity", 0.8)
    .on("mouseover", (e, d) => {
      content = `${d.properties.COUNTRY}`;
      tooltip.html(content).style("visibility", "visible");
    })
    .on("mousemove", (e, d) => {
      tooltip
        .style("top", e.pageY - (tooltip.node().clientHeight + 5) + "px")
        .style("left", e.pageX - tooltip.node().clientWidth / 2.0 + "px");
    })
    .on("mouseout", (e, d) => {
      tooltip.style("visibility", "hidden");
    })
    .on("click", (e, d) => {
      e.target.classList.contains("clicked")
        ? d3.select(e.target).attr("class", "centroid")
        : d3.select(e.target).attr("class", "centroid clicked");
      e.target.classList.contains("clicked")
        ? d3.select(e.target).attr("fill", "red")
        : d3.select(e.target).attr("fill", "orange");
    });
}
