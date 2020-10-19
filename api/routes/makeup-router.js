
const express = require('express')

const MakeupCtrl = require('../controllers/makeup-ctrl')

const router = express.Router()

router.post('/movie', MakeupCtrl.createMovie)
router.put('/movie/:id', MakeupCtrl.updateMovie)
router.delete('/movie/:id', MakeupCtrl.deleteMovie)
router.get('/movie/:id', MakeupCtrl.getMovieById)
router.get('/movies', MakeupCtrl.getMovies)

module.exports = router