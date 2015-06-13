function Game(){
  this.rolls = []
  this.currentRoll = 0;
};

Game.prototype.roll = function(pins){
  this.rolls[this.currentRoll++] = pins;
};

Game.prototype.score = function(){
  var score = 0;
  var frameIndex = 0;

  for(var frame = 0; frame < 10; frame++){
    if(this._isStrike(frameIndex)){
      score += 10 + this._strikeBonus(frameIndex);
      nextRoll();
    } else if(this._isSpare(frameIndex)){
      score += 10 + this._spareBonus(frameIndex);
      nextFrame();
    } else {
      score += this._sumOfRollsInFrame(frameIndex);
      nextFrame();
    }
  }

  return score;

  function nextFrame(){
    frameIndex += 2
  }
  function nextRoll(){
    frameIndex += 1
  }
};

//private

Game.prototype._isStrike = function(frameIndex){
  return this.rolls[frameIndex] === 10;
};

Game.prototype._isSpare = function(frameIndex){
  return this.rolls[frameIndex] + this._nextRollScore(frameIndex) === 10;
};

Game.prototype._strikeBonus = function(frameIndex){
  return this._nextFrameScore(frameIndex);
};

Game.prototype._spareBonus = function(frameIndex){
  return this._nextNextRollScore(frameIndex);
};

Game.prototype._sumOfRollsInFrame = function(frameIndex){
  return this.rolls[frameIndex] + this._nextRollScore(frameIndex);
};

Game.prototype._nextRollScore = function(frameIndex){
  return this.rolls[frameIndex + 1]
};

Game.prototype._nextNextRollScore = function(frameIndex){
  return this.rolls[frameIndex + 2]
};

Game.prototype._nextFrameScore = function(frameIndex){
  return this._nextRollScore(frameIndex) + this._nextNextRollScore(frameIndex);
};
