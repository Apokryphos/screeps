const BuildTask = require('./build-task');
const HarvestTask = require('./harvest-task');
const MineTask = require('./mine-task');
const RepairTask = require('./repair-task');
const TransferTask = require('./transfer-task');
const TaskId = require('./task-id');
const UpgradeTask = require('./upgrade-task');
const WithdrawTask = require('./withdraw-task');

module.exports = (function() {
  function TaskManager() {
    this.tasksById = {};
  }

  TaskManager.prototype.createTask = function(taskId, options = {}) {
    let task = null;

    switch (taskId) {
      case TaskId.BUILD:
        task = new BuildTask(options);
        break;

      case TaskId.HARVEST:
        task = new HarvestTask(options);
        break;

      case TaskId.TRANSFER:
        task = new TransferTask(options);
        break;

      case TaskId.UPGRADE:
        task = new UpgradeTask(options);
        break;

      case TaskId.REPAIR:
        task = new RepairTask(options);
        break;

      case TaskId.MINE:
        task = new MineTask(options);
        break;

      case TaskId.WITHDRAW:
        task = new WithdrawTask(options);
        break;

      default:
        throw Error(`Case for task ID ${taskId} not implemented.`);
    }

    if (task === null) {
      throw Error('Task cannot be null.');
    }

    if (!this.tasksById[taskId]) {
      this.tasksById[taskId] = [];
    }

    // console.log(`Task ${taskId} created.`);

    this.tasksById[taskId].push(task);
  };

  TaskManager.prototype.deserialize = function() {
    this.tasksById = {};

    const tasksById = Memory.tasks || {};

    for (let taskId in tasksById) {
      const tasks = tasksById[taskId];

      tasks.forEach(json => {
        this.createTask(parseInt(taskId), json);
      });
    }
  };

  TaskManager.prototype.execute = function() {
    for (let taskId in this.tasksById) {
      this.tasksById[taskId].forEach(task => {
        if (task.execute()) {
          this.removeTask(task);
        }
      });
    }
  };

  TaskManager.prototype.removeTask = function(task) {
    const creep = Game.getObjectById(task.creepId);
    if (creep) {
      creep.clearTaskId();
    }

    this.tasksById[task.taskId] = this.tasksById[task.taskId].filter(function(
      t
    ) {
      return t !== task;
    });
  };

  TaskManager.prototype.serialize = function() {
    const tasks = {};

    for (let taskId in this.tasksById) {
      this.tasksById[taskId].forEach(function(task) {
        const json = task.serialize();

        if (!tasks[task.taskId]) {
          tasks[task.taskId] = [];
        }

        tasks[task.taskId].push(json);
      });
    }

    Memory.tasks = tasks;
  };

  return new TaskManager();
})();
