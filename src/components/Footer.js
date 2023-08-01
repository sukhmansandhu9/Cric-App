import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="text-center text-lg-start bg-light text-muted"
        style={{ position: "fixed", bottom: "0", width: "100%" }}
      >
        <div
          className="text-center p-4"
          style={{
            backgroundColor: "black",
            color: "white",
            // position: "absolute",
            // top: "10px",
          }}
        >
          © 2021 Copyright: Cric App
        </div>
      </footer>
    </>
  );
};

export default Footer;
