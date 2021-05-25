const express = require('express');
const router = express.Router();

// middleware
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require('../controllers/catagory');

// routes

router.post('/catagory', authCheck, adminCheck, create);
router.get('/catagories', list);
router.get('/catagory/:slug', read);
router.put('/catagory/:slug', authCheck, adminCheck, update);
router.delete('/catagory/:slug', authCheck, adminCheck, remove);
router.get('/catagory/subs/:_id', getSubs);

module.exports = router;
