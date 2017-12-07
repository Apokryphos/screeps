Creep.prototype.clearTaskId = function() {
  delete this.memory.taskId;
};

Creep.prototype.getTaskId = function() {
  return this.memory.taskId;
};

Creep.prototype.hasActiveBodyParts = function(parts) {
  const self = this;
  return parts.every(function(part) {
    return self.getActiveBodyparts(part) > 0;
  });
};

Creep.prototype.hasTask = function() {
  return this.memory.taskId !== undefined;
};

Creep.prototype.setTaskId = function(taskId) {
  this.memory.taskId = taskId;
};
