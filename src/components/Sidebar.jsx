import React from "react";
import Form from "./Form";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <aside className="flex flex-col sidebar py-8 px-6 border-r-2 border-slate-50 dark:border-source-green">
      <Logo
        linkPath="/"
        logoPath="/logo-1.svg"
        altText="logo"
        logoClass="h-14"
      />
      <Navigation />
      {/* <Form /> */}
    </aside>
  );
}
