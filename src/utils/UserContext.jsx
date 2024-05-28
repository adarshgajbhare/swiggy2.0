/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from 'react';

const UserContext = createContext({ user: null, setUser: () => {} });

// ... rest of your UserContext code


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing user on app load (optional)
    const loggedUser = localStorage.getItem('loggedInUser'); // Or other storage mechanism
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Update user state based on login/logout events (explained next)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
