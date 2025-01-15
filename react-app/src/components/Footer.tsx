import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ marginRight: "10px" }}>
          Follow us on Instagram:{" "}
          <a
            href="https://www.instagram.com/cajas_navidad_lp"
            target="_blank"
            rel="noopener noreferrer"
          >
            @cajas_navidad_lp
          </a>
        </p>
        <p>
          Contact us on WhatsApp:{" "}
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
          >
            +1234567890
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
