
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
  });

/*Passing info about a button to a modal window*/
  $(function() {
    
 /* 2. Sticky And Scroll UP */
      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
          $(".header-sticky").removeClass("sticky-bar");
          $('#back-top').fadeOut(500);
        } else {
          $(".header-sticky").addClass("sticky-bar");
          $('#back-top').fadeIn(500);
        }
      });
// Scroll Up
      $('#back-top a').on("click", function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
      $('button.select-btn').click(function() {
          var parent = $(this).attr('data-parent');
          var modal = $(this).attr('data-target')
          $(modal).find('input[name=target]').val(parent);
      });
 /* TABS*/
      $('.nav-item').on('click',function(e){
        e.preventDefault();
        var currTab = $(this).index();

        $('.nav-item').removeClass('active');
        $(this).addClass('active');

        $('.tab-pane').removeClass('show active');
        $('.tab-pane').eq(currTab).addClass('show active');
      })

 /* PARALLAX */
      var scene = document.getElementById('scene');
      var parallaxInstance = new Parallax(scene);

/* SLIDER */
      var mySwiper = new Swiper ('.swiper-container', {
        direction : 'horizontal',
        slidesPerView: 1,
        loop : true,
        stopOnLastSlide : false,
        autoplay : {
            delay: 2000
        }
      });

 /* MOBILE MENU*/
      $('.mobile_menu').on('click', function() { 
        $('.head-menu').toggleClass('d-none');
      })

      $('#closeMenu').on('click',function(event) {
        event.preventDefault();
        $('.head-menu').toggleClass('d-none');
      });  

/* MODAL WINDOW*/

      $('.header-btn').click(function(event) {
        event.preventDefault();
        $('.modal-wrapper').addClass('active');
      });

      $('.modal-overlay').click(function() {
        $('.modal-wrapper').removeClass('active');
      });

      $('.form-order').click(function(e) {
        e.stopPropagation();
      });


       $('[data-submit]').on('click', function(e) {
          e.preventDefault();
          $(this).parent('form').submit();
      })
      $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
              var re = new RegExp(regexp);
              return this.optional(element) || re.test(value);
          },
          "Please check your input."
      );

// Validation and message output function
      function valEl(el) {
          el.validate({
              rules: {
                phoneNumber: {
                      required: true,
                      digits : true,
                      required: true,
                      minlength: 10,
                      maxlength: 11,
                      regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                  },
                  firstName: {
                      required: true,
                      regex : "[A-Za-z]{1,32}"   
                  },
                  email: {
                      required: true,
                      email: true
                  }
              },
              messages: {
                phoneNumber: {
                      required: 'This field is required.',
                      regex: 'The number is incorrect'
                  },
                  firstName: {
                      required: 'This field is required.',
                      regex: 'Type your name please'
                  },
                  email: {
                      required: 'This field is required.',
                      email: 'Type correct address please'
                  }
              },
                // checking the id = "" form
                submitHandler: function(form) {             
                  var $form = $(form);
                  var $formId = $(form).attr('id');
                  switch ($formId) {
                      // If the form has id = "form-about":
                      case 'form-about':
                          $.ajax({
                                  type: 'POST',
                                  url: $form.attr('action'),
                                  data: $form.serialize()
                              })
                              .done(function() {
                                  console.log('Success');
                              })
                              .fail(function() {
                                  console.log('Fail');
                              })
                              .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                      $('#thx-window-overlay').fadeIn();                                  
                                      //lines for tracking goals in Ya.Metrika and Google Analytics
                                  }, 1100);                             
                              });
                          break;
                          //If the form has id = "modal-form":
                        case 'modal-form':
                          $.ajax({
                                  type: 'POST',
                                  url: $form.attr('action'),
                                  data: $form.serialize()
                              })
                              .done(function() {
                                  console.log('Success');
                              })
                              .fail(function() {
                                  console.log('Fail');
                              })
                              .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {                                  
                                      $('#modal-window').fadeOut();                                  
                                      //lines for tracking goals in Ya.Metrika and Google Analytics
                                  }, 1100);                              
                                  $('#thx-window-overlay').fadeIn();                             
                              });
                          break;
                  }
                  return false;
              }
          })
      }

      // Launching the form validation engine
      $('form').each(function() {
          valEl($(this));
      });

      $('#thx-window-overlay').on('click', function(e) {
          $(this).fadeOut();
      });

  });



