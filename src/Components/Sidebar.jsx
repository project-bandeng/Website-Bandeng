import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

const dataDummy = [
  { path: "/profil", name: "Profile", icon: "bi-person-fill" },
  { path: "/crudproduk", name: "PRODUCTS", icon: "bi-bag-fill" },
];

export default function Sidebar({ dataLink, handleLogout }) {
  let location = useLocation();

  const isOnPage = (path) => {
    if (location.pathname.toLowerCase() === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav
      className="col-md-2 d-none d-md-block sidebar rounded-4 pe-0 ps-4"
      style={{ backgroundColor: "#0F75BD" }}
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="position-sticky">
          <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">
            Main Menu
          </h5>
          <ul className="nav flex-column gap-2">
            {dataLink.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`nav-item rounded-start-3 ${
                    isOnPage(item.path) ? "active" : ""
                  }`}
                >
                  <a
                    className={`nav-link text-primary  ${
                      isOnPage(item.path) ? "active-link" : "text-white"
                    }`}
                    href={item.path}
                  >
                    <i class={`bi ${item.icon} me-2`}></i>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logout mt-auto mb-3">
          <Link
            className={`nav-link text-white nav-item px-3 py-2 hovering-menu rounded-start-3`}
            onClick={() => handleLogout()}
            style={{ cursor: "pointer" }}
          >
            <i class="bi bi-door-open-fill me-2"></i>
            LOGOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
