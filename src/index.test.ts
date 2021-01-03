import { server } from './mock/msw';
import Airflags from '.';

beforeAll(() => server.listen());
afterAll(() => server.close());

const mockAirtableConfig = {
  baseId: 'someBase',
  tableName: 'someTable',
  apiKey: 'apiKey',
};
test('getFlags function should return correct development flags', async () => {
  const expectedFlags = {
    featureA: true,
    featureB: true,
  };

  const airflags = new Airflags({
    environment: 'Development',
    ...mockAirtableConfig,
  });

  const flags = await airflags.getFlags();

  expect(flags).toStrictEqual(expectedFlags);
});

test('getFlags function should return correct production flags', async () => {
  const expectedFlags = {
    featureA: false,
    featureB: true,
  };

  const airflags = new Airflags({
    environment: 'Production',
    ...mockAirtableConfig,
  });

  const flags = await airflags.getFlags();

  expect(flags).toStrictEqual(expectedFlags);
});
