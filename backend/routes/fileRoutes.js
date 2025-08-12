import { Router } from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/fileController.js";
import { uploadMultipleFilesValidation } from "../utils/validation.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post(
    "/upload",
    upload.array("files", 10),
    uploadMultipleFilesValidation,
    validationMiddleware,
    uploadFiles
);

export default router;
