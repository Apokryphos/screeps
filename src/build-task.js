const TaskId = require('./task-id');

function BuildTask(options = {}) {
  this.taskId = TaskId.BUILD;
  this.creepId = options.creepId;
  this.targetId = options.targetId;
}

BuildTask.prototype.execute = function() {
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

  const result = creep.build(target);

  switch (result) {
    case OK:
      return creep.carry.energy > creep.carryCapacity;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(target);
      return false;

    default:
      throw Error('Case is not implemented');
  }
};

BuildTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    targetId: this.targetId
  };
};

module.exports = BuildTask;
