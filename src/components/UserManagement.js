import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import './UserManagement.css';

const UserManagement = () => {
  const { updateUserRole, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isAdmin()) {
      setLoading(false);
      return;
    }

    try {
      const usersQuery = query(
        collection(db, 'users'), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(usersQuery);
      
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!isAdmin()) return;

    setUpdating(userId);
    try {
      const result = await updateUserRole(userId, newRole);
      
      if (result.success) {
        // Update local state
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, role: newRole }
            : user
        ));
        
        showToast(`User role updated to ${newRole}`);
      } else {
        showToast('Failed to update user role', 'error');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      showToast('Failed to update user role', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#8b5cf6';
      case 'user':
        return '#4a9b8e';
      default:
        return '#64748b';
    }
  };

  if (!isAdmin()) {
    return (
      <div className="user-management-error">
        <h3>Access Denied</h3>
        <p>You need administrator privileges to access user management.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <p>Manage user roles and permissions for ComponentHub</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat">
            <span className="stat-number">{users.filter(u => u.role === 'admin').length}</span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat">
            <span className="stat-number">{users.filter(u => u.role === 'user').length}</span>
            <span className="stat-label">Users</span>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
              <th>Joined</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="user-avatar"
                      />
                    ) : (
                      <div className="user-avatar-placeholder">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="user-name">{user.name || 'Unknown'}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(user.role) }}
                  >
                    {user.role?.toUpperCase() || 'USER'}
                  </span>
                </td>
                <td>
                  <span className="provider-badge">
                    {user.provider || 'email'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>
                  <div className="user-actions">
                    <select
                      value={user.role || 'user'}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updating === user.id}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    {updating === user.id && (
                      <div className="updating-indicator">
                        <div className="mini-spinner"></div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="no-users">
          <p>No users found. Users will appear here after they sign up.</p>
        </div>
      )}

      <div className="role-info">
        <h3>Role Permissions</h3>
        <div className="roles-grid">
          <div className="role-card">
            <h4>User</h4>
            <ul>
              <li>View component library</li>
              <li>Browse Storybook components</li>
              <li>Copy installation commands</li>
              <li>Access interactive examples</li>
            </ul>
          </div>
          <div className="role-card admin">
            <h4>Admin</h4>
            <ul>
              <li>All user permissions</li>
              <li>Create new components</li>
              <li>Edit existing components</li>
              <li>Manage user roles</li>
              <li>Access admin panel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;