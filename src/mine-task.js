const ContainerUtil = require('./container-util');
const TaskId = require('./task-id');

function MineTask(options = {}) {
  this.taskId = TaskId.MINE;
  this.creepId = options.creepId;
  this.sourceId = options.sourceId;
  this.containerId = options.containerId;
}

MineTask.prototype.execute = function() {
  const creep = Game.getObjectById(this.creepId);

  //  Has creep expired?
  if (!creep) {
    return true;
  }

  const container = Game.getObjectById(this.containerId);

  //  Has container expired?
  if (!container) {
    return true;
  }

  const source = Game.getObjectById(this.sourceId);

  //  Has source expired?
  if (!source) {
    return true;
  }

  if (!creep.pos.isEqualTo(container.pos)) {
    if (ContainerUtil.containerInUseByMiner(container)) {
      return true;
    }

    creep.moveTo(container);
    return false;
  }

  const result = creep.harvest(source);

  switch (result) {
    case OK:
      return false;

    case ERR_NOT_IN_RANGE:
      throw Error('Mining creep is not adjacent to a source.');
      return false;

    case ERR_INVALID_TARGET:
      throw Error('The target is not a valid source object.');

    case ERR_NO_BODYPART:
      throw Error('There are no WORK body parts in this creep’s body.');

    case ERR_NOT_ENOUGH_RESOURCES:
      return false;

    default:
      throw Error(`Case for result ${result} is not implemented`);
  }
};

MineTask.prototype.serialize = function() {
  return {
    creepId: this.creepId,
    sourceId: this.sourceId,
    containerId: this.containerId
  };
};

module.exports = MineTask;
