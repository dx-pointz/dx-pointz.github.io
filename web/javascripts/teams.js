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
		var funcGetName = function(jsonPeople){

			var funcGetGroups = function(jsonGroup){
				var groups = jsonGroup.groups;
		 		for (var i = 0; i < groups.length; i++){
		 			var group = groups[i];
		 			if ($.inArray(group, teams))
		 				personTeams[personTeams.length]=group;
		 		}
		 		if (personTeams.length <= 0)
		 			personTeams[0] = "Outros";
				}
 			$.ajax({
		      url: "http://intranet.dextra.com.br/s/usuario/"+jsonPeople.name+"?secret=YvdW97iqWGi0tsqJjj5j",
		      crossDomain : true,
		      async: false,
		      success : funcGetGroups
		    }); 
 		}

		$.ajax({
	      url: "http://dx-pointz.appspot.com/api"+personId,
	      crossDomain : true,
	      async: false,
	      success : funcGetName
	    }); 		
	    return personTeams;
 	}
}