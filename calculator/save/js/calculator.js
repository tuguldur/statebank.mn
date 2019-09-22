(function($) {
  // Days in Month
  function days(month, year) {
    return new Date(year, month, 0).getDate();
  }
  // vars
  var firstSaving = 0,
    annualRate = 0,
    monthlySaving = 0,
    duration = 0,
    countDays = 0;
  var currency = "₮";
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
    render_result();
  });
  /*
    ЭНГИЙН ТООЦООЛУУР ДАНС НЭЭХ МӨНГӨН ДҮН
  */
  var amountSlider = document.getElementById("amount");
  var amountInput = $("#amount-input");
  noUiSlider.create(amountSlider, {
    start: 1000000,
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
    firstSaving = parseInt(value.match(/\d+/g).join(""));
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
    annualRate = parseInt(value.match(/[+-]?\d+(\.\d+)?/g).join(""));
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
    monthlySaving = parseInt(value.match(/\d+/g).join(""));
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
    countDays = 0;
    var month = printDate.substring(5, 7);
    var year = printDate.substring(0, 4);
    var day = printDate.substring(8, 10);
    var money = firstSaving;
    var rate = 0;
    let months = month;
    var render = [];
    for (var i = 0; i < duration; i++) {
      if (month === "12") {
        render.push({
          years: year,
          months: month,
          days: days(month, year),
          rate: (((money * annualRate) / 100) * days(month, year)) / 365,
          day: day,
          money
        });
        months = 1;
        year++;
        month = null;
      } else if (months === 12) {
        months = 1;
        year++;
      } else {
        months++;
      }
      countDays += days(months, year);
      render.push({
        years: year,
        months: months,
        days: days(months, year),
        rate:
          ((((money - monthlySaving) * annualRate) / 100) * days(month, year)) /
          365,
        day: day,
        money
      });
      money = money + monthlySaving;
    }
    var render_format = wNumb({
      decimals: 0,
      thousand: ","
    });
    let totalRate = 0;
    for (i = 0; i < render.length; i++) {
      //loop through the array
      totalRate += render[i].rate; //Do the math!
    }
    var last = (last = Object.values(render))[last.length - 1];
    if (typeof last != "undefined") {
      $("#result-niit").html(
        `${render_format.to(last.money)}<span>${currency}</span>`
      );
      $("#result-final").html(
        `${render_format.to(totalRate + last.money)}<span>${currency}</span>`
      );
    }
    $("#result-hvv").html(
      `${render_format.to(totalRate)}<span>${currency}</span>`
    );
    var result = render.map(function(render, index) {
      return `<tr>
      <td>${
        render.years
      }.${render.months}.${render.day > render.days ? render.days : render.day}</td>
      <td>${index + 1}</td>
      <td>${render.days}</td>
      <td>${render.rate.toFixed(0)}</td>
      <td>${render_format.to(render.money)}</td>
      ${
        monthlySaving
          ? `<td>${render_format.to(render.money + render.rate)}</td>`
          : ``
      }
    </tr>`;
    });
    $("#result-table").html(result);
  }
  // SWITCH TYPE
  const hvvContainer = $("#hvv-container");
  const valType = $("#save-val-type");
  const valOption = $("#type-val");

  const amountMonthlyContainer = $("#amount-monthly-container");
  const saveType = $("#save-type");
  // Main type
  $("#type").on("change", function() {
    var value = $(this).val();
    switch (value) {
      case "0":
        currency = "₮";
        hvvContainer.show();
        amountMonthlyContainer.show();
        $("#row-total").show();
        $("#result-total-container").show();
        valType.hide();
        saveType.hide();
        annualRate = parseInt(
          hvvInput
            .val()
            .match(/[+-]?\d+(\.\d+)?/g)
            .join("")
        );
        break;
      case "2":
        valOption.val("0");
        saveType.hide();
        hvvContainer.hide();
        valType.show();
        amountMonthlyContainer.show();
        $("#row-total").show();
        $("#result-total-container").show();
        render_rate("₮", countDays);
        break;
      case "4":
        saveType.val("0");
        monthlySaving = 0;
        hvvContainer.hide();
        amountMonthlyContainer.hide();
        valType.hide();
        $("#result-total-container").hide();
        $("#row-total").hide();
        saveType.show();
      default:
        break;
    }
    render_result();
  });
  //currency type
  valOption.on("change", function() {
    var value = $(this).val();
    switch (value) {
      case "0":
        render_rate("₮", countDays);
        break;
      case "1":
        render_rate("$", countDays);
        break;
      case "2":
        render_rate("€", countDays);
        break;
      case "3":
        render_rate("¥", countDays);
        break;
      default:
        break;
    }
    render_result();
  });
  // Хүү олгох нөхцөл
  saveType.on("change", function() {
    var value = $(this).val();
    switch (value) {
      case "0":
        monthlySaving = 0;
        break;
      case "1":
        break;
      default:
        break;
    }
  });
  function render_rate(type, days) {
    currency = type;
    switch (type) {
      case "₮":
        if (days <= 59) annualRate = 7.6;
        else if (days <= 89) annualRate = 8.0;
        else if (days <= 179) annualRate = 9.5;
        else if (days <= 269) annualRate = 12.0;
        else if (days <= 364) annualRate = 12.6;
        else if (days <= 370) annualRate = 13.2;
        else if (days <= 730) annualRate = 13.2;
        else annualRate = 13.7;
        break;
      case "$":
        if (days <= 179) annualRate = 2.4;
        else if (days <= 269) annualRate = 3.2;
        else if (days <= 364) annualRate = 4.6;
        else if (days <= 369) annualRate = 5.0;
        else annualRate = 5.0;
        break;
      case "€":
        if (days <= 179) annualRate = 1.4;
        else if (days <= 269) annualRate = 1.9;
        else if (days <= 364) annualRate = 2.5;
        else if (days <= 369) annualRate = 3.0;
        else annualRate = 3.0;
        break;
      case "¥":
        if (days <= 179) annualRate = 2.4;
        else if (days <= 269) annualRate = 3.0;
        else if (days <= 364) annualRate = 3.3;
        else if (days <= 369) annualRate = 3.6;
        else annualRate = 3.7;
        break;
      default:
        break;
    }
  }
  /*
                  	Төгрөг    	Ам.Доллар 	Евро     	Юань
  30-59 хоног      	7,6%	        
  50-89 хоног      	8,0%	       
  90-179 хоног	    9,5%	        2,40%	    1,4%	    2,4%
  180-269 хоног     12,0%	        3,20%	    1,9%	    3,0%
  270-364 хоног     12,6%	        4,60%	    2,5%	    3,3%
  365 хоног	        13,2%	        5,00%	    3,0%	    3,6%
  370-730 хоног     13,2%	        5,00%	    3,0%	    3,7%
  731-1095 хоног    13,7%	        
  */
})(window.jQuery);
