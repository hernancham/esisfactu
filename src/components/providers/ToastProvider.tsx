"use client";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <div>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </div>
  );
};
