const isSuperAdmin = (req, res, next) => {
    if (req.user.role === "superadmin") {
        return next();
    } else {
        return res.status(403).json({ message: "not allowed to access" });
    }
};  

const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).json({ message: "not allowed to access" });
    }
};

module.exports = { isSuperAdmin, isAdmin };
