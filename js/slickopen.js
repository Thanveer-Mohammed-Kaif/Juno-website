$(".Slider-container").slick({
  cssEase: "linear",
  pauseOnHover: false,
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  slidesT0oScroll: 1,
  arrows: !1,
  dots: !1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1, infinite: !0 },
    },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ],
});

$(".center-slider").slick({
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 6000,
  speed: 3000,
  slidesT0oScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
});
