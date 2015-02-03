google.load('visualization', '1', {packages: ['corechart']});
    //drawCommits(json);

    google.setOnLoadCallback(drawCommits);

    function drawCommits() {
        var pointz = new PointzCounter();
        var commitsJson = pointz.getTransactionsToGraph();
        var json = {"periodPointz": [{ "year":2015,
                            "month":1,
                            "pointz":541
                          },{
                            "year":2015,
                            "month":2,
                            "pointz":679
                          },{
                            "year":2015,
                            "month":3,
                            "pointz":587
                          },{
                            "year":2015,
                            "month":4,
                            "pointz":621
                          },{
                            "year":2015,
                            "month":5,
                            "pointz":693
                          },{
                            "year":2015,
                            "month":6,
                            "pointz":590
                          },{
                            "year":2015,
                            "month":7,
                            "pointz":533
                          }]
      };
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Month');
      data.addColumn('number', 'Commits efetuados pela Dextra');

      var monthData = commitsJson.periodPointz;
      // alert(monthData.length);

      for (var i = 0; i < monthData.length; i++) {
        var year = monthData[i].year;
        var month = monthData[i].month;
        var pointz = monthData[i].pointz;
        data.addRow([new Date(year,month), pointz]); //-1 pois janeiro = 0
        //alert(year+"/"+month+"-"+pointz);
      };

      var options = {
        width: 1000,
        height: 563,
        hAxis: {
          title: "Mês"
        },
        vAxis: {
          title: "Número de Commits"
        }
      };

      var chart = new google.visualization.LineChart(
        document.getElementById('grafic'));
      chart.draw(data, options);

    }


    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Month');
      data.addColumn('number', 'Commits');

      data.addRows([
        [new Date(2015, 0), 0],   [new Date(2015, 1), 10],  [new Date(2015, 2), 23],
        [new Date(2015, 3), 17],  [new Date(2015, 4), 18],  [new Date(2015, 5), 9],
        [new Date(2015, 6), 11],  [new Date(2015, 7), 27],  [new Date(2015, 8), 33],
        [new Date(2015, 9), 40],  [new Date(2015, 10), 32], [new Date(2015, 11), 35]
      ]);

      var options = {
        width: 1000,
        height: 563,
        hAxis: {
          title: "Mês"
        },
        vAxis: {
          title: "Número de Commits"
        }
      };

      var chart = new google.visualization.LineChart(
        document.getElementById('grafic'));

      chart.draw(data, options);

    }