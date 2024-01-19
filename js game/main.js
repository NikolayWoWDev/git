const g_Character = 
{
	name: "Pikachu",
	level: 1,
	health: 100,
	maxHealth: 100,
	element: document.getElementById('character'),
	progressBar: document.getElementById('progressbar-character'),
	healthText: document.getElementById('health-character'),
	updateDetails: function() {
	this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
	const healthPercentage = (this.health / this.maxHealth) * 100;
	this.progressBar.style.width = `${healthPercentage}%`;
	},
	attack: function(p_Type) 
	{
	const l_Damage = Math.floor(Math.random() * 20) + 10;
	l_EnemyDamage = Math.floor(Math.random() * 15) + 5;
	switch(p_Type) {
	  case 'kick':
		g_Enemy.health -= l_Damage;
		break;
	  case 'other':
		g_Enemy.health -= l_Damage * 2;
		break;
	  case 'die':
		l_EnemyDamage = 100;
		break;
	}

	if (g_Enemy.health <= 0) {
	  g_Enemy.health = 0;
	  setGameState('Win');
	}

	g_Enemy.updateDetails();
	this.health -= l_EnemyDamage;

	if (this.health <= 0) {
	  this.health = 0;
	  setGameState('Lose');
	}

	this.updateDetails();
	}
};

const g_Enemy = 
{
	name: "Charmander",
	level: 1,
	health: 100,
	maxHealth: 100,
	element: document.getElementById('enemy'),
	progressBar: document.getElementById('progressbar-enemy'),
	healthText: document.getElementById('health-enemy'),
	updateDetails: g_Character.updateDetails
};

function setGameState(p_State) 
{
	const l_BtnControl = document.querySelector('.control');
	switch(p_State) 
	{
	case 'Win':
		l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы победили</button>';
		break;
	case 'Lose':
		l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы проиграли</button>';
		break;
	}
}

function restart() 
{
location.reload();
}

g_Character.updateDetails();
g_Enemy.updateDetails();
