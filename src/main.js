const CreepPrototype = require('./creep-prototype');
const GarbageCollection = require('./garbage-collection');
const NameGenerator = require('./name-generator');
const ProcessManager = require('./process-manager');

// console.log('Scripts reloaded.');

function loop() {
  ProcessManager.execute();

  ProcessManager.serialize();
  NameGenerator.serialize();

  GarbageCollection.collect();
}

module.exports = {
  loop
};
