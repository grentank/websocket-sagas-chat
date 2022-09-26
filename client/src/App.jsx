import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoaderWrapper from './components/hoc/LoaderWrapper';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import PostsPage from './components/pages/PostsPage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import NavBar from './components/ui/NavBar';
import { checkAuthAsync } from './redux/actions/authActions';
import { socketInit } from './redux/actions/wsActions';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // Если юзер авторизован, диспатчим инициализацию ws в Саги
    if (authUser?.id) {
      dispatch(socketInit());
    }
  }, [authUser]);
  useEffect(() => {
    // Проверка авторизации
    dispatch(checkAuthAsync());
  }, []);
  return (
    <Container>
      <LoaderWrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute isAllowed={!authUser?.id} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!authUser?.id} />}>
            <Route path="/posts" element={<PostsPage />} />
          </Route>
          <Route
            path="/admin"
            element={(
              <ProtectedRoute isAllowed={!!authUser?.id && authUser.role === 'admin'}>
                <PostsPage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </LoaderWrapper>
    </Container>
  );
}

export default App;
