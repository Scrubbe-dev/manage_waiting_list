import { useState, FormEvent, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import AuthWrapper from '@/components/auth/AuthWrapper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const { login, isLoading, error } = useAuthStore();

  // Email validation
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email && password && isEmailValid) {
      setAnimationClass('animate-pulse');
      console.log(email,password)
      await login(email, password);
      setAnimationClass('');
    } else {
      setAnimationClass('animate-shake');
      setTimeout(() => setAnimationClass(''), 500);
    }
  };

  // Create particle effect for background
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(66, 153, 225, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    createParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen py-24 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
      <canvas id="particles" className="absolute inset-0 z-0"></canvas>
      
      <div className={`relative z-10 p-8 bg-white bg-opacity-10 mx-auto backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20 ${animationClass}`}>
       <div className='w-full flex justify-center'>
        <div className=" w-32 h-32 bg-gradient-to-r from-blue-400 -translate-t-20 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-full">
            <Lock size={48} className="text-white" />
          </div>
        </div>
       </div>
        <h1 className="text-3xl font-bold mt-5 mb-2 text-center text-white">Welcome Back</h1>
        <p className="text-center text-blue-100 mb-12">Enter your credentials to access your account</p>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-400 text-white px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-blue-100 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-blue-300" />
              </div>
              <input
                id="email"
                type="email"
                className={`bg-white bg-opacity-10 shadow-inner border ${
                  isEmailValid ? 'border-blue-300' : 'border-red-400'
                } rounded-lg w-full py-3 pl-10 pr-3 text-white placeholder-blue-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200`}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            {!isEmailValid && email && (
              <p className="mt-1 text-sm text-red-300">Please enter a valid email address</p>
            )}
          </div>
          
          <div className="relative">
            <label className="block text-blue-100 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-blue-300" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`bg-white bg-opacity-10 shadow-inner border border-blue-300 rounded-lg w-full py-3 pl-10 pr-10 text-white placeholder-blue-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-300 hover:text-white transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isPasswordFocused && (
              <div className="absolute mt-1 right-0 text-xs text-blue-200">
                <span>Password strength: </span>
                <span className={`font-medium ${password.length > 8 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {password.length === 0 ? 'None' : password.length < 6 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-blue-300 rounded focus:ring-blue-400"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-300 hover:text-white transition duration-200">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition duration-300 transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock size={18} className="text-blue-300 group-hover:text-blue-200 transition-colors duration-200" />
              </span>
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Sign in securely'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function MainLogin(){
  return(
    <AuthWrapper>
         <Login />
    </AuthWrapper>
  )
}