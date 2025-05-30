// src/components/header/LoginControl.jsx
'use client';

import { useState, useEffect } from 'react';
import useAuth from '../../features/hooks/useAuth';
import LoginModal from '../LoginModal/LoginModal';
import Profile from '../Profile/Profile';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Style/index.css";


export default function LoginControl() {
  const { isUser } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
console.log("isModalVisibleisModalVisibleisModalVisible",isModalVisible)
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return (
    <>
      <div>
      {/* Desktop Button */}
      <div className="loginDiv d-none d-lg-block">
        <button
          className="loginBtn nav-link"
        >
          Login
        </button>
      </div>

  
    </div>

    </>
  );
}
