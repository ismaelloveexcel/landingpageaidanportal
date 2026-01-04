import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppSchema } from "@shared/schema";

const ADMIN_KEY = process.env.ADMIN_KEY || "aidan-portal-2024";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/apps", async (_req, res) => {
    try {
      const apps = await storage.getApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch apps" });
    }
  });

  app.get("/api/apps/:id", async (req, res) => {
    try {
      const app = await storage.getApp(req.params.id);
      if (!app) {
        return res.status(404).json({ error: "App not found" });
      }
      res.json(app);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch app" });
    }
  });

  app.post("/api/apps", requireAdmin, async (req, res) => {
    try {
      const parsed = insertAppSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid app data", details: parsed.error.errors });
      }
      const newApp = await storage.createApp(parsed.data);
      res.status(201).json(newApp);
    } catch (error) {
      res.status(500).json({ error: "Failed to create app" });
    }
  });

  app.patch("/api/apps/:id", requireAdmin, async (req, res) => {
    try {
      const updated = await storage.updateApp(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "App not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update app" });
    }
  });

  app.delete("/api/apps/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteApp(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "App not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete app" });
    }
  });

  return httpServer;
}
