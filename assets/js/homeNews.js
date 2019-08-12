import $ from "jquery";
$("#tab-news-btn").click(() => changeTab(1));
$("#tab-uramshuulal-btn").click(() => changeTab(2));
$("#tab-video-btn").click(() => changeTab(3));
const changeTab = tab => {
  switch (tab) {
    case 1:
      $("#tab-news").show();
      $("#tab-uramshuulal").hide();
      $("#tab-video").hide();
      break;
    case 2:
      $("#tab-news").hide();
      $("#tab-uramshuulal").show();
      $("#tab-video").hide();
      break;
    case 3:
      $("#tab-news").hide();
      $("#tab-uramshuulal").hide();
      $("#tab-video").show();
      break;
    default:
      break;
  }
};
