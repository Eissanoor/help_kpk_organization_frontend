import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./loginApi"; // Import the login service
import Toast from '../../components/Toast'; // Import the Toast component

const Login = () => {
    const navigate = useNavigate(); // React Router navigate function
  // State for input fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await login(formData.email, formData.password);
        if (response.status === 200 && response.success) {
          const token = response.data.token;
          localStorage.setItem('authToken', token); // Save token to localStorage
          console.log("token--", token);
          
          console.log("Login successful:", response.message);
          navigate("/dashboard");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("Login error:", error.message);
        setErrors({ apiError: error.message });
        setToastMessage(error.message); // Display error in toast
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
      }
    }
  }
  function validateForm(email, password) {
    if (!email) {
        console.log("email is required.");
        return false;
    }
    if (!password) {
        console.log("Password is required.");
        return false;
    }
    return true;
  }

  // Example usage
  const email = ""; // or some input value
  const password = ""; // or some input value

  if (validateForm(email, password)) {
    console.log("Form is valid.");
  } else {
    console.log("Form is invalid.");
  }

  return (
    <div className="font-[sans-serif]">
      {/* Toast Notification */}
      <Toast message={toastMessage} visible={toastVisible} />

      <div className="min-h-screen flex items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          {/* Login Form */}
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              {/* email Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    className={`w-full text-sm text-gray-800 border px-4 py-3 rounded-lg outline-blue-600 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter user name"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    className={`w-full text-sm text-gray-800 border px-4 py-3 rounded-lg outline-blue-600 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 #183702 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                  {errors.rememberMe && (
                    <p className="text-red-500 text-xs mt-1">{errors.rememberMe}</p>
                  )}
                </div>

                <div className="text-sm">
                  <a href="javascript:void(0);" className="#183702 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-green-800 hover:bg-green-900 focus:outline-none"
                >
                  Log in
                </button>
              </div>

              {/* Register Link */}
              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account?
                <a  href="#"
                className="#183702 font-semibold hover:underline ml-1" onClick={() => navigate("/register")}>
                  Register here
                </a>
              </p>
            </form>
          </div>

          {/* Image */}
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Login Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
