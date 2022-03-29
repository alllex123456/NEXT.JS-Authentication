import AuthForm from '../components/auth/auth-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/client';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/profile');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
