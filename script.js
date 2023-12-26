// Правила игры
const rules = document.querySelector('.rules-container');
const rulesBtn = document.querySelector('.rules-btn');
const iconClose = document.querySelector('.icone-close');
function showRules() {
	rules.classList.toggle('active');
}
function close() {
	rules.classList.remove('active');
}
rulesBtn.addEventListener('click', showRules);
iconClose.addEventListener('click', close);

// фишки
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
// Кнопка игры
const btnPlay = document.querySelector('.play-again');
// Счет игрока 
let scoreUser = 0;
// Счет пк
let scorePc = 0;
// Событие при нажатии на кнопку play again,перезапуск игры
btnPlay.addEventListener('click', restart);
// События при нажатии на фишки стартового стола
rock.addEventListener('click', userSelection);
paper.addEventListener('click', userSelection);
scissors.addEventListener('click', userSelection);



// Выбор фишки на стартовом столе
function userSelection() {
	const selectedСhip = this;
	switchStartingFinalTable() //Переключаем со стартового на финальный стол
	setTimeout(showChipUser, 1000, selectedСhip);//Показываем на финальном столе фишки игрока
	 finalGame(selectedСhip);// финал игры
}
// Переключатель стола
function switchStartingFinalTable() {
	const startingTable = document.querySelector('.start-game-container');
	const finalTable = document.querySelector('.result-container');
	startingTable.classList.toggle('hide-start-table');
	finalTable.classList.toggle('active');
}

// Показывает фишки игрока
function showChipUser(selectedСhip) {
	const rockUser = document.querySelector('.user-icon.rock');
	const paperUser = document.querySelector('.user-icon.paper');
	const scissorsUser = document.querySelector('.user-icon.scissors');
	if (selectedСhip.className === 'rock') {
		rockUser.classList.toggle('active');
	} else if (selectedСhip.className === 'paper') {
		paperUser.classList.toggle('active');
	} else if (selectedСhip.className === 'scissors') {
		scissorsUser.classList.toggle('active');
	}
}
// Выбирает рандомную фишку 
function getRandomChip() {
	const rock = document.querySelector('.rock');
	const paper = document.querySelector('.paper');
	const scissors = document.querySelector('.scissors');
	let arrChip = [rock, scissors, paper];
	let chip = arrChip[Math.floor(Math.random() * 3)];
	return chip;
}
// Показывает фишки пк
function showChipPc(pcChip) {
	const rockPc = document.querySelector('.pc-icon.rock');
	const paperPc = document.querySelector('.pc-icon.paper');
	const scissorsPc = document.querySelector('.pc-icon.scissors');
	if (pcChip.className === 'rock') {
		rockPc.classList.toggle('active');
	} else if (pcChip.className === 'paper') {
		paperPc.classList.toggle('active');
	} else if (pcChip.className === 'scissors') {
		scissorsPc.classList.toggle('active');
	}
}
// финал игры
function finalGame(user) {
	const pcChip = getRandomChip();//кладем рандомную фишку в  пк
	setTimeout(showChipPc, 3000, pcChip);//показываем какую фишку выбрал пк
	winnerInitialization(user, pcChip);//выбор победителя
}

// Функция определяющая победителя
function winnerInitialization(user, pcChip) {
	const arrResult = ['КРАСАВА', 'СОБЕРИСЬ ПАДАВАН', 'НИЧЬЯ'];

	if (pcChip === user) {
		setTimeout(showResult, 4000, arrResult[2]);
	}
	else if (user === rock && pcChip === scissors || user === paper && pcChip === rock || user === scissors && pcChip === paper) {
		setTimeout(showResult, 4000, arrResult[0]);
		scoreUser += 1;
	} else {
		setTimeout(showResult, 4000, arrResult[1]);
		scorePc += 1;
	}
}
// Показывает результат ,кнопку игры ,счет
function showResult(result) {
	activationResult(result);
	switchGameButton();
	showScore();
}

// Показывает счет
function showScore() {
	const containerScore = document.querySelector('.count');
	containerScore.textContent = `${scoreUser}:${scorePc}`;
}

// Активирует результат 
function activationResult(result) {
	const ContainerResult = document.querySelector('.result-win-lose');
	ContainerResult.textContent = result;
	ContainerResult.classList.toggle('active-result-win-lose');
}

// restart
function restart() {
	switchGameButton()
	switchStartingFinalTable()
	deactivationResult()
	deactivationOfPcChips();
	deactivationOfUserChips();
}


// Диактивация реезультата
function deactivationResult() {
	const ContainerResult = document.querySelector('.result-win-lose');
	ContainerResult.textContent = '';
	ContainerResult.classList.toggle('active-result-win-lose');
}
// Диактивизация фишек игрока
function deactivationOfUserChips() {
	const userChip = document.querySelectorAll('.result-container .user-icon');
	userChip.forEach(userChip => userChip.classList.remove('active'));
}


// Диактивизация фишек пк
function deactivationOfPcChips() {
	const pcChip = document.querySelectorAll('.result-container .pc-icon');
	pcChip.forEach(pcChip => pcChip.classList.remove('active'));
}
// Активация и деактивация кнопки play again
function switchGameButton() {
	const btnPlay = document.querySelector('.play-again');
	btnPlay.classList.toggle('active-play-again');
}
