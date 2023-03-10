const express = require("express");
const history = require("../models/historySchema");
const cards = require("../models/cardSchema");
const buckets = require("../models/bucketSchema");
const router = express.Router();

//post history
router.post("/addHistory", async (req, res) => {
  console.log("*");
  try {
    const { name, link } = req.body;
    const addHistory = new history({
      name,
      link,
    });

    await addHistory.save();
    res.status(201).json(addHistory);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// get history
router.get("/getHistory", async (req, res) => {
  try {
    const data = await history.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

//post bucket
router.post("/addBucket", async (req, res) => {
  const { name, desc } = req.body;
  // console.log(name, desc);
  try {
    const addBucket = new buckets({
      name,
      desc,
    });

    await addBucket.save();
    res.status(201).json(addBucket);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// get bucket
router.get("/getBuckets", async (req, res) => {
  try {
    const data = await buckets.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

//delete bucket
router.delete("/deleteBucket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBucket = await buckets.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteBucket);
  } catch (error) {
    res.status(404).json(error);
  }
});

// update user
// router.patch("/updateBucket/:id", async (req, res) => {
//   console.log("*");
//   try {
//     const { id } = req.params;
//     const updateddata = await buckets.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(201).json(updateddata);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// register card
router.post("/addCard", async (req, res) => {
  const { name, bucket, link } = req.body;

  if (!name || !bucket || !link) {
    res.status(404).send("please fill the data");
  }

  try {
    const preCard = await cards.findOne({ name: name });
    if (preCard) {
      res.status(404).send("this card is already present");
    } else {
      const addCard = new cards({
        name,
        bucket,
        link,
      });

      await addCard.save();
      res.status(201).json(addCard);
      console.log(addCard);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// get data
router.get("/getCard", async (req, res) => {
  try {
    const data = await cards.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get user
router.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cardData = await cards.findById({ _id: id });
    res.status(200).json(cardData);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get card by bucket name
router.get("/getCardByBucket/:nameId", async (req, res) => {
  try {
    const { nameId } = req.params;
    const cardData = await cards.find({ bucket: `${nameId}` });
    res.status(200).json(cardData);
  } catch (error) {
    res.status(404).json(error);
  }
});

// move to new bucket
router.patch("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { new_bucket } = req.body;
    const newData = {
      bucket: new_bucket,
    };
    const updateddata = await cards.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json(updateddata);
  } catch (error) {
    res.status(404).json(error);
  }
});

//delete user
router.delete("/deleteCard", async (req, res) => {
  try {
    const { idArr } = req.body;
    const deleteCard = await cards.deleteMany({ _id: { $in: idArr } });
    res.status(200).json(deleteCard);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
