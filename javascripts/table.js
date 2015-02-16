$(document).ready(function () {
  var quantidade = 5;

  var performRequest = function (cardCreator) {
    $.ajax({
        url: 'http://dx-pointz.appspot.com/api/transactions?q={order:[{p:"date",d:"desc"}],limit:' + quantidade + '}',
        crossDomain : true,
    }).done(function (transactions) {
      $.each(transactions, function (i, transaction) {
        $.ajax({
          url: 'http://dx-pointz.appspot.com/api' + transaction.personId,
          dataType : 'json',
          crossDomain : true
        }).done(function (person) {
          transaction.person = person;
          cardCreator(transaction);
        });
      });
    });
  };

  var createCard = function (transaction) {
    var list = $('.commitersList');
    var type = $('<span>').addClass('ls-tag ls-float-right').text(transaction.type);
    var a = $('<a>').addClass('ls-ico-user').text(transaction.person.name).append(type);
    list.append($('<li>').append(a));
  };

  performRequest(createCard);
});
