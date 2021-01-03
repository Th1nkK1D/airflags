import axios from 'axios';

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
}: AirtableConfig): Promise<AirtableResponse> => {
  const { data } = await axios.get(
    `https://api.airtable.com/v0/${baseId}/${tableName}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return data;
};
