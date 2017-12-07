const TaskId = require('./task-id');

function RepairTask(options = {}) {
  this.taskId = TaskId.REPAIR;
  this.creepId = options.creepId;
  this.targetId = options.targetId;
}

RepairTask.prototype.execute = function() {
  const creep = Game.getObjectById(this.creepId);

  //  Has creep expired?
  if (!creep) {
    return true;
  }

  //  Is creep out of energy?
  if (creep.carryCapacity === 0 || !creep.carry.energy) {
    return true;
  }

  const target = Game.getObjectById(this.targetId);

  //  Has target expired?
  if (!target) {
    return true;
  }

  //  Is target repaired?
  if (target.hits === target.hitsMax) {
    return true;
  }

  const result = creep.repair(target);

  switch (result) {
    case OK:
      return creep.carry.energy > 0;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(target);
      return false;

    default:
      throw Error('Case is not implemented');
  }
};

RepairTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    targetId: this.targetId
  };
};

module.exports = RepairTask;
