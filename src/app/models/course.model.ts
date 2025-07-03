export interface Course {
    id: number;
    title: string;
    instructor_id: number;
    description: string;
    price: any;
    discount: any;
    imagen: string;
    level: string;
    category_id: number;
    state: boolean;
    created_at: Date;
}