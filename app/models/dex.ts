import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

import { tsvector } from "./types/tsvector";

export const dexs = pgTable("dexs", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),

    chainsCount: integer("chains_count").notNull(),
    poolsCount: integer("pools_count").notNull(),
    tokensCount: integer("tokens_count").notNull(),

    // Full text search
    fts: tsvector("fts", { sources: ["name"] }),
});

export type Dex = InferModel<typeof dexs>;
