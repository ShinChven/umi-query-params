# Umijs 3 Query Params

> A query params modifier for Umijs 3
> - TypeScript support
> - Convert query params' type from `string` to `number` or `boolean`.

## Install

Grab the index.ts file and put it in your Umijs 3 project.

## Usage

```ts
/**
 * Define type for query params
 */
type QueryType = CommonQueryParams & {
  category_id?: number;
}

const queryParams = new QueryParams<QueryType>(
  {page: 'number', category_id: 'number'} // Mapping query params' type
);

// Get query params with type converted
const {
  page, // converted to number
  search, // string, not converted
} = queryParams.getQuery(); // Get query params

// update given fields in query string
queryParams.updateQuery({page: 1, category_id: 1});

// replace the whole query string.
queryParams.updateQuery({page: 1}, true);
```
