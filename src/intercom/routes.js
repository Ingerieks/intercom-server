import express from 'express';
import { validate } from 'isvalid';
import { errors } from 'express-simple-errors';
import transformResponse, { schema } from './model'; // eslint-disable-line no-unused-variables
import db from '../db';
const intercomTable = 'intercom';

export default function ()  {
  const router = express.Router();

  router.route('/')
    .get(getAllIntercom, returnResponse)
    .post(validate.body(schema), createIntercom, returnResponse)
    .delete(clearIntercom, returnResponse);

  router.route('/:id')
    .all(getOneTodo)
    .get(returnResponse)
    .patch(patchTodo, returnResponse)
    .delete(deleteTodo, returnResponse);

  async function getAllIntercom(req, res, next) {
    res.locals.intercom = await db.all(intercomTable)
    .catch((err) => next(err));
    next();
  }

  async function clearIntercom(req, res, next) {
    const rows = await db.clear(intercomTable)
    .catch((err) => next(err));
    res.locals.intercom = rows;
    res.status(204);
    next();
  }

  async function createIntercom(req, res, next) {
    if (req.body.order) {
      req.body.position = req.body.order;
      delete req.body.order;
    }
    const intercom = await db.create(intercomTable, req.body)
    .catch((err) => next(err));
    res.locals.intercom = intercom[0];
    res.status(201);
    next();
  }

  async function getOneIntercom(req, res, next) {
    const todo = await db.getById('intercom', req.params.id)
    .catch((err) => next(err));
    res.locals.intercom = intercom && intercom[0];
    if (!res.locals.intercom) {
      return next(new errors.NotFound('This intercom does not exist'));
    }
    next();
  }

  async function patchIntercom(req, res, next) {
    const intercom = Object.assign({}, res.locals.intercom[0], req.body);
    if (intercom.order) {
      intercom.position = intercom.order;
      delete intercom.order;
    }

    const updatedIntercom = await db.update(intercomTable, req.params.id, intercom)
    .catch((err) => next(err));
    res.locals.intercom = updatedIntercom[0];
    next();
  }

  async function deleteIntercom(req, res, next) {
    res.locals.intercom = await db.deleteById(intercomTable, req.params.id)
    .catch((err) => next(err));
    res.status(204);
    next();
  }

  function returnResponse(req, res) {
    // handle no responses here
    res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(transformResponse(res.locals));
  }

  return router;
}
