const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function repairProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.REPAIR) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy === creep.carryCapacity
      );
    }
  });

  const targets = room.find(FIND_STRUCTURES, {
    filter: function(structure) {
      return structure.hits < structure.hitsMax;
    }
  });

  if (targets.length) {
    const target = targets[0];

    idleCreeps.forEach(function(creep) {
      // console.log(`Creep ${creep.name} assigned to task REPAIR.`);

      creep.setTaskId(TaskId.REPAIR);

      TaskManager.createTask(TaskId.REPAIR, {
        creepId: creep.id,
        targetId: target.id
      });
    });
  }
}

module.exports = {
  execute: repairProcess
};
