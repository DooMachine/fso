
export const environment = {
  production: true,
  serviceUrls: {
    Base: 'http://api.localhost/',
    Notification: 'http://ntf.localhost/',
    Statics: 'http://192.168.1.67:6900/',
    AppMedia: 'http://cdn.localhost/'
  },
  httpErrors: {
    0:   { 'msg': 'Server is not available'},
    404: { 'msg': 'Page not Found'},
    401: { 'msg': 'Not Authorized'}
  },
  defaultImageUrls:{
    user: 'http://cdn.localhost/fimg/u/${#appUserId}/230x230.jpeg'
  },
  placeHolderImages:{
    user: 'http://cdn.localhost/fimg/u/f_default/230x230.jpeg',
    collection:'http://cdn.localhost/fimg/c/f_default/500x600.jpeg'
  },
  userProfileImageTemplate:'http://cdn.localhost.com/fimg/u/{#appUserId}/230x230.jpeg'
};
