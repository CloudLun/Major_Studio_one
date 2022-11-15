$(document).ready(function () {
    var vis = d3
      .select("#dot-map")
      .append("svg")
      .attr("id", "svg")
      .style("float", "left");
  
    var w = 450,
      h = 450;
    vis.attr("width", w).attr("height", h);
  
    var vis2 = d3
      .select("#dot-map2")
      .append("svg")
      .attr("id", "svg")
      .style("float", "left");
  
    var w = 450,
      h = 450;
    vis2.attr("width", w).attr("height", h);
  
    var ps = [
      { x: 100, y: 220 },
      { x: 250, y: 320 },
      { x: 350, y: 420 },
      { x: 275, y: 210 },
      { x: 180, y: 375 },
      { x: 150, y: 150 },
      { x: 335, y: 250 },
      { x: 380, y: 350 }
    ];
  
    var cs = [
      { x: 100, y: 220 },
      { x: 350, y: 400 },
      { x: 250, y: 320 },
      { x: 320, y: 480 },
      { x: 180, y: 375 },
      { x: 150, y: 150 },
      { x: 335, y: 250 },
      { x: 380, y: 350 }
    ];
  
    var start = [
      {
        i: "p1",
        x: 250,
        y: 320,
        f: 3,
        d: "Strategic Division",
        source: ps[0],
        target: ps[1]
      },
      {
        i: "p2",
        x: 250,
        y: 320,
        f: 2,
        d: "Policy Division",
        source: ps[1],
        target: ps[1]
      },
      {
        i: "p3",
        x: 250,
        y: 320,
        f: 1,
        d: "Change Division",
        source: ps[2],
        target: ps[1]
      },
      {
        i: "p4",
        x: 250,
        y: 320,
        f: 2,
        d: "Research Division",
        source: ps[3],
        target: ps[1]
      },
      {
        i: "p5",
        x: 250,
        y: 320,
        f: 2,
        d: "Advisory division",
        source: ps[4],
        target: ps[1]
      },
      {
        i: "p6",
        x: 250,
        y: 320,
        f: 3,
        d: "Assurance Division",
        source: ps[5],
        target: ps[1]
      },
      {
        i: "p7",
        x: 250,
        y: 320,
        f: 2,
        d: "Tax Division",
        source: ps[6],
        target: ps[1]
      },
      {
        i: "p8",
        x: 250,
        y: 320,
        f: 2,
        d: "TAS Division",
        source: ps[7],
        target: ps[1]
      }
    ];
  
    var change = [
      {
        i: "c1",
        x: 200,
        y: 240,
        f: 2,
        d: "Strategic Division",
        source: cs[0],
        target: cs[2]
      },
      {
        i: "c2",
        x: 200,
        y: 240,
        f: 3,
        d: "Policy Division",
        source: cs[1],
        target: cs[2]
      },
      {
        i: "c3",
        x: 200,
        y: 240,
        f: 1,
        d: "Change Division",
        source: cs[2],
        target: cs[2]
      },
      {
        i: "c4",
        x: 200,
        y: 240,
        f: 3,
        d: "Research Division",
        source: cs[3],
        target: cs[2]
      },
      {
        i: "c5",
        x: 200,
        y: 240,
        f: 3,
        d: "Advisory division",
        source: cs[4],
        target: cs[2]
      },
      {
        i: "c6",
        x: 200,
        y: 240,
        f: 1,
        d: "Assurance Division",
        source: cs[5],
        target: cs[2]
      },
      {
        i: "c7",
        x: 200,
        y: 240,
        f: 1,
        d: "Tax Division",
        source: cs[6],
        target: cs[2]
      },
      {
        i: "c8",
        x: 200,
        y: 240,
        f: 1,
        d: "TAS Division",
        source: cs[7],
        target: cs[2]
      }
    ];
  
    vis
      .selectAll(".line")
      .data(ps)
      .enter()
      .append("line")
      .data(start)
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })
      .attr("stroke-width", 4)
      .style("stroke", "rgb(0,0,0)")
      .style("stroke-opacity", 0);
  
    vis2
      .selectAll(".line")
      .data(cs)
      .enter()
      .append("line")
      .data(change)
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })
      .attr("stroke-width", 4)
      .style("stroke", "rgb(0,0,0)")
      .style("stroke-opacity", 0);
  
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
    var elem = vis
      .selectAll("g")
      .data(start)
      .enter()
      .append("svg:g")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .attr("id", function (d) {
        return d.i;
      })
      .on("mouseover", function (d) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html("" + d.d + "")
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        div.transition().duration(500).style("opacity", 0);
      });
  
    elem
      .append("svg:circle")
      .attr("r", function (d) {
        return d.f * 12 + "px";
      })
      .attr("fill", "yellow");
  
    var chang = vis2
      .selectAll("g")
      .data(change)
      .enter()
      .append("svg:g")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .attr("id", function (d) {
        return d.i;
      })
      .on("mouseover", function (d) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html("" + d.d + "")
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        div.transition().duration(500).style("opacity", 0);
      });
  
    chang
      .append("svg:circle")
      .attr("r", function (d) {
        return d.f * 12 + "px";
      })
      .attr("fill", "#003f93");
  
    function changemap() {
      vis
        .selectAll("g")
        .data(ps)
        .transition()
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function (d) {
          return 12 * d.f + "px";
        });
  
      vis.selectAll("line").style("stroke-opacity", 0.2);
  
      vis
        .selectAll("g")
        .data(start)
        .append("svg:text")
  
        .attr("dx", "-10px")
        .attr("dy", "5px")
        .attr("fill", "red");
  
      vis.select("#p1").attr("fill", "blue");
    }
  
    function reset() {
      vis
        .selectAll("g")
        .data(start)
        .transition()
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function (d) {
          return 10 + "px";
        });
  
      vis.selectAll("line").style("stroke-opacity", 0);
  
      vis.selectAll("text").remove();
    }
  
    function changemap2() {
      vis2
        .selectAll("g")
        .data(cs)
        .transition()
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function (d) {
          return 12 * d.f + "px";
        });
  
      vis2.selectAll("line").style("stroke-opacity", 0.2);
  
      vis2
        .selectAll("g")
        .data(start)
        .append("svg:text")
        .attr("dx", "-10px")
        .attr("dy", "5px")
        .attr("fill", "red");
    }
  
    function reset2() {
      vis2
        .selectAll("g")
        .data(start)
        .transition()
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function (d) {
          return 10 + "px";
        });
  
      vis2.selectAll("line").style("stroke-opacity", 0);
  
      vis2.selectAll("text").remove();
    }
  
    $("#p8").on("click", function () {
      changemap();
    });
  
    $("#p2").on("click", function () {
      reset();
    });
  
    $("#c8").on("click", function () {
      changemap2();
    });
  
    $("#c3").on("click", function () {
      reset2();
    });
  });
  