function dropProcess(room) {
  const expiringCreeps = room.find(FIND_MY_CREEPS, {
    filter: function(creep) {
      return (
        !creep.spawning &&
        creep.ticksToLive < 5 &&
        creep.carryCapacity > 0 &&
        creep.carry.energy > 0
      );
    }
  });

  expiringCreeps.forEach(function(creep) {
    const energy = creep.carry.energy;
    // console.log(
    //   `Creep ${creep.name} dropped ${energy} energy before expiration.`
    // );
    creep.drop(RESOURCE_ENERGY);
  });
}

module.exports = {
  execute: dropProcess
};
