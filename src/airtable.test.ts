import { fetchAirtableRecords } from './airtable';
import { mockedData, server } from './mock/msw';

beforeAll(() => server.listen());
afterAll(() => server.close());

test('Msw should return mocked airtable response', async () => {
  const response = await fetchAirtableRecords({
    baseId: 'someBaseId',
    tableName: 'someTable',
    apiKey: 'apiKey',
  });

  expect(response).toStrictEqual(mockedData);
});
