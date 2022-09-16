-- Revert toolbox:0002_toolboxes from pg

BEGIN;

DROP TABLE IF EXISTS toolboxes CASCADE;

COMMIT;
