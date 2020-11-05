// scheme-model
const db = require('../data/db-config');

module.exports = {
  find(){
    return db('schemes');
  },
  findById(id){},
  findSteps(id){},
  add(scheme){},
  update(changes,id){},
  remove(id){}
  
};