const express = require('express');
const videoController = require('../controllers/videoController');
const isAuthenticated = require("../middleware/authMiddleware");

class VideoRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * /videos/upload:
         *   post:
         *     summary: Upload a video
         *     description: Upload a video file with a title and description. Requires authentication.
         *     tags:
         *       - Videos
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *               video:
         *                 type: string
         *                 format: binary
         *                 description: The video file to upload.
         *               title:
         *                 type: string
         *                 description: The title of the video.
         *               description:
         *                 type: string
         *                 description: The description of the video.
         *     responses:
         *       200:
         *         description: Video uploaded successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Video uploaded successfully"
         *       400:
         *         description: Bad request (e.g., missing title, description, or video file).
         *       401:
         *         description: Unauthorized, user not authenticated.
         *       500:
         *         description: Internal server error.
         */
        this.router.post("/upload", isAuthenticated, videoController.uploadVideo);

        /**
         * @swagger
         * /videos:
         *   get:
         *     summary: Get all video details
         *     description: Retrieve details of all videos in the database.
         *     tags:
         *       - Videos
         *     responses:
         *       200:
         *         description: List of video details.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Videos retrieved successfully"
         *                 videos:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id:
         *                         type: integer
         *                         example: 1
         *                       title:
         *                         type: string
         *                         example: "My First Video"
         *                       description:
         *                         type: string
         *                         example: "This is a sample video."
         *                       uploader:
         *                         type: string
         *                         example: "John Doe"
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2023-10-01T12:34:56Z"
         *       500:
         *         description: Internal server error.
         */
        this.router.get("/", videoController.getAllVideoDetails);

        /**
         * @swagger
         * /videos/{id}:
         *   get:
         *     summary: Get video details by ID
         *     description: Retrieve details of a specific video by its ID.
         *     tags:
         *       - Videos
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: The ID of the video.
         *     responses:
         *       200:
         *         description: Video details.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Video retrieved successfully"
         *                 video_details:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: integer
         *                       example: 1
         *                     title:
         *                       type: string
         *                       example: "My First Video"
         *                     description:
         *                       type: string
         *                       example: "This is a sample video."
         *                     uploader:
         *                       type: string
         *                       example: "John Doe"
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2023-10-01T12:34:56Z"
         *       404:
         *         description: Video not found.
         *       500:
         *         description: Internal server error.
         */
        this.router.get("/:id", videoController.getVideoDetailsById);

        // Video streaming API endpoint
        this.router.get("/stream/:id", videoController.streamVideo);

    }

    getRouter() {
        return this.router;
    }
}

// Export an instance of the class
module.exports = new VideoRoutes().getRouter();
