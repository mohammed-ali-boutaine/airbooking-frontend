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
  profile_path: File | null;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    profile_path: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "profile_path"
          ? files && files[0]
            ? files[0]
            : null
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // build FormData
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      if (formData.profile_path) {
        payload.append("profile_path", formData.profile_path);
      }

      const response = await axiosInstance.post("/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data;
      setUser(data.user, data.token);
      notifySuccess("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errors = Object.values(err.response.data.errors)
          .flat()
          .join("\n");
        notifyError(errors);
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
          required
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="strong password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* New file upload field */}
        <div className="mb-4">
          <label
            htmlFor="profile_path"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image
          </label>
          <input
            id="profile_path"
            name="profile_path"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
          />
        </div>

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

export default RegisterPage;
