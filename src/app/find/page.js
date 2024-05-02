'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import Layout from "../../../compnents/layout";

const FindPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const email = searchParams.get('email')

  return (
    <Layout>
      <h1>Email: {email}</h1>
    </Layout>
  );
};

export default FindPage;
