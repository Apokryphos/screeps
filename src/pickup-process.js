function pickupProcess(room) {
  const droppedResources = room.find(FIND_DROPPED_RESOURCES);

  droppedResources.forEach(function(drop) {
    const creeps = drop.pos.findInRange(FIND_MY_CREEPS, 1, {
      filter: function(creep) {
        return creep.carry.energy < creep.carryCapacity;
      }
    });

    if (creeps.length) {
      creeps[0].pickup(drop);
    }
  });
}

module.exports = {
  execute: pickupProcess
};
