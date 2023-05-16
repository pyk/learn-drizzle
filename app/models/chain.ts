import { pgTable, integer, text, index } from "drizzle-orm/pg-core";
import { InferModel, sql } from "drizzle-orm";

import { tsvector } from "./types/tsvector";

export const chains = pgTable("chains", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),

    dexsCount: integer("dexs_count").notNull(),
    poolsCount: integer("pools_count").notNull(),
    tokensCount: integer("tokens_count").notNull(),

    // Full text search
    fts: tsvector("fts", { sources: ["name"] }),
});

// Full text search index
export type Chain = InferModel<typeof chains>;
