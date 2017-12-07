function deleteExpiredCreepMemory() {
  //  Get a random creep name from Memory
  const creepNames = Object.keys(Memory.creeps);
  const creepIndex = Math.floor(Math.random() * creepNames.length);
  const creepName = creepNames[creepIndex];

  //  Delete memory for creep if it expired
  if (!(creepName in Game.creeps)) {
    // console.log(`Deleted memory for expired creep ${creepName}.`);
    delete Memory.creeps[creepName];
  }
}

function collect() {
  deleteExpiredCreepMemory();
}

module.exports = {
  collect
};
