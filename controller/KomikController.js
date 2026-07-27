const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('error fetching komik: ', err.message);
        res.status(500).json({error: 'failed to fetch komik'});
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({error: 'komik tidak ditemukan'});
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('error fetching komik by id: ', err.message);
        res.status(500).json({ error: 'failed to fetch komik by id'});

    }
    
}

async function createKomik(req, res) {
  const { title, description, author } = req.body;
  try {
    const newKomik = await db.komik.create({ title, description, author });
    res.status(201).json(newKomik);
  } catch (err) {
    console.error("error creating komik: ", err.message);
    res.status(500).json({ error: "failed to create komik" });
  }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({error: 'komik not found'});
        }
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.json(komik);
    } catch (err) {
        console.error('error updating komik', err.message);
        res.status(500).json({error: 'failed to update komik'})
    }
    
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try{
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({error: 'komik not found'});
        }
        await komik.destroy();
        res.status(200).json({message: 'komik deleted successfully'});
        

    } catch (err) {
        console.error('error deleting komik', err.message);
        res.status(500).json({error: 'failed to delete komik'})
    }
    
}
module.exports = {
    getAllKomik,
    getKomikById,
    deleteKomik,
    createKomik,
    updateKomik
}