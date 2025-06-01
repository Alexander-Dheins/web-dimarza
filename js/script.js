
jQuery(function ($) {
	'use strict';

	/* ----------------------------------------------------------- */
	/*  Fixed header
	/* ----------------------------------------------------------- */
	$(window).on('scroll', function () {

		// fixedHeader on scroll
		function fixedHeader() {
			var headerTopBar = $('.top-bar').outerHeight();
			var headerOneTopSpace = $('.header-one .logo-area').outerHeight();

			var headerOneELement = $('.header-one .site-navigation');
			var headerTwoELement = $('.header-two .site-navigation');

			if ($(window).scrollTop() > headerTopBar + headerOneTopSpace) {
				$(headerOneELement).addClass('navbar-fixed');
				$('.header-one').css('margin-bottom', headerOneELement.outerHeight());
			} else {
				$(headerOneELement).removeClass('navbar-fixed');
				$('.header-one').css('margin-bottom', 0);
			}
			if ($(window).scrollTop() > headerTopBar) {
				$(headerTwoELement).addClass('navbar-fixed');
				$('.header-two').css('margin-bottom', headerTwoELement.outerHeight());
			} else {
				$(headerTwoELement).removeClass('navbar-fixed');
				$('.header-two').css('margin-bottom', 0);
			}
		}
		fixedHeader();


		// Count Up
		function counter() {
			var oTop;
			if ($('.counterUp').length !== 0) {
				oTop = $('.counterUp').offset().top - window.innerHeight;
			}
			if ($(window).scrollTop() > oTop) {
				$('.counterUp').each(function () {
					var $this = $(this),
						countTo = $this.attr('data-count');
					$({
						countNum: $this.text()
					}).animate({
						countNum: countTo
					}, {
						duration: 1000,
						easing: 'swing',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
						}
					});
				});
			}
		}
		counter();

		//Searh lex
		
		// scroll to top btn show/hide
		function scrollTopBtn() {
			var scrollToTop = $('#back-to-top'),
				scroll = $(window).scrollTop();
			if (scroll >= 50) {
				scrollToTop.fadeIn();
			} else {
				scrollToTop.fadeOut();
			}
		}
		scrollTopBtn();
	});


	$(document).ready(function () {

		// navSearch show/hide
		function navSearch() {
			$('.nav-search').on('click', function () {
				$('.search-block').fadeIn(350);
			});
			$('.search-close').on('click', function () {
				$('.search-block').fadeOut(350);
			});
		}
		navSearch();

		// navbarDropdown
		function navbarDropdown() {
			if ($(window).width() < 992) {
				$('.site-navigation .dropdown-toggle').on('click', function () {
					$(this).siblings('.dropdown-menu').animate({
						height: 'toggle'
					}, 300);
				});

				var navbarHeight = $('.site-navigation').outerHeight();
				$('.site-navigation .navbar-collapse').css('max-height', 'calc(100vh - ' + navbarHeight + 'px)');
			}
		}
		navbarDropdown();


		// back to top
		function backToTop() {
			$('#back-to-top').on('click', function () {
				$('#back-to-top').tooltip('hide');
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		}
		backToTop();


		// banner-carousel
		function bannerCarouselOne() {
			$('.banner-carousel.banner-carousel-1').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: true,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
			$('.banner-carousel.banner-carousel-1').slickAnimation();
		}
		bannerCarouselOne();


		// banner Carousel Two
		function bannerCarouselTwo() {
			$('.banner-carousel.banner-carousel-2').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		bannerCarouselTwo();


		// pageSlider
		function pageSlider() {
			$('.page-slider').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		pageSlider();


		// Shuffle js filter and masonry
		function projectShuffle() {
			if ($('.shuffle-wrapper').length !== 0) {
				var Shuffle = window.Shuffle;
				var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
					itemSelector: '.shuffle-item',
					sizer: '.shuffle-sizer',
					buffer: 1
				});
				$('input[name="shuffle-filter"]').on('change', function (evt) {
					var input = evt.currentTarget;
					if (input.checked) {
						myShuffle.filter(input.value);
					}
				});
				$('.shuffle-btn-group label').on('click', function () {
					$('.shuffle-btn-group label').removeClass('active');
					$(this).addClass('active');
				});
			}
		}
		projectShuffle();


		// testimonial carousel
		function testimonialCarousel() {
			$('.testimonial-slide').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				speed: 600,
				arrows: false
			});
		}
		testimonialCarousel();


		// team carousel
		function teamCarousel() {
			$('.team-slide').slick({
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 2,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>',
				responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
		teamCarousel();


		// media popup
		function mediaPopup() {
			$('.gallery-popup').colorbox({
				rel: 'gallery-popup',
				transition: 'slideshow',
				innerHeight: '500'
			});
			$('.popup').colorbox({
				iframe: true,
				innerWidth: 600,
				innerHeight: 400
			});
		}
		mediaPopup();

	});


});



var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1500,
    centeredSlides: true,
    breakpoints: {
      768: { slidesPerView: 4, centeredSlides: true },
      1024: { slidesPerView: 5, centeredSlides: true }
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;
  const totalItems = carousel.children.length;

  function updateCarousel() {
    const offset = -currentIndex * 320; // Ajusta según el ancho del elemento
    carousel.style.transform = `translateX(${offset}px)`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  // Mueve el carrusel cada 3 segundos
  setInterval(showNext, 3000);

  // Botones de navegación
  document.querySelector('.next-btn').addEventListener('click', showNext);
  document.querySelector('.prev-btn').addEventListener('click', showPrev);
});
document.addEventListener('DOMContentLoaded', function() {
    // Manejar la apertura del modal
    document.querySelectorAll('.contactBtn').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    // Manejar el cierre del modal
    document.querySelectorAll('.close').forEach(span => {
        span.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Manejar la aceptación de términos y mostrar botones de redes sociales
    document.querySelectorAll('.acceptBtn').forEach(button => {
        button.addEventListener('click', function() {
            const socialId = this.getAttribute('data-social');
            document.getElementById(socialId).classList.remove('hidden');
            const modalId = this.closest('.modal').id;
            document.getElementById(modalId).style.display = 'none';
        });
    });
});

// Modo oscuro
document.addEventListener('DOMContentLoaded', function () {
	const themeToggleBtn = document.getElementById('theme-toggle-checkbox'); // Botón de cambio de tema
	const body = document.body;
  
	// Verifica si hay preferencia guardada en localStorage
	if (localStorage.getItem('darkMode') === 'true') {
	  body.classList.add('dark-mode');
	  themeToggleBtn.checked = true; // Marca el checkbox en modo oscuro
	}
  
	// Función para alternar entre modo claro y oscuro
	themeToggleBtn.addEventListener('change', function () {
	  body.classList.toggle('dark-mode');
  
	  // Guarda la preferencia en localStorage
	  if (body.classList.contains('dark-mode')) {
		localStorage.setItem('darkMode', 'true');
	  } else {
		localStorage.setItem('darkMode', 'false');
	  }
	});
  });
  




// Registra el tiempo de inicio tan pronto como el script se analiza
const startTime = Date.now();
const minimumDuration = 3000; // 4.5 segundos en milisegundos

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');

  // Calcula cuánto tiempo ha pasado desde el inicio
  const elapsedTime = Date.now() - startTime;
		  
  // Calcula cuánto tiempo falta para alcanzar la duración mínima
  const remainingTime = minimumDuration - elapsedTime;

  // Función para ocultar loader y mostrar contenido
  function showContent() {
	if (loadingScreen) {
	  loadingScreen.style.display = 'none'; // Oculta la pantalla de carga
	}
	if (mainContent) {
	  mainContent.style.display = 'block'; // Muestra el contenido principal
	}
  }

  // Si el tiempo transcurrido es menor que la duración mínima,
  // espera el tiempo restante. Si no, ejecuta inmediatamente.
  if (remainingTime > 0) {
	setTimeout(showContent, remainingTime);
  } else {
	showContent(); // Ya pasó el tiempo mínimo, muestra el contenido ahora
  }
});

