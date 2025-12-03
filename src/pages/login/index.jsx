import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  loginUser, 
  selectAuthLoading, 
  selectAuthError, 
  selectIsAuthenticated,
  selectRole,
  clearAuthError 
} from '../../slices/authSlice';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectRole);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userRole) {
      redirectBasedOnRole(userRole);
    }
  }, [isAuthenticated, userRole]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const redirectBasedOnRole = (role) => {
    // Convert role to lowercase for comparison
    const normalizedRole = role?.toLowerCase();
    
    switch(normalizedRole) {
      case 'education':
        router.push('/(education)/dashboard');
        break;
      case 'library':
        router.push('/(library)/dashboard');
        break;
      case 'consultancy':
        router.push('/(consultancy)/dashboard');
        break;
      case 'construction':
        router.push('/(construction)/dashboard');
        break;
      default:
        router.push('/(education)/dashboard');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Call login API with role
        const result = await dispatch(loginUser({
          username: values.email,
          password: values.password,
          role: values.role.toLowerCase()
        })).unwrap();
        
        // Success - show toast and redirect based on API response role
        toast.success('Login successful!');
        redirectBasedOnRole(result.role);
        
      } catch (err) {
        // Error is handled by the slice and shown via useEffect
        console.error('Login failed:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/login/dd34f2caf11d4e4f235559eba14bf832 (1).svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-",
      }}
    >
      <img src="'/login/dd34f2caf11d4e4f235559eba14bf832 (1).svg" alt="" />
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b0b6f7]/20 via-[#a3b6e7]/20 to-[#4b3c7c]/20 z-0" />
      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-4 sm:p-8 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center drop-shadow">Login</h2>
        <form className="w-full flex flex-col gap-4 sm:gap-6" onSubmit={formik.handleSubmit} noValidate>
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              className={`w-full py-2.5 sm:py-3 pl-5 pr-12 rounded-full bg-white/40 text-[#4b3c7c] placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-white/30 shadow text-sm sm:text-base ${formik.touched.email && formik.errors.email ? 'border-red-400' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="email"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b3c7c]">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8"/></svg>
            </span>
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-500 mt-1 ml-2">{formik.errors.email}</div>
            )}
          </div>
          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full py-2.5 sm:py-3 pl-5 pr-12 rounded-full bg-white/40 text-[#4b3c7c] placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-white/30 shadow text-sm sm:text-base ${formik.touched.password && formik.errors.password ? 'border-red-400' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="current-password"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b3c7c]">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-500 mt-1 ml-2">{formik.errors.password}</div>
            )}
          </div>
          {/* Role Select Field */}
          <div className="relative">
            <select
              name="role"
              className={`w-full py-2.5 sm:py-3 pl-5 pr-12 rounded-full bg-white/40 text-[#4b3c7c] placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-white/30 shadow text-sm sm:text-base ${formik.touched.role && formik.errors.role ? 'border-red-400' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="">Select Role</option>
              <option value="Education">Education</option>
              <option value="Library">Library</option>
              <option value="Construction">Construction</option>
              <option value="Consultancy">Consultancy</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-xs text-red-500 mt-1 ml-2">{formik.errors.role}</div>
            )}
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 cursor-pointer rounded-full bg-white text-indigo-700 font-semibold text-base sm:text-lg shadow hover:bg-indigo-100 transition-colors flex items-center justify-center"
            disabled={formik.isSubmitting || loading}
          >
            {(formik.isSubmitting || loading) ? (
              <svg className="animate-spin h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
        {/* Register Link */}
        <div className="mt-4 sm:mt-6 text-white/80 text-xs sm:text-sm text-center">
          Don&apos;t have an account?{' '}
          <a className="text-white font-semibold underline hover:text-indigo-200">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;