const express = require('express');
const Session  = require('../model/Session');
//const Auth = require('../model/User')

exports.freeSessions = async (req,res) => {

    const  availableSlots = [
        new Date('2023-08-31T10:00:00'),
        new Date('2023-09-01T10:00:00')
    ];
    res.json(availableSlots);
};

exports.bookSessions = async (req,res) => {
    const { slot } = req.body;
    try{
        const session = new Session({
            studentName: req.user.universityId,
            slot,
            status: 'pending'
        });
        await session.save();
        res.json({ message: 'Session booked sucessfully'})
    }catch(err) {
        res.status(200).json(err)
    }
};

exports.pendingSessions = async (req,res) => {
   const deanId = req.user.universityId;
   const pendingSessions = await Session.find({ deanId, status: 'pending'});
   res.json(pendingSessions)
}