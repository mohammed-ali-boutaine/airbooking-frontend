import React from "react";

const Home: React.FC = () => {
  // Retrieve user from localStorage
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  return (
    <div className="text-center">
      {user && <h1>Hello {user.name}</h1>}

      <>
        <h1>Welcome to AirBooking</h1>
        <p>Book your flights with ease!</p>
      </>
    </div>
  );
};

export default Home;
