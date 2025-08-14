'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProfile from '../hooks/useProfile';

export default function Home() {
  const router = useRouter();
  const {token, userDetails}=useProfile();

  useEffect(() => {
    if(token)
    {
      router.push("/dashboard")
    }else{
      router.push("/login")
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-black">Redirecting to dashboard...</p>
    </div>
  );
}
