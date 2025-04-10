import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postRequest } from "../../utils/services";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await postRequest({
        url: "/register",
        body: formData,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#dddddd] p-4 flex justify-between items-center">
        {/* ...existing code for logo... */}
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-[#dddddd] rounded-lg p-8">
          <h1 className="text-[#ff385c] text-2xl font-medium mb-6">
            Create account
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Form fields with controlled inputs */}
            <div className="space-y-4">
              {["username", "email", "password"].map((field) => (
                <div key={field} className="mb-4">
                  <label htmlFor={field} className="block text-[#222222] mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    id={field}
                    value={formData[field as keyof RegisterFormData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-[#dddddd] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff385c]"
                    required
                  />
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff385c] text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors mt-4"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#dddddd]"></div>
            <span className="px-4 text-[#717171]">or</span>
            <div className="flex-1 border-t border-[#dddddd]"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            {["Google", "Facebook", "Apple"].map((provider) => (
              <button
                key={provider}
                onClick={() => handleSocialLogin(provider)}
                className="w-full border border-[#dddddd] rounded-md p-3 flex justify-center items-center"
              >
                Continue with {provider}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-[#717171]">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-[#222222] underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
