// export * from './module';
import qs from 'qs';
import {history} from 'umi';

export interface CommonQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

class QueryParams<T> {

  typeMapping: Record<string, 'boolean' | 'number'> = {};

  constructor(typeMapping: Record<string, 'boolean' | 'number'> = {}) {
    this.typeMapping = typeMapping;
  }

  getQuery(): Partial<T> {
    try {
      const urlComponents = window.location.href.split('?');
      if (urlComponents.length > 1) {
        const queries = qs.parse(urlComponents[1]) as Record<string, any>
        Object.keys(this.typeMapping).forEach((key) => {
          const type = this.typeMapping[key];
          const value = queries[key];
          if (type === 'boolean') {
            switch (value.toLowerCase()) {
              case 'true':
              case '1':
                queries[key] = true;
                break;
              case 'false':
              case '0':
                queries[key] = false;
                break;
              default:
                break;
            }
          } else if (type === 'number') {
            if (typeof value === 'string') {
              queries[key] = Number(value);
            }
          }
        });
        return queries as unknown as T;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    return {} as T;
  }

  updateQuery(query: Partial<T>, fullReplace = false) {
    if (fullReplace) {
      history.push({
        query: query as any,
      });
    } else {
      const current = this.getQuery();
      const newQuery = {...current, ...query} as any;
      history.push({query: newQuery});
    }
  }
}

export default QueryParams;
