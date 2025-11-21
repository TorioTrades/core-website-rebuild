import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingData } from '@/types/booking';
import { customerInfoSchema } from '@/lib/validations/booking';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CustomerInfoProps {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onNext: () => void;
  onClose: () => void;
}

const CustomerInfo = ({
  bookingData,
  setBookingData
}: CustomerInfoProps) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleCustomerInfoChange = (field: keyof BookingData['customerInfo'], value: string) => {
    const updatedInfo = {
      ...bookingData.customerInfo,
      [field]: value
    };
    
    setBookingData({
      ...bookingData,
      customerInfo: updatedInfo
    });

    // Validate individual field
    try {
      customerInfoSchema.parse(updatedInfo);
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error: any) {
      if (error.errors) {
        const fieldError = error.errors.find((e: any) => e.path[0] === field);
        if (fieldError) {
          setValidationErrors(prev => ({
            ...prev,
            [field]: fieldError.message
          }));
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">Your Information</h3>
        <p className="text-sm sm:text-base text-muted-foreground">Please fill in your details to complete the booking</p>
      </div>

      <div className="bg-secondary/30 p-4 sm:p-6 rounded-lg space-y-4 border border-border">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-primary">
            Full Name *
          </Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Enter your full name" 
            value={bookingData.customerInfo.name} 
            onChange={e => handleCustomerInfoChange('name', e.target.value)} 
            className={`bg-background border-input focus:border-primary ${validationErrors.name ? 'border-destructive' : ''}`}
          />
          {validationErrors.name && (
            <p className="text-sm text-destructive">{validationErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-primary">Contact Number *</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="e.g. 09123456789" 
            value={bookingData.customerInfo.phone} 
            onChange={e => handleCustomerInfoChange('phone', e.target.value)} 
            className={`bg-background border-input focus:border-primary ${validationErrors.phone ? 'border-destructive' : ''}`}
          />
          {validationErrors.phone && (
            <p className="text-sm text-destructive">{validationErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary">
            Email Address (Optional)
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your.email@example.com" 
            value={bookingData.customerInfo.email} 
            onChange={e => handleCustomerInfoChange('email', e.target.value)} 
            className={`bg-background border-input focus:border-primary ${validationErrors.email ? 'border-destructive' : ''}`}
          />
          {validationErrors.email && (
            <p className="text-sm text-destructive">{validationErrors.email}</p>
          )}
        </div>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please correct the errors above before continuing.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-muted-foreground space-y-1 text-center">
        <p>• Name and phone number are required to complete your booking</p>
        <p>• Your phone number is used for important updates</p>
        <p>• Email is optional but helpful for notifications</p>
      </div>
    </div>
  );
};

export default CustomerInfo;
