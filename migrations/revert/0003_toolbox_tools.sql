-- Revert toolbox:0003_toolbox_tools from pg

BEGIN;

DROP TABLE IF EXISTS toolbox_tools CASCADE;

COMMIT;
