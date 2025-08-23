import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserPage.css';
import usercharacter from '../assets/usercharacter.png'

interface Store {
  name: string;
  address: string;
  image?: string;
}

const UserPage = () => {
  const [visitedStores, setVisitedStores] = useState<Store[]>([]);

  useEffect(() => {
    // localStorage에서 방문한 가게 정보를 가져오기
    const stores = JSON.parse(localStorage.getItem('visitedStores') || '[]');
    setVisitedStores(stores);
  }, []);

  return (
    <div className="user-page-container">
      {/* Header */}
      <div className="header">
        <div className="edit-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="personal-info-section">
        <div className="user-greeting">
          <h2 className="user-name">AEAO 님</h2>
          <p className="greeting-message">오늘도 그로서링과 맛있는 하루 되세요!</p>
        </div>
        <div className="profile-picture">
          <div className="profile-placeholder">
            <img src={usercharacter} alt="usercharacter" />
          </div>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="navigation-icons">
        <div className="nav-icon-item">
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>내 리뷰</span>
        </div>
        <div className="nav-icon-item">
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 18.9609 21.7893 19.3358 21.4142C19.7107 21.0391 19.92 20.5304 19.92 20V8L14 2Z" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>나의 레시피</span>
        </div>
        <div className="nav-icon-item">
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.1208 20.84 4.61Z" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>관심 가게</span>
        </div>
      </div>

      {/* Recently Viewed Stores */}
      <div className="recent-stores-section">
        <h3 className="section-title">최근 본 가게 <span className="highlight">{visitedStores.length}</span></h3>
        {visitedStores.length > 0 ? (
          <div className="store-cards">
            {visitedStores.map((store, index) => (
              <div key={index} className="store-card">
                <div className="store-image">
                  {store.image ? (
                    <img src={store.image} alt={store.name} />
                  ) : (
                    <div className="image-placeholder">가게 이미지</div>
                  )}
                </div>
                <div className="store-info">
                  <h4 className="store-name">{store.name || '가게명'}</h4>
                  <p className="store-address">
                    <span className="location-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {store.address || '주소 정보 없음'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-stores-message">방문한 가게가 없습니다.</p>
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default UserPage
