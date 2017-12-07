const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function harvestProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.HARVEST) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy < creep.carryCapacity
      );
    }
  });

  const sources = room.find(FIND_SOURCES_ACTIVE);

  const source = sources[0];

  if (!source) {
    return;
  }

  idleCreeps.forEach(function(creep) {
    // console.log(`Creep ${creep.name} assigned to task HARVEST.`);

    creep.setTaskId(TaskId.HARVEST);
    TaskManager.createTask(TaskId.HARVEST, {
      creepId: creep.id,
      sourceId: source.id
    });
  });
}

module.exports = {
  execute: harvestProcess
};
