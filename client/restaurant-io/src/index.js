import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');

createRoot(root).render(
  <Router>
    <App />
  </Router>
);
