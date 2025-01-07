import fitness from '../assets/images/fitness.jpg'
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Authentication = ({ setIsUser, isUser }) => {
    const navigate = useNavigate();
    if (isUser) {
        navigate('/dashboard');
        window.location.href = '/dashboard';
        return null; // Prevent rendering if user is already logged in. This will prevent unnecessary re-renders.  // This line of code will navigate to the dashboard page if the user is already logged in.  // The isUser prop will be passed from the parent component (App.jsx) and used to check if the user is logged in.  // If the user is logged in, the component will not render and the user will be redirected to the dashboard page.  // This prevents unnecessary re-renders of the component.  // The useNavigate hook is used to navigate to a different route.  // The navigate function takes a string as an argument, which represents the path to navigate to.  // In this case, it navigates to the dashboard page.  // The return statement prevents the component from rendering and returns null.  // This ensures that the component is not rendered if the user is already logged in.  // The isUser prop is
    }
    const [isLogin, setIsLogin] = useState(false)
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