const BuildProcess = require('./build-process');
const DropProcess = require('./drop-process');
const HarvestProcess = require('./harvest-process');
const MineProcess = require('./mine-process');
const PickupProcess = require('./pickup-process');
const TaskManager = require('./task-manager');
const TransferProcess = require('./transfer-process');
const RepairProcess = require('./repair-process');
const SpawnProcess = require('./spawn-process');
const TowerProcess = require('./tower-process');
const UpgradeProcess = require('./upgrade-process');
const WithdrawProcess = require('./withdraw-process');

module.exports = (function() {
  function ProcessManager() {
    TaskManager.deserialize();
  }

  ProcessManager.prototype.execute = function() {
    TaskManager.execute();

    const room = Game.rooms.sim;

    TowerProcess.execute(room);

    SpawnProcess.execute(room);
    PickupProcess.execute(room);
    MineProcess.execute(room);
    WithdrawProcess.execute(room);
    HarvestProcess.execute(room);
    TransferProcess.execute(room);
    BuildProcess.execute(room);
    RepairProcess.execute(room);
    UpgradeProcess.execute(room);
    DropProcess.execute(room);

    // console.log(`${Game.time}: ${Game.cpu.getUsed().toFixed(2)} BUCKET:${Game.cpu.bucket}`);
  };

  ProcessManager.prototype.serialize = function() {
    TaskManager.serialize();
  };

  return new ProcessManager();
})();
