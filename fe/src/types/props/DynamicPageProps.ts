export type DynamicPageProps = {
  params: Promise<{
    id: string;
  }>;
};
