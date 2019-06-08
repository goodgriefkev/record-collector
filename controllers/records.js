const express = require('express');
const router = express.Router();
const Record = require('../models/records.js');

//INDEX
router.get('/', (req, res) => {
  // res.send('index');
  Record.find({}, (err, allRecords) => {
    if(err) {
      res.send('Error displaying records')
    } else {
      res.render('index.ejs', {
        records: allRecords,
        currentUser: req.session.currentUser
      });
    }
  })
});

//NEW
router.get('/new', (req, res) => {
  // res.send('new route');
  res.render('new.ejs');
});

//CREATE
router.post('/', (req, res) => {
  Record.create(req.body, (err, createdRecord) => {
    if (err) {
      res.send('Record not created');
    } else {
      console.log(createdRecord);
      // res.send(createdRecord);
      res.redirect('/records');
    }
  })
});

//SEED
router.get('/seed', async (req, res) => {
  const newRecords =
    [
      {
        title: "Sgt. Pepper's Lonely Hearts Club Band",
        artist: "The Beatles",
        year: 1967,
        format: "LP",
        description: "Eighth studio album by Englsh rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg"
      },
      {
        title: "Document",
        artist: "R.E.M.",
        year: 1987,
        format: "LP",
        description: "Fifth studio album by American rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/6/6f/R.E.M._-_Document.jpg"
      },
      {
        title: "Everything Sucks",
        artist: "Descendents",
        year: 1996,
        format: "LP",
        description: "Fifth studio album by American punk rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/1/1e/Descendents_-_Everything_Sucks_cover.jpg"
      },
      {
        title: "American Football",
        artist: "American Football",
        year: 1999,
        format: "LP",
        description: "Eponymous debut studio album by American rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/e/e6/American_football_band_lp_cover.png"
      },
      {
        title: "Late Registration",
        artist: "Kanye West",
        year: 2005,
        format: "LP",
        description: "Second studio album by American rapper and producer.",
        img: "https://upload.wikimedia.org/wikipedia/en/f/f4/Late_registration_cd_cover.jpg"
      },
      {
        title: "Greatest Hits",
        artist: "Tom Petty and the Heartbreakers",
        year: 1993,
        format: "LP",
        description: "Eighth studio album by Englsh rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/9/9e/Tom_Petty_Greatest_Hits_2008.jpg"
      },
      {
        title: "Liquid Swords",
        artist: "GZA",
        year: 1995,
        format: "LP",
        description: "Second solo studio album by American rapper.",
        img: "https://upload.wikimedia.org/wikipedia/en/e/e2/GZALiquidSwords.jpg"
      },
      {
        title: "It's Hard To Find A Friend",
        artist: "Pedro the Lion",
        year: 1998,
        format: "LP",
        description: "Debut full-length album by American rock band.",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/Hard_to_find_a_friend.jpg"
      },
      {
        title: "The Low End Theory",
        artist: "A Tribe Called Quest",
        year: 1991,
        format: "LP",
        description: "Second studio album by American hip hop group.",
        img: "https://upload.wikimedia.org/wikipedia/en/4/42/ATribeCalledQuestTheLowEndtheory.jpg"
      },
      {
        title: "When the Pawn Hits the Conflicts He Thinks Like a King What He Knows Throws the Blows When He Goes to the Fight and He'll Win the Whole Thing 'fore He Enters the Ring There's No Body to Batter When Your Mind Is Your Might so When You Go Solo, You Hold Your Own Hand and Remember That Depth Is the Greatest of Heights and If You Know Where You Stand, Then You Know Where to Land and If You Fall It Won't Matter, Cuz You'll Know That You're Right.",
        artist: "Fiona Apple",
        year: 1999,
        format: "LP",
        description: "Second studio album by American singer-songwriter. Why is this title so long?",
        img: "https://upload.wikimedia.org/wikipedia/en/2/24/Fiona_apple_when_the_pawn.jpg"
      },
      {
        title: "The Crow: Original Motion Picture Soundtrack",
        artist: "Various Artists",
        year: 1994,
        format: "CD",
        description: "Ubiquitous.",
        img: "https://upload.wikimedia.org/wikipedia/en/7/72/The_Crow_soundtrack_album_cover.jpg"
      },
      {
        title: "Unfun",
        artist: "Jawbreaker",
        year: 1990,
        format: "LP",
        description: "Debut studio album by American band.",
        img: "https://upload.wikimedia.org/wikipedia/en/0/08/Jawbreaker_-_Unfun_cover.jpg"
      }
    ]

  try {
    const seedRecords = await Record.create(newRecords);
    res.send(seedRecords);
  } catch (err) {
    res.send(err.message)
  }
});


//SHOW
router.get('/:id', (req, res) => {
  Record.findById(req.params.id, (err, foundRecord) => {
    // res.send(foundRecord);
    res.render('show.ejs', {
      record: foundRecord
    })
  })
});

//EDIT
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, foundRecord) => {
    // res.send('this is the edit page');
    res.render('edit.ejs', {
      record: foundRecord
    })
  })
});

//UPDATE
router.put('/:id', (req, res) => {
  Record.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRecord) => {
    res.render('show.ejs', {
      record: updatedRecord
    })
  })
});

//DESTROY
router.delete('/:id', (req, res) => {
  Record.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/records');
  })
});

module.exports = router;
