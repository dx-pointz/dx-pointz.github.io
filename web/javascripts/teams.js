 function TeamControll(){
 	var teams = ["Gaia","Walking","Beta","Buzz","Heisenberg","MUX","Globosat"];
 	var peopleHash = {};
 	this.getTeams = function(personId){
 		if(peopleHash[personId] == null){
 			peopleHash = this.requestTeams(personId);
 		}
 		return peopleHash[personId];
 	}
 
 	this.requestTeams = function(personId){
 		var personTeams = [];
		var sucesso = function(jsonPeople){
	 		var groups = jsonPeople.groups;
	 		for (var i = 0; i < groups.length; i++){
	 			var group = groups[i];
	 			if ($.inArray(group, teams))
	 				personTeams[personTeams.length]=group;
	 		}
	 		if (personTeams.length <= 0)
	 			personTeams[0] = "Outros";
 		}
		$.ajax({
	      url: "http://dx-pointz.appspot.com/api"+personId,
	      crossDomain : true,
	      async: false,
	      success : sucesso
	    }); 		
	    return personTeams;
 	}
 }