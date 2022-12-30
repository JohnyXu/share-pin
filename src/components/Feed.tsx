import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

function Feed() {
  const [pins, setPins] = useState([]);
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />;
  }
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}{' '}
      {pins?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl my-3">
          No Pins Found!
        </div>
      )}
    </div>
  );
}

export default Feed;
