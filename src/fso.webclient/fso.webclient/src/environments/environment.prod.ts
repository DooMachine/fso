
export const environment = {
  production: true,
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
  defaultImageUrls:{
    user: 'http://192.168.1.67:7100/fimg/u/${#appUserId}/230x230.jpeg'
  },
  placeHolderImages:{
    user: 'http://192.168.1.67:7100/fimg/u/f_default/230x230.jpeg',
    collection:'http://192.168.1.67:7100/fimg/c/f_default/500x600.jpeg'
  },
  userProfileImageTemplate:'http://192.168.1.67:7100/fimg/u/{#appUserId}/230x230.jpeg'
};
