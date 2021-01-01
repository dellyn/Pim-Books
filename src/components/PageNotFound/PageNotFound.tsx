import React from "react";
import "./PageNotFound.scss";
export const PageNotFound = () => {
  return (
    <div className="center">
      <div className="page-not-found">
        <div className="error">404</div>
        <div className="title">Page not found</div>
      </div>
      <a
        href="http://localhost:3000/pim-book"
        className="redirect button-styles"
      >
        Home Page
      </a>
    </div>
  );
};
