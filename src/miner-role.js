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

  //  Five tiers
  //  Final tier can mine:
  //  - 10 energy per tick
  //  - a source of 3000 in 300 ticks
  addTier([WORK, MOVE]);
  addTier([WORK, WORK, MOVE]);
  addTier([WORK, WORK, WORK, MOVE]);
  addTier([WORK, WORK, WORK, WORK, MOVE]);
  addTier([WORK, WORK, WORK, WORK, WORK, MOVE]);

  return {
    getBestTier
  };
})();
