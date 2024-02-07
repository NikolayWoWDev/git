class Pokemon {
	constructor(name, elementId, progressBarId, healthTextId, imgId, imgUrl, hp) {
        this.name = name;
        this.level = getSavedLevel();
        this.health = this.getMaxHealth(this.level, hp || 100); // Используем данные из массива pokemons
        this.maxHealth = this.health;
        this.element = document.getElementById(elementId);
        this.progressBar = document.getElementById(progressBarId);
        this.healthText = document.getElementById(healthTextId);
        this.Img = document.getElementById(imgId);
        this.ImgUrl = imgUrl;
        this.Img.src = this.ImgUrl;
        this.kicks = 6;
        this.attacks = 6;
        const enemyNameElement = document.getElementById('name-enemy');
        enemyNameElement.textContent = this.name;
    }
	
    updateDetails() {
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
		
		if(healthPercentage <= 60 && healthPercentage >= 20)
			this.progressBar.classList.add('low');
		else if (healthPercentage < 20)
			this.progressBar.classList.add('critical');
		
		this.Img.src = this.ImgUrl;
    }

    getMaxHealth(level, hp) {
        if (level < 5) {
            return hp;
        }
        return Math.round(hp * (1 + level / (level + 2)));
    }

    updateMaxHealth() {
        this.maxHealth = this.getMaxHealth(this.level, this.health);
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }

    attack(type, enemy, cheat) {
        let l_Damage = Math.floor(Math.random() * 20) + 50;
		
		const l_RandomAttackIndex = Math.floor(Math.random() * enemy.attacks.length);
        const l_SelectedAttack = enemy.attacks[l_RandomAttackIndex];
        let l_EnemyDamage = Math.floor(Math.random() * (l_SelectedAttack.maxDamage - l_SelectedAttack.minDamage + 1)) + l_SelectedAttack.minDamage;
		if(cheat)
		{
			l_Damage = enemy.health;
			l_EnemyDamage = 0;
		}

        switch (type) {
            case 'kick':
                this.kicks--;
                if (!this.canUse(this.kicks)) return;
                enemy.health -= l_Damage;
                break;
            case 'other':
                this.attacks--;
                if (!this.canUse(this.attacks)) return;
                enemy.health -= l_Damage * 2;
                break;
        }

        animateShake(enemy.healthText);

        if (enemy.health <= 0) 
            enemy.health = 0;

        enemy.updateDetails();

        animateShake(this.healthText);
		this.health -= l_EnemyDamage;

        if (this.health <= 0 && enemy.health > 0)	// На случай если противник победил
		{
            this.health = 0;
            setGameState('Lose');
        } else if (this.health <= 0 && enemy.health <= 0)
		{
			this.health = 0;
            setGameState('None');
		} else if (enemy.health == 0 && this.health > 0)
			setGameState('Win');
			

        this.updateDetails();
        logBattle(l_EnemyDamage, enemy.health);
    }

    canUse(attackType) {
        gClicks++;
        console.log("Всего кликов " + gClicks);

        if (attackType < 0) {
            console.log("Данная способность закончилась");
            return false;
        }

        console.log("Осталось " + attackType + " использований");

        return true;
    }
}