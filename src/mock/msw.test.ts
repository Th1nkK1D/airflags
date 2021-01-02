import fetch from 'node-fetch';
import { mockedData, server } from './msw';

beforeAll(() => server.listen());
afterAll(() => server.close());

test('Msw should return mocked airtable response', async () => {
  const data = await (
    await fetch('https://api.airtable.com/v0/someBase/someTable')
  ).json();

  expect(data).toStrictEqual(mockedData);
});
