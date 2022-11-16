import Navbar from './components/Navbar';
import './app.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:5000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const Layout = () => {
    return (
      <div>
        <Navbar user={user} />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,

      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/post/:id',
          element: (
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
  // return (
  //   <BrowserRouter>
  //     <div>
  //       <Navbar user={user} />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route
  //           path="/login"
  //           element={user ? <Navigate to="/" /> : <Login />}
  //         />
  //         <Route
  //           path="/post/:id"
  //           element={user ? <Post /> : <Navigate to="/login" />}
  //         />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
};

export default App;
