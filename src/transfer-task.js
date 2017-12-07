const TaskId = require('./task-id');

function TransferTask(options = {}) {
  this.taskId = TaskId.TRANSFER;
  this.creepId = options.creepId;
  this.targetId = options.targetId;
}

TransferTask.prototype.execute = function() {
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

  const result = creep.transfer(target, RESOURCE_ENERGY);

  switch (result) {
    case OK:
      return true;

    case ERR_FULL:
      return true;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(target);
      return false;

    default:
      throw Error(`Case for result ${result} is not implemented`);
  }
};

TransferTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    targetId: this.targetId
  };
};

module.exports = TransferTask;
