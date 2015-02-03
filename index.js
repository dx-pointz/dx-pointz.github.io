$(document).ready(function () {
  var bolas = $(".bubbleChart").children();
  var index = 0;
  setInterval(205,function() {
    console.info("FOI");
      $.moveToCentral(".node");
      //bolas[index].click();
      //index++;
      //if(index >= bolas.length)
      //  index = 0;
  });
  //inicio contador commits
  $.get("http://dx-pointz.appspot.com/api/transactions").success(function(jsonTransactions){
    var jsonTransactions =  eval('([{"id":"/transactions/4649310150983680","personId":"/people/5186378094608384","type":"GITHUB_COMMIT","date":"2015/02/03 10:50:08","reference":"62f42c985f8d568d4abc9cfca2a15de2ff586d3a"},{"id":"/transactions/6011557007851520","personId":"/people/5171105190903808","type":"GITHUB_COMMIT","date":"2015/02/02 19:07:00","reference":"c1afe4a2f39bcca6124a4123b1f76e1fc49df51c"}])');
    var month = new Date().getMonth() + 1;
    var totalmonth = 0;
    var total = 0;
    for(var i = 0; i < jsonTransactions.length;i++){
      total += 1;
      if(parseInt(jsonTransactions[i].date.split("/")[1] == month)){
        totalmonth += 1;
      }
    }
    alert('total commits:'+total);
  });
  //fim contador commits
  var bubbleChart = new d3.svg.BubbleChart({
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
          text: "(See more detail)",
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
            alert("Here is more details!!");
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