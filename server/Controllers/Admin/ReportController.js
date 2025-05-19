const {Report} = require('../../models/models')

class ReportController  {
    async create(req, res) {
        try {
            const report = await Report.create(req.body);
            res.status(201).json(report);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const reports = await Report.findAll();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getByUser(req, res) {
    try {
        const reports = await Report.findAll({
            where: { idReportedByUser: req.params.userId }
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    async getById(req, res) {
        try {
            const report = await Report.findByPk(req.params.id);
            if (!report) return res.status(404).json({ error: 'Report not found' });
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const report = await Report.update(req.body, { where: { idReport: req.params.id } });
            if (!report[0]) return res.status(404).json({ error: 'Report not found' });
            res.status(200).json({ message: 'Report updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Report.destroy({ where: { idReport: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Report not found' });
            res.status(200).json({ message: 'Report deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = new ReportController();