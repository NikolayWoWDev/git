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
	
	const getData = () => {
		formAnswers.textContent = `LOAD`;
		
		fetch("https://doogewow.site/DO_NOT_FKG_DELETE_THIS_FOLDER/quiz/script/db.json")
		.then(res => res.json())
		.then(obj => playTest(obj.questions))
	}
	
	btnOpenModal.addEventListener('click', () =>
	{
		modalBlock.classList.add('d-block');
		getData();
	});
	
	closeModal.addEventListener('click', () =>
	{
		modalBlock.classList.remove('d-block');
	});
	
	const playTest = (questions) => {
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
			else if (numberQuestion == questions.length + 2)
			{
				inputs.forEach((input, index) => {
				obj[`${index}_Номер`] = input.value;
			})
			}
			
			finalAnswers.push(obj);
			console.log(finalAnswers);
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
			numberQuestion = questions.length + 2;
			checkAnswer();
			renderQuestions(numberQuestion);
		};
	}
})