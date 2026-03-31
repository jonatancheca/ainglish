import type { StateTree } from 'pinia'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: boolean
  }
}
