import { supabase } from '@/integrations/supabase/client';

export interface UnavailableSlot {
  id: string;
  barberName: string;
  date: string;
  time?: string;
  isWholeDay: boolean;
  reason?: string;
}

export const unavailabilityStore = {
  async getUnavailableSlotsForDate(barberName: string, date: string): Promise<UnavailableSlot[]> {
    const { data, error } = await supabase
      .from('unavailability')
      .select('*')
      .eq('barber_name', barberName)
      .eq('date', date);

    if (error) {
      console.error('Error fetching unavailable slots:', error);
      return [];
    }

    const slots: UnavailableSlot[] = [];
    data.forEach(record => {
      if (record.is_full_day) {
        slots.push({
          id: record.id,
          barberName: record.barber_name,
          date: record.date,
          isWholeDay: true,
          reason: record.reason || ''
        });
      } else if (record.time_slots && Array.isArray(record.time_slots)) {
        record.time_slots.forEach((timeSlot: string) => {
          slots.push({
            id: record.id,
            barberName: record.barber_name,
            date: record.date,
            time: timeSlot,
            isWholeDay: false,
            reason: record.reason || ''
          });
        });
      }
    });

    return slots;
  }
};