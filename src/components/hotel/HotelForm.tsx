import { useState } from "react";
// import axios from "axios";

const HotelForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        rating: "",
        hotel_profile: null,
        cover_path: null,
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e:any) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // const formDataToSend = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //     formDataToSend.append(key, value);
        // });
console.log(formData);

        // try {
        //     const response = await axios.post("http://127.0.0.1:8000/api/hotels", formDataToSend, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             Authorization: `Bearer YOUR_AUTH_TOKEN`,
        //         },
        //     });

        //     alert("Hotel created successfully!");
        //     console.log(response.data);
        // } catch (error) {
        //     console.error("Error creating hotel:", error);
        // }
    };

    return (
        <div>
            <h2>Create a Hotel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Country:
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Rating:
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" />
                </label>
                <br />

                <label>
                    Hotel Profile Image:
                    <input type="file" name="hotel_profile" accept="image/*" onChange={handleFileChange} />
                </label>
                <br />

                <label>
                    Cover Image:
                    <input type="file" name="cover_path" accept="image/*" onChange={handleFileChange} />
                </label>
                <br />

                <button type="submit">Create Hotel</button>
            </form>
        </div>
    );
};

export default HotelForm;
