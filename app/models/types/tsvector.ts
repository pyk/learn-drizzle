import { ColumnBuilderConfig, ColumnConfig } from "drizzle-orm";
import {
    AnyPgTable,
    PgColumn,
    PgColumnBuilder,
    PgColumnBuilderHKT,
    PgColumnHKT,
} from "drizzle-orm/pg-core";

export interface PgTSVectorConfig {
    sources?: string[];
}

export class PgTSVectorBuilder<
    TData extends string = string
> extends PgColumnBuilder<
    PgColumnBuilderHKT,
    ColumnBuilderConfig<{ data: TData; driverParam: string }>,
    { sources: string[] | undefined }
> {
    protected $pgColumnBuilderBrand: string = "PgTSVectorBuilder";

    constructor(name: string, config: PgTSVectorConfig) {
        super(name);
        this.config.sources = config.sources;
    }

    build<TTableName extends string>(
        table: AnyPgTable<{ name: TTableName }>
    ): PgTSVector<TTableName, TData> {
        return new PgTSVector(table, this.config);
    }
}

export class PgTSVector<
    TTableName extends string,
    TData extends string
> extends PgColumn<
    PgColumnHKT,
    ColumnConfig<{ tableName: TTableName; data: TData; driverParam: string }>,
    { sources: string[] | undefined }
> {
    constructor(
        table: AnyPgTable<{ name: TTableName }>,
        builder: PgTSVectorBuilder<TData>["config"]
    ) {
        super(table, builder);
    }

    getSQLType(): string {
        return this.config.sources === undefined
            ? `tsvector`
            : `tsvector generated always as (to_tsvector('english', ${this.config.sources.join(
                  " || ' ' || "
              )})) stored`;
    }
}

export function tsvector<TName extends string>(
    name: string,
    config: PgTSVectorConfig = {}
): PgTSVectorBuilder<TName> {
    return new PgTSVectorBuilder(name, config);
}
