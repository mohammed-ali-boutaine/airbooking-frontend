import { useEffect } from "react";
import { useBookingStore } from "../store/useBookingStore";

interface CategorizedBookings {
  upcoming: any[];
  active: any[];
  past: any[];
  cancelled: any[];
}

const BookingsPage = () => {
  const { bookings, loading, error, fetchUserBookings } = useBookingStore();

  console.log("Bookings:", bookings);

  useEffect(() => {
    fetchUserBookings();
    
  }, [fetchUserBookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  const categorizedBookings = bookings as unknown as CategorizedBookings;

  const BookingCard = ({ booking }: { booking: any }) => (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">Room #{booking.room_id}</h2>
          <p className="text-gray-600">
            Check-in: {new Date(booking.check_in).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            Check-out: {new Date(booking.check_out).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Guests: {booking.guests}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === "active"
                ? "bg-green-100 text-green-800"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : booking.status === "past"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>
      {booking.requests && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Special Requests:</span>{" "}
            {booking.requests}
          </p>
        </div>
      )}
    </div>
  );

  const BookingSection = ({
    title,
    bookings,
  }: {
    title: string;
    bookings: any[];
  }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No {title.toLowerCase()} bookings found.
        </p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <BookingSection
        title="Upcoming"
        bookings={categorizedBookings.upcoming}
      />
      <BookingSection title="Active" bookings={categorizedBookings.active} />
      <BookingSection title="Past" bookings={categorizedBookings.past} />
      <BookingSection
        title="Cancelled"
        bookings={categorizedBookings.cancelled}
      />
    </div>
  );
};

export default BookingsPage;
