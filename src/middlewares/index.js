const {verifyToken, isModerator, isAdmin} = require('./authMiddle');

const {verifyUserAndEmail, verifyRoles} = require('./authValidator');

module.exports = {verifyToken, isModerator, isAdmin, verifyUserAndEmail, verifyRoles};