const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function withdrawProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.WITHDRAW) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy < creep.carryCapacity
      );
    }
  });

  const sources = room.find(FIND_STRUCTURES, {
    filter: function(structure) {
      return (
        structure.structureType === STRUCTURE_CONTAINER &&
        structure.store.energy > 0
      );
    }
  });

  const source = sources[0];

  if (!source) {
    return;
  }

  idleCreeps.forEach(function(creep) {
    // console.log(`Creep ${creep.name} assigned to task WITHDRAW.`);

    creep.setTaskId(TaskId.WITHDRAW);
    TaskManager.createTask(TaskId.WITHDRAW, {
      creepId: creep.id,
      sourceId: source.id
    });
  });
}

module.exports = {
  execute: withdrawProcess
};
