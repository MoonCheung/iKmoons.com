import { NextSeo } from 'next-seo';

export default function DocHead({ title, description }) {
  return <NextSeo title={title} description={description} />;
}
