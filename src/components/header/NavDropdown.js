'use client';
import { useEffect } from 'react';

export default function NavDropdown({
  firstFive,
  dropdownItems,
  // isActive,
}) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return (
    <ul className="navbar-nav">
      {firstFive.map((item, index) => (
        <li className="nav-item" key={index}>
          <a className='nav-link' href={item.to}>
            {item.label}
          </a>
        </li>
      ))}
      {dropdownItems.length > 0 && (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            More
          </a>
          <ul className="dropdown-menu">
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <a
                  className={`dropdown-item ${isActive(item.to) ? 'active' : ''}`}
                  href={item.to}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
}
