import {
  SanityImageSource,
  SanityImageObject,
  SanityAsset,
} from '@sanity/image-url/lib/types/types';

export interface ISanityUserDoc {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export const getUser = (response: any): ISanityUserDoc => {
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

  const user: ISanityUserDoc = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  return user;
};

export const getSanityImageUrl = (image: SanityImageSource) => {
  const imageObj: SanityImageObject = image as SanityImageObject;
  const asset: SanityAsset = imageObj.asset as SanityAsset;
  return asset.url;
};
