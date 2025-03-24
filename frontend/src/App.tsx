import './App.css';
import CategoryFilter from './CategoryFilter';
import Fingerprint from './Fingerprint';
import ProjectList from './ProjectList';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <CategoryFilter />
      <ProjectList />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default App;
