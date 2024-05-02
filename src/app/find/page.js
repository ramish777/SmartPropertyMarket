'use client'

import { useRouter, useSearchParams } from 'next/navigation';

const FindPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const email = searchParams.get('email')

  return (
    <div>
      <h1>Email: {email}</h1>
    </div>
  );
};

export default FindPage;
