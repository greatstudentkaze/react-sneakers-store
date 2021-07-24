export interface ImageSrc {
  '1x': string;
  '2x'?: string;
}

export interface SneakersItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageSrc: ImageSrc;
}
