import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const mockedData = {
  records: [
    {
      id: 'recG4cbwUVQqO9Tj8',
      fields: {
        Name: 'featureA',
        Development: true,
      },
      createdTime: '2021-01-02T11:15:01.000Z',
    },
    {
      id: 'rec8tuqHpn9uDGyre',
      fields: {
        Name: 'featureB',
        Development: true,
        Production: true,
      },
      createdTime: '2021-01-02T11:15:01.000Z',
    },
  ],
  offset: 'rec8tuqHpn9uDGyre',
};

export const server = setupServer(
  rest.get(
    'https://api.airtable.com/v0/:baseId/:tableName',
    (req, res, ctx) => {
      return res(ctx.json(mockedData));
    }
  )
);
