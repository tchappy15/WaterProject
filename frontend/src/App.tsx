import './App.css';
import ProjectsPage from './pages/ProjectsPage';
import DonatePage from './pages/DonatePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
//the browserrouter enables routing generally, the routes holds the route definitions, and the route is a specific route

function App() {
 

  return (
    <>
    <CartProvider> {/*now everything in this is a child of CartProvider*/}
      <Router>
        <Routes>
          <Route path='/' element={<ProjectsPage/>} /> {/*home page */}
          <Route path='/projects' element={<ProjectsPage/>} /> 
          <Route path='/donate/:projectName/:projectId' element={<DonatePage/>} /> {/*we need to tell it that it might be recieving a parameters called projectName, projectId, etc */}
          <Route path='/cart' element={<CartPage/>} />
        </Routes>
      </Router>
    </CartProvider>
    
    </>
  );
}

export default App;
