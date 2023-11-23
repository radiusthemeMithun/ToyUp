(function ($) {
  "use strict";

  /*===================================
  //Fixed Header
  =====================================*/
  // $(window).on("scroll", function () {
  //   if ($("header").hasClass("sticky-on")) {
  //     let stickyPlaceHolder = $("#sticky-placeholder"),
  //       menu = $("#navbar-wrap"),
  //       menuH = menu.outerHeight(),
  //       topbarH = $("#topbar-wrap").outerHeight() || 0,
  //       targrtScroll = topbarH,
  //       header = $("header");
  //     if ($(window).scrollTop() > targrtScroll) {
  //       header.addClass("sticky");
  //       stickyPlaceHolder.height(menuH);
  //     } else {
  //       header.removeClass("sticky");
  //       stickyPlaceHolder.height(0);
  //     }
  //   }
  // });


  /*-------------------------------------
    Countdown activation code
    -------------------------------------*/
    var eventCounter = $(".countdown");
    if (eventCounter.length) {
        eventCounter.countdown("2024/02/21", function (e) {
            $(this).html(
                e.strftime(
                    "<div class='countdown-section'><div><div class='countdown-number'>%D<span>:</span></div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H<span>:</span></div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M<span>:</span></div>  </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> </div></div>"
                )
            );
        });
    }




  /*===================================
  //Fixed popup
  =====================================*/

  $(window).on('scroll', function() {
    var height = $(window).scrollTop();
    var $fixedPopup = $('.fixed-popup-wrap');

    if($fixedPopup.length > 0) {
      if (height < 100) {
        $fixedPopup.removeClass('scrolling');
      } else {
        $fixedPopup.addClass('scrolling');
      }
    }
  });

  var myElement = document.querySelector("header");
  var headroom  = new Headroom(myElement);
  headroom.init();

  

  /*=====================================
  //	Jquery Serch Box
  ===================================*/
  $('a[href="#template-search"]').on("click", function (event) {
    event.preventDefault();
    let target = $("#template-search");
    target.addClass("open");
    setTimeout(function () {
      target.find("input").focus();
    }, 600);
    return false;
  });

  $("#template-search, #template-search button.close").on(
    "click keyup",
    function (event) {
      if (
        event.target === this ||
        event.target.className === "close" ||
        event.keyCode === 27
      ) {
        $(this).removeClass("open");
      }
    }
  );

  /*-------------------------------------
    Mobile Menu Toggle
    -------------------------------------*/
    $(".sidebarBtn").on("click", function (e) {
      e.preventDefault();
      if ($(".rt-slide-nav").is(":visible")) {
        $(".rt-slide-nav").slideUp();
        $("body").removeClass("slidemenuon");
      } else {
        $(".rt-slide-nav").slideDown();
        $("body").addClass("slidemenuon");
      }
    });
  
    /*-------------------------------------
        Sidebar Menu Control
      -------------------------------------*/
    $(".sidebar-toggle").on("click", function() {
        window.setTimeout(function() {
            $("#wrapper").toggleClass("sidebar-collapsed");
        }, 500);
    });
    /*-------------------------------------
        Sidebar Menu Control Mobile
      -------------------------------------*/
    $(".sidebar-toggle-mobile").on("click", function() {
        $("#wrapper").toggleClass("sidebar-collapsed-mobile");
        if ($("#wrapper").hasClass("sidebar-collapsed")) {
            $("#wrapper").removeClass("sidebar-collapsed");
        }
    });
  


  /*-------------------------------------
      Mobile Menu Dropdown
    -------------------------------------*/
  let rtMobileMenu = $(".offscreen-navigation .menu");

  if (rtMobileMenu.length) {
    rtMobileMenu.children("li").addClass("menu-item-parent");
    rtMobileMenu.find(".menu-item-has-children > a").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("opened");
      let n = $(this).next(".sub-menu"),
        s = $(this).closest(".menu-item-parent").find(".sub-menu");
      rtMobileMenu
        .find(".sub-menu")
        .not(s)
        .slideUp(250)
        .prev("a")
        .removeClass("opened"),
        n.slideToggle(250);
    });
    rtMobileMenu
      .find(".menu-item:not(.menu-item-has-children) > a")
      .on("click", function (e) {
        $(".rt-slide-nav").slideUp();
        $("body").removeClass("slidemenuon");
      });
  }


  /*------------------------------------
   //  Offcanvas Menu activation code
   -----------------------------------*/
   $("#wrapper").on("click", ".offcanvas-menu-btn", function (e) {
    e.preventDefault();
    const $this = $(this),
      wrapper = $(this).parents("body").find(">#wrapper"),
      wrapMask = $("<div />").addClass("offcanvas-mask"),
      offCancas = $("#offcanvas-wrap"),
      position = offCancas.data("position") || "left";
    if ($this.hasClass("menu-status-open")) {
      wrapper.addClass("open").append(wrapMask);
      $this.removeClass("menu-status-open").addClass("menu-status-close");
      offCancas.css({
        transform: "translateX(0)",
      });
    } else {
      removeOffcanvas();
    }
    function removeOffcanvas() {
      wrapper.removeClass("open").find("> .offcanvas-mask").remove();
      $this.removeClass("menu-status-close").addClass("menu-status-open");
      if (position === "left") {
        offCancas.css({
          transform: "translateX(-105%)",
        });
      } else {
        offCancas.css({
          transform: "translateX(105%)",
        });
      }
    }
    $(".offcanvas-mask, .offcanvas-close").on("click", function () {
      removeOffcanvas();
    });
    return false;
  });


   /*------------------------------
   // Tooltip
   ------------------------------*/
   $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip({
      offset: [0, 4],
    });
  });


  /*===================================
   // Section background image 
  ====================================*/
  imageFunction();

  function imageFunction() {
    $("[data-bg-image]").each(function () {
      let img = $(this).data("bg-image");
      $(this).css({
        backgroundImage: "url(" + img + ")",
      });
    });
  }
    /*=================================
   // counter up
   ==================================*/
   let counter = true;
   $(".counter-appear").appear();
   $(".counter-appear").on("appear", function () {
     if (counter) {
       // Only number counter
       $(".counterUp").each(function () {
         let $this = $(this);
         jQuery({
           Counter: 0,
         }).animate(
           {
             Counter: $this.attr("data-counter"),
             Hover: $this.attr("data-hover"),
           },
           {
             duration: 1000,
             easing: "swing",
             step: function () {
               let num = Math.ceil(this.Counter).toString();
               if (Number(num) > 99999999) {
                 while (/(\d+)(\d{8})/.test(num)) {
                   num = num.replace(/(\d+)(\d{8})/, "");
                 }
               }
               $this.html(num);
             },
           }
         );
       });

 
       // with skill bar
       $(".skill-per").each(function () {
         let $this = $(this);
         let per = $this.attr("data-per");
         $this.css("width", per + "%");
         $({ animatedValue: 0 }).animate(
           { animatedValue: per },
           {
             duration: 500,
             step: function () {
               $this.attr("data-per", Math.floor(this.animatedValue) + "%");
             },
             complete: function () {
               $this.attr("data-per", Math.floor(this.animatedValue) + "%");
             },
           }
         );
       });
 
       counter = false;
     }
   });

   /*-------------------------------------
    Hero Slider
    -------------------------------------*/

   var swiper1 = new Swiper(".hero-banner-slider-1", {
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 1500,
    loop: true,
    // autoplay: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /*-------------------------------------
    Brand Slider
    -------------------------------------*/

    var swiper2 = new Swiper(".rt-brand-wrap", {
      spaceBetween: 30,
      slidesPerView: 6,
      speed: 1000,
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        374: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 6,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


     /*-------------------------------------
     Testimonial Slider
    -------------------------------------*/

    var swiper3 = new Swiper(".rt-testimonial-slider", {
      spaceBetween: 30,
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 5000,
        speed: 800,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });


    /*-------------------------------------
    Isotop
    -------------------------------------*/
    
    $('.isotop-wrap').imagesLoaded(function() {
      // filter items on button click
      $('.isotope-classes-tab').on('click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $grid.isotope({
              filter: filterValue
          });
      });
      // init Isotope
      var $grid = $('.isotope-list').isotope({
          itemSelector: '.project',
          percentPosition: true,
          transitionDuration: '0.7s',
          layoutMode: 'fitRows',
          masonry: {
              // use outer width of grid-sizer for columnWidth
              columnWidth: 1,
          }
      });
  });
  $('.isotope-button button').on('click', function(event) {
      $(this).siblings('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
      event.preventDefault();
  });


    /*-------------------------------------
  Intersection Observer
  -------------------------------------*/
if (!!window.IntersectionObserver) {
  let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("active-animation");
              observer.unobserve(entry.target);
          }
      });
  }, {
      rootMargin: "0px 0px -100px 0px"
  });
  document.querySelectorAll('.has-animation').forEach(block => {
      observer.observe(block)
  });
  } else {
      document.querySelectorAll('.has-animation').forEach(block => {
          block.classList.remove('has-animation')
      });
  }


  /*=====================================
  // Team Hover
  ======================================*/
  function mousemove_team_hover_effect() {
    if (jQuery( window ).width() > 0 ) {
        if ( jQuery('#wrapper').find(".rt-portfolio-default").length > 0 ) {
            jQuery(".rt-portfolio-default .team-item,.kariez-project-box-2,.kariez-portfolio-box").each(function() {
                let $Purpose = jQuery(this);
                let $PurposeInner = $Purpose.find('.port-hover-effect');
                $Purpose.mousemove(function(event){
                    let y = event.pageY - $Purpose.offset().top + 10;
                    let x = event.pageX - $Purpose.offset().left + 10;
                    $PurposeInner.css({'top': y,'left': x,'bottom': "auto",'right': "auto",'opacity': 1});
                })
                .mouseleave(function() {
                    $PurposeInner.css({'top': 'auto','left': 10,'bottom': 10,'right': "auto",'opacity': 0});
                });
            });
        }
    }
  }
  $(function() {
    mousemove_team_hover_effect();
  });


    /*=====================================
  // product
  ======================================*/
  let rtThumbnailTliderThumbStyle1 = new Swiper(
    ".rt-thumbnail-slider-thumb-style-1", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        speed: 700,
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        },
    }
);

