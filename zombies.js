 function Item(name){
  this.name = name;
 }

 function Weapon(name, damage){
  Item.call(this, name);
  this.name = name;
  this.damage = damage;
 }

Weapon.prototype = Object.create(Item.prototype, {
  constructor: {
  value: Weapon
  }
});

function Food(name, energy){
  Item.call(this, name);
  this.name = name;
  this.energy = energy;
}

 Food.prototype = Object.create(Item.prototype, {
  constructor: {
    value: Food
  }
 });

function Player(name, health, strength, speed){
  var _pack = [];
  var _maxHealth = health;
  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  this.equipped = false;
  this.getPack = function(){
    return _pack;
  }
  this.getMaxHealth = function(){
    return _maxHealth;
  }

  this.takeItem = function (item) {
    if (this.getPack().length < 3){
      this.getPack().push(item);
    }
    console.log(this.getPack());
  }

  this.discardItem = function(item){
    for (var i = 0; i < this.getPack().length; i++){
      if (this.getPack()[i] === item){
        this.getPack().splice(i, 1);
        return true;
      }
        console.log(this.getPack());
    }
  }
  this.checkPack = function(){
    console.log(this.getPack());
  }

  this.equip = function(itemToEquip){
    if (this.getPack().indexOf(itemToEquip) === -1){
      return false;
    }
    if (this.equipped) {
      this.getPack().push(this.equipped);
      this.equipped = this.getPack().splice(itemToEquip, 1)[0];
    }
    if (this.equipped === false) {
      this.equipped = this.getPack().splice(itemToEquip, 1)[0];
    }
  }

  this.eat = function(itemToEat){
    if (itemToEat instanceof Food){
      if (this.getPack().indexOf(itemToEat) > -1){
        this.health += itemToEat.energy;
        if(this.health >= this.getMaxHealth()){
          this.health = this.getMaxHealth();
        }
        this.getPack().splice(itemToEat, 1)[0];
      }

      return false;
    }
  }

  this.useItem = function(item){
    if(item instanceof Weapon){
      return this.equip(item);
    }
    if(item instanceof Food){
      return this.eat(item);
    }
  }

  this.equippedWith = function(){
    if (this.equipped) {
      return this.equipped.name;
    }
    return false;
  }
}


function Zombie(health, strength, speed){
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
}

function FastZombie(health, strength, speed){
  Zombie.call(this, health, strength, speed);
}

FastZombie.prototype = Object.create(Zombie.prototype, {
constructor: {
  value: FastZombie
}
});

function StrongZombie(health, strength, speed){
  Zombie.call(this, health, strength, speed);
}

StrongZombie.prototype = Object.create(Zombie.prototype, {
  constructor: {
    value: StrongZombie
  }
});

function RangedZombie(health, strength, speed){
  Zombie.call(this, health, strength, speed);
}

RangedZombie.prototype = Object.create(Zombie.prototype, {
  constructor: {
    value: RangedZombie
  }
});

function ExplodingZombie(health, strength, speed){
  Zombie.call(this, health, strength, speed);
}

ExplodingZombie.prototype = Object.create(Zombie.prototype, {
  constructor: {
    value: ExplodingZombie
  }
});

/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  var player = new Player("Joan", 500, 30, 70);
  var zombie = new Zombie(40, 50, 20);
  var charger = new FastZombie(175, 25, 60);
  var tank = new StrongZombie(250, 100, 15);
  var spitter = new RangedZombie(150, 20, 20);
  var boomer = new ExplodingZombie(50, 15, 10);

  var shovel = new Weapon("shovel", 15);
  var sandwich = new Food("sandwich", 30);
  var chainsaw = new Weapon("chainsaw", 25);

  player.takeItem(shovel);
  player.takeItem(sandwich);
  player.takeItem(chainsaw);
  player.discardItem(new Weapon("scythe", 21));
  player.discardItem(shovel);
  player.checkPack();
  player.takeItem(shovel);
  player.checkPack();

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  player.useItem(shovel);
  player.equippedWith();
  player.checkPack();

  player.health = 487;
  console.log("Before health: " + player.health);
  player.useItem(sandwich);
  console.log("After health: " + player.health);
  player.checkPack();
}
