import {Video} from "@/modules/admin/videos/types";

export type CARDS_TYPE = "trainer" | "course";

export type SECTION_TYPE = "carousel" | "testimonials" | "normal" | "icons" | "cards";

export type DIRECTIONS = "left" | "right" | "center";

export type ACTION_TYPE =
  | "create-account"
  | "linkTo-trainers"
  | "linkTo-programs"
  | "linkTo-diets"
  | "linkTo-shop"
  | "create-testimonial"
  | "contact-us";

export type SECTION_ITEM_TYPE = "image" | "card" | "testimonial";

export type SectionItemAsCard = {
  id: string;
  title: string;
  description: string;
  hideDescription: boolean;
  image: string;
  url: string;
  links: string[];
};

export type SectionItemAsTestimonial = {
  title: string;
  description: string;
  userName: string;
  courseName: string;
  beforeImage: string;
  afterImage: string;
};

export type SectionItemAsImage = {
  title: string;
  image: string;
  url: string;
};

export type Section = {
  sectionType: SECTION_TYPE;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  video?: Video;
  action?: string;
  actionType?: ACTION_TYPE;
  direction?: DIRECTIONS;
  items?: (SectionItemAsCard | SectionItemAsTestimonial | SectionItemAsImage)[];
  cardsType?: CARDS_TYPE;
};
