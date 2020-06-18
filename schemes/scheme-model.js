const db = require('../data/dbConfig');

module.exports = {
    find,
    findById, 
    findSteps,
    add, 
    update, 
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    // first() returns the first entry in the db matching the query
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('steps').join('schemes', 'steps.scheme_id', '=', 'schemes.id')
                      .select('steps.id', 'scheme_name', 'step_number', 'instructions')
                      .where('schemes.id', id)
                      .orderBy('step_number');
}

async function add(scheme) {
    const [id] = await db('schemes').insert(scheme);

    return db('schemes').where({ id }).first();
}


function update(changes, id) {
    return db('schemes').where({ id }).update(changes);
}


function remove(id) {
    return db('schemes').where({ id }).del();
}


