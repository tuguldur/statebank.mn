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
    calc();
  });
  $("#exchange-value").keyup(function() {
    value = $(this).val();
    console.log(from);
    calc();
  });
  $("#from").change(function() {
    from = $(this).val();
    console.log(from);
    calc();
  });
  $("#to").change(function() {
    to = $(this).val();
    console.log(to);
    calc();
  });
  function calc() {
    result.val((from * value) / to);
  }
})(window.jQuery);
