export interface ServiceCaseStudy {
  title: string;
  image?: string | string[];
  icon?: string;
  mainContent: {
    title: string;
    content: string;
  };
  subContent: {
    type: string;
    title: string;
    subtitle?: string;
    listTitle?: string;
    content: string | string[] | { title: string; nested: string[] }[];
  }[];
}
