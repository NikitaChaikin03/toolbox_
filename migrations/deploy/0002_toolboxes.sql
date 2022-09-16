-- Deploy toolbox:0002_toolboxes to pg

BEGIN;

CREATE TABLE IF NOT EXISTS toolboxes (
  id                                        SERIAL,
  created_at                                TIMESTAMP NOT NULL,
  name                                      VARCHAR NOT NULL,
  updated_at                                TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(name)
);

COMMIT;
