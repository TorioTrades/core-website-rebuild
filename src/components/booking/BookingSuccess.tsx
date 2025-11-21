import { format } from 'date-fns';
import { CheckCircle, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingData } from '@/types/booking';

interface BookingSuccessProps {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onNext: () => void;
  onClose: () => void;
}

const BookingSuccess = ({
  bookingData,
  onClose
}: BookingSuccessProps) => {
  const bookingId = bookingData.bookingId || 'CLNT-1';

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground">
          Your appointment has been successfully booked
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 text-left space-y-4">
        <div className="text-center pb-4 border-b">
          <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
          <p className="text-2xl font-mono font-bold text-primary">{bookingId}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-semibold text-foreground">
                {bookingData.date && format(bookingData.date, 'MMMM dd, yyyy')} at {bookingData.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground">Classic Cuts Barbershop</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-semibold text-foreground">{bookingData.customerInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          <strong>Important:</strong> Please arrive 5-10 minutes before your appointment time.
        </p>
      </div>

      <Button 
        onClick={onClose}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Close
      </Button>
    </div>
  );
};

export default BookingSuccess;
