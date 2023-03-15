Array.prototype.all = function(){ return Promise.all(this) }
Array.prototype.any = function(){ return Promise.any(this) }
Array.prototype.race = function(){ return Promise.race(this) }