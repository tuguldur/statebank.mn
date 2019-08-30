(function($) {
  // Эхлэх хугацаа
  var startDate = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");
  $("#start-date").val(startDate);
  /*
    ЭНГИЙН ТООЦООЛУУР ДАНС НЭЭХ МӨНГӨН ДҮН
  */
  var amountSlider = document.getElementById("amount");
  var amountInput = $("#amount-input");
  noUiSlider.create(amountSlider, {
    start: 100000,
    range: {
      min: 0,
      max: 200000000
    },
    format: wNumb({
      decimals: 0,
      thousand: ",",
      suffix: " ₮"
    })
  });
  amountSlider.noUiSlider.on("update", function(values, handle) {
    var value = values[handle];
    amountInput.val(value);
  });
  amountInput.on("change", function() {
    var value = $(this).val();
    amountSlider.noUiSlider.set(value);
  });
  /*
    ЭНГИЙН ТООЦООЛУУР ХҮҮ
  */
  var hvvSlider = document.getElementById("hvv");
  var hvvInput = $("#hvv-input");
  noUiSlider.create(hvvSlider, {
    start: 12,
    range: {
      min: 0.1,
      max: 30
    },
    format: wNumb({
      decimals: 1,
      thousand: ",",
      suffix: " %"
    })
  });
  hvvSlider.noUiSlider.on("update", function(values, handle) {
    var value = values[handle];
    hvvInput.val(value);
  });
  hvvInput.on("change", function() {
    var value = $(this).val();
    hvvSlider.noUiSlider.set(value);
  });
  /*
    ЭНГИЙН ТООЦООЛУУР САРД ХИЙХ МӨНГӨН ДҮН
  */
  var amountMonthly = document.getElementById("amount-monthly");
  var amountMonthlyInput = $("#amount-monthly-input");
  noUiSlider.create(amountMonthly, {
    start: 100000,
    range: {
      min: 0,
      max: 100000000
    },
    format: wNumb({
      decimals: 0,
      thousand: ",",
      suffix: " ₮"
    })
  });
  amountMonthly.noUiSlider.on("update", function(values, handle) {
    var value = values[handle];
    amountMonthlyInput.val(value);
  });
  amountMonthlyInput.on("change", function() {
    var value = $(this).val();
    amountMonthly.noUiSlider.set(value);
  });
  /*
    ЭНГИЙН ТООЦООЛУУР ХУГАЦАА САРААР
  */
  var month = document.getElementById("month");
  var monthInput = $("#month-input");
  noUiSlider.create(month, {
    start: 12,
    range: {
      min: 0,
      max: 360
    },
    format: wNumb({
      decimals: 0,
      thousand: ",",
      suffix: " сар"
    })
  });
  month.noUiSlider.on("update", function(values, handle) {
    var value = values[handle];
    monthInput.val(value);
  });
  monthInput.on("change", function() {
    var value = $(this).val();
    month.noUiSlider.set(value);
  });
  $("#type").on("change", function() {
    console.log("dsa");
  });
})(window.jQuery);
