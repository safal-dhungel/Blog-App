import { useForm } from 'react-hook-form';   //Using hookForm to reduce no.of states
import React, { useState, useEffect, useId } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import appwriteService from '../../appwrite/config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../container/Container';
import Loading from '../Loading';
import { showAlert } from '../../store/alertSlice'
import { showInfoAlert } from '../../store/infoAlertSlice';

// This component serves fo{r both adding new posts and updating existing ones.
// If `post` is provided, it means an existing post is being updated.
// If `post` is not provided, it indicates a new post is being added.

const PostForm = ({ post }) => {
    const dispatch = useDispatch();
    appwriteService.dispatch = dispatch;
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Using the useForm hook to handle form state and validation.
    const { register, handleSubmit, setValue, watch, control, formState: { errors }, } = useForm();

    const submit = async (data) => {
        try {
            setloading(true);
            // If `post` exists, update the existing post.
            if (post) {
                dispatch(showAlert({
                    message: "Updating Post",
                    type: "loading"
                }));

                const file = data.featuredImage[0] ?
                    await appwriteService.uploadFile(data.featuredImage[0]) :
                    null;     // upload new image with unique id

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);      // delete old image of unique id
                };

                const dbPost = await appwriteService.updatePost({
                    ...data,
                    postId: post.$id,
                    // if image was changed , update featuredImage else make it undefined 
                    featuredImage: file ? file.$id : undefined     // updating `$id` to link to new image
                });

                if (dbPost) {
                    setloading(false);
                    dispatch(showAlert({
                        message: "Post Updated",
                        type: "success"
                    }));
                    navigate(`/post/${dbPost.$id}`);          // go to updated post , if updated to database
                } else {
                    setloading(false);
                    dispatch(showAlert({
                        message: "Failed to Update Post",
                        type: "warning"
                    }));
                };
            }
            // If `post` doesn't exist, create a new post.
            else {
                dispatch(showAlert({
                    message: "Adding Post",
                    type: "loading"
                }))
                const file = await appwriteService.uploadFile(data.featuredImage[0]);         // upload image with unique id

                if (file) {
                    data.featuredImage = file.$id;          // adding `$id` to link to image
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    });       // upload new `post` in database    

                    if (dbPost) {
                        setloading(false);
                        dispatch(showAlert({
                            message: "New Post Added",
                            type: "success"
                        }));
                        navigate(`/post/${dbPost.$id}`)       // go to newly added post , if added to database
                    } else {
                        setloading(false);
                        dispatch(showAlert({
                            message: "Failed to Add New Post",
                            type: "warning"
                        }));
                    }
                }
            }
            setloading(false)
        } catch (error) {
            setloading(false)
            dispatch(showAlert({
                message: error.message,
                type: "error"
            }));
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (post) {
            setValue("title", post.title);
            setValue("postId", post.$id);
            setValue("content", post.content);
            setValue("status", post.status);
            //if image was not changed , it won't be changed in database as well
            // if image was changed , we will add featuredImage in hook-form & upload it 
        }
    }, [post]);


    // OPTIONAL CODE FOR setting value of postId when change in title

    // useEffect(() => {
    //     // Runs every time there is changes in the hookForm's registered value ,
    //     watch((value, { name }) => {
    //         // if "title" field was changed, update the "postId" field accordingly.
    //         if (name === 'title') {
    //             setValue("postId", postIdFormat(value.title), { shouldValidate: true });
    //         }
    //     });
    // }, [watch, setValue]); // Re-run the effect when `watch`, `postId`, or `setValue` changes. // not neccessary i think

    return (
        <Container className="">
            <div className='relative h-full w-full'>

                {loading &&
                    <div className='absolute w-full h-full z-[99] bg-black opacity-80'>
                        <Loading />
                    </div>
                }

                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-2 h-full sm:flex-row p-2">
                    <div className='flex flex-col justify-start h-full w-full sm:w-2/3'>
                        <div className='h-full w-full flex gap-2 flex-col ss:flex-row'>
                            <div className=' h-full w-full flex flex-col'>
                                <span className='text-red-600'>Title {errors.title && errors.title.message}</span>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    defaultvalues={post?.title || ''}
                                    {...register("title", {
                                        required: true,
                                        minLength: {
                                            value: 3, message: "must be atleast of 3 characters"
                                        }, maxLength: {
                                            value: 255, message: "must be atmost of 255 characters"
                                        }
                                    })}

                                />
                            </div>
                        </div>

                        <div className='flex flex-col h-full w-full'>
                            <span className='text-red-600'>Content {errors.content && errors.content.message}</span>
                            <textarea
                                cols="30"
                                rows="19"
                                className='text-white p-2 rounded-xl h-full bg-gray-700 border-4 border-transparent focus:border-blue-400 resize-none'
                                name="content"
                                defaultvalues={post?.content || ""}
                                {...register("content", {
                                    required: true,
                                    minLength: {
                                        value: 3, message: "must be atleast of characters"
                                    }, maxLength: {
                                        value: 100000, message: "must be atmost of 100000 characters"
                                    }
                                })}
                            ></textarea>

                        </div>
                    </div>

                    <div className=' flex sm:flex-col flex-col gap-2 w-full justify-between sm:w-1/3 h-full pb-2'>
                        <div className='gap-2 flex flex-col'>

                            <div className="flex flex-col">
                                <span className='text-red-600'>Image {errors.featuredImage && errors.featuredImage.message}</span>
                                <Input
                                    type="file"
                                    {...register("featuredImage", {
                                        required: {
                                            value: !post,
                                            message: "must be choosen"
                                        }
                                    })}
                                    defaultvaluess={post?.featuredImage || null}
                                    accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Choose"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                />
                            </div>
                            <div className='bg-black w-full flex flex-col gap-2 rounded-lg'>
                                {
                                    post ?
                                        (
                                            <img src={previewImage || appwriteService.getFilePreview(post?.featuredImage)} className='min-h-[380px] max-h-[380px] ' alt="Preview" style={{ objectFit: 'contain', objectPosition: "center" }} />
                                        )

                                        :

                                        previewImage ?
                                            (
                                                <img src={previewImage} alt="Preview" className=' min-h-[380px] max-h-[380px] ' style={{ objectFit: 'contain', objectPosition: "center" }} />

                                            ) :
                                            (
                                                <p className='text-xl font-bold min-h-[380px] max-h-[380px] flex justify-center items-center'>Image Preview</p>

                                            )
                                }
                            </div>
                            <Select
                                className="p-2 border-4 border-transparent focus:border-blue-400"
                                options={["active", "inactive"]}
                                defaultvalues={post?.status || "active"}
                                {...register("status", { required: true })}
                            />
                        </div>

                        <Button type='submit' classname={`bg-blue-500 p-2 `}  >
                            {post ? "Update" : "Add as New"}
                        </Button>

                    </div>
                </form>
            </div>
        </Container>
    );
};

export default PostForm;