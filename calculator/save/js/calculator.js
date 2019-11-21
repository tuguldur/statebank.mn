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
    countDays = 0,
    currencyType,
    currencyTypeMin,
    currencyTypeMalchin,
    monthlyRate = false;
  childSaving = false;
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
    currencyType && currency_type(currencyType);
    currencyTypeMin && currency_type(currencyTypeMin);
    currencyTypeMalchin && currency_type(currencyTypeMalchin);
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
      rate = (((money * annualRate) / 100) * days(months, year)) / 365;
      monthlyRate && (money += rate);
      if (month === "12") {
        render.push({
          years: year,
          months,
          days: days(months, year),
          rate,
          day,
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
        months,
        days: days(months, year),
        rate,
        day,
        money
      });
      monthlySaving && (money += monthlySaving);
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
        `${
          monthlyRate
            ? render_format.to(last.money)
            : render_format.to(totalRate + last.money)
        }<span>${currency}</span>`
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
      ${monthlySaving &&
        `<td>${render_format.to(render.money + render.rate)}</td>`}
    </tr>`;
    });
    $("#result-table").html(result);
  }
  // SWITCH TYPE
  const hvvContainer = $("#hvv-container");
  const valType = $("#save-val-type");
  const valTypeMin = $("#save-min-val-type");
  const valOption = $("#type-val");
  const valMinOption = $("#type-val-min");

  const amountMonthlyContainer = $("#amount-monthly-container");
  const saveTypeContainer = $("#save-type");
  const saveType = $("#save-type-select");
  const durationContainer = $("#duration");

  // Main type
  $("#type").on("change", function() {
    var value = $(this).val();
    switch (value) {
      // Энгийн тооцоолуур
      case "0":
        month.noUiSlider.updateOptions({
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
        childSaving = false;
        currency = "₮";
        hvvContainer.show();
        amountMonthlyContainer.show();
        $("#row-total").show();
        $("#result-total-container").show();
        valType.hide();
        saveTypeContainer.hide();
        valTypeMin.hide();
        annualRate = parseInt(
          hvvInput
            .val()
            .match(/[+-]?\d+(\.\d+)?/g)
            .join("")
        );
        monthlySaving = parseInt(
          amountMonthlyInput
            .val()
            .match(/[+-]?\d+(\.\d+)?/g)
            .join("")
        );
        monthlyRate = false;
        break;
      // Иргэдийн хугацаатай хадгаламж
      case "2":
        month.noUiSlider.updateOptions({
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
        childSaving = false;
        valOption.val("0");
        currencyType = "0";
        currency_type(currencyType);
        saveTypeContainer.hide();
        hvvContainer.hide();
        valTypeMin.hide();
        valType.show();
        amountMonthlyContainer.show();
        $("#row-total").show();
        $("#result-total-container").show();
        monthlySaving = parseInt(
          amountMonthlyInput
            .val()
            .match(/[+-]?\d+(\.\d+)?/g)
            .join("")
        );
        monthlyRate = false;
        break;
      // Хүүгээр арвижих хадгаламж
      case "4":
        month.noUiSlider.updateOptions({
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
        childSaving = false;
        saveTypeContainer.val("0");
        monthlySaving = 0;
        valMinOption.val("4");
        currencyTypeMin = "4";
        currency_type(currencyTypeMin);
        hvvContainer.hide();
        amountMonthlyContainer.hide();
        valType.hide();
        $("#result-total-container").hide();
        $("#row-total").hide();
        saveTypeContainer.show();
        valTypeMin.show();
        break;
      case "5":
        hvvContainer.hide();
        valType.hide();
        valTypeMin.show();
        $("#result-total-container").show();
        childSaving = true;
        month.noUiSlider.updateOptions({
          start: 12,
          range: {
            min: 12,
            max: 216
          },
          step: 12,
          format: wNumb({
            decimals: 0,
            thousand: ",",
            suffix: " сар"
          })
        });
        valMinOption.val("4");
        currencyTypeMin = "4";
        currency_type(currencyTypeMin);
        duration = 12;
        break;
      case "6":
        month.noUiSlider.updateOptions({
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
        childSaving = false;
        currencyTypeMalchin = "6";
        currency_type(currencyTypeMalchin);
        hvvContainer.hide();
        amountMonthlyContainer.show();
        $("#row-total").show();
        $("#result-total-container").show();
        valType.hide();
        saveTypeContainer.hide();
        valTypeMin.hide();
        monthlySaving = parseInt(
          amountMonthlyInput
            .val()
            .match(/[+-]?\d+(\.\d+)?/g)
            .join("")
        );
        monthlyRate = false;
        break;
      default:
        break;
    }
    render_result();
  });
  //currency type
  valOption.on("change", function() {
    currencyType = $(this).val();
    currency_type(currencyType);
    render_result();
  });
  //currency type min
  valMinOption.on("change", function() {
    currencyTypeMin = $(this).val();
    currency_type(currencyTypeMin);
    render_result();
  });
  // Хүү олгох нөхцөл
  saveType.on("change", function() {
    var value = $(this).val();
    switch (value) {
      case "0":
        monthlyRate = false;
        monthlySaving = 0;
        break;
      case "1":
        monthlyRate = true;
        break;
      default:
        break;
    }
    render_result();
  });
  function currency_type(value) {
    switch (value) {
      case "0":
        render_rate("₮", "1", countDays);
        break;
      case "1":
        render_rate("$", "2", countDays);
        break;
      case "2":
        render_rate("€", "3", countDays);
        break;
      case "3":
        render_rate("¥", "4", countDays);
        break;
      case "4":
        render_rate("₮", "5", countDays);
        break;
      case "5":
        render_rate("$", "6", countDays);
      case "6":
        render_rate("₮", "7", countDays);
        break;
      default:
        break;
    }
  }
  function render_rate(curr, type, days) {
    currency = curr;
    switch (type) {
      case "1":
        //"Иргэний хугацаатай хадгаламж төгрөг
        if (days <= 59) annualRate = 7.6;
        else if (days <= 89) annualRate = 8.0;
        else if (days <= 179) annualRate = 9.5;
        else if (days <= 269) annualRate = 12.0;
        else if (days <= 364) annualRate = 12.6;
        else if (days <= 370) annualRate = 13.2;
        else if (days <= 730) annualRate = 13.2;
        else annualRate = 13.7;
        break;
      case "2":
        //Иргэний хугацаатай хадгаламж Ам.Доллар
        if (days <= 179) annualRate = 2.4;
        else if (days <= 269) annualRate = 3.2;
        else if (days <= 364) annualRate = 4.6;
        else if (days <= 369) annualRate = 5.0;
        else annualRate = 5.0;
        break;
      case "3":
        //Иргэний хугацаатай хадгаламж Ёвро
        if (days <= 179) annualRate = 1.4;
        else if (days <= 269) annualRate = 1.9;
        else if (days <= 364) annualRate = 2.5;
        else if (days <= 369) annualRate = 3.0;
        else annualRate = 3.0;
        break;
      case "4":
        //Иргэний хугацаатай хадгаламж Юань;
        if (days <= 179) annualRate = 2.4;
        else if (days <= 269) annualRate = 3.0;
        else if (days <= 364) annualRate = 3.3;
        else if (days <= 369) annualRate = 3.6;
        else annualRate = 3.7;
        break;
      case "5":
        //Хүүгээр арвижих хадгаламж төгрөг
        if (childSaving) {
          //Хүүхдийн хадгаламж төгрөг
          annualRate = 13.7;
          break;
        }
        if (days <= 179) annualRate = 9.11;
        else if (days <= 269) annualRate = 11.39;
        else if (days <= 364) annualRate = 11.93;
        else if (days <= 730) annualRate = 12.46;
        else annualRate = 12.91;
        break;
      case "6":
        //Хүүгээр арвижих хадгаламж Ам.Доллар
        if (childSaving) {
          //Хүүхдийн хадгаламж Ам.Доллар
          annualRate = 5.4;
          break;
        }
        if (days <= 179) annualRate = 2.37;
        else if (days == 269) annualRate = 3.05;
        else annualRate = 4.2;
        break;
      case "7":
        //Малчны хадгаламж
        if (days <= 179) annualRate = 9.5;
        else if (days <= 364) annualRate = 11.8;
        else if (days <= 365) annualRate = 13.3;
        else annualRate = 13.6;
        break;
      default:
        break;
    }
  }
  /*
  Хугацаатай 
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
  /*
  Хүүгээр аривжих
  90-179 хоног	    9,11%	        2,37%
  180-269 хоног	    11,39%	      3,05%
  270-364 хоног	    11,93%	        -
  365 хоног 	 	      -           4,2%
  370-730 хоног   	12,46%	 
  731-1095 хоног   	12,91%	        -

  Ангилал	Төгрөг    /жилийн хүү/
  90-179 хоног	    9,5%
  180-364 хоног	    11,8%
  365 хоног	        13,3%
  370-730 хоног	    13,6%
  731-1095 хоног	  13,6%
 */
})(window.jQuery);
