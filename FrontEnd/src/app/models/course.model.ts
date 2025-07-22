export interface Course {
    id: number;
    title: string;
    description:string;
    imagen_url: string;
    price: number;
    discount: number;
    level:string
    rating?: number;
    total_lessons?: number;
    total_duration?: string ;
    category: {
        id: string;
        name: string;
    };
    instructor: {
        name: string;
        last_name: string;
        rating: number;
        biography: string;
        profile_image: string;
    };
}
