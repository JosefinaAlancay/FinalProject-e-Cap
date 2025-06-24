export interface Course {
    id: number;
    title: string;
    instructor_id: number;
    description: string;
    price: number;
    discount: number;
    imagen: string;
    level: string;
    category_id: number;
    state: boolean;
    created_at: Date;
}