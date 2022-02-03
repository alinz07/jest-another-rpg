const Player = require('./Player');
const Enemy = require('./Enemy');
const Inquirer = require('inquirer');
const inquirer = require('inquirer');

function Game() {
    this.roundNumber=0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    Inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        //destructure name from the prompt obj
        .then(({name}) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
}

Game.prototype.startNewBattle = function () {

    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle() = function() {
    //if player turn
    if (this.isPlayerTurn) {
    
        //prompt user to attack or use a potion
        Inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({action}) => {
                //if using a potion
                if (action==='Use potion') {
                    //display list of potion object to user

                    //apply selected potion effect to player
                } else {
                    //if attacking, subtract health from the enemy based on player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });


            

        
    } else {
        //if enemy turn, subtract health from the player based on enemy attack value
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
}

module.exports = Game;