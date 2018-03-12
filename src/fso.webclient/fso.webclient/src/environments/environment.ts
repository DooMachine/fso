// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serviceUrls: {
    Base: 'http://192.168.1.67:7000/',
    Notification: 'http://192.168.1.67:6900/',
    Statics: 'http://192.168.1.67:6900/',
    AppMedia: 'http://192.168.1.67:7100/'
  },
  httpErrors: {
    0:   { 'msg': 'Server is not available'},
    404: { 'msg': 'Page not Found'},
    401: { 'msg': 'Not Authorized'}
  },
  placeHolderImages:{
    user: 'http://cdn.localhost/fimg/u/f_default/230x230.jpeg',
    collection:'http://cdn.localhost/fimg/c/f_default/500x600.jpeg'
  },
  userProfileImageTemplate:'http://cdn.localhost/fimg/u/{#appUserId}/230x230.jpeg'
};
