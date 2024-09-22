import React, { useRef, useState } from 'react'
import { Link, parsePath, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import Container from './container/Container';
import { showAlert, hideAlert } from '../store/alertSlice';
import Footer from './footer/Footer';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    authService.dispatch = dispatch;

    const { register, handleSubmit, formState: { errors } } = useForm();     // used to register and submit input data
    
    const [showPassword, setshowPassword] = useState(false);
    const [submitted, setsubmitted] = useState(false);

    const loading = useSelector((state) => state.auth.loading)
    const userData = useSelector((state) => state.auth.userData)

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const loginAccount = async (data) => {
        const { email, password } = data;
        try {
            dispatch(showAlert({
                message: "Logging In",
                type: "loading"
            }));
            const userLogin = await authService.login(email, password);
            if (userLogin) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login({ userData: user }));
                    navigate('/')
                    dispatch(showAlert({
                        message: "You are logged in",
                        type: "success"
                    }));
                }
            } else {
                dispatch(showAlert({
                    message: "Login Failed . Try again",
                    type: "warning"
                }));
            }
        } catch (error) {
            dispatch(showAlert({
                message: error.message,
                type: "error"
            }));
        }
        finally {
            setsubmitted(true);
        };
    }

    return (
        <Container className={"flex flex-col"}>
            <div className='flex items-center justify-center bg-cover bg-center bg-no-repeat h-[90vh]' style={{ backgroundImage: "url('/loginBg.svg')" }}>

                <form onSubmit={handleSubmit(loginAccount)} className='bg-gray-800 p-3 rounded-xl sm:rounded-3xl h-100 w-100'>
                    {/* Registering input fields on hookform */}
                    <Input label="Email" type="email" className="p-2 border-transparent border-4 focus:border-blue-400" ref={emailRef} {...register("email", { required: true })} />
                    {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

                    <div className='relative'>
                        <button type='button' onClick={() => {setshowPassword((prev) => !prev);}} className='text-red-600 font-extrabold absolute top-0 right-2'> {showPassword ? 'hide' : 'show'}</button>

                        <Input label="Password" type={showPassword ? "text" : "password"} className="p-2 border-transparent border-4 focus:border-blue-400" ref={passwordRef} {...register("password", {
                            required: true,
                            minLength: {
                                value: 8, message: "must be atleast of 8 characters"
                            }, maxLength: {
                                value: 25, message: "must be atmost of 25 characters"
                            }
                        })} />
                    </div>
                    {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

                    <div className='flex flex-col justify-between items-center py-3 h-100'>
                        <Button type='submit' disabled={submitted} classname='mx-0' bgColor='bg-green-700'>Log in</Button>
                        <p className='mt-3'>
                            Don&apos;t have any account?&nbsp;
                            <Link to="/signup" className=' text-blue-500 underline'>Sign up</Link>
                        </p>
                    </div>
                </form>

            </div>
            <Footer />
        </Container >
    )
}

export default Login
