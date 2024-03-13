const sharp = require('sharp');
const { logger } = require('../../config/logger');
module.exports = async (job) => {
  const { file, quality, outputPath } = job.data;
  try {
    const buffer = Buffer.from(file.buffer.data);
    await sharp(buffer).jpeg({ quality }).toFile(outputPath);
    logger.info(`image is compressed and saved to ${outputPath}`);
  } catch (er) {
    logger.error(`Error saving file ${er}`);
  }
};
