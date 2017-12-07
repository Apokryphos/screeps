const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function buildProcess(room) {
  const idleCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.BUILD) &&
        creep.carryCapacity > 0 &&
        creep.carry.energy === creep.carryCapacity
      );
    }
  });

  const targets = room.find(FIND_MY_CONSTRUCTION_SITES);

  if (targets.length) {
    const target = targets[0];

    idleCreeps.forEach(function(creep) {
      // console.log(`Creep ${creep.name} assigned to task BUILD.`);

      creep.setTaskId(TaskId.BUILD);

      TaskManager.createTask(TaskId.BUILD, {
        creepId: creep.id,
        targetId: target.id
      });
    });
  }
}

module.exports = {
  execute: buildProcess
};
