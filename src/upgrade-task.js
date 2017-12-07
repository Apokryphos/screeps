const TaskId = require('./task-id');

function UpgradeTask(options = {}) {
  this.taskId = TaskId.UPGRADE;
  this.creepId = options.creepId;
  this.targetId = options.targetId;
}

UpgradeTask.prototype.execute = function() {
  const creep = Game.getObjectById(this.creepId);

  //  Has creep expired?
  if (!creep) {
    return true;
  }

  //  Is creep out of energy?
  if (!creep.carry.energy) {
    return true;
  }

  const target = Game.getObjectById(this.targetId);

  //  Has target expired?
  if (!target) {
    return true;
  }
  const result = creep.upgradeController(target);

  switch (result) {
    case OK:
      return !creep.carry.energy;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(target);
      return false;

    case ERR_NOT_OWNER:
    case ERR_BUSY:
    case ERR_NOT_ENOUGH_RESOURCES:
    case ERR_INVALID_TARGET:
    case ERR_NO_BODYPART:
      return true;

    default:
      throw Error(`Case for result ${result} is not implemented`);
  }
};

UpgradeTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    targetId: this.targetId
  };
};

module.exports = UpgradeTask;
