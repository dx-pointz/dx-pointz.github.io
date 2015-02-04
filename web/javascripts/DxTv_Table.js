$(document).ready(function () {

  var createTable = function () {
    var quantidade = 20;
    var tabela = $('#ultimos-commits');

    // for (var i = 0; i < quantidade; i++) {
    //   var tr = $('<tr>');
    //   tr.append($('<td>').addClass('n' + i));
    //   tabela.append(tr);
    //}
    var commitsDinamicos = $(".commitersList");
    var json = [{name: "Julio Carvalho", type: "GITHUB_COMMIT"},{name: "Luan Nico", type: "GITHUB_COMMIT"},
    {name: "Sabrina", type: "GITHUB_COMMIT"}, {name: "Guilherme Carreiro", type: "GITHUB_COMMIT"}, {name: "Antonio Vianna", type: "GITHUB_COMMIT"}];
    json.forEach(function(obj){
      commitsDinamicos.append("<li><a class='ls-ico-user'>"+ obj.name +" <span class='ls-tag ls-float-right'>"+
                                    obj.type+"</span></a></li>");

    });
   
    setInterval(function() {
      //var json = [];
      // $.ajax({
      //   url: "http://dx-pointz.appspot.com/api/transactions?q={'order':[{p:'date',d:'desc'}],limit:" + quantidade + "}",
      //   crossDomain : true,
      // }).done(function(transactions) {
      //   var commitsDinamicos = $(".commitersList");
      //   $.each(transactions, function(i, transaction) {
      //     $.ajax({
      //       url: 'http://dx-pointz.appspot.com/api' + transaction.personId,
      //       dataType : 'json',
      //       crossDomain : true
      //     }).done(function (person) {
      //       //tabela.find('td.n' + i).html(person.name);
      //       //json.push({"name": person.name, "type": transaction.type});//FIXME FIXME FIXME PLS
      //       commitsDinamicos.append("<li><a class='ls-ico-user'>"+ person.name +" <span class='ls-tag'>"+
      //                               transaction.type+"</span></a></li>");
         
          });
        });
      });
    }, 20000);
  };

  createTable();
});