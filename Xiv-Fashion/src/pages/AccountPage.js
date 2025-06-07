import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AccountPage.css';

const AccountPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [tempUserData, setTempUserData] = useState({});
    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        isDefault: false
    });
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });
    const navigate = useNavigate();

    // Sample order history data
    const [orders, setOrders] = useState([
        {
            id: 'ORD-12345',
            date: '2023-05-15',
            items: 3,
            total: 149.99,
            status: 'Delivered',
            tracking: 'SH-987654321'
        },
        {
            id: 'ORD-12344',
            date: '2023-04-28',
            items: 2,
            total: 89.99,
            status: 'Shipped',
            tracking: 'SH-987654322'
        },
        {
            id: 'ORD-12343',
            date: '2023-03-10',
            items: 1,
            total: 49.99,
            status: 'Cancelled',
            tracking: null
        }
    ]);

    useEffect(() => {
        // Check if user is already logged in from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setTempUserData({
                username: parsedUser.username,
                email: parsedUser.email,
                firstName: parsedUser.firstName || '',
                lastName: parsedUser.lastName || '',
                phone: parsedUser.phone || '',
                birthDate: parsedUser.birthDate || '',
                bio: parsedUser.bio || '',
                addresses: parsedUser.addresses || [],
                paymentMethods: parsedUser.paymentMethods || []
            });
        }

        // Check for dark mode preference
        const darkModePref = localStorage.getItem('darkMode') === 'true';
        setDarkMode(darkModePref);
    }, []);

    useEffect(() => {
        // Apply dark mode class to body
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleAuth = (e) => {
        e.preventDefault();
        setError('');

        // Simulate API call
        setTimeout(() => {
            if (isLogin) {
                // Simulate login
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                const foundUser = storedUsers.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    const userWithDefaults = {
                        ...foundUser,
                        addresses: foundUser.addresses || [],
                        paymentMethods: foundUser.paymentMethods || []
                    };
                    setUser(userWithDefaults);
                    setTempUserData({
                        username: userWithDefaults.username,
                        email: userWithDefaults.email,
                        firstName: userWithDefaults.firstName || '',
                        lastName: userWithDefaults.lastName || '',
                        phone: userWithDefaults.phone || '',
                        birthDate: userWithDefaults.birthDate || '',
                        bio: userWithDefaults.bio || '',
                        addresses: userWithDefaults.addresses,
                        paymentMethods: userWithDefaults.paymentMethods
                    });
                    localStorage.setItem('currentUser', JSON.stringify(userWithDefaults));
                } else {
                    setError('Invalid email or password.');
                }
            } else {
                // Simulate signup
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                if (storedUsers.some(u => u.email === email)) {
                    setError('Account with this email already exists.');
                } else {
                    const newUser = { 
                        username, 
                        email, 
                        password, 
                        id: Date.now(),
                        addresses: [],
                        paymentMethods: []
                    };
                    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
                    setUser(newUser);
                    setTempUserData({
                        username: newUser.username,
                        email: newUser.email,
                        firstName: '',
                        lastName: '',
                        phone: '',
                        birthDate: '',
                        bio: '',
                        addresses: [],
                        paymentMethods: []
                    });
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                }
            }
        }, 1000);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        const updatedUser = {
            ...user,
            ...tempUserData
        };
        setUser(updatedUser);
        
        // Update in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = storedUsers.map(u => 
            u.id === user.id ? updatedUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setTempUserData({
            username: user.username,
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            phone: user.phone || '',
            birthDate: user.birthDate || '',
            bio: user.bio || '',
            addresses: user.addresses || [],
            paymentMethods: user.paymentMethods || []
        });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        const updatedAddresses = [...tempUserData.addresses, newAddress];
        setTempUserData(prev => ({
            ...prev,
            addresses: updatedAddresses
        }));
        setNewAddress({
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            isDefault: false
        });
    };

    const handleRemoveAddress = (index) => {
        const updatedAddresses = tempUserData.addresses.filter((_, i) => i !== index);
        setTempUserData(prev => ({
            ...prev,
            addresses: updatedAddresses
        }));
    };

    const handleSetDefaultAddress = (index) => {
        const updatedAddresses = tempUserData.addresses.map((addr, i) => ({
            ...addr,
            isDefault: i === index
        }));
        setTempUserData(prev => ({
            ...prev,
            addresses: updatedAddresses
        }));
    };

    const handleAddPaymentMethod = (e) => {
        e.preventDefault();
        const updatedPaymentMethods = [...tempUserData.paymentMethods, newPaymentMethod];
        setTempUserData(prev => ({
            ...prev,
            paymentMethods: updatedPaymentMethods
        }));
        setNewPaymentMethod({
            cardNumber: '',
            cardName: '',
            expiry: '',
            cvv: ''
        });
    };

    const handleRemovePaymentMethod = (index) => {
        const updatedPaymentMethods = tempUserData.paymentMethods.filter((_, i) => i !== index);
        setTempUserData(prev => ({
            ...prev,
            paymentMethods: updatedPaymentMethods
        }));
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
        exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.3 } }
    };

    const profileVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const cardVariants = {
        hover: { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
        tap: { scale: 0.98 }
    };

    return (
        <>
            <Header />
            <motion.div
                className={`account-page-container ${darkMode ? 'dark-mode' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="account-page-title">
                    {user ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Welcome back, <span className="highlight-text">{user.username}</span>!
                        </motion.span>
                    ) : (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Account
                        </motion.span>
                    )}
                </h1>

                <AnimatePresence mode="wait">
                    {user ? (
                        <motion.div
                            key="profile"
                            className="user-profile-container"
                            variants={profileVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="profile-header">
                                <div className="profile-actions">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="logout-button"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </motion.button>
                                    {/* <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="dark-mode-toggle"
                                        onClick={() => setDarkMode(!darkMode)}
                                    >
                                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                                    </motion.button> */}
                                </div>
                                
                                <div className="profile-tabs">
                                    {['profile', 'orders', 'addresses', 'payments'].map((tab) => (
                                        <motion.button
                                            key={tab}
                                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * ['profile', 'orders', 'addresses', 'payments'].indexOf(tab) }}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' && (
                                    <motion.div
                                        className="profile-content"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        key="profile-tab"
                                    >
                                        <h2>Personal Information</h2>
                                        {isEditing ? (
                                            <motion.div 
                                                className="edit-profile-form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Username</label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={tempUserData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={tempUserData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={tempUserData.firstName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={tempUserData.lastName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={tempUserData.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Birth Date</label>
                                                        <input
                                                            type="date"
                                                            name="birthDate"
                                                            value={tempUserData.birthDate}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Bio</label>
                                                    <textarea
                                                        name="bio"
                                                        value={tempUserData.bio}
                                                        onChange={handleInputChange}
                                                        rows="4"
                                                    />
                                                </div>
                                                
                                                <div className="form-actions">
                                                    <motion.button
                                                        className="save-button"
                                                        onClick={handleSaveProfile}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Save Changes
                                                    </motion.button>
                                                    <motion.button
                                                        className="cancel-button"
                                                        onClick={handleCancelEdit}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Cancel
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                className="profile-info"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="info-grid">
                                                    <div className="info-item">
                                                        <span className="info-label">Username:</span>
                                                        <span className="info-value">{user.username}</span>
                                                    </div>
                                                    <div className="info-item">
                                                        <span className="info-label">Email:</span>
                                                        <span className="info-value">{user.email}</span>
                                                    </div>
                                                    {user.firstName && (
                                                        <div className="info-item">
                                                            <span className="info-label">First Name:</span>
                                                            <span className="info-value">{user.firstName}</span>
                                                        </div>
                                                    )}
                                                    {user.lastName && (
                                                        <div className="info-item">
                                                            <span className="info-label">Last Name:</span>
                                                            <span className="info-value">{user.lastName}</span>
                                                        </div>
                                                    )}
                                                    {user.phone && (
                                                        <div className="info-item">
                                                            <span className="info-label">Phone:</span>
                                                            <span className="info-value">{user.phone}</span>
                                                        </div>
                                                    )}
                                                    {user.birthDate && (
                                                        <div className="info-item">
                                                            <span className="info-label">Birth Date:</span>
                                                            <span className="info-value">
                                                                {new Date(user.birthDate).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {user.bio && (
                                                        <div className="info-item full-width">
                                                            <span className="info-label">Bio:</span>
                                                            <span className="info-value">{user.bio}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <motion.button
                                                    className="edit-button"
                                                    onClick={handleEditProfile}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Edit Profile
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'orders' && (
                                    <motion.div
                                        className="orders-content"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        key="orders-tab"
                                    >
                                        <h2>Your Order History</h2>
                                        {orders.length === 0 ? (
                                            <motion.div 
                                                className="empty-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <p>You haven't placed any orders yet.</p>
                                                <motion.button
                                                    className="shop-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate('/products')}
                                                >
                                                    Start Shopping
                                                </motion.button>
                                            </motion.div>
                                        ) : (
                                            <div className="orders-list">
                                                {orders.map((order, index) => (
                                                    <motion.div
                                                        key={order.id}
                                                        className="order-card"
                                                        variants={cardVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <div className="order-header">
                                                            <span className="order-id">Order #{order.id}</span>
                                                            <span className={`order-status ${order.status.toLowerCase()}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <div className="order-details">
                                                            <div className="order-date">
                                                                <span>Date:</span>
                                                                <span>{order.date}</span>
                                                            </div>
                                                            <div className="order-items">
                                                                <span>Items:</span>
                                                                <span>{order.items}</span>
                                                            </div>
                                                            <div className="order-total">
                                                                <span>Total:</span>
                                                                <span>${order.total.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        {order.tracking && (
                                                            <div className="order-tracking">
                                                                <span>Tracking:</span>
                                                                <span>{order.tracking}</span>
                                                            </div>
                                                        )}
                                                        <div className="order-actions">
                                                            <motion.button
                                                                className="view-order-button"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                View Details
                                                            </motion.button>
                                                            {order.status === 'Delivered' && (
                                                                <motion.button
                                                                    className="reorder-button"
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    Reorder
                                                                </motion.button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'addresses' && (
                                    <motion.div
                                        className="addresses-content"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        key="addresses-tab"
                                    >
                                        <h2>Your Addresses</h2>
                                        {tempUserData.addresses.length === 0 ? (
                                            <motion.div 
                                                className="empty-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <p>You haven't saved any addresses yet.</p>
                                            </motion.div>
                                        ) : (
                                            <div className="addresses-list">
                                                {tempUserData.addresses.map((address, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className={`address-card ${address.isDefault ? 'default' : ''}`}
                                                        variants={cardVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        {address.isDefault && (
                                                            <div className="default-badge">Default</div>
                                                        )}
                                                        <div className="address-details">
                                                            <p>{address.street}</p>
                                                            <p>{address.city}, {address.state} {address.zip}</p>
                                                            <p>{address.country}</p>
                                                        </div>
                                                        <div className="address-actions">
                                                            {!address.isDefault && (
                                                                <motion.button
                                                                    className="set-default-button"
                                                                    onClick={() => handleSetDefaultAddress(index)}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    Set as Default
                                                                </motion.button>
                                                            )}
                                                            <motion.button
                                                                className="remove-button"
                                                                onClick={() => handleRemoveAddress(index)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Remove
                                                            </motion.button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="add-address-form">
                                            <h3>Add New Address</h3>
                                            <form onSubmit={handleAddAddress}>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Street Address</label>
                                                        <input
                                                            type="text"
                                                            value={newAddress.street}
                                                            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input
                                                            type="text"
                                                            value={newAddress.city}
                                                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>State/Province</label>
                                                        <input
                                                            type="text"
                                                            value={newAddress.state}
                                                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>ZIP/Postal Code</label>
                                                        <input
                                                            type="text"
                                                            value={newAddress.zip}
                                                            onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <input
                                                            type="text"
                                                            value={newAddress.country}
                                                            onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id="defaultAddress"
                                                        checked={newAddress.isDefault}
                                                        onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                                                    />
                                                    <label htmlFor="defaultAddress">Set as default address</label>
                                                </div>
                                                <motion.button
                                                    type="submit"
                                                    className="add-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Add Address
                                                </motion.button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'payments' && (
                                    <motion.div
                                        className="payments-content"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        key="payments-tab"
                                    >
                                        <h2>Your Payment Methods</h2>
                                        {tempUserData.paymentMethods.length === 0 ? (
                                            <motion.div 
                                                className="empty-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <p>You haven't saved any payment methods yet.</p>
                                            </motion.div>
                                        ) : (
                                            <div className="payments-list">
                                                {tempUserData.paymentMethods.map((method, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="payment-card"
                                                        variants={cardVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <div className="payment-details">
                                                            <div className="card-icon">
                                                                {method.cardNumber.startsWith('4') ? 'VISA' : 
                                                                 method.cardNumber.startsWith('5') ? 'MASTERCARD' : 
                                                                 method.cardNumber.startsWith('3') ? 'AMEX' : 'CARD'}
                                                            </div>
                                                            <div className="card-info">
                                                                <p className="card-name">{method.cardName}</p>
                                                                <p className="card-number">
                                                                    •••• •••• •••• {method.cardNumber.slice(-4)}
                                                                </p>
                                                                <p className="card-expiry">Expires {method.expiry}</p>
                                                            </div>
                                                        </div>
                                                        <div className="payment-actions">
                                                            <motion.button
                                                                className="remove-button"
                                                                onClick={() => handleRemovePaymentMethod(index)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Remove
                                                            </motion.button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="add-payment-form">
                                            <h3>Add New Payment Method</h3>
                                            <form onSubmit={handleAddPaymentMethod}>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Card Number</label>
                                                        <input
                                                            type="text"
                                                            value={newPaymentMethod.cardNumber}
                                                            onChange={(e) => setNewPaymentMethod({
                                                                ...newPaymentMethod, 
                                                                cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
                                                            })}
                                                            placeholder="1234 5678 9012 3456"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Cardholder Name</label>
                                                        <input
                                                            type="text"
                                                            value={newPaymentMethod.cardName}
                                                            onChange={(e) => setNewPaymentMethod({
                                                                ...newPaymentMethod, 
                                                                cardName: e.target.value
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            value={newPaymentMethod.expiry}
                                                            onChange={(e) => setNewPaymentMethod({
                                                                ...newPaymentMethod, 
                                                                expiry: e.target.value
                                                            })}
                                                            placeholder="MM/YY"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>CVV</label>
                                                        <input
                                                            type="text"
                                                            value={newPaymentMethod.cvv}
                                                            onChange={(e) => setNewPaymentMethod({
                                                                ...newPaymentMethod, 
                                                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                                                            })}
                                                            placeholder="123"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <motion.button
                                                    type="submit"
                                                    className="add-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Add Payment Method
                                                </motion.button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="auth-form"
                            className="auth-form-card"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>
                            {error && <motion.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
                            <form onSubmit={handleAuth}>
                                {!isLogin && (
                                    <motion.div
                                        className="form-group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={!isLogin}
                                        />
                                    </motion.div>
                                )}
                                <motion.div
                                    className="form-group"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    className="form-group"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="submit-button"
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </motion.button>
                            </form>
                            <motion.p
                                className="toggle-auth-mode"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <motion.span
                                    whileHover={{ color: '#007bff', cursor: 'pointer' }}
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </motion.span>
                            </motion.p>
                            
                            <div className="auth-divider">
                                <span>or</span>
                            </div>
                            
                            <div className="social-auth">
                                <motion.button
                                    className="social-button google"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Continue with Google
                                </motion.button>
                                <motion.button
                                    className="social-button facebook"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Continue with Facebook
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <Footer />
        </>
    );
};

export default AccountPage;