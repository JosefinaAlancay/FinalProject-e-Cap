export interface User {
   id: number;
   name: string;
   lastname: string;
   email: string;
   password: string;
   studies: string;
   image?: string;
   rol_id: number;
   created_at: Date
}