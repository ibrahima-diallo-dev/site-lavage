/**
 * userService.js
 * SaaS Data Structure for Users/Roles
 */

export const ROLES = {
    ADMIN: 'admin',
    STAFF: 'staff',
    CUSTOMER: 'customer'
};

export const USER_SCHEMA = {
    id: 'string', // uuid
    email: 'string',
    role: 'string', // keyof ROLES
    profile: {
        firstName: 'string',
        lastName: 'string',
        phone: 'string'
    },
    preferences: {
        notifications: 'boolean',
        theme: 'string' // system, light, dark
    },
    createdAt: 'date'
};

export const UserService = {
    // Methods to managing users would go here
    validateRole: (user, requiredRole) => {
        if (!user) return false;
        if (user.role === ROLES.ADMIN) return true; // Admin has all access
        return user.role === requiredRole;
    }
};
