import React from 'react';
import Masonry from 'react-masonry-css';
import { Pin } from './Pin';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1600: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

export default function MasonryLayout({ pins }: any) {
  return (
    <Masonry
      className="flex animate-slide-fwd sm:justify-center sm:align-middle"
      breakpointCols={breakpointColumnsObj}
    >
      {pins?.map((pin: any) => (
        <Pin key={pin._id} pin={pin} />
      ))}

      {pins?.length === 0 && <div className="mt-10 text-center text-xl ">No Pins Found!</div>}
    </Masonry>
  );
}
