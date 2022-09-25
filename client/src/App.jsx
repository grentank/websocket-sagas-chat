import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import PostsPage from './components/pages/PostsPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import NavBar from './components/ui/NavBar';
import { checkAuthAsync } from './redux/actions/authActions';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute isAllowed={!authUser?.id} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authUser?.id} />}>
          <Route path="/posts" element={<PostsPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
