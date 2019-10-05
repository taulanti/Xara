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

const findTier = (tier) => {
  let tierSub = tier;
  while (tierSub.length > 0) {
    if (map.has(tierSub)) return map.get(tierSub);
    tierSub = tierSub.substring(0, tierSub.lastIndexOf('-'));
    
  }
  return null;
}

const map = new Map();
const results = [];

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
  } 
}

const json = JSON.stringify(results);
console.log(json);