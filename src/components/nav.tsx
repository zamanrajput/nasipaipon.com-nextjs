"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/NASI PAIPON.png";
import authClient from "@/lib/clients/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Menu, X } from "lucide-react";

type MenuItemNav = {
  name: string;
  url: string;
};

const TopNavBar = () => {
  const router = useRouter();
  const [cIndex, setCIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navItems: Array<MenuItemNav> = [
    { name: "HOME", url: "/" },
    { name: "ARTICLES", url: "/pages/articles" },
    { name: "TIMINGS", url: "/pages/timing" },
    { name: "CONTACT", url: "/pages/contact" },
    { name: "ABOUT", url: "/pages/about" },
    { name: "PRIVACY", url: "/pages/privacy" },
  ];

  useEffect(() => {
    authClient.me().then(setCurrentUser);
  }, []);

  const handleLogout = async () => {
    await authClient.logout();
    window.location.reload();
    setCurrentUser(null);
  };

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
    const newErrors = { email: "", password: "" };

    if (!loginForm.email.trim()) {
      newErrors.email = "Email is required";
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
    const newErrors = { email: "", password: "" };

    if (!registerForm.email.trim()) {
      newErrors.email = "Email is required";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;
    setIsLoading(true);
    setApiError("");

    const res = await authClient.login(loginForm.email, loginForm.password);
    try {
      if (res.error) throw new Error(res.error);

      console.log("Login successful", res.user);
      setPopoverOpen(false);
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
    if (!res.error) window.location.reload();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) return;
    setIsLoading(true);
    setApiError("");

    try {
      const res = await authClient.register(
        registerForm.email,
        registerForm.password
      );

      if (res.error) throw new Error(res.error);

      console.log("Registration successful", res.user);
      alert("Registered successfully! Please login now.");
      setActiveTab("login");
      setRegisterForm({ email: "", password: "" });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Registration failed");
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
              className={`cursor-pointer hover:font-bold ${
                e.name === "ARTICLES" ? "w-20" : "w-12"
              } ${
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
          <Button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
            }}
            className="bg-[#FE222E] hover:bg-[#e01e28]"
          >
            Download App
          </Button>
          {currentUser ? (
            <div className="space-x-2">
              {currentUser.username == "admin@nasipaipon.com" && (
                <Button
                  onClick={() => {
                    router.push("/admin/articles");
                  }}
                  variant="secondary"
                >
                  Manage Articles
                </Button>
              )}
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setPopoverOpen(true)}
              className="bg-[#FE222E] hover:bg-[#e01e28]"
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Hamburger and Side Nav */}
      <nav className="sm:hidden flex items-center justify-between px-4 backdrop-blur-sm absolute w-full z-[100]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-8 h-8 text-white" />
        </Button>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </Button>
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
        <div className="px-6 mt-10 space-y-3">
          <Button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[#FE222E] hover:bg-[#e01e28]"
          >
            Download App
          </Button>
          {currentUser ? (
            <>
              {currentUser.username == "admin@nasipaipon.com" && (
                <Button
                  onClick={() => {
                    router.push("/admin/articles");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Manage Articles
                </Button>
              )}
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setPopoverOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#FE222E] hover:bg-[#e01e28]"
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Login/Register Dialog */}
      <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <img width={200} src={logo.src} alt="Logo" />
            </div>
            <DialogTitle className="text-center">Welcome Back</DialogTitle>
            <DialogDescription className="text-center">
              Login or create an account to continue
            </DialogDescription>
          </DialogHeader>

          {apiError && (
            <Alert variant="destructive">
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      })
                    }
                    className={loginErrors.email ? "border-red-500" : ""}
                  />
                  {loginErrors.email && (
                    <p className="text-sm text-red-500">{loginErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className={loginErrors.password ? "border-red-500" : ""}
                  />
                  {loginErrors.password && (
                    <p className="text-sm text-red-500">
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FE222E] hover:bg-[#e01e28]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    className={registerErrors.email ? "border-red-500" : ""}
                  />
                  {registerErrors.email && (
                    <p className="text-sm text-red-500">
                      {registerErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Enter your password"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    className={registerErrors.password ? "border-red-500" : ""}
                  />
                  {registerErrors.password && (
                    <p className="text-sm text-red-500">
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FE222E] hover:bg-[#e01e28]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default TopNavBar;