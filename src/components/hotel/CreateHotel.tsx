import React, { useState, ChangeEvent, FormEvent } from "react";
import { useUserStore } from "../../store/useUserStore";
import MainNav from "../navbars/MainNav";
// import { useNavigate } from "react-router-dom";

// Types for our form
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface HotelFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string | null;
  profile_path: File | null;
  cover_path: File | null;
  coordinate: Coordinate;
  owner_id: number;
}

// Props for the form component
// interface HotelFormProps {
//   owners: { id: number; name: string }[];
//   onSubmit: (data: FormData) => Promise<void>;
// }

const CreateHotel: React.FC= () => {
  const user = useUserStore((state) => state.user);
//   const navigate = useNavigate();
//   useEffect(() => {
//      console.log(user);
     
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);


  // Initial state
  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    address: "",
    city: "",
    country: "",
    description: null,
    profile_path: null,
    cover_path: null,
    coordinate: { latitude: 0, longitude: 0 },
    owner_id: user?.id || 0, 
});

  const [errors, setErrors] = useState<
    Partial<Record<keyof HotelFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  // Handle text input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof HotelFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle coordinate changes
  const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;

    setFormData((prev) => ({
      ...prev,
      coordinate: {
        ...prev.coordinate,
        [name]: numValue,
      },
    }));
  };

  // Handle file inputs
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Update form data
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "profile_path") {
          setPreviewProfile(reader.result as string);
        } else if (name === "cover_path") {
          setPreviewCover(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HotelFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Hotel name is required";
    } else if (formData.name.length > 255) {
      newErrors.name = "Hotel name must be less than 255 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.length > 100) {
      newErrors.city = "City must be less than 100 characters";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    } else if (formData.country.length > 100) {
      newErrors.country = "Country must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for sending files
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("address", formData.address);
      submitData.append("city", formData.city);
      submitData.append("country", formData.country);

      if (formData.description) {
        submitData.append("description", formData.description);
      }

      if (formData.profile_path) {
        submitData.append("profile_path", formData.profile_path);
      }

      if (formData.cover_path) {
        submitData.append("cover_path", formData.cover_path);
      }

      submitData.append("coordinate", JSON.stringify(formData.coordinate));
      // submitData.append("owner_id", formData.owner_id.toString());

     //  await onSubmit(submitData);

      // Reset form after successful submission
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        description: null,
        profile_path: null,
        cover_path: null,
        coordinate: { latitude: 0, longitude: 0 },
        owner_id:user?.id ?? 0 ,
      });
      setPreviewProfile(null);
      setPreviewCover(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <>

    {/* <MainNav user= */}
    <MainNav/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Hotel</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Hotel Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              maxLength={255}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="owner_id"
              className="block text-sm font-medium text-gray-700"
            >
              Owner *
            </label>
 
            {errors.owner_id && (
              <p className="mt-1 text-sm text-red-600">{errors.owner_id}</p>
            )}
          </div>
        </div>

        {/* Location Information */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              maxLength={100}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
              maxLength={100}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude *
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.coordinate.latitude}
              onChange={handleCoordinateChange}
              step="0.000001"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude *
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.coordinate.longitude}
              onChange={handleCoordinateChange}
              step="0.000001"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="profile_path"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profile_path"
              name="profile_path"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {previewProfile && (
              <div className="mt-2">
                <img
                  src={previewProfile}
                  alt="Profile Preview"
                  className="h-40 w-auto object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="cover_path"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="cover_path"
              name="cover_path"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {previewCover && (
              <div className="mt-2">
                <img
                  src={previewCover}
                  alt="Cover Preview"
                  className="h-40 w-auto object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Hotel"}
          </button>
        </div>
      </form>
    </div>
    </>

  );
};

export default CreateHotel;

// Usage Example:
/*
import HotelForm from './components/HotelForm';

const App = () => {
  const owners = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // ... more owners
  ];

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT/hotels', {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header when sending FormData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create hotel');
      }
      
      const data = await response.json();
      console.log('Hotel created:', data);
      
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto py-8">
      <HotelForm owners={owners} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
*/
