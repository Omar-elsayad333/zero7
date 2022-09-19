import { useState, createContext } from "react";

// create context for login global state
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // The data that gets stored in context
    const [ token, setToken] = useState(localStorage.getItem('token'));
    const [ auth, setAuth] = useState(localStorage.getItem('role'))
    const [ user, setUser] = useState({ token: token, auth: auth });
  
    // Login updates the user data with a token and role parameter
    const login = (userToken, auth) => {
        setUser((user) => ({
            token: userToken,
            auth: auth, 
        }));
    };
  
    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            token: '',   
            auth: false,
        }));
        sessionStorage.clear();
    };
  
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider> 
    );
};