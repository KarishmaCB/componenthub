import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import DataDeletion from './components/DataDeletion';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route - Auth Page */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated() ? (
              <AuthPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />
        
        {/* Protected Route - Dashboard (Any authenticated user) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route - Admin Panel (Admin only) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Public Route - Data Deletion (Facebook Compliance) */}
        <Route 
          path="/data-deletion" 
          element={<DataDeletion />} 
        />
        
        {/* Default Route - Redirect based on auth status */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={isAuthenticated() ? "/dashboard" : "/login"} 
              replace 
            />
          } 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <Navigate 
              to={isAuthenticated() ? "/dashboard" : "/login"} 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
