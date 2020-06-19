const db = require('../data/dbConfig');

// Exports all helper functions for use in the scheme-router
module.exports = {
    find,
    findById, 
    findSteps,
    add,
    addStep,
    update, 
    remove
}

// Returns all scheme objects
async function find() {
    return db('schemes');
}

// Returns the scheme object with the specified id
async function findById(id) {
    // first() returns the first entry in the db matching the query
    return db('schemes').where({ id }).first();
}

// Returns the steps in order for the scheme with the specified id
async function findSteps(id) {
    return db('steps').join('schemes', 'steps.scheme_id', '=', 'schemes.id')
                      .select('steps.id', 'scheme_name', 'step_number', 'instructions')
                      .where('schemes.id', id)
                      .orderBy('step_number');
}

// Adds a scheme object to the database
async function add(scheme) {
    const [id] = await db('schemes').insert(scheme);

    return db('schemes').where({ id }).first();
}

// (Stretch) Adds a step to a scheme
async function addStep(step, scheme_id) {
    const [id] = await db('steps').insert({ ...step, scheme_id: scheme_id })

    return db('steps').where({ id }).first();
}


// Updates a scheme object with the specified id
async function update(changes, id) {
    await db('schemes').update(changes).where('id', id);
    
    return db('schemes').where({ id }).first();
}

// Removes the scheme object with the specified id
async function remove(id) {
    return await db('schemes').where({ id }).del();
}


