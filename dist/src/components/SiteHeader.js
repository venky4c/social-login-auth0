import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth0Context } from "../context/auth0-context";

export default function SiteHeader() {
  const auth0 = useContext(Auth0Context);

  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        <button>Login</button>
        <button>Logout</button>
      </div>
    </div>
  );
}
