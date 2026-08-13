export type Database = {
  public: {
    Tables: {
      salons: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          duration: string;
          price: string;
          salon_id: string;
          created_at: string;
        };
        Insert: {
          name: string;
          duration: string;
          price: string;
          salon_id: string;
        };
        Update: {
          name?: string;
          duration?: string;
          price?: string;
          salon_id?: string;
        };
      };
      availability: {
        Row: {
          id: string;
          service_id: string;
          date: string;
          hour: string;
          is_booked: boolean;
          created_at: string;
        };
        Insert: {
          service_id: string;
          date: string;
          hour: string;
          is_booked?: boolean;
        };
        Update: {
          is_booked?: boolean;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          service_id: string;
          date: string;
          hour: string;
          client_name: string;
          client_phone: string;
          status: "pending" | "confirmed" | "cancelled";
          created_at: string;
        };
        Insert: {
          user_id: string;
          service_id: string;
          date: string;
          hour: string;
          client_name: string;
          client_phone: string;
          status?: "pending" | "confirmed" | "cancelled";
        };
        Update: {
          status?: "pending" | "confirmed" | "cancelled";
        };
      };
    };
    Views: {
      [_: string]: unknown;
    };
    Functions: {
      [_: string]: unknown;
    };
    StoredProcedures: {
      [_: string]: unknown;
    };
  };
};