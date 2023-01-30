const morrisons = require("./morrisons.js");

//morrisons.product("212432011");

//morrisons.search("bread");

(async () => {
  let sku = "446779011";
  let hash = await morrisons.imageHash(sku);
  morrisons.image(sku, hash);
})();
