// scheme-model
const db = require('../data/db-config');

module.exports = {

//GET /api/schemes/
  find(){
    return db('schemes');
  },


  
// GET /api/schemes/:id
  async findById(id){
    // return db('schemes')
    //   .where('id',id);

    const foundScheme = await db('schemes').where('id', id);

    if (foundScheme) {
      return db('schemes').where('id', id).first();
    }else{
      return Promise.resolve(null);
    }
  },

//GET /api/schemes/:id/steps
  async findSteps(id){

    const foundScheme = await db('schemes').where('id', id);

    if (foundScheme) {
      return (
        db('steps')
          .join('schemes', 'schemes.id', 'steps.scheme_id')
          .where('schemes.id', id)
          .orderBy('steps.step_number')
      );
    }else{
      return Promise.resolve(null);
    }
  },



  add(scheme){},
  update(changes,id){},
  remove(id){}
  
};