import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';

interface AuthPageProps {
    mode: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
    return <AuthLayout initialMode={mode} />;
};
