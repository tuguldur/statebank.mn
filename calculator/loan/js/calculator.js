(function($) {
  // Days in Month
  function days(month, year) {
    return new Date(year, month, 0).getDate();
  }
  // vars
  var firstSaving = 0,
    annualRate = 0,
    monthlyPay = 0,
    duration = 0;
  var render_rate = [];
  // Эхлэх хугацаа
  // var oneDay = 24 * 60 * 60 * 1000;
  var printDate = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");
  $("#start-date-loan").val(printDate);
  // var endDate;
  $("#start-date-loan").datepicker({
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
  $("#start-date-loan").change(function() {
    printDate = $(this).val();
    render_result();
  });
  /*
    ЗЭЭЛИЙН ХЭМЖЭЭ
  */
  var amountSlider = document.getElementById("amount-loan");
  var amountInput = $("#amount-loan-input");
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
    ЗЭЭЛИЙН ХҮҮ
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
    annualRate = parseFloat(value.match(/[+-]?\d+(\.\d+)?/g).join(""));
    render_result();
  });
  hvvInput.on("change", function() {
    var value = $(this).val();
    hvvSlider.noUiSlider.set(value);
  });
  /*
    ЗЭЭЛИЙН ХУГАЦАА
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
  //  CALC RESULTS
  /*
  Жишээ: 10000₮ -ийг 6 сарын хугацаатай (182 хоног) жилийн 7.2%-ийн хүүтэй зээлдүүлсэн
(хадгалуулсан) гэвэл эргэн төлөгдөх дүнг дараах байдлаар бодно.
Эргэн төлөгдөх дүн = Үндсэн дүн + Хүү = P + I
10000₮ -ийн 6 сарын хүүгийн орлого нь 359₮ (10359₮ - 10000₮ ) байна.
  */
  var render_type = 1;
  $("#render-type").change(function() {
    render_type = parseInt($(this).val());
    render_result();
    console.log(render_type);
  });
  function render_result() {
    var month = printDate.substring(5, 7);
    var year = printDate.substring(0, 4);
    var day = printDate.substring(8, 10);
    var money = firstSaving;
    var rate = 0;
    let months = month;
    var render = [];
    monthlyPay = firstSaving / duration;
    render.push({
      years: 0,
      months: 0,
      days: 0,
      rate: 0,
      day: 0,
      money: 0,
      balance: money
    });
    for (let i = 0; i < duration; i++) {
      if (month === "12") {
        render_rate.push({
          day: day,
          years: year,
          months: month,
          days: days(month, year),
          rate:
            render_type === 1
              ? money * (1 + ((annualRate / 100) * days(month, year)) / 365) -
                money
              : money * (annualRate / 12 / 100)
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
      var rate =
        render_type === 1
          ? money * (1 + ((annualRate / 100) * days(month, year)) / 365) - money
          : money * (annualRate / 12 / 100);
      render.push({
        day: day,
        years: year,
        months: months,
        days: days(months, year),
        rate,
        money: monthlyPay + rate,
        balance: money - monthlyPay
      });
      money -= monthlyPay;
    }
    var render_format = wNumb({
      decimals: 0,
      thousand: ","
    });
    let totalRate = 0,
      payMonth = 0;
    for (i = 0; i < render.length; i++) {
      //loop through the array
      totalRate += render[i].rate; //Do the math!
      payMonth += render[i].money;
    }

    $("#result-pay-monthly").html(
      `${render_format.to(payMonth / duration)}<span>₮</span>`
    );
    $("#result-pay-total").html(
      `${render_format.to(firstSaving + totalRate)}<span>₮</span>`
    );

    $("#result-hvv").html(`${render_format.to(totalRate)}<span>₮</span>`);
    var result = render.map(function(render, index) {
      return `<tr>
      <td>${
        render.years
      }.${render.months}.${render.day > render.days ? render.days : render.day}</td>
      <td>${index}</td>
      <td>${render.days}</td>
      <td>${render.rate.toFixed(0)}</td>
      <td>${render_format.to(render.money - render.rate)}</td>
      <td>${render_format.to(render.money)}</td>
      <td>${render_format.to(render.balance)}</td>
    </tr>`;
    });
    $("#result-table").html(result);
  }
})(window.jQuery);
