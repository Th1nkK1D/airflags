import fetch from 'node-fetch';

interface AirtableRecord {
  id: string;
  fields: {
    Name: string;
  } & {
    [environment: string]: boolean;
  };
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

export interface AirtableConfig {
  baseId: string;
  tableName: string;
  apiKey: string;
}

export const fetchAirtableRecords = async ({
  baseId,
  tableName,
  apiKey,
}: AirtableConfig): Promise<AirtableResponse> =>
  (
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
  ).json();
