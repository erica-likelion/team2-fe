import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import HomeIcon from '../assets/icons/HomeOutline.svg?react'
import LocationIcon from '../assets/icons/LocationMarkerOutline.svg?react'
import MenuIcon from '../assets/icons/ClipboardListOutline.svg?react'
import UserIcon from '../assets/icons/UserCircleOutline.svg?react'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      path: '/home',
      icon: HomeIcon,
      label: '홈'
    },
    {
      path: '/map',
      icon: LocationIcon,
      label: '지도'
    },
    {
      path: '/menu',
      icon: MenuIcon,
      label: '메뉴'
    },
    {
      path: '/user',
      icon: UserIcon,
      label: '유저'
    }
  ]

  return (
    <nav className="navbar">
      {navItems.map((item) => {
        const IconComponent = item.icon
        return (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="nav-icon">
              <IconComponent />
            </div>
            {/* <span className="nav-label">{item.label}</span> */}
          </button>
        )
      })}
    </nav>
  )
}

export default Navbar
