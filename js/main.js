const shoppingCard = document.querySelector('.shoppingCard'),
      modal = document.querySelector('.modal'),
      close = document.querySelector('.modal_close'),
      cancel = document.querySelector('.modal_cancel'),
      lockedBody = document.getElementsByTagName('body')[0];


shoppingCard.addEventListener('click', function(event) {
	modal.classList.add('is-open');
	lockedBody.classList.add('locked');
});

close.addEventListener('click', function(event) {  
	modal.classList.remove('is-open');
	lockedBody.classList.remove('locked');
});

cancel.addEventListener('click', function(event) {  
 	modal.classList.remove('is-open');
 	lockedBody.classList.remove('locked');
});

new WOW().init();