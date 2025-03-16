(function ($) {
    "use strict";
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    new WOW().init();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
})(jQuery);
document.addEventListener("DOMContentLoaded", function () {
    var serviciosDropdown = document.getElementById("dropdownServicios");

    serviciosDropdown.addEventListener("click", function (event) {
        event.preventDefault();
        this.parentElement.classList.toggle("show");
        document.getElementById("submenuServicios").classList.toggle("show");
    });
});
function toggleText(element) {
    var paragraph = element.nextElementSibling;
    if (paragraph.style.display === "none" || paragraph.style.display === "") {
        paragraph.style.display = "block";
        element.innerHTML = 'Mostrar menos <i class="fa fa-arrow-up ms-2"></i>';
    } else {
        paragraph.style.display = "none";
        element.innerHTML = 'Saber más <i class="fa fa-arrow-right ms-2"></i>';
    }
}