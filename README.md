# Changes
- [x] [Set `self.process.env = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/cc416ebcfaa59e61de35bc582af95e618571ef79/src/index.ts#L12-L14) 
  (untested but may solve environment variable issue)
- [x] [Set `self.window = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/main/src/index.ts#L21-L25)
- [x] [Pass fetch to `QuirrelClient` constructor](https://github.com/tiltcamp/worktop-quirrel/blob/cc416ebcfaa59e61de35bc582af95e618571ef79/src/client.ts#L6)
- [x] [Remove `credentials: ‘omit’` from fetch requests](https://github.com/tiltcamp/worktop-quirrel/blob/cc416ebcfaa59e61de35bc582af95e618571ef79/src/client.ts#L10-L11)
- [x] [Worktop’s `request` object does not use `IncomingHttpHeaders` object](https://github.com/tiltcamp/worktop-quirrel/blob/cc416ebcfaa59e61de35bc582af95e618571ef79/src/index.ts#L109)
- [ ] Polyfill `secure-webhooks`'s `crypto` requirements: https://github.com/quirrel-dev/secure-webhooks/blob/1354d0bcee05026c46651f7e497284c2b2e37357/src/index.ts#L1
