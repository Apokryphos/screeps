const TaskId = require('./task-id');

function HarvestTask(options = {}) {
  this.taskId = TaskId.HARVEST;
  this.creepId = options.creepId;
  this.sourceId = options.sourceId;
}

HarvestTask.prototype.execute = function() {
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

  const result = creep.harvest(source);

  switch (result) {
    case OK:
      return creep.carry.energy === creep.carryCapacity;

    case ERR_NOT_IN_RANGE:
      creep.moveTo(source);
      return false;

    case ERR_INVALID_TARGET:
      throw Error('The target is not a valid source object.');

    case ERR_NO_BODYPART:
      throw Error('There are no WORK body parts in this creep’s body.');

    case ERR_NOT_ENOUGH_RESOURCES:
      return true;

    default:
      throw Error(`Case for result ${result} is not implemented`);
  }
};

HarvestTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    sourceId: this.sourceId
  };
};

module.exports = HarvestTask;
