// layout/MainLayout.tsx
import React from "react";
import Header from "../componenets/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
