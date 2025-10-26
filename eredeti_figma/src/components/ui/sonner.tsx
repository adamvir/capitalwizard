"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      richColors
      toastOptions={{
        style: {
          zIndex: 99999,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
