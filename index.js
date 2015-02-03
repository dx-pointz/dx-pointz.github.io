$(document).ready(function () {
  $.ajax({
  url: "http://dx-pointz.appspot.com/api/transactions?q={'order':[{p:'date',d:'desc'}],limit:6}",
  crossDomain : true,
  }).done(function(jsonDxPointz){
    var table = "<table>";
    for(int i = 0; i < jsonDxPointz.length; i++){
      table+="<tr><td>"+jsonDxPointz[i].name+"</td>";
              
      table+="<td>"+jsonDxPointz[i].pointz+"</td></tr>";
    }
    table+="</table>";
    $(".tableDxPointz").html(table);
  });

  /*BOLAS*/
  var bolas = $(".bubbleChart").children();
  var index = 0;
  var __nodes;
   setInterval(function() {
        if(!__nodes)
            __nodes = bubbleChart.getNodes()[0];
        var __node = __nodes[index];
        bubbleChart.clickedNode = d3.select(__node);
        bubbleChart.reset(bubbleChart.centralNode);
        bubbleChart.moveToReflection(bubbleChart.get().selectAll(".node:not(.active)"), false);
        bubbleChart.moveToCentral(bubbleChart.clickedNode);
        index++;
        if(index >= __nodes.length)
          index = 0;
   }, 2000);
  //inicio contador commits
  $.ajax({
  url:"http://dx-pointz.appspot.com/api/transactions";
  crossDomain:true;
  }).done(function(jsonTransactions){
    var month = new Date().getMonth() + 1;
    var totalmonth = 0;
    var total = 0;
    for(var i = 0; i < jsonTransactions.length;i++){
      total += 1;
      if(parseInt(jsonTransactions[i].date.split("/")[1] == month)){
        totalmonth += 1;
      }
    }
  });
  //fim contador commits
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
      items: [
        {text: "Gaia", count: "400"},
        {text: "Buzz", count: "382"},
        {text: "Walking", count: "170"},
        {text: "Mustache", count: "123"},
        {text: "Globosat", count: "12"},
        {text: "Heisenberg", count: "170"},
        {text: "Infra", count: "382"},
        {text: "Outros", count: "10"},
        //{text: "Something", count: "170"},
      ],
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


