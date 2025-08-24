import React, { useEffect, useState } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  show: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onHide }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (show) {
      setIsHiding(false);
      // 슬라이드 인 애니메이션
      setTimeout(() => setIsVisible(true), 100);
      
      // 3초 후 슬라이드 아웃 시작
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsHiding(true);
        
        // 슬라이드 아웃 애니메이션 완료 후 토스트 숨김
        setTimeout(() => {
          onHide();
          setIsHiding(false);
        }, 500);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [show, onHide]);

  if (!show) return null;

  const getToastClass = () => {
    if (isHiding) return 'toast toast-hiding';
    if (isVisible) return 'toast toast-visible';
    return 'toast';
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-message">
        {message}
      </div>
    </div>
  );
};

export default Toast;
