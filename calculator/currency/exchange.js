(function($) {
  // Get Ханш and Render
  const currencydata = $("#currency-data");

  const frombuy = $(".from-buy");
  const fromsell = $(".from-sell");

  const tobuy = $(".to-buy");
  const tosell = $(".to-sell");

  $.get({
    url:
      "//monxansh.appspot.com/xansh.json?currency=USD|EUR|JPY|GBP|RUB|CNY|KRW",
    data_type: "json",
    success: function(data) {
      // to remove Loading text
      currencydata.html("");
      data.forEach(row => {
        /* row.code       - Код USD, EUR...
         row.name       - Нэр
         row.rate       - Ханш
         row.rate_float - Ханш
         row.last_date  - Мэдээний огноо
         */
        // render to table
        currencydata.append(`
        <tr>
          <td alt="${row.name}"><span>${row.code}</span></td>
          <td>${row.rate}</td>
          <td>${row.rate}</td>
        </tr>
        `);
        frombuy.append(
          `<option value="${row.rate_float}">${row.code}</option>`
        );
        fromsell.append(
          `<option value="${row.rate_float}">${row.code}</option>`
        );
        tobuy.append(`<option value="${row.rate_float}">${row.code}</option>`);
        tosell.append(`<option value="${row.rate_float}">${row.code}</option>`);
      });
    }
  });
  var type = "1";
  var value = 0,
    from = 0,
    to = 0;
  var sell = $(".exchange-sell");
  var buy = $(".exchange-buy");
  var result = $("#exchange-result");
  $(".exchange-type").on("change", function() {
    type = $(this).val();
    type === "1" ? (sell.hide(), buy.show()) : (buy.hide(), sell.show());
    calc(value);
  });
  $("#exchange-value").keyup(function() {
    value = $(this).val();
    calc(value);
  });
  $(".custom-select").on("change", function() {
    calc(value);
  });
  function calc(value) {
    var val = parseFloat(value);
    if (type === "1") {
      from = $(".from-buy").val();
      to = $(".to-buy").val();
      console.log("buy");
    } else {
      from = $(".from-sell").val();
      to = $(".to-sell").val();
      console.log("sell");
    }
    var urdun = (val * from) / to;
    var urduno = parseFloat((val * from) / to).toFixed(2);
    console.log("from: " + from + " to: " + to);
    if (value === "") result.val("0");
    else urdun == urduno ? result.val("=" + urduno) : result.val("≈" + urduno);
  }
})(window.jQuery);
