import React, { useState } from "react";
import axios from "axios";
import MapPicker from "../map/MapPicker";
import Input from "../static/Input";
import TextArea from "../static/TextArea"; // Create or import this component
import FileUpload from "../static/FileUpload";

// Define types based on the database schema
interface HotelFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  profile_path: File | null;
  cover_path: File | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  // Note: owner_id is likely to be handled by the backend using auth
}

// Form validation errors
interface FormErrors {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  description?: string;
  profile_path?: string;
  cover_path?: string;
  coordinates?: string;
}

const HotelForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    address: "",
    city: "",
    country: "",
    description: "",
    profile_path: null,
    cover_path: null,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  });

  // UI states
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Hotel name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Coordinate validation
    if (
      formData.coordinates.latitude === 0 &&
      formData.coordinates.longitude === 0
    ) {
      newErrors.coordinates = "Please provide valid coordinates";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    
    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const hotelData = new FormData();
      hotelData.append("name", formData.name);
      hotelData.append("address", formData.address);
      hotelData.append("city", formData.city);
      hotelData.append("country", formData.country);
      hotelData.append("description", formData.description);
      hotelData.append("coordinates", JSON.stringify(formData.coordinates));

      // Add files if present
      if (formData.profile_path) {
        hotelData.append("profile_path", formData.profile_path);
      }

      if (formData.cover_path) {
        hotelData.append("cover_path", formData.cover_path);
      }

      // Send request to API

      const token: string | null = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/hotels",
        hotelData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include authentication header if needed
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      // Handle success
      setSuccessMessage("Hotel successfully added!");

      // Reset form after successful submission
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        description: "",
        profile_path: null,
        cover_path: null,
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      });

      // Clear file inputs
      const profileInput = document.getElementById(
        "profile_path"
      ) as HTMLInputElement;
      const coverInput = document.getElementById(
        "cover_path"
      ) as HTMLInputElement;
      if (profileInput) profileInput.value = "";
      if (coverInput) coverInput.value = "";
    } catch (error) {
      console.error("Error submitting hotel:", error);
      if (axios.isAxiosError(error) && error.response) {
        // Handle validation errors from the server
        if (error.response.status === 422 && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage(
            error.response.data.message ||
              "An error occurred while adding the hotel"
          );
        }
      } else {
        setErrorMessage("Failed to connect to server. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Hotel</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Hotel Name */}
        <Input
          label="Hotel Name *"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />

        {/* Address */}
        <Input
          label="Address *"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />

        {/* City and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="City *"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={errors.city}
            required
          />

          <Input
            label="Country *"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            error={errors.country}
            required
          />
        </div>

        {/* Description */}
        <TextArea
          label="Description"
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* Map Picker */}
        <MapPicker
          onPick={(coords) =>
            setFormData((prev) => ({
              ...prev,
              coordinates: coords,
            }))
          }
        />

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FileUpload
            label="Profile Image"
            id="profile_path"
            name="profile_path"
            onChange={handleFileChange}
            error={errors.profile_path}
            helperText="Upload a logo or main image for the hotel"
          />

          <FileUpload
            label="Cover Image"
            id="cover_path"
            name="cover_path"
            onChange={handleFileChange}
            error={errors.cover_path}
            helperText="Upload a banner image for the hotel"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Add Hotel"}
          </button>
        </div>



        
      </form>
    </div>
  );
};

export default HotelForm;
