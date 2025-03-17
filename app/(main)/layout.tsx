import React from 'react';
import Provider from '../provider';
import Header from './_components/Header';

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <Header />  
      <div>{children}</div>
    </Provider>
  );
}

export default WorkspaceLayout;
