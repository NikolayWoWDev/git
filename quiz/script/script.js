document.addEventListener('DOMContentLoaded', function()
{
	const btnOpenModal = document.querySelector('#btnOpenModal');
	const modalBlock = document.querySelector('#modalBlock');
	const closeModal = document.querySelector('#closeModal');
	const questionTitle = document.querySelector('#question');
	const formAnswers = document.querySelector('#formAnswers');
	const nextButton = document.querySelector('#next');
	const prevButton = document.querySelector('#prev');
	const sendButton = document.querySelector('#send');
	
	const questions = [
	{
		question: "Какого цвета бургер вы хотите?",
		answers : [
		{
			title: 'Стандарт',
			url: './image/burger.png',
		},
		{
			title: 'Черный',
			url: './image/burgerBlack.png',
		}
		],
		type: 'radio',
	},
	{
		question: "Из какого мяса?",
		answers : [
		{
			title: 'Корова',
			url: './image/beefMeat.png',
		},
		{
			title: 'Курица',
			url: './image/chickenMeat.png',
		},
		{
			title: 'Свиня',
			url: './image/porkMeat.png',
		}
		],
		type: 'radio',
	},
	{
		question: "Доп ингридиенты?",
		answers : [
		{
			title: 'Огурец',
			url: './image/cucumber.png',
		},
		{
			title: 'Лук',
			url: './image/onion.png',
		},
		{
			title: 'Салат',
			url: './image/salad.png',
		},
		{
			title: 'Помидор',
			url: './image/tomato.png',
		}
		],
		type: 'radio',
	},
	{
		question: "Соус?",
		answers : [
		{
			title: 'Белый',
			url: './image/sauce1.png',
		},
		{
			title: 'Острый',
			url: './image/sauce2.png',
		},
		{
			title: 'Майонез',
			url: './image/sauce3.png',
		},
		],
		type: 'radio',
	}
	]
	
	btnOpenModal.addEventListener('click', () =>
	{
		modalBlock.classList.add('d-block');
		playTest();
	});
	
	closeModal.addEventListener('click', () =>
	{
		modalBlock.classList.remove('d-block');
	});
	
	const playTest = () => {
		let numberQuestion = 0;
		const finalAnswers = [];
		const renderQuestions = (index) =>
		{
			formAnswers.innerHTML = ``;
			if(numberQuestion === questions.length + 1)
			{
				questionTitle.textContent = "";
				formAnswers.textContent = "Спасибо за тест";
				setTimeout(() => {
					modalBlock.classList.remove('d-block');
				}, 2000);
				return;
			}
			
			questionTitle.textContent = `${questions[index].question}`;
			
			// P.S Тут в видео действия с кнопками, но они вынесены в updateButtonsVisibility(); поэтому тут оно не надо	
			
		}
		renderQuestions(numberQuestion);
		
		const checkAnswer = () => {
			const obj = {};
			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
			
			if(numberQuestion >= 0 && numberQuestion <= questions.length - 1)
			{
				inputs.forEach((input, index) => {
				obj[`${index}_${questions[numberQuestion].question}`] = input.value;
				})
			}
			else 
			{
				inputs.forEach((input, index) => {
				obj[`Номер`] = input.value;
			})
			}
			
			finalAnswers.push(obj);
		}
		
		const renderAnswers = (index) => {
			questions[index].answers.forEach((answer) => {
			const answerItem = document.createElement('div');
			answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
			answerItem.innerHTML = `<div class="answers-item d-flex flex-column">
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}" alt="burger">
                  <span>${answer.title}</span>
                </label>
              </div>`;
			  formAnswers.appendChild(answerItem);
			})
		}
		
		renderAnswers(numberQuestion);
		
		const updateButtonsVisibility = () => 
		{
			sendButton.classList.add('d-none');
			prevButton.style.display = numberQuestion === 0 ? 'none' : 'block';
			nextButton.style.display = numberQuestion === questions.length ? 'none' : 'block';	
		};
		
		const displayThanks = () =>
		{
			prevButton.style.display = "none";
			nextButton.style.display = "none";
			sendButton.classList.remove('d-none');
			questionTitle.textContent = "Обратная связь";
			formAnswers.innerHTML = `
			<div class="form-group">
				<label for="numberPhone">Введите ваш номер</label>
				<input type="phone" class="form-control" id="numberPhone">
			</div>
			`;
		};
		
		updateButtonsVisibility();
		
		nextButton.onclick = () => {
			
			if(numberQuestion === (questions.length - 1))
			{
				displayThanks();
				return;
			}
			
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
			renderAnswers(numberQuestion);
			updateButtonsVisibility();
		};
		
		prevButton.onclick = () => {
			
			if(numberQuestion <= 0)
				return;
			
			numberQuestion--;
			renderQuestions(numberQuestion);
			renderAnswers(numberQuestion);
			updateButtonsVisibility();
		};
		
		sendButton.onclick = () => {
			sendButton.classList.add('d-none');
			checkAnswer();
			numberQuestion = questions.length + 1;
			renderQuestions(numberQuestion);
		};
	}
})