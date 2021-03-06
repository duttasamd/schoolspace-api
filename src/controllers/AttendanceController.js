const AttendanceService = require('../services/AttendanceService');
const moment = require('moment');

class AttendanceController {
    async list (req, res) {
        const sectionId = req.params.sectionId;
        let date = req.query.date;

        if(sectionId > 0) {
            const attendances = await AttendanceService.list(sectionId, date);
            res.json(attendances);
        } else {
            res.sendStatus(400);
        }
        
    }

    async add (req, res) {
        console.log(req.body);
        const attendance = {
            section_id : parseInt(req.body.sectionId),
            user_id : req.body.userId,
            is_present : req.body.isPresent,
            note : req.body.note,
            logged_by : req.user.user_id,
            date : req.body.date
        }

        if(!attendance.section_id || !attendance.user_id || attendance.is_present === null) {
            console.log("Bad Request");
            res.status(400);
            res.end();
            return;
        }

        try {
            await AttendanceService.add(attendance);
            res.status(200);
            res.end();
        } catch(err) {
            res.status(500);
            res.json(err);
        }
    }
}

module.exports = new AttendanceController();