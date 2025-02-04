import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supbase";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      console.log(data);
      const accessToken = data.session.access_token;
      console.log("Access Token:", accessToken);

      navigate("/home");
    } catch (error) {
      setError((error as Error).message);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[90%] md:w-[400px] p-6 bg-white shadow-lg rounded-lg">
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
            required
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
            required
            minLength={6}
          />
        </div>

        <div className="text-right mb-4">
          <Link to="/reset-pass" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className={`p-3 ${loading ? 'bg-gray-400' : 'bg-blue-500'} rounded-md hover:bg-blue-600 cursor-pointer text-white text-lg text-center transition-all duration-300`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?
          <Link to="/sign-up" className="underline text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
