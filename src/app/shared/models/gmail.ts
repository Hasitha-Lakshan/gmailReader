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
  headers: Header[];
  body: Body2;
}

export interface Body2 {
  size: number;
  data: string;
}

export interface Message {
  id: string;
  threadId: string;
}

export interface Messages {
  messages: Message[];
  resultSizeEstimate: number;
}

export interface MappedGmail {
  id: string;
  threadId: string;
  snippet: string;
  headers: Header[];
}
