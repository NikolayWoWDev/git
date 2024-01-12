var UserLogin = "test";
var UserPass = "test";

const shoppingCard = document.querySelector('.shoppingCard'),
      modal = document.querySelector('.modal'),
      close = document.querySelector('.modal_close'),
      cancel = document.querySelector('.modal_cancel'),
      lockedBody = document.getElementsByTagName('body')[0];

const welcomeText = document.querySelector('.welcometext');

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

const loginBtn = document.querySelector('.btnLogin'),
	  modal1 = document.querySelector('.modal1'),
	  close1 = document.querySelector('.modal1_close');
	  
	  
loginBtn.addEventListener('click', function(event) {  
	if(storedLogin != "" || storedPass != "")
	{
		storedLogin = "";
		storedPass = "";
		loginBtn.querySelector('.header_text').innerText = "Войти";
		loginBtn.style.display = 'block';
		shoppingCard.style.display = 'none';
		welcomeText.style.display = "none";
		welcomeText.innerText = "";
		login.value = "";
		pass.value = "";
		saveValuesToLocalStorage();
	}
	else
	{
	modal1.classList.add('is-open');
	lockedBody.classList.add('locked');
	}
});

close1.addEventListener('click', function(event) {  
	modal1.classList.remove('is-open');
	lockedBody.classList.remove('locked');
	login.value = "";
	pass.value = "";
});

var storedLogin = localStorage.getItem('storedLogin') || "";
var storedPass = localStorage.getItem('storedPass') || "";
var login = document.querySelector('[name="Name"]');
var pass = document.querySelector('[name="Pass"]');
var loginbtn1 = document.querySelector('[name="LoginMe"]');

function saveValuesToLocalStorage() 
{
  localStorage.setItem('storedLogin', storedLogin);
  localStorage.setItem('storedPass', storedPass);
}

loginbtn1.addEventListener('click', function() 
{
	var loginValue = login.value;
	var passValue = pass.value;
	
	if(UserLogin == loginValue)
	{
		if(passValue == UserPass)
		{
			storedLogin = loginValue;
			storedPass = passValue;
			loginBtn.querySelector('.header_text').innerText = "Выйти";
			loginBtn.style.display = 'block';
			shoppingCard.style.display = 'block';
			modal1.classList.remove('is-open');
			welcomeText.style.display = "block";
			welcomeText.innerText = "Добро пожаловать, " + storedLogin;
			saveValuesToLocalStorage();
		}
	} 
	else
	{
		//@ todo: Make something here
	}
});

if(storedLogin == "" || storedPass == "")
{
	loginBtn.querySelector('.header_text').innerText = "Войти";
	loginBtn.style.display = 'block';
	shoppingCard.style.display = 'none';
	welcomeText.style.display = "none";
}
else
{
	loginBtn.querySelector('.header_text').innerText = "Выйти";
	loginBtn.style.display = 'block';
	shoppingCard.style.display = 'block';
	welcomeText.style.display = "block";
	welcomeText.innerText = "Добро пожаловать, " + storedLogin;
}

modal.addEventListener('click', function(event) 
{
	if (event.target.classList.contains('is-open'))
	{
		modal.classList.remove('is-open');
		lockedBody.classList.remove('locked');
	}
});

modal1.addEventListener('click', function(event) 
{
	if (event.target.classList.contains('is-open'))
	{
		modal1.classList.remove('is-open');
		lockedBody.classList.remove('locked');
		login.value = "";
		pass.value = "";
	}
});