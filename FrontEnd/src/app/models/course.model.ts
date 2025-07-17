export interface Course {
    id: number;
    title: string;
    description:string;
    image_url: string;
    price: number;
    discount: number;
    level:string;
    total_lessons: number;
    total_duration: string;
    category: {
        id: string;
        name: string;
    };
    instructor: {
        name: string;
        last_name: string;
        rating: number;
    };
}
