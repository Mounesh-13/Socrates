export interface WikipediaSummary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}

export async function fetchWikipediaSummary(title: string): Promise<WikipediaSummary> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia summary for ${title}`);
  }
  return response.json();
}

export async function fetchWikipediaContent(title: string): Promise<string> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text&origin=*`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia content for ${title}`);
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.info);
  }
  return data.parse.text['*'];
}
