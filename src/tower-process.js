const ContainerUtil = require('./container-util');
const RolePrefix = require('./role-prefix');
const TaskId = require('./task-id');
const TaskManager = require('./task-manager');

function towerProcess(room) {
  const foes = room.find(FIND_HOSTILE_CREEPS);

  if (!foes.length) {
    return;
  }

  const towers = room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER }
  });

  towers.forEach(function(tower) {
    tower.attack(foes[0]);
  });
}

module.exports = {
  execute: towerProcess
};
