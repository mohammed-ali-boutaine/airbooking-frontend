import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import Button from "../../components/static/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/static/Input";
import { notifyError, notifySuccess } from "../../utils/toast";
import axiosInstance from "../../utils/axios";

interface RegisterFormData {
     name: string;
     email: string;
     password: string;
   }

const LoginPage = () => {

     
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);
  // handle input change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     const reposne = await axiosInstance.post("/register", formData);
     const data = reposne.data;
     console.log(data);

     localStorage.setItem("token", data.token);
console.log(data);

     // set user :
     setUser(data.user,data.token)

     notifySuccess("Account created successfully!");
     navigate("/");
   } catch (err: any) {
     if (err.response?.status === 422) {
       const errorMessages = Object.values(err.response.data.errors).flat();
       notifyError(errorMessages.join("\n"));
     } else {
       notifyError(err.response?.data?.message || "Registration failed");
     }
   } finally {
     setLoading(false);
   }
  };

  return (
    <>
           <h2 className="text-[var(--primary-color)]  text-2xl font-bold mb-4 ">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="Username"
          placeholder="your full name here ..."
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="strong password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mt-6">
          <Button disabled={loading} variant="primary" fullWidth type="submit">
            
            {loading ? "Creating account..." : "Continue"}

          </Button>
        </div>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link
          to="/login"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Log in
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
