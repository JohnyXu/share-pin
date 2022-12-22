export interface SanityUserDoc {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export const getUser = (response: any): SanityUserDoc => {
  var base64Url = response.credential.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  const { name, picture, sub } = JSON.parse(jsonPayload);

  const user: SanityUserDoc = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  return user;
};
