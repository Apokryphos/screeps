const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function upgradeProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.UPGRADE) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy === creep.carryCapacity
      );
    }
  });

  idleCreeps.forEach(function(creep) {
    // console.log(`Creep ${creep.name} assigned to task UPGRADE.`);

    creep.setTaskId(TaskId.UPGRADE);
    TaskManager.createTask(TaskId.UPGRADE, {
      creepId: creep.id,
      targetId: room.controller.id
    });
  });
}

module.exports = {
  execute: upgradeProcess
};
