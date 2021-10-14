# Changes
- [x] [Set `self.process.env = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L12-L14)
- [x] [Set `self.window = self` at runtime](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L21-L25)
- [x] [Pass fetch to `QuirrelClient` constructor](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/client.ts#L7)
- [x] [Remove `credentials: ‘omit’` from fetch requests](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/client.ts#L11-L12)
- [x] [Worktop’s `request` object does not use `IncomingHttpHeaders` object](https://github.com/tiltcamp/worktop-quirrel/blob/b7dbacaa8b7a5927a3455007690314da21b0f14c/src/index.ts#L109)
- [ ] Polyfill `secure-webhooks`'s `crypto` requirements: https://github.com/quirrel-dev/secure-webhooks/blob/1354d0bcee05026c46651f7e497284c2b2e37357/src/index.ts#L1
