import * as flsFunctions from "./modules/functions.js";
import $ from 'jquery';

flsFunctions.isWebp();

//этот код нужен, что бы ошибка addEventListener больше не появлялась (создали глобальнюу переменную setListener)
//теперь на любой странице где не используется какой-то кусочек скрипта, ошибка не будет выводиться и не будет ломаться остальной код

//отличия от использования обычного написания кода
//пример:
//const showPopup = document.querySelector('popup');
//showPopup.addEventListener('click', function()){}
//к примеру на главной странице класс popup у тебя отсуствует. но в скрипте у тебя он есть, так как есть на другой странице
//скрипт прогружается вместе со страницей, страница загрузилась и скрипт увидел что на главной странице нет класса popup и твой код сломался...
//поэтому добавился нижний код, что бы он обходил стороной те классы которые не используются на странице, что бы код не ломался
//это маленькая проблема JS... c JQuery таких проблем нет

//новая запись, без addEventListener
//const showPopup = document.querySelector('popup');
//setListener(showPopup, 'click', function()){}

//в таком случае у тебя никогда не будет ошибки если класс popup отсусвует

//showPopup.addEventListener('click', function()){} => setListener(showPopup, 'click', function()){}


const setListener = (element, type, handler) => {
  if(!element) {
    return;
  }
  element.addEventListener(type, handler);
  return () => {
    element.removeEventListener(type, handler);
  };
}

function actionMoreLess(){
  var boxOuter = ".data_more_less",
    boxInner = ".data_more_less_inner",
    boxBody = ".data_more_less_body",
    showMore = $(".action_more"),
    showLess = $(".action_less");

  $(boxInner).each(function(){
    var $this = $(this);
    $this.css("max-height", $this.data("height"));
  });

  showMore.on('click', function(e){
    e.preventDefault();
    var $this = $(this),
        boxInnerH = $this.closest(boxOuter).find(boxInner).height(),
        boxInnerUpdate = boxInnerH + $this.closest(boxOuter).find(boxInner).data("increase-by"),
        boxBodyH = $this.closest(boxOuter).find(boxBody).height();
      setTimeout(function(){
        if(boxBodyH > boxInnerUpdate){
          $this.closest(boxOuter).removeClass("less_active").find(boxInner).css("max-height", boxInnerUpdate);
        } else {
          $this.closest(boxOuter).addClass("less_active").find(boxInner).css("max-height", "none");
        }
      }, 10);
  });

  showLess.on('click', function(){
    $(this).closest(boxOuter).removeClass("less_active").find(boxInner).css("max-height", $(this).closest(boxOuter).find(boxInner).data("height"));
    return false;
  });
} actionMoreLess();

// popup register
$('.autorization').on('click', function() {
	$('.overlay').fadeIn();
});

// Закрытие окна на крестик
$('#close-register').on('click', function() {
	$('.overlay').fadeOut();
});

// Закрытие окна на поле
$(document).mouseup(function (e) { 
	var popup = $('.popup');
	if (e.target != popup[0] && popup.has(e.target).length === 0){
		$('.overlay').fadeOut();
	}
});

// открываем dropdown-menu
const btnDropdown = document.getElementById('dropdown-menu');
const itemsDropdown = document.querySelector('.dropdown__items');

setListener(btnDropdown, 'click', function() {
  itemsDropdown.classList.toggle('active');
}, false);

// открываем фильтр

const btnsFilter = document.querySelectorAll('button[data-btn-filter]');
const filterItems = document.querySelector('.filter__active'),
  animationItems = document.querySelector('.filter__content'),
  closeFilter = document.getElementById('close-filter');

  [...btnsFilter].forEach(btn => {
    setListener(btn, 'click', () => {
      document.body.classList.add('popup-open');
      filterItems.style.display = 'flex';
      //тут он добавляет анимацию выход из право в лево, тем самым показывая попап
      animationItems.style.cssText = 'animation:slide-filter-in .3s ease; animation-fill-mode: forwards;';
    });
  });

  setListener(closeFilter, 'click', function() {
    document.body.classList.remove('popup-open');
    filterItems.style.display = 'none';
    //тут он добавляет анимацию от лево в право, тем самым скрывая попап
    animationItems.style.cssText = 'animation:slide-filter-out .3s ease; animation-fill-mode: forwards;';
    //style.cssText - отвечает за добавление style в коде.. тоже самое как с классом, но в данном случае это будет 'style'
    //style="animation: 0.3s ease 0s 1 normal forwards running slide-filter-out;"
  }, false);


// Навигация по странице 
$(document).ready(function(){
  var docEl = $(document),
    headerEl = $('.navbar__menu');
  
  docEl.on('scroll', function(){
    if (docEl.scrollTop() > 46){
      headerEl.addClass('fixed-to-top');
    }
    else {
      headerEl.removeClass('fixed-to-top');
    }
  });
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

// radio button type pizza
$(".pizza__radio").on('click', function(){
  $(".pizza__radio").prop("checked", false);
  $(this).prop("checked", true);
});

// radio button size pizza
$(".pizza__size_radio").on('click', function(){
  $(".pizza__size_radio").prop("checked", false);
  $(this).prop("checked", true);
});

//Popup add to cart
$('#btn-add-cart').on('click', function() {
	$('#popup-add-cart').fadeIn();
});

// Закрытие окна на крестик
$('#close-add-cart').on('click', function() {
	$('#popup-add-cart').fadeOut();
});

// При нажатии на добавить доп.продукт, меняется рамка