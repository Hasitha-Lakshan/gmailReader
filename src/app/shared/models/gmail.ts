export interface Gmail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: Payload;
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}

export interface Payload {
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header[];
  body: Body;
  parts: Part[];
}

export interface Header {
  name: string;
  value: string;
}

export interface Body {
  size: number;
}

export interface Part {
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header2[];
  body: Body2;
}

export interface Header2 {
  name: string;
  value: string;
}

export interface Body2 {
  size: number;
  data: string;
}

export interface MappedGmail {
  id: string;
  threadId: string;
  snippet: string;
  headers: Header[];
}
