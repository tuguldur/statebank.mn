(function($) {
  var type = 1;
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
    console.log(value);
    var val = parseFloat(value);
    if (type === "1") {
      console.log("sell");
      from = $(".from-buy").val();
      to = $(".to-buy").val();
    } else {
      console.log("buy");
      from = $(".from-sell").val();
      to = $(".to-sell").val();
    }
    var urdun = (val * from) / to;
    console.log(`result: ${urdun}`);
    var urduno = parseFloat((val * from) / to).toFixed(2);
    console.log(urduno);
    if (value === "") result.val("0");
    else urdun == urduno ? result.val("=" + urduno) : result.val("≈" + urduno);
  }
})(window.jQuery);
