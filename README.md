# Airflags

_\*This project is in early-development stage. All feedbacks and contributions are welcome!_

![Airtable as a JavaScript feature flags](https://i.imgur.com/QUsQn8p.png)

## Features

- Toggle flags via Airtable
- Config and load once, access flags everywhere
- Support both Node.js and browser
- Written in TypeScript

## Why Airtable?

- Having a web UI
- API ready
- [Free plan](https://airtable.com/pricing) should be more than enough for feature flags

## Installation

With NPM

```bash
npm i airflags
```

or Yarn

```bash
yarn add airflags
```

## Setup Airtable

Create a table with following fields (columns)

1. **Name** as a first field with text type (representing flag name)
2. **Environment** fields as a Checkbox type (representing flag state in each environment)

![Airtable Config](https://i.imgur.com/CuSmNM0.png)

Flags can be toggled on/off by clicking the checkbox.

## Usage

```typescript
import Airflags from 'airflags';

// Config Airflags
Airflags.config({
  environment: 'Development',
  baseId: 'AIRTABLE_BASE_ID',
  tableName: 'AIRTABLE_TABLE_NAME',
  apiKey: 'AIRTABLE_API_KEY',
});

// Load flags from Airtable (asyncronous)
await Airflags.load();

// Get loaded feature flags
const flags = Airflags.getFlags();
```

**Config object**

- environment: The corresponded environment field name in Airtable.
- baseId, tableName and apiKey are for Airtable API. More info can be found on [Airtable API doc](https://airtable.com/api)

**Example of getFlags return value**

```typescript
{
  featureA: true,
  featureB: false
}
```

**Add type casting (optional)**

```typescript
type Feature = 'featureA' | 'featureB';
type FeatureFlags = Record<Feature, boolean>;

const flags: FeatureFlags = Airflags.getFlags();
```

**Airflags is a singleton**

- `Airflags` is a class with static methods and properties.
- Meaning that `config()` and `load()` methods are required to run atleast once. Then `getFlags()` can be called anywhere.
- However, `config()` and `load()` methods can be called anytime after when you want to change the config or reload the flags.
