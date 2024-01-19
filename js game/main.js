const g_Character = 
{
	name: "Pikachu",
	level: getSavedLevel(),
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
	getMaxHealth: function(p_Level) 
	{
        if (p_Level < 5) 
            return 100;
     
        return Math.round(100 * ((p_Level * 1.5) / (p_Level + 2)));
    },
	
	updateMaxHealth: function() {
        this.maxHealth = this.getMaxHealth(this.level);
		this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    },
	
	attack: function(p_Type) 
	{
	const l_Damage = Math.floor(Math.random() * 20) + 10;
	l_EnemyDamage = Math.floor(Math.random() * 15) + 5;
	switch(p_Type) 
	{
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
	
	animateShake(g_Enemy.healthText);

	if (g_Enemy.health <= 0) {
	  g_Enemy.health = 0;
	  setGameState('Win');
	}

	g_Enemy.updateDetails();
	
	
	animateShake(this.healthText);
	this.health -= l_EnemyDamage;

	if (this.health <= 0) {
	  this.health = 0;
	  setGameState('Lose');
	}
	
	this.updateDetails();
	logBattle(l_EnemyDamage, g_Enemy.health);
	}
};

const g_Enemy = 
{
	name: "Charmander",
	level: Math.floor(Math.random() * ((getSavedLevel() + 1) - (getSavedLevel() - 1) + 1)) + (getSavedLevel() - 1),
	health: 100,
	maxHealth: 100,
	element: document.getElementById('enemy'),
	progressBar: document.getElementById('progressbar-enemy'),
	healthText: document.getElementById('health-enemy'),
	updateDetails: g_Character.updateDetails,
	updateMaxHealth: function() {
        this.maxHealth = g_Character.getMaxHealth(this.level);
		this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }
};

function setGameState(p_State) 
{
	const l_BtnControl = document.querySelector('.control');
	switch(p_State) 
	{
	case 'Win':
		const newLevel = getSavedLevel() + 1;
        saveLevel(newLevel);
		l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы победили</button>';
		break;
	case 'Lose':
		saveLevel(1);
		l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы проиграли</button>';
		break;
	}
}

function logBattle(p_Damage, p_RemainingHealth) {
	const l_BattleLog = document.getElementById('logs');
    const l_LogEntry = document.createElement('div');
    const l_LogIndex = Math.floor(Math.random() * logs.length); 
    const l_LogMessage = logs[l_LogIndex];
    const l_FormattedLog = l_LogMessage.replace('[ПЕРСОНАЖ №1]', g_Character.name).replace('[ПЕРСОНАЖ №2]', g_Enemy.name)
    l_LogEntry.textContent = `${l_FormattedLog} Урон: ${p_Damage}. Осталось жизней соперника: ${p_RemainingHealth}`;
    l_BattleLog.insertBefore(l_LogEntry, l_BattleLog.firstChild);
}

function restart() 
{
location.reload();
}

function saveLevel(level) {
    localStorage.setItem('characterLevel', level);
}

function getSavedLevel() {
    return parseInt(localStorage.getItem('characterLevel')) || 1; // Если уровень не сохранен, возвращаем 1
}

function animateShake(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
	g_Character.updateMaxHealth(g_Character.level);
	g_Enemy.updateMaxHealth(g_Enemy.level);
	setCharacterAndEnemyLevels();
});

function setCharacterAndEnemyLevels() {
    const l_CharacterLevelElement = document.querySelector('.character .lvl');
    const l_EnemyLevelElement = document.querySelector('.enemy .lvl');
    l_CharacterLevelElement.textContent = `Lv. ${g_Character.level}`;
    l_EnemyLevelElement.textContent = `Lv. ${g_Enemy.level}`;
}