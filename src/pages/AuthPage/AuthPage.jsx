import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

  return (
    <main>
        <h1>AuthPage</h1>
        {showLogin ? (
            <LoginForm setUser={setUser} />
        ) : (
            <SignUpForm setUser={setUser} />
        )}
        <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Sign Up' : 'Log In'}
        </button>
    </main>
  );
}