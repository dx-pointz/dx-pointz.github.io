  function PointzCounter(){


  		this.getTransactions = function(){
        var pointz = {};
        var sucesso = function(jsonTransactions){
            var totalPointz = 0;
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
                totalPointz += jsonTransactions[i].value;
                pointz[ano][mes] += jsonTransactions[i].value;
            }
        };
        // $.ajax({  
        //   url: "http://dx-pointz.appspot.com/api/transactions",
        //   crossDomain : true,
        //   async: false,
        //   success : sucesso
        // });
        sucesso([{"value":53,"id":"/transactions/4651155913179136","personId":"/people/5410987167449088","type":"GITHUB_COMMIT","date":"2015/02/03 13:13:18","reference":"32cf45283c37ce3ca4b54333c29250a91a366f1f"},{"value":44,"id":"/transactions/4702377424715776","personId":"/people/5870819519496192","type":"GITHUB_COMMIT","date":"2015/01/03 13:00:35","reference":"90032a7894071ac4131746ee5c9508e119edcb2e"},{"value":10,"id":"/transactions/4709997502005248","personId":"/people/5973937120870400","type":"GITHUB_COMMIT","date":"2015/02/03 12:09:14","reference":"98dccd11b2515993ee2784b919b6c394d630ad53"}]);
        return pointz;
  	  };
      

  		this.toJson = function(old){
        var json = {};
        json.periodPointz = [];
  			for(var ano in old){
  				for(var mes in old[ano]){
            json.periodPointz.push({"year":ano, "month":mes, "pointz":old[ano][mes]});
          }
  			}
  			return json;
  		}

  		this.getTransactionsToGraph = function(){
        return this.toJson(this.getTransactions());
  		}

  		this.getPointsByTeam = function(){
  			
  		}



	  
  }



/*
  antes: {"01/2015":25, "02/2015":10}

  agora: {"2015": 
  			[
  				{"01": 30},
  				{"02":25}
  			],
  		  "2012":
  			[
  				{"01":23}
  			]	
  		};

  {"commits":[{
  	"year" : 2015,
  	"month" : 55,
  	"commit" : 5454
  }

  				]}

*/