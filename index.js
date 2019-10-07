

const categories = require('./data.json');

function compare(a, b) {
  if (a.start < b.start) {
    return -1;
  }
  else if (a.start > b.start) {
    return 1;
  }
  else {
    if (a.tier < b.tier) return -1;
    else if (a.tier > b.tier) return 1;
    return 0
  }
}
categories.sort(compare);

// here we find the tier it belongs (the parent)
// we check the full tier then we check previous ones
// ex: 123-456-789 if this is not the tier it belongs we move to 123-456
// in case of no tier we add to the root level.
const findTier = (tier) => {
  let tierSub = tier;
  while (tierSub.length >= minTier) {
    if (map.has(tierSub)) return map.get(tierSub);
    tierSub = tierSub.substring(0, tierSub.lastIndexOf('-'));
    
  }
  return null;
}

// in this map we keep track of parents
const map = new Map();
const results = [];
// with minTier we don't have to check for tiers that don't exist.
let minTier = categories[0].tier.length;

for(let i = 0; i < categories.length; i++){
  const element = categories[i];
  element.children = [];
  const ftier = findTier(element.tier);
  if(ftier != null){
    ftier.children.push(element);
    element.tier != ftier.tier? map.set(element.tier, element): 0;
  }
  else {    
    results.push(element);
    map.set(element.tier, element);
    element.tier.length < minTier? minTier = element.tier.length: minTier;  
  } 
}

const json = JSON.stringify(results);
console.log(json);
