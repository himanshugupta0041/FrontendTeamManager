import { HashRouter } from 'react-router-dom';
// Instead of BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);