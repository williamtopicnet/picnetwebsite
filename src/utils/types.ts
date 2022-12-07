export type ServiceCaseStudy = {
  title: string;
  image: string;
  mainContent: {
    title: string;
    content: string;
  };
  subContent: { type: string; title: string; content: string }[];
};
