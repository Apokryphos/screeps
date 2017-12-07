const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function transferProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.TRANSFER) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy === creep.carryCapacity
      );
    }
  });

  const targets = room.find(FIND_MY_STRUCTURES, {
    filter: function(structure) {
      return structure.energy < structure.energyCapacity;
    }
  });

  if (!targets.length) {
    return;
  }

  const target = targets[0];

  idleCreeps.forEach(function(creep) {
    // console.log(`Creep ${creep.name} assigned to task TRANSFER.`);

    creep.setTaskId(TaskId.TRANSFER);
    TaskManager.createTask(TaskId.TRANSFER, {
      creepId: creep.id,
      targetId: target.id
    });
  });
}

module.exports = {
  execute: transferProcess
};
