export interface IProduct {
    id: number;
    slug: string;
    category: {
        id: number;
        meta: {
            type: string;
        };
    };
    price: string;
    brand: {
        id: number;
        meta: {
            type: string;
        };
    };
    brand_website_link: string;
    ozon_link: string;
    yandex_market_link: string;
    megamarket_link: string;
    gallery_images: {
        image: string;
        caption: string;
    }[];
    description: string;
    characteristics: any[]; // Добавьте тип для этого поля, если он известен
    card_info: {
        brand: string;
        name: string;
        price: number;
        gallery_images: {
            image: string;
            caption: string;
        }[];
    };
    other_products: {
        brand: string;
        name: string;
        price: number;
        gallery_images: {
            image: string;
            caption: string;
        }[];
    }[];
}
