/**
 * The middlwares will execute exactly in the order presented below
 * configuration of each middleware is done via API at endpoints / config / *
 * @param {AsyncFunc} Log - Responsible for storing information at the request entry
 * @param {AsyncFunc} Limiter - Responsible for limiting usage based on configured rules
 * @param {AsyncFunc} Cache - Responsible for responding with the information cache if necessary 
 * @param {Func} NotFound - Handles document errors not found 
 * @param {Func} ErroHandler - Handles Unexpected Mistakes  
*/

const log           =  require('./log');
const limiter       =  require('./limiter');
const cache         =  require('./cache');
const notFound      =  require('./notFound');
const errorHandler  =  require('./errorHandler');

module.exports = {log, limiter, cache, errorHandler, notFound}