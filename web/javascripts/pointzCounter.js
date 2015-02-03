  function PointzCounter {

  		this.years = [];

  		this.getTransactions() = function{

			$.get("http://dx-pointz.appspot.com/api/transactions").success(function(jsonTransactions){
				this.years = [];
				this.months = [];
		    	var total = 0;
		    	for(var i = 0; i < jsonTransactions.length;i++){
		      		total+= jsonTransactions[i].value;
		      		var diaMesAno = jsonTransactions[i].date.split("/");
		      		if(!years[diaMesAno[2]].months[diaMesAno[1]]){
		      			years[diaMesAno[2]].months[diaMesAno[1]] = 0;
		      		}
		      		years[diaMesAno[2]].months[diaMesAno[1]]+= jsonTransactions[i].value;
		    	}
		    	return this.years;
	  		});

  		};

  		this.toJson(old) = function{
  			var json;
  			json.commits = [];

  			for(var ano in old){
  				for(var mes in old[ano]){
  					json.commits.push({"year": ano, "month": mes, "commit": old[ano][mes]})
  				}
  			}
  			return json;
  		}

  		this.getTransactionsToGraph() = function{
  			return this.toJson(this.getTransactions());
  		}

  		this.getPointsByTeam() = function{
  			
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