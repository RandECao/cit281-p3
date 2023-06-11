function validDenomination(coin) {
    const denominations = [1, 5, 10, 25, 50, 100];
    return denominations.indexOf(coin) !== -1;
  }

function valueFromCoinObject(obj) {
// extracting denom and count from obj
    const { denom = 0, count = 0 } = obj;
    //returns value
    return denom * count;
  }

  function valueFromArray(arr) {
    // calls the flat method on the arr parameter to flatten any nested arrays of coin objects into a single array
    const flattenArr = arr.flat();
    //summing up the values of all the coins in the arr
    return flattenArr.reduce((acc, coin) => acc + valueFromCoinObject(coin), 0);
  }

  function coinCount(...coinage) {
    return valueFromArray(coinage);
  }
  //export coinCount
  module.exports = { coinCount };

  //testing code
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit
  
  