const express = require('express')
const passport = require('passport')
const router = express.Router()

// Authenticate w Google
//get /backend/routes/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// auth callback
// /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: 
'/'}), (req, res) => {
    res.redirect('/index')
})

module.exports = router