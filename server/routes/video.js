const express = require("express");
const router = express.Router();
// const { Video } = require("../models/User");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".avi" && ext !== ".mov") {
      return cb(res.status(400).end("Only mp4, avi, mov is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  //save video to the server
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  // get video ruuning time
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    fileDuration = metadata.format.duration;
  });
  // generate thumbnail,
  ffmpeg(req.body.url)
    .on("filenames", (filenames) => {
      console.log("Will generate thumbnail:" + filenames.joing(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", () => {
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", (err) => {
      return res.json({ success: false, err });
    })
    .screenshot({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x20",
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
