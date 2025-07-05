import React from "react";
import { Link } from "react-router-dom";
import logoUTB from "../assets/logo-utb.png"; // Asegúrate de tener el logo en esta ruta

export default function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={`${process.env.PUBLIC_URL}/logo-utb.png`}
            alt="Logo UTB"
            style={{ width: "60px", height: "60px", marginRight: "10px" }}
          />
          <span className="font-weight-bold text-primary" style={{ fontSize: "1.5rem" }}>
            Activos Fijos UTB
          </span>
        </Link>
      </div>
    </header>
  );
}
