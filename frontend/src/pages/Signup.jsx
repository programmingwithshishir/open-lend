import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
        console.log("Signed In")
    };
    return ( 
        <div className="bg-primary h-screen w-screen flex justify-center items-center">
            <div className="flex justify-center items-center h-screen">
                <button
                onClick={handleLogin}
                className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:cursor-pointer transition flex items-center gap-2"
                >
                <FaGoogle className="text-xl" />
                Sign in with Google
                </button>
            </div>
        </div>
    );
}
 
export default SignUp;