new Vue({
  el: '#app',
  data: {
    user: {
      name: 'Veraudo',
      picture: 'https://wiki.guildwars2.com/images/thumb/5/56/Warrior_04_concept_art.png/350px-Warrior_04_concept_art.png',
      strength: 18,
      superStrength: 25,
      superStrengthCount: 2,
      thaco: 10,
      ac: 20,
      healing: 3,
      healAmount: 12,
      health: 85,
      permaHealth: 85
    },
    monster: {
      name: 'Umber Hulk',
      picture: 'https://1.bp.blogspot.com/--xjIp85kYic/WX86st6D3bI/AAAAAAAAM2o/l0hfxCJYmI47Onzjgq8i5XjnNi08qtWzgCLcBGAs/s1600/umberhulkfromwhere.jpg',
      strength: 22,
      thaco: 6,
      ac: 15,
      health: 100 
    },
    yourTurn: true,
    message: ''
  },
  methods: {
    launch: function(attack, defense, damage) {
      var roll = Math.floor(Math.random() * 20) + 1;
      if(roll + attack >= defense) {
        return {
          result: damage,
          message: "Hit for " + damage +  " points of damage!"
        };
      } else {
        return {
          result: 0,
          message: "Miss!"
        };
      }
    },
    monsterAttack: function() {
      this.yourTurn = false;
      var self = this;
      if(this.monster.health > 0) {
        setTimeout(function() {
          var returning = self.launch(self.monster.thaco, self.monster.ac, self.monster.strength);
          self.user.health = self.user.health -= returning.result;
          self.message = returning.message;
          self.yourTurn = true;
          if(self.user.health <= 0) {
            self.healing = 0;
            self.message = "Game over, man! Game over!! You are toast!!"
          };
        }, 2000);
      }
    },
    winning: function() {
      if(this.monster.health <= 0) {
        this.healing = 0;
        this.message = "You won!! the beast is dead!"
      };
    },
    heroAttack: function() {
      var returned = this.launch(this.user.thaco, this.user.ac, this.user.strength);
      this.monster.health = this.monster.health -= returned.result;
      this.message = returned.message;
      this.winning();
      this.monsterAttack();
    },
    heroSpecialAttack: function() {
      var returned = this.launch(this.user.thaco, this.user.ac, this.user.superStrength);
      this.monster.health = this.monster.health -= returned.result;
      this.user.superStrengthCount--;
      this.message = returned.message;
      this.winning();
      this.monsterAttack();
    },
    heal: function() {
      if(this.user.health < this.user.permaHealth) {
        this.user.health = this.user.health + this.user.healAmount;
        this.user.healing--;
      } else {
        this.message = "you can't heal above your maximum HP!!"
        this.user.healing--;
      }
      this.monsterAttack();
    }
  }
});