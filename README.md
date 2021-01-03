# Airflags

_\*This project is in early-development stage. All feedbacks and contributions are welcome!_

![Airtable as a JavaScript feature flags](https://i.imgur.com/QUsQn8p.png)

## Features

- Toggle flags via Airtable
- Support both Node.js and browser
- Flags are cached with the instance
- Written with TypeScript

## Installation

With npm

```bash
npm i airflags
```

or yarn

```bash
yarn add airflags
```

## Setup

### 1. Config Airtable

Create a table with following fields (columns)

1. **Name** as a first field with text type (representing flag name)
2. **Environment** fields as a Checkbox type (representing flag state in each environment)

![Airtable Config](https://i.imgur.com/CuSmNM0.png)

Flags can be toggled on/off by clicking the checkbox

### 2. Config Airflags

```typescript
import Airflags from 'airflags';

const airflags = new Airflags({
  environment: 'Development',
  baseId: 'AIRTABLE_BASE_ID',
  tableName: 'AIRTABLE_TABLE_NAME',
  apiKey: 'AIRTABLE_API_KEY',
});
```

**Airflags config:**

- environment: The corresponded environment field name in Airtable.
- baseId, tableName and apiKey are for Airtable API. More info can be found on [Airtable API doc](https://airtable.com/api)

## Usage

To get all flags from airflags instance, simply use:

**With async/await**

```typescript
const flags = await airflags.getFlags();
```

**With promise then**

```typescript
airflags.getFlags().then((flags) => {
  // Use flags
});
```

`getFlags` will return a Promise of Object containing each flag name with coresponded boolean value

```typescript
{
  featureA: true,
  featureB: true
}
```

**Note:** Airtable API will be called once on first `getFlags` called in each instance. Flags changes on Airtable after that won't have any effect.
