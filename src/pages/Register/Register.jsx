import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // React Router navigate function

  // State for form fields and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the Terms and Conditions";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", formData);

      // Simulate successful registration and navigate to Login page
      setTimeout(() => {
        navigate("/"); // Navigate to login page
      }, 1000);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="grid lg:grid-cols-2 items-center gap-8 max-w-7xl w-full">
          {/* Form Section */}
          <form
            className="lg:max-w-md w-full bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="text-gray-800 text-3xl font-extrabold mb-6">
              Create an Account
            </h3>
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-gray-100 w-full px-4 py-3 text-gray-800 rounded-lg outline-none transition-all ${
                    errors.name ? "border border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-100 w-full px-4 py-3 text-gray-800 rounded-lg outline-none transition-all ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-gray-100 w-full px-4 py-3 text-gray-800 rounded-lg outline-none transition-all ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Accept Terms */}
              <div className="flex items-center">
                <input
                  id="accept-terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="accept-terms"
                  className="ml-3 block text-sm text-gray-800"
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-white text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
              >
                Create Account
              </button>
            </div>

            {/* Redirect to Login */}
            <p className="text-sm text-gray-800 mt-4 text-center">
              Already have an account?
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline ml-1"
                onClick={() => navigate("/")}
              >
                Login here
              </a>
            </p>
          </form>

          {/* Image Section */}
          <div className="h-full">
            <img
              src="https://readymadeui.com/login-image.webp"
              alt="Registration"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
