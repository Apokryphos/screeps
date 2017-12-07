const RolePrefix = require('./role-prefix');

function containerInUseByMiner(container) {
  const creeps = container.pos.lookFor(LOOK_CREEPS);

  if (creeps.length) {
    return creeps.some(function(creep) {
      return creep.name.startsWith(RolePrefix.MINER);
    });
  }

  return false;
}

module.exports = {
  containerInUseByMiner
};
