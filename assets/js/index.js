(function($) {
  $("#currency-modal").modal("show");
  // Header Carousel Change slide on Swipe
  $("#headerCarousel").swipe({
    swipe: function(
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction == "left") $(this).carousel("next");
      if (direction == "right") $(this).carousel("prev");
    },
    allowPageScroll: "vertical"
  });
  // Drawer
  $(".drawer-overlay").on("click", function() {
    $("#drawer").removeClass("active");
    $(".drawer-overlay").removeClass("active");
  });
  $("#drawer-btn").click(function() {
    $("#drawer").addClass("active");
    $(".drawer-overlay").addClass("active");
  });
  //   Currency Dialog
  $(".currency-modal").click(function() {
    $("#currency-modal").modal("show");
  });
})(window.jQuery);
