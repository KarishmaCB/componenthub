import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPageNew from './components/auth/AuthPageNew';
import Dashboard from './components/Dashboard';
import ComponentShowcase from './components/ComponentShowcase';
import AdminPanel from './pages/AdminPanel';
import DataDeletion from './components/DataDeletion';
import StorybookWrapper from './components/StorybookWrapper';
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
              <AuthPageNew />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        {/* Protected Route - Main Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route - Component Showcase */}
        <Route 
          path="/components" 
          element={
            <ProtectedRoute>
              <ComponentShowcase />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route - Storybook (Admin only) */}
        <Route 
          path="/storybook" 
          element={
            <ProtectedRoute requiredRole="admin">
              <StorybookWrapper />
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
        
        {/* Default Route - Dashboard */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <Navigate 
              to={isAuthenticated() ? "/" : "/login"} 
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
