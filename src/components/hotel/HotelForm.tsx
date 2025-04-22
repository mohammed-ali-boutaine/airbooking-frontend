import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import MapPicker from "../map/MapPicker";
import Input from "../static/Input";
import TextArea from "../static/TextArea";
import FileUpload from "../static/FileUpload";
import TagSelector from "../tags/TagSelector";
import { FormErrors, HotelType, Tag } from "../../types";
// import { log } from "console";

const HotelForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

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
  const [isLoading, setIsLoading] = useState<boolean>(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchHotel();
    }
  }, [id]);

  const fetchHotel = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/hotels/${id}`);
      const hotelData = response.data.data;

      // Parse the coordinate string if it comes as a string
      if (hotelData.coordinate && typeof hotelData.coordinate === "string") {
        try {
          hotelData.coordinate = JSON.parse(hotelData.coordinate);
        } catch (e) {
          console.error("Error parsing coordinates:", e);
          hotelData.coordinate = { lat: 0, lng: 0 };
        }
      }

      setFormData(hotelData);
      setErrors({});
    } catch (err) {
      console.error("Error fetching hotel:", err);
      setErrorMessage("Failed to load hotel details");
    } finally {
      setIsLoading(false);
    }
  };

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
  const handleTagsChange = (selectedTagIds: Tag[]) => {
    setFormData({
      ...formData,
      tags: selectedTagIds, // Store just the IDs in the formData
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

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
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

      let response;
      if (isEditMode) {
        response = await axiosInstance.put(`/hotels/${id}`, hotelData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccessMessage("Hotel successfully updated!");
      } else {
        response = await axiosInstance.post("/hotels", hotelData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        setSuccessMessage("Hotel successfully added!");
      }

      // Navigate after a delay
      setTimeout(() => {
        navigate(isEditMode ? `/owner/hotels/${id}` : "/owner/hotels");
      }, 2000);

      if (!isEditMode) {
        // Reset form only for new hotel creation
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
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (error.response?.status === 422 && data?.errors) {
          setErrors(data.errors);
          setErrorMessage("");
        } else if (data?.message) {
          setErrorMessage(data.message);
        } else if (typeof data === "string") {
          setErrorMessage(data);
        } else {
          setErrorMessage(
            isEditMode ? "Failed to update hotel" : "Failed to add hotel"
          );
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.error("Error details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Hotel" : "Add New Hotel"}
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Hotel Name *"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />

        <Input
          label="Address *"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />

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

        <TextArea
          label="Description *"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
          required
        />

        <TagSelector
          selectedTags={formData.tags.map((id) => ({ id, name: "" }))} // Convert IDs to Tag objects for the component
          onChange={handleTagsChange}
          error={errors.tags}
        />

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
        </div>

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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              navigate(isEditMode ? `/owner/hotels/${id}` : "/owner/hotels")
            }
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
              ? "Update Hotel"
              : "Add Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
