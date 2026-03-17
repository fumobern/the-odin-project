let humanScore = 0;
let computerScore = 0;

function playGame() {
	for (let i = 0; i < 5; i++)
		playRound(getHumanChoice(), getComputerChoice());
	showFinalResult();
}

function showFinalResult() {
	displayScores();
	if (humanScore > computerScore)
		console.log('The winner is player! 😎');
	else if (computerScore > humanScore)
		console.log('The winner is computer! 🤖');
	else
		console.log('The winner is nobody! 😱');
}

function playRound(humanChoice, computerChoice) {
	displayChoices(humanChoice, computerChoice);
	switch (humanChoice) {
		case 'rock':
			handleRoundResult(computerChoice, 'scissors', 'paper')
			break;
		case 'paper':
			handleRoundResult(computerChoice, 'rock', 'scissors')
			break;
		case 'scissors':
			handleRoundResult(computerChoice, 'paper', 'rock');
			break;
		default:
			console.log('draw');
	}
}

function handleRoundResult(computerChoice, winChoiceCase, loseChoiceCase) {
	switch (computerChoice) {
		case winChoiceCase:
			console.log('you win');
			++humanScore;
			break;
		case loseChoiceCase:
			console.log('you lose');
			++computerScore;
			break;
		default:
			console.log('draw');
	}
}

function getHumanChoice() {
	let choice = null;
	while (!choice)
		choice = prompt('your turn');
	choice = choice.toLowerCase();
	return choice;
}

function getComputerChoice() {
	let nbr = Math.random() * 3;
	if (nbr < 1)
		return 'rock';
	if (nbr < 2)
		return 'paper';
	return 'scissors';
}

function displayChoices(humanChoice, computerChoice) {
	console.log(`human: ${humanChoice}`);
	console.log(`computer: ${computerChoice}`);
}

function displayScores() {
	console.log(`${humanScore} - ${computerScore}`);
}

export { playGame };