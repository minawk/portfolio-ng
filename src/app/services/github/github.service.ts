import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface GithubRepository {
  name: string;
  description: string | null;
  url: string;
}

@Service()
export class GithubService {
  readonly repositories = httpResource(
    () => ({
      url: 'https://api.github.com/search/repositories',
      params: { q: 'user:minawk sort:author-date-asc' },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-ng',
      },
      transferCache: true,
      timeout: 8000,
    }),
    { parse: parseRepositories },
  );
}

function parseRepositories(value: unknown): GithubRepository[] {
  if (typeof value !== 'object' || value === null) {
    return [];
  }

  const items = (value as Record<string, unknown>)['items'];
  if (!Array.isArray(items)) {
    return [];
  }

  return items.slice(0, 6).flatMap((item) => {
    if (typeof item !== 'object' || item === null) {
      return [];
    }

    const record = item as Record<string, unknown>;
    const name = record['name'];
    const url = record['html_url'];
    const description = record['description'];

    if (typeof name !== 'string' || typeof url !== 'string') {
      return [];
    }

    return [
      {
        name,
        url,
        description: typeof description === 'string' ? description : null,
      },
    ];
  });
}
