import { supabase } from '@/integrations/supabase/client';

export interface Appointment {
  id: string;
  barberName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price?: string;
  notes?: string;
  createdAt?: string;
}

export const appointmentStore = {
  async getAppointments(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    return data.map(apt => ({
      id: apt.id,
      barberName: apt.barber_name,
      customerName: apt.customer_name,
      customerPhone: apt.customer_phone,
      customerEmail: apt.customer_email || '',
      service: apt.service,
      date: apt.date,
      time: apt.time,
      status: apt.status as Appointment['status'],
      price: apt.price || '',
      createdAt: apt.created_at
    }));
  },

  async getAppointmentsByBarber(barberName: string, date: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('barber_name', barberName)
      .eq('date', date);

    if (error) {
      console.error('Error fetching appointments by barber:', error);
      return [];
    }

    return data.map(apt => ({
      id: apt.id,
      barberName: apt.barber_name,
      customerName: apt.customer_name,
      customerPhone: apt.customer_phone,
      customerEmail: apt.customer_email || '',
      service: apt.service,
      date: apt.date,
      time: apt.time,
      status: apt.status as Appointment['status'],
      price: apt.price || ''
    }));
  },

  async addAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        barber_name: appointment.barberName,
        customer_name: appointment.customerName,
        customer_phone: appointment.customerPhone,
        customer_email: appointment.customerEmail || '',
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        price: appointment.price || ''
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding appointment:', error);
      return null;
    }

    return {
      id: data.id,
      barberName: data.barber_name,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      customerEmail: data.customer_email || '',
      service: data.service,
      date: data.date,
      time: data.time,
      status: data.status as Appointment['status'],
      price: data.price || ''
    };
  }
};