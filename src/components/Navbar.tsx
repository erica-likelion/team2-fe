import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import HomeOutlineIcon from '../assets/icons/HomeOutline.svg?react'
import HomeIcon from '../assets/icons/Home.svg?react'
import LocationOutlineIcon from '../assets/icons/LocationMarkerOutline.svg?react'
import LocationIcon from '../assets/icons/LocationMarker.svg?react'
import MenuOutlineIcon from '../assets/icons/ClipboardListOutline.svg?react'
import MenuIcon from '../assets/icons/ClipboardList.svg?react'
import UserOutlineIcon from '../assets/icons/UserCircleOutline.svg?react'
import UserIcon from '../assets/icons/UserCircle.svg?react'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      path: '/home',
      outlineIcon: HomeOutlineIcon,
      filledIcon: HomeIcon,
      label: '홈'
    },
    {
      path: '/map',
      outlineIcon: LocationOutlineIcon,
      filledIcon: LocationIcon,
      label: '지도'
    },
    {
      path: '/menu',
      outlineIcon: MenuOutlineIcon,
      filledIcon: MenuIcon,
      label: '메뉴'
    },
    {
      path: '/user',
      outlineIcon: UserOutlineIcon,
      filledIcon: UserIcon,
      label: '유저'
    }
  ]

  return (
    <nav className="navbar">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        const IconComponent = isActive ? item.filledIcon : item.outlineIcon
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
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
