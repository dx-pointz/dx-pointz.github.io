  function PointzCounter(){
      var pointz;
      var teamControll;
      var totalPointz;
      this.getTransactions = function(mock){
        pointz = {};
        totalPointz = 0;
        var sucesso = function(jsonTransactions){
            if(!mock && teamControll == null){
              teamControll = new TeamControll();
              for(team in teamControll.teams)
                      pointz[team] = 0;
              pointz["Outros"] = 0;
            }
            for(var i = 0; i < jsonTransactions.length; i++){
                var anoMesDia = jsonTransactions[i].date.split("/");
                var ano = anoMesDia[0];
                var mes = anoMesDia[1];
                if(pointz[ano] == null){
                  pointz[ano] = {};
                }
                if(pointz[ano][mes] == null){
                  pointz[ano][mes] = 0;
                }
                if (!mock){
                  var mesAtual = new Date().month+1;
                  var team;
                  var teams = teamControll.getTeams(jsonTransactions[i].personId);
                  for (team in teams && mes == mesAtual){
                    pointz[team] += jsonTransactions[i].value;
                  }
                }
                totalPointz += jsonTransactions[i].value;
                pointz[ano][mes] += jsonTransactions[i].value;
            }
        };
        $.ajax({
          url: "http://dx-pointz.appspot.com/api/transactions",
          crossDomain : true,
          async: false,
          success : sucesso
        });
        //sucesso([{"value":53,"id":"/transactions/4651155913179136","personId":"/people/5410987167449088","type":"GITHUB_COMMIT","date":"2015/02/03 13:13:18","reference":"32cf45283c37ce3ca4b54333c29250a91a366f1f"},{"value":44,"id":"/transactions/4702377424715776","personId":"/people/5870819519496192","type":"GITHUB_COMMIT","date":"2015/01/03 13:00:35","reference":"90032a7894071ac4131746ee5c9508e119edcb2e"},{"value":10,"id":"/transactions/4709997502005248","personId":"/people/5973937120870400","type":"GITHUB_COMMIT","date":"2015/02/03 12:09:14","reference":"98dccd11b2515993ee2784b919b6c394d630ad53"}]);
      };
      

      this.toJsonTransactions = function(){
        var json = {};
        json.periodPointz = [];
        for(var ano in pointz){
          for(var mes in pointz[ano]){
            json.periodPointz.push({"year":ano, "month":mes, "pointz":pointz[ano][mes]});
          }

        }
        return json;
      }

      this.getTransactionsToGraph = function(){
        if(pointz == null)
          this.getTransactions(true);
        return this.toJsonTransactions();
      }

      this.toJsonTeams = function(){
        var jsonArray = [];
        for(var team in teamControll.teams){
          jsonArray.push({text : team,count : pointz[team]});
        }
        jsonArray.push({text : "Outros",count : pointz[team]})
        return jsonArray;
      }

      this.getPointsByTeam = function(){
        if(pointz == null)
          this.getTransactions(false);
        return this.toJsonTeams();
      }    
  }