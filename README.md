This package is currently a work-in-progress and should not be used.

# Changes
- [x] [Set `self.process.env = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L12-L14)
- [x] [Set `self.window = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L21-L25)
- [x] [Pass fetch to `QuirrelClient` constructor](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/client.ts#L7)
- [x] [Remove `credentials: ‘omit’` from fetch requests](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/client.ts#L11-L12)
- [x] [Worktop’s `request` object does not use `IncomingHttpHeaders` object](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L109)
- [x] [Patch `secure-webhooks` dependency to use `webcrypto` instead of Node `crypto`](https://github.com/tiltcamp/worktop-quirrel/commits/main/patches/secure-webhooks%2B0.3.0.patch) 

# Example Usage
```typescript
import { Router, Handler } from 'worktop';
import * as Cache from 'worktop/cache';
import { Queue } from 'worktop-quirrel';

const API = new Router();

const ExampleJob = new Queue<Record<string, string>>(
  'job/call',
  (object) => {
    console.log("Job run!");
    console.log(object);

    return Promise.resolve();
  }
);

ExampleJob.addToRouter(API);
API.add('GET', '/job/trigger', async (request, response) => {
  await ExampleJob.enqueue({ "example": "payload" }, { delay: 2000 });
  response.send(200);
});

Cache.listen(API.run.bind(this));
```
