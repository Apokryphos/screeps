module.exports = (function() {
  const json = Memory.nameGenerator || [];
  const creepNamesMap = new Map(json);

  function generateName(prefix) {
    let id = creepNamesMap.get(prefix) + 1 || 1;
    creepNamesMap.set(prefix, id);
    return prefix + id;
  }

  function serialize() {
    const array = Array.from(creepNamesMap);
    Memory.nameGenerator = array;
  }

  return {
    generateName,
    serialize
  };
})();
