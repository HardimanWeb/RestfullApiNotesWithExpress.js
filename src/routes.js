const express = require('express');
const router = express.Router();
const notes = require('./notes')
const { nanoid } = require('nanoid');

router.get("/",(req,res)=>{
    res.send("Homepage")
})

// Mengirim Notes
router.post("/notes",(req,res)=>{
  const { title, tags, body } =  req.body;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const id = nanoid(16);
  const newNote = {
     title, tags, body, id, createdAt, updatedAt,
  };
 
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
 
  if (isSuccess) {
    res.status(200).json({ 
      status: 'success',
       message: `Catatan berhasil ditambahkan`,
       data: {
        noteId: id,
      },
    });
  }
  else{
    res.status(500).json({ 
      status: 'fail',
    message: 'Catatan gagal ditambahkan',
    });
  }
  
});

// === Menampilkan Notes
router.get("/notes",(req,res)=>{
  res.status(200).json({ 
    status: 'success',
     data: {
      notes,
    },
  });
});

// === Menampilkan Notes spesifik
router.get('/notes/:id', function(req, res, next) {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];
 
 if (note !== undefined) {
  res.status(200).json({
    status: 'success',
    data: {
      note,
    },
  });
  }
  else{
    res.status(404).json({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
}
});

// Mengubah Notes
router.put('/notes/:id', function(req, res, next) {
  const { id } = req.params;
  const { title, tags, body } =  req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    res.status(200).json({ 
      status: 'success',
       message: `Catatan berhasil diperbarui`,
    });
  }
  else{
    res.status(200).json({ 
      status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
  }
});

// Delete notes
router.delete('/notes/:id', function(req, res, next) {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  }
 else{
   res.status(404).json({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
 }
});
module.exports = router;