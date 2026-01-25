import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserOverview = () => {

  const navigate = useNavigate();

  const {isLogin} = useAuth();

  if(!isLogin){
    navigate('/login');
  }

  return (
    <div>
      Overview
    </div>
  )
}

export default UserOverview
