import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    await prisma.$connect();

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server");
    process.exit(1);
  }
};

startServer();