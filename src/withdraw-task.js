const TaskId = require('./task-id');

function WithdrawTask(options = {}) {
  this.taskId = TaskId.WITHDRAW;
  this.creepId = options.creepId;
  this.sourceId = options.sourceId;
}

WithdrawTask.prototype.execute = function() {
  const creep = Game.getObjectById(this.creepId);

  //  Has creep expired?
  if (!creep) {
    return true;
  }

  //  Is creep at max energy carry capacity?
  if (creep.carry.energy === creep.carryCapacity) {
    return true;
  }

  const source = Game.getObjectById(this.sourceId);

  //  Has source expired?
  if (!source) {
    return true;
  }

  const result = creep.withdraw(source, RESOURCE_ENERGY);

  switch (result) {
    case OK:
      return creep.carry.energy === creep.carryCapacity;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(source);
      return false;

    case ERR_INVALID_TARGET:
      throw Error(
        'The target is not a valid object which can contain the specified resource.'
      );

    case ERR_NOT_ENOUGH_RESOURCES:
      return true;

    default:
      throw Error(`Case for result ${result} is not implemented`);
  }
};

WithdrawTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    sourceId: this.sourceId
  };
};

module.exports = WithdrawTask;
