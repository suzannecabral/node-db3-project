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

// POST /api/schemes
  async add(scheme){
    //insert
    const [id] = await db('schemes').insert(scheme);
    //return new obj (from db)
    return db('schemes').where('schemes.id', id).first();
  },
  
  // PUT /api/schemes:id
  async update(changes,id){
    await db('schemes').where('schemes.id', id).update(changes);

    return db('schemes').where('schemes.id', id).first();

  },

  // DELETE /api/schemes/:id
  async remove(id){
    const foundScheme = await db('schemes').where('id', id);
    if(!foundScheme){return Promise.resolve(null)}
    else{
      await db('schemes').where('schemes.id', id).del();
      return Promise.resolve(foundScheme);
    }
  },


  // POST /api/schemes/:id/addStep
  async addStep(step, scheme_id){
    //make sure scheme exists
    const foundScheme = await db('schemes').where('schemes.id', scheme_id);

    //return null if no matching scheme found
    if(!foundScheme){return Promise.resolve(null)}else{
      
      //insert step
      const [id] = await db('steps').insert(step);

      //return step
      return db('steps').where('steps.id',id).first();
    }
  },
} 