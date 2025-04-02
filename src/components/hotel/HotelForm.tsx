import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface HotelFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  rating: string;
  hotel_profile: File | null;
  cover_path: File | null;
}

const HotelForm = () => {
  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    address: "",
    city: "",
    country: "",
    rating: "",
    hotel_profile: null,
    cover_path: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.country
    ) {
      setError("Please fill in all required fields");
      return false;
    }
    if (
      formData.rating &&
      (Number(formData.rating) < 0 || Number(formData.rating) > 5)
    ) {
      setError("Rating must be between 0 and 5");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/hotels",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      

      alert("Hotel created successfully!");
      // Reset form
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        rating: "",
        hotel_profile: null,
        cover_path: null,
      });
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creating hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a Hotel</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>
        </div>

        {/* File Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Profile Image
              <input
                type="file"
                name="hotel_profile"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
              <input
                type="file"
                name="cover_path"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
