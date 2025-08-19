import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      path: '/home',
      icon: '/icons/HomeOutline.svg',
      label: '홈'
    },
    {
      path: '/map',
      icon: '/icons/LocationMarkerOutline.svg',
      label: '지도'
    },
    {
      path: '/menu',
      icon: '/icons/ClipboardListOutline.svg',
      label: '메뉴'
    },
    {
      path: '/user',
      icon: '/icons/UserCircleOutline.svg',
      label: '유저'
    }
  ]

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div className="nav-icon">
            <img src={item.icon} alt={item.label} />
          </div>
          {/* <span className="nav-label">{item.label}</span> */}
        </button>
      ))}
    </nav>
  )
}

export default Navbar
