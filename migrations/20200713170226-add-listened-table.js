'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('listened', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: { type: 'int' },
    track_id: { type: 'int' },
    created_at: { type: 'timestamp'}
  });
};

exports.down = function(db) {
  return db.dropTable('listened');
};

exports._meta = {
  "version": 1
};
