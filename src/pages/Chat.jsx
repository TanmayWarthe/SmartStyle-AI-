import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home since chat is now a modal
    navigate('/');
  }, [navigate]);

  return null;
}
