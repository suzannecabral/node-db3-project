// scheme-model
const db = require('../data/db-config');

module.exports = {
  find(){
    return db('schemes');
  },

  async findById(id){
    // return db('schemes')
    //   .where('id',id);

    const foundScheme = await db('schemes').where('id', id);

    if (foundScheme) {
      return db('schemes').where('id', id).first();
    }
      return Promise.resolve(null);
  },


  findSteps(id){},
  add(scheme){},
  update(changes,id){},
  remove(id){}
  
};