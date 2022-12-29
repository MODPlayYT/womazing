$(document).ready(function(){
    // Slider
    $('.offer__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        pauseOnFocus: false,
        asNavFor: '.offer-gallery__slides'
    });
  
    $('.offer-gallery__slides').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2000,
        arrows: false,
        pauseOnFocus: false,
        asNavFor: '.offer__slider'
    });

    $('.our-team-gallery__photos').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, 
      autoplaySpeed: 2000,
      arrows: true,
      dots: true,
      pauseOnFocus: false,
      fade: true
    });
  
    // Hamburger
    $('.btn-ham').on('click', function() {
        $('.menu').toggle();
      });

      // Modal Window
      $('.call-us__link').click(function(e) {
        e.preventDefault();
        $('.wrapper-modal').addClass('active');
      })
  
      $('.wrapper-modal, .modal-window').click(function(e) {
        e.stopPropagation();
        $(this).removeClass('active');
      })
      
      $('.form-book__close-btn').click(function(e){
          $('.wrapper-modal').removeClass('active'); 
      })

      // Validate 
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
        "Данное поле заполнено неверно."
      );
      function valEl(el) {
        el.validate({
            rules: {
                firstName: {
                    required: true,
                    regex : '[А-Яа-я]{1,32}'
                },
                email: {
                    required: true,
                    email: true
                },
                phoneNumber: {
                    required: true,
                    digits: true,
                    minlength: 10,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                }
            },
            messages: {
                firstName: {
                    required: 'Введите ваше имя',
                    regex: 'Введите имя правильно'
                },
                email: {
                    required: 'Это поле обязательно для заполнения',
                    email: 'Данный E-mail указан неверно'
                },
                phoneNumber: {
                    required: 'Это поле обязательно для заполнения',
                    regex: 'Введите правильный номер телефона'
                }
            },
            submitHandler: function(form) {             
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case 'form-book':
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
                              $('.modal-window').fadeOut();
                          }, 1000);
                          setTimeout(function() {
                            $('.thanks-window').fadeIn();
                        }, 1500);
                          $('.close-btn').on('click', function(e) {
                            $('.thanks-window').fadeOut();
                        });
                          });
                        break;
                }
                return false;
            }
        })
      }
      $('form').each(function() {
        valEl($(this));
      });
      
      // STICKY HEADER

      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 50) {
          $(".sticky-header").removeClass("sticky-bar");
        } else {
          $(".sticky-header").addClass("sticky-bar");
        }
      });

      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 50) {
            $(".sticky-header").removeClass("sticky");
        } else {
            $(".sticky-header").addClass("sticky");
        }
      });

  });