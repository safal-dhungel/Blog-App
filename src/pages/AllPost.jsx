import React, { useEffect, useState } from 'react';
import Container from '../components/container/Container';
import { Loading, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postsAction.js';

const AllPost = () => {
  const posts = useSelector((state)=>state.posts.postList);
  const loadingPosts = useSelector((state)=>state.posts.loadingPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  },[dispatch]);

  useEffect(() => {
    dispatch(fetchPosts(dispatch))
  },[]);
  

  const renderContent = () => {
    if (loadingPosts) {
      return (
        <div className='w-full h-full bg-secondary flex justify-center items-center'>
          <Loading />
        </div>
      );
    } else if (posts.length === 0) {
      return (
        <div className='text-3xl font-bold w-full h-full flex justify-center items-center'>
          No Posts Right Now
        </div>
      );
    } else {
      return (
        <div className="w-full gap-2 space-y-2 columns-2 ss:columns-3 ms:columns-4 lg:columns-5">
          {posts.map((post) => (
            <div key={post.$id} className="">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Container className={'p-2'}>
      {renderContent()}
    </Container>
  );
};

export default AllPost;
