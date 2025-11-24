'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

export const LogoutButton: React.FC = () => {
  const { logOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
      // Redirect to login page after logout
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '1.2rem', 
      right: '1rem', 
      zIndex: 9999,
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="icon"
      >
        <LogOut size={16} />
      </Button>
    </div>
  )
}
