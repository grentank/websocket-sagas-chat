import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../ui/Loader';

export default function LoaderWrapper({ children }) {
  const authUser = useSelector((state) => state.authUser);
  if (!authUser) {
    return <Loader />;
  }
  return children;
}
