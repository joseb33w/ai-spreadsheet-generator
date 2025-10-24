export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface SpreadsheetData {
  type: 'spreadsheet';
  data: Record<string, any>[];
  message: string;
}

export interface ChatResponse {
  response: SpreadsheetData | { type: 'message'; content: string };
  message: string;
}

export interface ColumnDef {
  field: string;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  editable?: boolean;
  width?: number;
}
