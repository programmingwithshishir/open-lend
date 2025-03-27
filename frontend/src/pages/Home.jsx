import { Link } from "react-router-dom";
import student from "../assets/student.jpg";

export default function Home() {
  return (
    <div className="h-screen grid grid-cols-3">
        <div className="col-span-2 h-screen flex flex-col justify-center items-center bg-white">
        <h1 className="text-4xl font-bold text-primary mb-6">Welcome to Student Loan App</h1>
        <p className="text-lg text-gray-700 mb-4">Apply for hassle-free student loans with ease.</p>
        <Link to="/signup">
            <button className="px-6 py-3 hover:cursor-pointer bg-primary text-white text-lg font-semibold rounded-lg shadow-md hover:bg-primary-dark transition">
            Get Started
            </button>
        </Link>
        </div>
        <img src={student} alt="student" className="object-cover" />
    </div>
  );
}
