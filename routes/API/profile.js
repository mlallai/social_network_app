const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');


// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "PROFILE WORKS"}))

// @route GET api/profile/
// @desc Get Current User Profile
// @access Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = "No Profile for this user";
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/profile/
// @desc Create User or Edit profile
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.handle = req.body.company;
    if (req.body.website) profileFields.handle = req.body.website;
    if (req.body.location) profileFields.handle = req.body.location;
    if (req.body.status) profileFields.handle = req.body.status;
    if (req.body.githubusername) profileFields.handle = req.body.githubusername;
    // Skills - Split into an array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.youtube;
    if (req.body.facebook) profileFields.social.youtube = req.body.facebook;
    if (req.body.linkedin) profileFields.social.youtube = req.body.linkedin;
    if (req.body.instagram) profileFields.social.youtube = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    {$set: profileFIelds},
                    { new: true}
                    )
                    .then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profil => {
                        if (profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        // Save profile
                        new profileFields(profileFields).save().then(profile => res.json(profile));
                    })
            }
        })
});


module.exports = router;