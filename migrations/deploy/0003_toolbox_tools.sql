-- Deploy toolbox:0003_toolbox_tools to pg

BEGIN;

CREATE TABLE IF NOT EXISTS toolbox_tools (
  id                                        SERIAL,
  created_at                                TIMESTAMP NOT NULL,
  description                               TEXT NOT NULL,
  name                                      VARCHAR NOT NULL,
  toolbox_id                                INTEGER,
  updated_at                                TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  foreign key (toolbox_id) references toolboxes (id) on delete cascade
);

COMMIT;
