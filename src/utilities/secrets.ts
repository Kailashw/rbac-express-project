export const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const DB_CONFIG = {
  host: "localhost",
  port: 27017,
  schema: "rbac_express_project",
  debug: false,
  migrate: false,
  backup: {
    enabled: false,
  },
};
