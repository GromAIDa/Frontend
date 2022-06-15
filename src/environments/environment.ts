// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  NETWORK: "rinkeby",
  AUTHORIZATION: '0x08d6GE71A953ad57BY5IRQ75d7I8KP9A036431Z2V4A4EABA7MNZ887f2E961K19I262b02978',
  ADDRESS: '0xfBfeC468f464fdb05E4B3963222b56559fA2d94a',
  CONTRACT_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  API_URL: 'http://localhost:3000',
  METAMASK_LINK: 'https://metamask.io/',
  METAMASK_ERRORS: {
    notInstalled: 'ERROR.METAMASK__NOT__INSTALLED',
    needUserPermission: 'ERROR.NEED__USER__PERMISSION',
    failedToRetrieveGasPrice: 'ERROR.FAILED__RETRIEVING__GAS__PRICE',
  },
  CURRENCY: "usd",
  SUCCESS_URL: "http://localhost:4200/?payment=success",
  CANCEL_URL: "http://localhost:4200/?payment=cancel"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
