import React from 'react';
import { currentUser } from '../../actions/user';
import { redirect } from 'next/navigation';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect(`/auth/signin`);
  }

  return <>{children}</>;
}