let rtThumbnailTliderStyle1 = new Swiper(".rt-thumbnail-slider-style-1", {
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: rtThumbnailTliderThumbStyle1,
    },
});



  /*=====================================
  //	Select
  ===================================*/
  let rtSelect = $(".rt-select");

  if (rtSelect.length) {
    rtSelect.select2({
      // theme: "classic",
      dropdownAutoWidth: true,
      width: "100%",
    });
  }




/* ===================================
   PopUp
  ======================================= */

var yPopup = $(".play-btn");
if (yPopup.length) {
    yPopup.magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}





		
  /*==============================
   //  Back to Top
   ===============================*/
   let $window = $(window);
   let distance = 300;
   $window.scroll(function () {
     if ($window.scrollTop() >= distance) {
       $("#back-to-top").fadeIn();
     } else {
       $("#back-to-top").fadeOut();
     }
   });
   $("#back-to-top").click(function () {
     $("html, body").animate(
       {
         scrollTop: 0,
       },
       800
     );
   });
      
      

  /*-------------------------------------
  //Contact Form initiating
  -------------------------------------*/
  let contactForm = $(".rt-contact-form");
  if (contactForm.length) {
    contactForm.each(function () {
      let innerContactForm = $(this);
      innerContactForm.validator().on("submit", function (e) {
        let $this = $(this),
          $target = innerContactForm.find(".form-response");
        if (e.isDefaultPrevented()) {
          $target.html(
            "<div class='alert alert-danger'><p>Please select all required field.</p></div>"
          );
        } else {
          $.ajax({
            url: "php/mailer.php",
            type: "POST",
            data: innerContactForm.serialize(),
            beforeSend: function () {
              $target.html(
                "<div class='alert alert-info'><p>Loading ...</p></div>"
              );
            },
            success: function (response) {
              if (response == "success") {
                $this[0].reset();
                $target.html(
                  "<div class='alert alert-success'><p>Message has been sent successfully.</p></div>"
                );
              } else {
                res = JSON.parse(response);
                if (res.message.length) {
                  let messages = null;
                  res.message.forEach(function (message) {
                    messages += "<p>" + message + "</p>";
                  });
                  $target.html(
                    "<div class='alert alert-success'><p>" +
                      messages +
                      "</p></div>"
                  );
                }
              }
            },
            error: function () {
              $target.html(
                "<div class='alert alert-success'><p>Error !!!</p></div>"
              );
            },
          });
          return false;
        }
      });
    });
  }
  

  /*==============================
   //  WOW
   ===============================*/
  let wow = new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 0,
    mobile: true,
    live: true,
    scrollContainer: null,
  });
  wow.init();



  /*==============================
  // Preloader
  ===============================*/

  // $(window).on("load", function () {
  //   $("#preloader").fadeOut("slow", function () {
  //     $(this).remove();
  //   });
  // });





  
})(jQuery);




