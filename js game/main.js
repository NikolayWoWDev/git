const pikachuData = pokemons[0];
const g_Character = new Pokemon("Pikachu", 'character', 'progressbar-character', 'health-character', 'hero_img', 'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png', pikachuData.hp);
const g_Enemy = getRandomPokemon(pokemons);

function setGameState(p_State) {
    const l_BtnControl = document.querySelector('.control');
    switch (p_State) {
        case 'Win':
            const newLevel = getSavedLevel() + 1;
            saveLevel(newLevel);
            l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы победили</button>';
            break;
        case 'Lose':
            saveLevel(1);
            l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Вы проиграли</button>';
            break;
        case 'None':
            l_BtnControl.innerHTML = '<button class="button" onclick="restart()">Ничья</button>';
            break;
    }
}

function CanUse(p_AttackType) {
    gClicks++;

    console.log("Всего кликов " + gClicks);

    if (p_AttackType < 0) {
        console.log("Данная способность закончилась");
        return false;
    }

    console.log("Осталось " + p_AttackType + " использований");

    return true;
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

function restart() {
    location.reload();
}

function saveLevel(level) {
    localStorage.setItem('characterLevel', level);
}

function getSavedLevel() {
    return parseInt(localStorage.getItem('characterLevel')) || 1;
}

function animateShake(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

function setCharacterAndEnemyLevels() {
    const l_CharacterLevelElement = document.querySelector('.character .lvl');
    const l_EnemyLevelElement = document.querySelector('.enemy .lvl');
    l_CharacterLevelElement.textContent = `Lv. ${g_Character.level}`;
    l_EnemyLevelElement.textContent = `Lv. ${g_Enemy.level}`;
}

function getRandomPokemon(pokemonArray) {
    const l_RandomIndex = Math.floor(Math.random() * pokemonArray.length);
    const l_RandomPokemonData = pokemonArray[l_RandomIndex];

    const l_RandomPokemon = new Pokemon(
        l_RandomPokemonData.name,
        'enemy',
        'progressbar-enemy',
        'health-enemy',
        'enemy_img',
        l_RandomPokemonData.img,
        l_RandomPokemonData.hp,
    );
    l_RandomPokemon.attacks = pokemons[l_RandomIndex].attacks;
    return l_RandomPokemon;
}

let gClicks = 0;

document.addEventListener('DOMContentLoaded', function () {
    setCharacterAndEnemyLevels();
    g_Character.updateMaxHealth();
    g_Enemy.updateMaxHealth();
});

function cheat() {
    g_Character.attack('other', g_Enemy, true);
}
