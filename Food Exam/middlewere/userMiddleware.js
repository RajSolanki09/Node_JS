
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.roles !== admin || req.user.roles !== user) {
            return res.status(401).json({ error: error.message });
        }
        next();
    };
};

module.exports = { checkRole };
