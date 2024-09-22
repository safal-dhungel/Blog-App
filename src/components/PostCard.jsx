import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import parse from 'html-react-parser'
import Loading from './Loading.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/alertSlice.js'
import { removePost } from '../store/postSlice.js'

const PostCard = ({
  $id, title, featuredImage, status, userId 
}) => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  appwriteService.dispatch = dispatch ;
  const [showOption, setshowOption] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData ? userId === userData.$id : false;

  const deletePost = () => {
    setloading(true);
    
    //remove post from database
    appwriteService.deletePost($id).then((status) => {
      if (status) {
        const deleted = appwriteService.deleteFile(featuredImage);
        if (deleted) {
          dispatch(showAlert({
            message: "Post has been Deleted",
            type: "success"
          }));
        } else {
          dispatch(showAlert({
            message: "Post Img was not Deleted",
            type: "error"
          }));
        }
      } else {
        dispatch(showAlert({
          message: "Post was not Deleted",
          type: "error"
        }));
      }
      setloading(false);

      //remove post from store
      dispatch(removePost($id)); 
    })
  }

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!e.target.closest(`.class${$id}`)) {
        setshowOption(false);
      } else {
        setshowOption((prev) => !prev);
      }
    }
    document.addEventListener("click", handleOutClick);

    return () => {
      document.removeEventListener("click", handleOutClick);
    }
  })

  return (
    <div className='relative hover:opacity-70 transition duration-300 rounded-3xl overflow-x-hidden'>

      {
        loading &&
        <div className='w-full h-full backdrop-blur-md rounded-2xl absolute z-[100] flex flex-col items-center justify-center gap-4'>
          <div className='bg-gray-900 p-3  rounded-2xl flex justify-center items-center flex-col'>
            <Loading className='w-[50px] h-[50px]' img='w-full h-full' />
            <p className='font-bold tetx-3xl '>Deleting...</p>
          </div>
        </div>
      }
      <div className='bg-gray-900 overflow-hidden rounded-3xl'>
        <div className={`${"class"+$id} status ${status === "active" ? 'bg-green-400' : "bg-red-600"} text-black p-4 flex justify-center items-center border-black border-[3px] rounded-full absolute top-1 right-1 z-[99]`}>
        </div>

        {
          isAuthor &&
          
          <div className={`absolute list-none right-0 top-12 py-2 rounded-l-2xl bg-gray-900 cursor-pointer overflow-hidden duration-300 ${showOption ? '' : 'transform translate-x-[100%] opacity-0'}`}>

            <Link to={`/edit-post/${$id}`} className='hover:bg-gray-500 duration-300 px-5 py-1 flex justify-center text-lg'>
              Edit
            </Link>
            <button onClick={deletePost} className='hover:bg-gray-500 duration-300 px-5 py-1 flex justify-center text-lg'>
              Delete
            </button>
          </div>
        }
        <Link to={`/post/${$id}`}>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full min-h-[150px] max-h-[300px] sm:min-h-[250px] sm:max-h-[400px] xl:h-auto sm:object-contain object-cover sm:object-center' />
          <div className='p-3 pt-1'>
            <div className='font-bold text-xl break-words line-clamp-1 overflow-hidden text-ellipsis'>{title}</div>
          </div>
        </Link>
      </div>
    </div >

  )
}

export default PostCard

