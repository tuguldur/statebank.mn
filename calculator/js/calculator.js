(function($) {
  // Days in Month
  function days(month, year) {
    return new Date(year, month, 0).getDate();
  }
  // vars
  var firstSaving = 0,
    annualRate = 0,
    monthlySaving = 0,
    duration = 0;
  // Эхлэх хугацаа
  // var oneDay = 24 * 60 * 60 * 1000;
  var printDate = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");
  $("#start-date").val(printDate);
  // var endDate;
  $("#start-date").datepicker({
    format: "yyyy.mm.dd",
    i18n: {
      months: [
        "1-р сар",
        "2-р сар",
        "3-р сар",
        "4-р сар",
        "5-р сар",
        "6-р сар",
        "7-р сар",
        "8-р сар",
        "9-р сар",
        "10-р сар",
        "11-р сар",
        "12-р сар"
      ],
      monthsShort: [
        "1 - ",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      weekdays: [
        "Даваа",
        "Мягмар",
        "Лхагва",
        "Пүрэв",
        "Баасан",
        "Бямба",
        "Ням"
      ],
      weekdaysShort: ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"],
      weekdaysAbbrev: ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"],
      cancel: "Цуцлах",
      clear: "Цэвэрлэх",
      done: "Ok"
    },
    autoClose: true,
    minDate: new Date()
  });
  $("#start-date").change(function() {
    printDate = $(this).val();
  });
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
    firstSaving = value.match(/\d+/g).join("");
    render_result();
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
    annualRate = value.match(/[+-]?\d+(\.\d+)?/g).join("");
    render_result();
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
    monthlySaving = value.match(/\d+/g).join("");
    render_result();
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
    duration = value.match(/\d+/g).join("");
    render_result();
  });
  monthInput.on("change", function() {
    var value = $(this).val();
    month.noUiSlider.set(value);
  });
  function render_result() {
    var month = printDate.substring(5, 7);
    var year = printDate.substring(0, 4);
    var render = [];
    for (var i = 0; i < duration; i++) {
      if (month === 12) {
        month = 1;
        year++;
      } else month++;
      render.push({
        years: year,
        months: month,
        days: days(month, year)
      });
    }
    var result = render.map(function(render) {
      return `<tr>
      <td>${render.years}.${render.months}.${render.days}</td>
      <td>${render.months}</td>
      <td>${render.days}</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>`;
    });
    $("#result-table").html(result);
  }
  $("#type").on("change", function() {
    console.log("dsa");
  });
})(window.jQuery);
