exports.a = 'jai shree ram'
exports.b = 'Jai hanuman'

exports.d = {'name':'newly modified code'}
exports.c="surprise"

//but when we initiate with module.exports  with an object all previous records will be overwritten 
module.exports = {'direct':'this assignment will discard all previous assignments'}

console.log(module)