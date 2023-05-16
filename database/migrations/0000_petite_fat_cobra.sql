CREATE TABLE IF NOT EXISTS "chains_dexs" (
	"id" text PRIMARY KEY NOT NULL,
	"chain_id" integer NOT NULL,
	"dex_id" text NOT NULL,
	"pools_count" integer NOT NULL,
	"tokens_count" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "chains" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dexs_count" integer NOT NULL,
	"pools_count" integer NOT NULL,
	"tokens_count" integer NOT NULL,
	"fts" tsvector generated always as (to_tsvector('english', name)) stored
);

CREATE TABLE IF NOT EXISTS "dexs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"chains_count" integer NOT NULL,
	"pools_count" integer NOT NULL,
	"tokens_count" integer NOT NULL,
	"fts" tsvector generated always as (to_tsvector('english', name)) stored
);

DO $$ BEGIN
 ALTER TABLE "chains_dexs" ADD CONSTRAINT "chains_dexs_chain_id_chains_id_fk" FOREIGN KEY ("chain_id") REFERENCES "chains"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "chains_dexs" ADD CONSTRAINT "chains_dexs_dex_id_dexs_id_fk" FOREIGN KEY ("dex_id") REFERENCES "dexs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "chains_fts" ON "chains" ("fts");