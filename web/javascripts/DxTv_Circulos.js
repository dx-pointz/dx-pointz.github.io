$(document).ready(function () {
  /*BOLAS*/


  setTimeout(function(){
    $(".chartContainer").html("<div id='grafic'></div>");
    $(".rotulo").html("<h1 class='ls-title-intro ls-ico-stats'>Dextra no tempo</h1>")
    //$.getScript("dextra_tempo.js");
    drawCommits();
  }, 60000);



  var bolas = $(".bubbleChart").children();
  var index = 0;
  var __nodes;
  var bubbleChart;
   setInterval(function() {
        if(!__nodes){
          if (bubbleChart)
            __nodes = bubbleChart.getNodes()[0];
        }
        var __node = __nodes[index];
        bubbleChart.clickedNode = d3.select(__node);
        bubbleChart.reset(bubbleChart.centralNode);
        bubbleChart.moveToReflection(bubbleChart.get().selectAll(".node:not(.active)"), false);
        bubbleChart.moveToCentral(bubbleChart.clickedNode);
        index++;
        if(index >= __nodes.length)
          index = 0;
   }, 2000);

  //FIXMEEEEEEEEEEEEE
  var mock = true;

  var jsonArrayGroupPointz;
  if(!mock){
    var counter = new PointzCounter();
    jsonArrayGroupPointz = counter.getPointsByTeam();
  }else{
    jsonArrayGroupPointz = [{text:"Gaia",count:"400"},
    {text:"Buzz",count:"200"},
    {text:"MUX",count:"250"},
    {text:"Walking",count:"350"},
    {text:"Mustache",count:"380"},
    {text:"Heisenberg",count:"280"},
    {text:"Globosat",count:"360"}];
  }

  bubbleChart = new d3.svg.BubbleChart({
  supportResponsive: true,
  //container: => use @default
  size: 600,
  //viewBoxSize: => use @default
  innerRadius: 600 / 3.5,
  //outerRadius: => use @default
  radiusMin: 50,
  //radiusMax: use @default
  //intersectDelta: use @default
  //intersectInc: use @default
  //circleColor: use @default
  data: {
    items: jsonArrayGroupPointz,
    eval: function (item) {return item.count;},
    classed: function (item) {return item.text.split(" ").join("");}
  },
  plugins: [
    {
      name: "central-click",
      options: {
        text: "",
        style: {
          "font-size": "12px",
          "font-style": "italic",
          "font-family": "Source Sans Pro, sans-serif",
          //"font-weight": "700",
          "text-anchor": "middle",
          "fill": "white"
        },
        attr: {dy: "65px"},
        centralClick: function() {
          //alert("Here is more details!!");
        }
      }
    },
    {
      name: "lines",
      options: {
        format: [
          {// Line #0
            textField: "count",
            classed: {count: true},
            style: {
              "font-size": "28px",
              "font-family": "Source Sans Pro, sans-serif",
              "text-anchor": "middle",
              fill: "white"
            },
            attr: {
              dy: "0px",
              x: function (d) {return d.cx;},
              y: function (d) {return d.cy;}
            }
          },
          {// Line #1
            textField: "text",
            classed: {text: true},
            style: {
              "font-size": "14px",
              "font-family": "Source Sans Pro, sans-serif",
              "text-anchor": "middle",
              fill: "white"
            },
            attr: {
              dy: "20px",
              x: function (d) {return d.cx;},
              y: function (d) {return d.cy;}
            }
          }
        ],
        centralFormat: [
          {// Line #0
            style: {"font-size": "50px"},
            attr: {}
          },
          {// Line #1
            style: {"font-size": "30px"},
            attr: {dy: "40px"}
          }
        ]
      }
    }]
  });
});