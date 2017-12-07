const MinerRole = require('./miner-role');
const NameGenerator = require('./name-generator');
const RolePrefix = require('./role-prefix');
const WorkerRole = require('./worker-role');

function getCreepCounts() {
  const creepNames = Object.keys(Game.creeps);

  const creepCounts = {
    [RolePrefix.HAULER]: 0,
    [RolePrefix.MINER]: 0,
    [RolePrefix.WORKER]: 0
  };

  creepNames.forEach(function(creepName) {
    const prefix = creepName.substring(0, 4);
    ++creepCounts[prefix];
  });

  return creepCounts;
}

function spawnProcess(room) {
  const creepCounts = getCreepCounts();

  // console.log(JSON.stringify(creepCounts));

  const spawn = Game.spawns.Spawn1;

  const sourceCount = room.find(FIND_SOURCES).length;

  if (creepCounts[RolePrefix.MINER] < sourceCount) {
    const containers = room.find(FIND_STRUCTURES, {
      filter: { structureType: STRUCTURE_CONTAINER }
    });

    //  TODO: Checks that there is a miner for each container AFTER checking if
    //  there is a miner for each source, but doesn't consider if any of those
    //  containers is NOT for a source (i.e. for storage near a controller)
    if (creepCounts[RolePrefix.MINER] < containers.length) {
      //  Get best tier available at current room capacity
      const bestTier = MinerRole.getBestTier(room.energyCapacityAvailable);


      if (bestTier.cost <= room.energyAvailable) {
        spawn.spawnCreep(
          bestTier.body,
          NameGenerator.generateName(RolePrefix.MINER)
        );
      }
    }
  }

  if (creepCounts[RolePrefix.WORKER] < 4) {
    //  Get best tier available at current room capacity
    const bestTier = WorkerRole.getBestTier(room.energyCapacityAvailable);

    if (bestTier.cost <= room.energyAvailable) {
      spawn.spawnCreep(
        bestTier.body,
        NameGenerator.generateName(RolePrefix.WORKER)
      );
    }
  }
}

module.exports = {
  execute: spawnProcess
};
