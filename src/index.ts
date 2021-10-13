import { IncomingHttpHeaders } from 'http';
import { Handler, Router } from 'worktop';
import { QuirrelClient } from './client';
import {
  DefaultJobOptions,
  EnqueueJobOptions,
  Job,
  QuirrelJobHandler
} from 'quirrel/client';

/*
  Without defining `process`, Workers will raise `process is not defined`.
  Seems to be required by Quirrel's `client/config`. Example:
  https://github.com/quirrel-dev/quirrel/blob/265a5aad3c3a5b97265d9c4eb5bf0806c87cfcfa/src/client/config.ts#L6
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
self.process.env = self;

/*
  Without defining `window`, Workers will raise `window is not defined`.
  Seems to be required by `secure-e2ee`'s call to `window.crypto.subtle`. Example:
  https://github.com/quirrel-dev/secure-e2ee/blob/master/src/browser-encryptor.ts#L15

  See the Cloudflare Workers docs for more info: https://developers.cloudflare.com/workers/runtime-apis/web-crypto
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
self.window = self;

class Queue<Payload> implements Omit<QuirrelClient<Payload>, "respondTo" | "makeRequest"> {
  private readonly quirrel: QuirrelClient<Payload>;

  constructor(
    public readonly route: string,
    handler: QuirrelJobHandler<Payload>,
    { defaultJobOptions, config }: {
      defaultJobOptions?: DefaultJobOptions,
      config?: ConstructorParameters<typeof QuirrelClient>[0]['config']
    } = {}
  ) {
    this.quirrel = new QuirrelClient<Payload>({
      /*
        The `ConstructorParameters` type in `./client.ts` doesn't handle the generic well so we have to cast to `unknown`.
        Would be resolved by `quirrel` exporting `CreateQuirrelClientArgs`. Also see https://stackoverflow.com/q/68415541
       */
      handler: handler as QuirrelJobHandler<unknown>,
      route,
      defaultJobOptions,
      config
    });
  }

  public addToRouter(API: Router): void {
    API.add('POST', `/${this.route}`, this.handler);
  }

  /**
   * Enqueues a job.
   */
  public enqueue = (payload: Payload, options: EnqueueJobOptions): Promise<Job<Payload>> =>
    this.quirrel.enqueue(payload, options);

  /**
   * Enqueues multiple jobs.
   */
  public enqueueMany = (jobs: { payload: Payload; options?: EnqueueJobOptions }[]): Promise<Job<Payload>[]> =>
    this.quirrel.enqueueMany(jobs);

  /**
   * Deletes a job, preventing it from executing.
   * @returns false if job could not be found.
   */
  public delete = (jobId: string): Promise<boolean> =>
    this.quirrel.delete(jobId);

  /**
   * Schedules a job for immediate execution.
   * @returns false if job could not be found.
   */
  public invoke = (jobId: string): Promise<boolean> => this.quirrel.invoke(jobId);

  /**
   * Iterates through scheduled jobs.
   * @example
   * for await (const jobs of queue.get()) {
   *   // do something
   * }
   */
  public get = (): AsyncGenerator<Job<Payload>[]> => this.quirrel.get();

  /**
   * Gets a specific job.
   * @returns null if no job was found.
   */
  public getById = (jobId: string): Promise<Job<Payload> | null> => this.quirrel.getById(jobId);

  private handler: Handler = async (request, response) => {
    const res = await this.quirrel.respondTo(await request.body.text(), this.headersToDict(request.headers));

    for (const [header, value] of Object.entries(res.headers)) {
      response.setHeader(header, value);
    }

    response.send(res.status, res.body);
  };

  /**
   * Worktop provides the `Headers` object, not `IncomingHttpHeaders` so we have to convert
   */
  private headersToDict(headers: Headers): IncomingHttpHeaders {
    const dict: IncomingHttpHeaders = {};

    headers.forEach((value, key) => dict[key] = value);

    return dict;
  }
}

export {
  Queue,
  Job,
  EnqueueJobOptions,
  DefaultJobOptions,
  QuirrelJobHandler,
};
