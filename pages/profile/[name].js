import Head from 'next/head';

import { getProfileData } from '../../fetchData/getProfileData';

export default function SSRPage({ data }) {
  const { name, profile } = data;

  return (
    <div className="container">
      <Head>
        <title>Next.js / Firestore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js / Firebase SSR</h1>
        <h2>{name}</h2>
        <p>{profile.message}</p>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { name } = params;
  const profile = await getProfileData(name);
  if (!profile) {
    return { notFound: true };
  }
  return { props: { data: { name, profile } } };
};
