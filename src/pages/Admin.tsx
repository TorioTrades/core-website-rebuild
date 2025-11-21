import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Appointment, appointmentStore } from '@/lib/appointmentStore';
import { Calendar, Clock, User, Scissors, Phone, Mail, Search, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
    const hasAccess = localStorage.getItem('admin_access') === 'true';
    if (!hasAccess) {
      navigate('/auth');
      return;
    }
    await loadAppointments();
    setLoading(false);

    // Set up real-time subscription for new appointments
    const channel = supabase.channel('appointments-changes').on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'appointments'
    }, () => {
      toast.success('New booking received!');
      loadAppointments();
    }).on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'appointments'
    }, () => {
      loadAppointments();
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  };
  const loadAppointments = async () => {
    const data = await appointmentStore.getAppointments();
    setAppointments(data);
  };
  const upcomingAppointments = appointments.filter(apt => apt.status !== 'completed' && apt.status !== 'cancelled').sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');
  const filteredHistory = completedAppointments.filter(apt => {
    const query = searchQuery.toLowerCase();
    return apt.customerName.toLowerCase().includes(query) || apt.customerPhone.includes(query) || apt.service.toLowerCase().includes(query);
  });
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CJ HAIR LOUNGE    </h1>
          <p className="text-muted-foreground">Manage bookings and client history</p>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="history">Client History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <div className="space-y-4">
              {upcomingAppointments.length === 0 ? <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No upcoming bookings
                  </CardContent>
                </Card> : upcomingAppointments.map(appointment => <Card key={appointment.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">Booking #{appointment.id.slice(0, 8)}</span>
                        <span className={`text-sm px-3 py-1 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {appointment.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{appointment.customerName}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{appointment.customerPhone}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{format(new Date(appointment.date), 'MMMM d, yyyy')}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium">{appointment.time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Scissors className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Service</p>
                            <p className="font-medium">{appointment.service}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Barber</p>
                            <p className="font-medium">{appointment.barberName}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="text" placeholder="Search by name, phone, or service..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>

            <div className="space-y-4">
              {filteredHistory.length === 0 ? <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    {searchQuery ? 'No results found' : 'No completed bookings'}
                  </CardContent>
                </Card> : filteredHistory.map(appointment => <Card key={appointment.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">Booking #{appointment.id.slice(0, 8)}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(appointment.date), 'MMM d, yyyy')}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{appointment.customerName}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{appointment.customerPhone}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Scissors className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Service</p>
                            <p className="font-medium">{appointment.service}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Barber</p>
                            <p className="font-medium">{appointment.barberName}</p>
                          </div>
                        </div>

                        {appointment.customerEmail && <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{appointment.customerEmail}</p>
                            </div>
                          </div>}

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium">{appointment.time}</p>
                          </div>
                        </div>
                      </div>

                      {appointment.notes && <div className="pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-1">Notes</p>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>}
                    </CardContent>
                  </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export default Admin;