$(document).ready(function () {

  var createTable = function () {
    var quantidade = 20;
    var tabela = $('#ultimos-commits');

    for (var i = 0; i < quantidade; i++) {
      var tr = $('<tr>');
      tr.append($('<td>').addClass('n' + i));
      tabela.append(tr);
    }

    setInterval(function() {
      $.ajax({
        url: "http://dx-pointz.appspot.com/api/transactions?q={'order':[{p:'date',d:'desc'}],limit:" + quantidade + "}",
        crossDomain : true,
      }).done(function(transactions) {
        $.each(transactions, function(i, transaction) {
          $.ajax({
            url: 'http://dx-pointz.appspot.com/api' + transaction.personId,
            dataType : 'json',
            crossDomain : true
          }).done(function (person) {
            tabela.find('td.n' + i).html(person.name);
          });
        });
      });
    }, 20000);
  };
  createTable();
});