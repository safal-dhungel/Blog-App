import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container'
import { PostForm } from '../components';
import { useDispatch } from 'react-redux';

const EditPost = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  appwriteService.dispatch = dispatch ;

  const [post, setpost] = useState(null);

  useEffect(() => {
    if (param) {
      appwriteService.getPost(param?.postId).then((post) => {
        if (post) {
          setpost(post);
        }
        else {
          navigate('/all-posts');
        }
      })
    }
  }, [param?.postId])

  return (
    <div className='bg-primary'>
      <Container>
        <PostForm post={post}></PostForm>
      </Container>
    </div>
  )
}

export default EditPost