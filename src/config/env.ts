import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  MONGODB_CONNECTION_STRING: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().regex(/^\d+$/).default("5317"),
  JWT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
