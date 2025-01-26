import fitness from '../assets/images/fitness.jpg'
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
const Authentication = ({ setIsUser, isUser }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);  // For loading spinner visibility

    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (isUser) {
            navigate('/dashboard');


        } else setIsLoading(false);
    })
    if (isLoading) {
        console.log("isLoading is called!s")
        return <Loader />
    }



    return <div className="h-[100vh] w-full flex">
        <div className="w-1/2 hidden sm:block">
            <img className="h-full w-full object-cover" src={fitness}></img>
        </div>
        <div className='w-full sm:w-1/2 flex justify-center items-center'>
            {isLogin ?
                <div className='h-full w-full flex items-center justify-center flex-col gap-2'>
                    <Login setIsUser={setIsUser} />
                    <div className='flex gap-3 text-black'>
                        <p className=''>Don't Have an account sign in?</p>
                        <p className='text-blue-500 cursor-pointer' onClick={() => setIsLogin(false)}>SignUp</p>
                    </div>
                </div>

                : <div className='h-full w-full flex items-center justify-center flex-col gap-2'>
                    <Signup setIsUser={setIsUser} />
                    <div className='flex gap-3 text-black'>

                        <p>Already Have an account signIn?</p>
                        <p className='text-blue-500 cursor-pointer' onClick={() => setIsLogin(true)}>SignIn</p>
                    </div>
                </div>}

        </div>

    </div >
}
export default Authentication;