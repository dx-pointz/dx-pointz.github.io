google.load('visualization', '1', {packages: ['corechart']});
    //drawCommits(json);

    google.setOnLoadCallback(drawCommits);

    function drawCommits() {
      var pointz = new PointzCounter();
      var commitsJson = pointz.getTransactionsToGraph();
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