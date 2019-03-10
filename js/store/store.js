var Redux = require("redux");
var boardReducer = require("../reducers/reducer");
var Redux = require("redux");
var thunk = require("redux-thunk");
var cloneDeep = require("lodash.clonedeep");
const applyMiddleware = require("redux").applyMiddleware;


const rootReducer = boardReducer(true);
const Store = Redux.createStore(rootReducer,applyMiddleware(thunk));

module.exports = Store;
