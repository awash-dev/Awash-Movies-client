import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supbase";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;

      alert("Check your email for verification link");
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      setError((error as Error).message);
      alert((error as Error).message);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[90%] md:w-[400px] p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-gray-600">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="p-3 bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer text-white text-lg text-center transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600">
          Already have an account?
          <Link to="/" className="underline text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}