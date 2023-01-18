import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Batching from './pages/Batching';
import Transitions from './pages/Transitions';
import UseId from './pages/UseId';

import './App.css';

const SuspendedLazyPage = lazy(() => {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./pages/SuspendedPage')), 3000);
  });
});

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/batching">Batching</Link>
            </li>
            <li>
              <Link to="/suspense">Suspended page</Link>
            </li>
            <li>
              <Link to="/use-transition">Transitions</Link>
            </li>
            <li>
              <Link to="/use-id">UseId hook</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/batching" element={<Batching />} />
          <Route
            path="/suspense"
            element={
              <Suspense
                fallback={
                  <div>
                    Loading...
                    <br /> (see chunks loading in the network tool)
                  </div>
                }
              >
                <SuspendedLazyPage />
              </Suspense>
            }
          />
          <Route path="/use-transition" element={<Transitions />} />
          <Route path="/use-id" element={<UseId />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home: React.FC = () => {
  return <h2>Welcome to React v18 demo app!</h2>;
};
