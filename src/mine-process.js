const ContainerUtil = require('./container-util');
const RolePrefix = require('./role-prefix');
const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function mineProcess(room) {
  const minerCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        !creep.hasTask(TaskId.MINE) &&
        creep.name.startsWith(RolePrefix.MINER)
      );
    }
  });

  if (!minerCreeps.length) {
    return;
  }

  const containers = room.find(FIND_STRUCTURES, {
    filter: function(structure) {
      if (structure.structureType === STRUCTURE_CONTAINER) {
        return !ContainerUtil.containerInUseByMiner(structure);
      }

      return false;
    }
  });

  if (!containers.length) {
    return;
  }

  let m = 0;
  for (let c = 0; c < containers.length; ++c) {
    const container = containers[c];

    const source = container.pos.findInRange(FIND_SOURCES_ACTIVE, 1)[0];

    if (!source) {
      continue;
    }

    const creep = minerCreeps[m++];

    creep.setTaskId(TaskId.MINE);

    TaskManager.createTask(TaskId.MINE, {
      creepId: creep.id,
      sourceId: source.id,
      containerId: container.id
    });

    console.log(`Creep ${creep.name} assigned to task MINE.`);

    if (m === minerCreeps.length) {
      break;
    }
  }
}

module.exports = {
  execute: mineProcess
};
