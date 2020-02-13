'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var router = _express2.default.Router();

  router.route('/').get(getAllIntercom, returnResponse).post(_isvalid.validate.body(_model.schema), createIntercom, returnResponse).delete(clearIntercom, returnResponse);

  router.route('/:id').all(getOneTodo).get(returnResponse).patch(patchTodo, returnResponse).delete(deleteTodo, returnResponse);

  async function getAllIntercom(req, res, next) {
    res.locals.intercom = await _db2.default.all(intercomTable).catch(function (err) {
      return next(err);
    });
    next();
  }

  async function clearIntercom(req, res, next) {
    var rows = await _db2.default.clear(intercomTable).catch(function (err) {
      return next(err);
    });
    res.locals.intercom = rows;
    res.status(204);
    next();
  }

  async function createIntercom(req, res, next) {
    if (req.body.order) {
      req.body.position = req.body.order;
      delete req.body.order;
    }
    var intercom = await _db2.default.create(intercomTable, req.body).catch(function (err) {
      return next(err);
    });
    res.locals.intercom = intercom[0];
    res.status(201);
    next();
  }

  async function getOneIntercom(req, res, next) {
    var todo = await _db2.default.getById('intercom', req.params.id).catch(function (err) {
      return next(err);
    });
    res.locals.intercom = intercom && intercom[0];
    if (!res.locals.intercom) {
      return next(new _expressSimpleErrors.errors.NotFound('This intercom does not exist'));
    }
    next();
  }

  async function patchIntercom(req, res, next) {
    var intercom = Object.assign({}, res.locals.intercom[0], req.body);
    if (intercom.order) {
      intercom.position = intercom.order;
      delete intercom.order;
    }

    var updatedIntercom = await _db2.default.update(intercomTable, req.params.id, intercom).catch(function (err) {
      return next(err);
    });
    res.locals.intercom = updatedIntercom[0];
    next();
  }

  async function deleteIntercom(req, res, next) {
    res.locals.intercom = await _db2.default.deleteById(intercomTable, req.params.id).catch(function (err) {
      return next(err);
    });
    res.status(204);
    next();
  }

  function returnResponse(req, res) {
    // handle no responses here
    res.locals.baseUrl = req.protocol + '://' + req.get('host');
    res.json((0, _model2.default)(res.locals));
  }

  return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _isvalid = require('isvalid');

var _expressSimpleErrors = require('express-simple-errors');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intercomTable = 'intercom'; // eslint-disable-line no-unused-variables
//# sourceMappingURL=routes.js.map