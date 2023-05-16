# Learn Drizzle

This is my personal notes on
[drizzle-orm](https://github.com/drizzle-team/drizzle-orm).

-   You can define the database schema in [multiple files](./app/models/).
-   You can automatically generate migration file using `drizzle-kit`. See
    `pnpm db:gen` for more details.
-   You can safely edit the generated SQL files in `database/migrations`, your
    file will not overwritten even tho there are changes in your database
    schema.
-   You can create empty migration files.
-   You can do anythin inside the generated SQL file such as, define additional
    indexes or install PostgreSQL extension.
