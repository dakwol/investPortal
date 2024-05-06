interface CardInfo {
  gallery_images: [];
  brand: string;
  name: string;
  price: string;
}

export interface IProduct {
  id: string | number,
  slug: string,
  card_info: CardInfo
}
