import React from 'react';

export const FormContainer = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12">
      <div className="mb-10">
        <h1 className="text-3xl text-center">{heading}</h1>
      </div>
      <div className="w-full mx-auto sm:max-w-md">{children}</div>
    </div>
  );
};
