$(function() {

  $('.js-gamburger').on('click', function() {
    $(this).toggleClass('sidebar-has-open');
    $('.js-content').toggleClass('sidebar-has-open');
  });

  $('.show-search-btn').on('click', function() {
    $('.show-search-btn').removeClass('active');
    $('.form').addClass('active');
  });

  $('.close-form').on('click', function() {
    $('.show-search-btn').addClass('active');
    $('.form').removeClass('active');
  });

  $('.choose-currency').on('click', '.choose-currency-item', function() {
    $('.choose-currency-item').removeClass('active');
    $(this).toggleClass('active');
  });

});
