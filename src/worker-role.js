function getBodyCost(body) {
  return body.reduce(function(sum, part) {
    return sum + BODYPART_COST[part];
  }, 0);
}

module.exports = (function() {
  const tiers = [];

  function addTier(body) {
    tiers.push({
      cost: getBodyCost(body),
      body
    });
  }

  function getBestTier(budget) {
    let bestTier = null;

    for (let t = 0; t < tiers.length; ++t) {
      const tier = tiers[t];

      if (tier.cost <= budget) {
        bestTier = tier;
      }
    }

    return Object.assign({}, bestTier);
  }

  addTier([WORK, CARRY, MOVE]);
  addTier([WORK, WORK, CARRY, CARRY, MOVE, MOVE]);
  addTier([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);

  return {
    getBestTier
  };
})();
