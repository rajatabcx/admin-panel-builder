dasboard will be per table

so each dashboard is like wwe are managing team from that specific table and
all, we are searching for that one table only, views are for that one table

if we add one more table, we will add one more dashboard, which will be
accesible from the sidebar

people can creae either table or card or graph from a specific query, that they
can arrange , when they create a view, it will be empty, whenver they opne a
view it it will be refreshed, and they will also have the otion to edit and
refresh a card to see current data card type will be graph or table or card

a database dashboard willl have normally settings for managing access and search
or chat for nlq

a outer dahsboard will ahve home with all the db connected, ad teacm to manage
team,it wont be side bar, it will be hear option

```json
{
  "table_catalog": "postgres",
  "table_schema": "public",
  "table_name": "courses",
  "column_name": "id",
  "ordinal_position": 1,
  "column_default": "gen_random_uuid()",
  "is_nullable": "NO",
  "data_type": "uuid",
  "character_maximum_length": null,
  "character_octet_length": null,
  "numeric_precision": null,
  "numeric_precision_radix": null,
  "numeric_scale": null,
  "datetime_precision": null,
  "interval_type": null,
  "interval_precision": null,
  "character_set_catalog": null,
  "character_set_schema": null,
  "character_set_name": null,
  "collation_catalog": null,
  "collation_schema": null,
  "collation_name": null,
  "domain_catalog": null,
  "domain_schema": null,
  "domain_name": null,
  "udt_catalog": "postgres",
  "udt_schema": "pg_catalog",
  "udt_name": "uuid",
  "scope_catalog": null,
  "scope_schema": null,
  "scope_name": null,
  "maximum_cardinality": null,
  "dtd_identifier": "1",
  "is_self_referencing": "NO",
  "is_identity": "NO",
  "identity_generation": null,
  "identity_start": null,
  "identity_increment": null,
  "identity_maximum": null,
  "identity_minimum": null,
  "identity_cycle": "NO",
  "is_generated": "NEVER",
  "generation_expression": null,
  "is_updatable": "YES"
}
```

````js

arr.map((row) => ({
          tableName: row.table_name,
          columnName: row.column_name,
          columnType: row.udt_name,
          isNullable: row.is_nullable,
          isPrimaryKey: row.is_primary_key,
          isUnique: row.is_unique,
          isForeignKey: row.is_foreign_key,
          ...(row.is_foreign_key && {
            foreign_key_reference: {
              table: row.referenced_table,
              column: row.referenced_column,
            },
          }),
        }))```
````

<!-- generate sql query -->

<!-- OR use full text search with the to_tsvector and to_tsquery functions, if possible. -->

Which products don't have a review? also which products has he lowest review,
what is the rating and whats the review and who left that lowest rating, give me
the user details list of all the products from high to low price in electronics
category
