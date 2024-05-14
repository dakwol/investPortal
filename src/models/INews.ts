interface CardInfo {
    date: string; // Формат даты должен быть в соответствии с требованиями вашего приложения
    title: string;
    main_image: string;
    description: string;
  }
  
  interface ContentBlock {
    type: string;
    value: string;
    id: string;
  }
  
  export interface NewsArticle {
    id: number;
    date: string; // Формат даты должен быть в соответствии с требованиями вашего приложения
    slug: string;
    card_info: CardInfo;
    content: ContentBlock[];
  }