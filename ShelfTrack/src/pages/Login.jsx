import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/AuthServices/authAxios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Invalid email or password");
      } else {
        toast.error("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Background.jpg')",
      }}
    >
      <div className="fixed inset-0 bg-black/30"></div>

      <div
        className="
          relative z-10
          w-full
          max-w-md
          p-6
          sm:p-8
          rounded-2xl
          border border-white/30
          bg-white/20
          backdrop-blur-md
          shadow-2xl
        "
      >
        <div className="text-center mb-7">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            ShelfTrack
          </h1>

          <p className="mt-2 text-sm sm:text-base text-white/80">
            Manage your books easily
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              className={`
                w-full
                px-4
                py-3
                rounded-lg
                bg-white/20
                border
                ${errors.email ? "border-red-400" : "border-white/30"}
                text-white
                placeholder-white/60
                outline-none
                focus:bg-white/25
                focus:border-white
                transition
              `}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-300">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`
                  w-full
                  px-4
                  py-3
                  pr-20
                  rounded-lg
                  bg-white/20
                  border
                  ${errors.password ? "border-red-400" : "border-white/30"}
                  text-white
                  placeholder-white/60
                  outline-none
                  focus:bg-white/25
                  focus:border-white
                  transition
                `}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-white/80
                  hover:text-white
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-300">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-blue-600/90
              hover:bg-blue-700
              active:scale-[0.98]
              text-white
              font-semibold
              transition
              disabled:bg-gray-500/70
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-white/70 mt-6">
          © {new Date().getFullYear()} ShelfTrack
        </p>
      </div>
    </div>
  );
}

export default Login;
