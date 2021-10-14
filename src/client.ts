import { QuirrelClient as _QuirrelClient } from 'quirrel/client';

export type CreateQuirrelClientArgs = ConstructorParameters<typeof _QuirrelClient>;
export class QuirrelClient<Payload> extends _QuirrelClient<Payload> {
  constructor(...args: CreateQuirrelClientArgs) {
    /*
      Without explicitly passing `fetch`, `cross-fetch` raises an error about XMLHttpRequest not being found
     */
    if (!args[0].fetch) args[0].fetch = (...fetchArgs: Parameters<typeof fetch>) => {
      /*
       Workers raises `The 'credentials' field on 'RequestInitializerDict' is not implemented.` if we don't drop the
       "credentials" argument
       */
      if (fetchArgs[1]?.credentials) fetchArgs[1].credentials = undefined;

      return self.fetch(...fetchArgs);
    };

    super(...args);
  }
}
