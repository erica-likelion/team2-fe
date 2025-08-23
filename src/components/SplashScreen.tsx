import './SplashScreen.css'

interface SplashScreenProps {
  fadeOut?: boolean;
}

const SplashScreen = ({ fadeOut = false }: SplashScreenProps) => {
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        {/* <h1 className="splash-title">Grocering</h1> */}
        <img src="/logo.png" alt="Grocering Logo" className="splash-logo"
         style={{width: '80dvw',
                 maxWidth: '400px',
                 padding: '20px',
         }} />
      </div>
    </div>
  )
}

export default SplashScreen
