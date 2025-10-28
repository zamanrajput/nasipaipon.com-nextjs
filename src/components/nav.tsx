"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/NASI PAIPON.png";

type MenuItemNav = {
  name: string;
  url: string;
};

const TopNavBar = () => {
  const router = useRouter();
  const [cIndex, setCIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [isLoginView, setIsLoginView] = useState(true);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navItems: Array<MenuItemNav> = [
    { name: "HOME", url: "/" },
    { name: "TIMINGS", url: "/pages/timing" },
    // { name: "MENUS", url: "/pages/menus" },
    { name: "CONTACT", url: "/pages/contact" },
    { name: "ABOUT", url: "/pages/about" },
    { name: "PRIVACY", url: "/pages/privacy" },
  ];

  useEffect(() => {
    const url = location.href;
    navItems.forEach((e, i) => {
      if (url.includes(e.url) && !url.includes("download")) {
        setCIndex(i);
        return;
      }
    });
  }, []);

  const handleMenuItemClick = (index: number, url: string) => {
    setCIndex(index);
    router.push(url);
    setIsMobileMenuOpen(false);
  };

  // Form validation functions
  const validateLoginForm = () => {
    let isValid = true;
    const newErrors = { usernameOrEmail: "", password: "" };

    if (!loginForm.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required";
      isValid = false;
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setLoginErrors(newErrors);
    return isValid;
  };

  const validateRegisterForm = () => {
    let isValid = true;
    const newErrors = { usernameOrEmail: "", password: "" };

    if (!registerForm.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required";
      isValid = false;
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (registerForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setRegisterErrors(newErrors);
    return isValid;
  };

  // API call functions (to be implemented later)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // TODO: Implement actual API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(loginForm),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Login failed');
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      console.log("Login successful", loginForm);
      setPopoverOpen(false);
      // Reset form
      setLoginForm({ usernameOrEmail: "", password: "" });
    } catch (error) {
      // Handle API error
      setApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // TODO: Implement actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(registerForm),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || 'Registration failed');
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      console.log("Registration successful", registerForm);
      setPopoverOpen(false);
      // Reset form
      setRegisterForm({ usernameOrEmail: "", password: "" });
    } catch (error) {
      // Handle API error
      setApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <nav className="sm:visible hidden sm:flex justify-between px-12 overflow-hidden sm:fixed w-full items-center backdrop-blur-sm text-white z-[100]">
        <div
          onClick={() => {
            router.push("/");
            setCIndex(0);
          }}
          className="logo text-3xl font-extrabold logoclr cursor-pointer my-3"
        >
          <img width={250} src={logo.src} alt="" className="mb-2" />
        </div>
        <div className="flex gap-10">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url)}
              key={e.name}
              className={`cursor-pointer hover:font-bold w-12 ${
                cIndex == index
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="text-xl gap-3 flex">
          <button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
            }}
            className="px-4 py-2 bg-[#FE222E] text-white rounded-lg"
          >
            Download App
          </button>
          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="px-4 py-2 bg-[#FE222E] text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger and Side Nav */}
      <nav className="sm:hidden flex items-center justify-between px-4 backdrop-blur-sm absolute w-full z-[100]">
        <div
          className="cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
      </nav>

      {/* Mobile Side Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[150]`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold">
            <img width={250} src={logo.src} alt="" className="mb-2" />
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-6 px-6">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url)}
              key={e.name}
              className={`cursor-pointer hover:font-bold ${
                cIndex == index
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="px-6 mt-10">
          <button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
            }}
            className="px-4 py-2 bg-[#FE222E] text-white rounded-lg"
          >
            Download App
          </button>
        </div>
        <div className="px-6 mt-3">
          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="px-4 py-2 bg-[#FE222E] text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </div>

      {/* Login/Register Popover */}
      {popoverOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setPopoverOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="flex justify-center mb-6">
              <img width={200} src={logo.src} alt="" />
            </div>

            <div className="flex mb-6 border-b">
              <button
                className={`py-2 px-4 font-medium ${
                  isLoginView
                    ? "text-[#FE222E] border-b-2 border-[#FE222E]"
                    : "text-gray-500"
                }`}
                onClick={() => setIsLoginView(true)}
              >
                Login
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  !isLoginView
                    ? "text-[#FE222E] border-b-2 border-[#FE222E]"
                    : "text-gray-500"
                }`}
                onClick={() => setIsLoginView(false)}
              >
                Register
              </button>
            </div>

            {apiError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {apiError}
              </div>
            )}

            {isLoginView ? (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="login-username"
                    className="block text-gray-700 mb-2"
                  >
                    Username or Email
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md ${
                      loginErrors.usernameOrEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={loginForm.usernameOrEmail}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        usernameOrEmail: e.target.value,
                      })
                    }
                  />
                  {loginErrors.usernameOrEmail && (
                    <p className="mt-1 text-red-500 text-sm">
                      {loginErrors.usernameOrEmail}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="login-password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className={`w-full px-3 py-2 border rounded-md ${
                      loginErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                  />
                  {loginErrors.password && (
                    <p className="mt-1 text-red-500 text-sm">
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FE222E] text-white py-2 rounded-md hover:bg-[#e01e28] transition duration-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    htmlFor="register-username"
                    className="block text-gray-700 mb-2"
                  >
                    Username or Email
                  </label>
                  <input
                    id="register-username"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md ${
                      registerErrors.usernameOrEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={registerForm.usernameOrEmail}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        usernameOrEmail: e.target.value,
                      })
                    }
                  />
                  {registerErrors.usernameOrEmail && (
                    <p className="mt-1 text-red-500 text-sm">
                      {registerErrors.usernameOrEmail}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="register-password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    className={`w-full px-3 py-2 border rounded-md ${
                      registerErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                  />
                  {registerErrors.password && (
                    <p className="mt-1 text-red-500 text-sm">
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FE222E] text-white py-2 rounded-md hover:bg-[#e01e28] transition duration-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;