import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

import { chains } from "./chain";
import { dexs } from "./dex";

export const chainsDexs = pgTable("chains_dexs", {
    id: text("id").primaryKey(), // chainId-dexId
    chain: integer("chain_id")
        .notNull()
        .references(() => chains.id),
    dex: text("dex_id")
        .notNull()
        .references(() => dexs.id),

    // Dex info per Chain
    poolsCount: integer("pools_count").notNull(),
    tokensCount: integer("tokens_count").notNull(),
});

export type ChainDex = InferModel<typeof chainsDexs>;
