import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import Container from './container/Container';
import { showAlert, hideAlert } from '../store/alertSlice';
import { Footer } from '../components'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    authService.dispatch = dispatch;

    const { register, handleSubmit, formState: { errors } } = useForm();     // used to register and submit input data
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setshowPassword] = useState(false);
    const [submitted, setsubmitted] = useState(false);
    const user = useSelector((state) => state.auth.userSignUp);

    const submit = async (data) => {
        setsubmitted(true);
        try {
            dispatch(showAlert({
                message: "Signing Up",
                type: "loading"
            }));
            const userSignUp = await authService.createAccount(data);
            if (userSignUp) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login({ userData: user }));
                    navigate('/')
                    dispatch(showAlert({
                        message: "You are signed in",
                        type: "success"
                    }));
                }
            } else {
                dispatch(showAlert({
                    message: "SignUp Failed . Try again",
                    type: "warning"
                }));
            }
        } catch (error) {
            dispatch(showAlert({
                message: error.message,
                type: "error"
            }));
        } finally {
            setsubmitted(true);
        }
    }

    return (
        <Container className={'flex flex-col justify-between'}>
            <div className='flex items-center justify-center bg-cover bg-center bg-no-repeat h-[90vh]' style={{ backgroundImage: "url('/signupBg.svg')" }}>
                <form onSubmit={handleSubmit(submit)} className='bg-gray-800 p-3 rounded-xl sm:rounded-3xl h-100 w-100 relative'>
                    {/* Registering input fields on hookform */}
                    <Input label="User Name" type="text" className="p-2 border-transparent border-4 focus:border-blue-400" ref={userNameRef} {...register("username", {
                        required: true,
                        minLength: {
                            value: 3, message: "must be atleast of 3 characters"
                        }, maxLength: {
                            value: 25, message: "must be atmost of 25 characters"
                        }
                    })} />
                    {errors.username && <span className='text-red-600'>{errors.username.message}</span>}

                    <Input label="Email" type="email" className="p-2 border-transparent border-4 focus:border-blue-400" ref={emailRef} {...register("email", { required: true })} />
                    {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                    <div className='relative'>
                        <button type='button' onClick={() => { setshowPassword((prev) => !prev); passwordRef.current.focus() }} className='text-red-600 font-extrabold absolute top-0 right-2'> {showPassword ? 'hide' : 'show'}</button>
                        <Input label="Password" type={showPassword ? "text" : "password"} className="p-2 border-transparent border-4 focus:border-blue-400" ref={passwordRef} {...register("password", {
                            required: true,
                            minLength: {
                                value: 8, message: "must be atleast of 8 characters"
                            }, maxLength: {
                                value: 25, message: "must be atmost of 25 characters"
                            }
                        })} />
                    </div>
                    {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                    <div className='flex flex-col justify-between items-center py-3'>
                        <Button type='submit' disabled={submitted} classname='mx-0' bgColor='bg-green-700'>Sign up</Button>
                        <p className='mt-3'>
                            Already have an account ?&nbsp;
                            <Link to="/login" className=' text-blue-500 underline'>Log in</Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </Container >
    )
}

export default Signup
