function randomArrayItem(arr = []) {
  return arr[Math.floor((Math.random()*arr.length))];
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


module.exports = { 
  randomArrayItem,
  onlyUnique
}