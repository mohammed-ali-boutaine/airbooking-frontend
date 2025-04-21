import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import MapPicker from "../map/MapPicker";
import Input from "../static/Input";
import TextArea from "../static/TextArea"; // Create or import this component
import FileUpload from "../static/FileUpload";
import TagSelector from "../tags/TagSelector";
import { FormErrors, HotelType } from "../../types";

const HotelForm: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<HotelType>({
    name: "",
    address: "",
    city: "",
    country: "",
    description: "",
    profile_path: null,
    cover_path: null,
    tags: [],
    coordinate: {
      lat: 0,
      lng: 0,
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

  // Handle tags changes
  const handleTagsChange = (selectedTagIds: number[]) => {
    setFormData({
      ...formData,
      tags: selectedTagIds,
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
  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {};

  //   // Required fields
  //   if (!formData.name.trim()) newErrors.name = "Hotel name is required";
  //   if (!formData.address.trim()) newErrors.address = "Address is required";
  //   if (!formData.city.trim()) newErrors.city = "City is required";
  //   if (!formData.country.trim()) newErrors.country = "Country is required";

  //   // Coordinate validation
  //   if (formData.coordinate.lat === 0 && formData.coordinate.lng === 0) {
  //     newErrors.coordinates = "Please select a location on the map";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    // if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const hotelData = new FormData();

      // Append all fields except files
      hotelData.append("name", formData.name);
      hotelData.append("address", formData.address);
      hotelData.append("city", formData.city);
      hotelData.append("country", formData.country);
      hotelData.append("description", formData.description);

      // Append tags
      formData.tags.forEach((tagId, index) => {
        hotelData.append(`tags[${index}]`, tagId.toString());
      });

      // Append coordinate as array/object
      hotelData.append("coordinate[lat]", String(formData.coordinate.lat));
      hotelData.append("coordinate[lng]", String(formData.coordinate.lng));

      // Append files only if they are File objects
      if (formData.profile_path instanceof File) {
        hotelData.append("profile_path", formData.profile_path);
      }
      if (formData.cover_path instanceof File) {
        hotelData.append("cover_path", formData.cover_path);
      }

      console.log("hotel data ", hotelData);
      for (const [key, value] of hotelData.entries()) {
        console.log(key, value);
      }

      const response = await axiosInstance.post("/hotels", hotelData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("form response ", response);

      // Handle success
      setSuccessMessage("Hotel successfully added!");

      // Navigate after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000); // Increased from 200ms to 2000ms

      // Reset form
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        tags: [],
        description: "",
        profile_path: null,
        cover_path: null,
        coordinate: {
          lat: 0,
          lng: 0,
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
      // --- FIX: Show backend error messages if present ---
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        // Laravel validation errors
        if (error.response?.status === 422 && data?.errors) {
          setErrors(data.errors);
          setErrorMessage(""); // clear general error
        } else if (data?.message) {
          setErrorMessage(data.message);
        } else if (typeof data === "string") {
          setErrorMessage(data);
        } else {
          setErrorMessage("Failed to add hotel");
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      // --- END FIX ---
      console.error("Error details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Hotel</h2>

      {/* --- FIX: Always show errorMessage if present --- */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      {/* --- END FIX --- */}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
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

        {/* Tags Selector */}
        <TagSelector
          selectedTags={formData.tags}
          onChange={handleTagsChange}
          error={errors.tags}
        />

        {/* Map Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <MapPicker
            onPick={(coords) =>
              setFormData((prev) => ({
                ...prev,
                coordinate: { lat: coords.latitude, lng: coords.longitude },
              }))
            }
            defaultCoords={{
              latitude: formData.coordinate.lat,
              longitude: formData.coordinate.lng,
            }}
          />
          {errors.coordinate && (
            <p className="mt-1 text-sm text-red-600">{errors.coordinate}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Click on the map to set the hotel location
          </p>
        </div>

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
