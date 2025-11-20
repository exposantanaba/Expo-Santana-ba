import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { NavItem } from '../types';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Senha segura conforme solicitado
    if (password === 'Adesivo23@1999') {
      localStorage.setItem('isAdmin', 'true');
      navigate(NavItem.ADMIN);
    } else {
      setError('Acesso negado. Senha incorreta.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-brand-50 rounded-full">
            <Lock className="w-8 h-8 text-brand-600" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-brand-900 mb-6">Acesso Restrito</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Administrador</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-md"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;