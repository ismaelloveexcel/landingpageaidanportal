import { type User, type InsertUser, type App, type InsertApp } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getApps(): Promise<App[]>;
  getApp(id: string): Promise<App | undefined>;
  createApp(app: InsertApp): Promise<App>;
  updateApp(id: string, app: Partial<InsertApp>): Promise<App | undefined>;
  deleteApp(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private apps: Map<string, App>;

  constructor() {
    this.users = new Map();
    this.apps = new Map();
    this.seedApps();
  }

  private seedApps() {
    const defaultApps: InsertApp[] = [
      {
        title: "Adventure Quest",
        description: "An epic RPG adventure with monsters, treasures, and legendary quests awaiting brave heroes!",
        url: "https://example.com/adventure-quest",
        iconName: "sword",
        colorClass: "purple",
        order: 1,
      },
      {
        title: "Space Blaster",
        description: "Defend the galaxy from alien invaders in this action-packed space shooter game!",
        url: "https://example.com/space-blaster",
        iconName: "rocket",
        colorClass: "cyan",
        order: 2,
      },
      {
        title: "Puzzle Master",
        description: "Challenge your brain with mind-bending puzzles and unlock new levels of genius!",
        url: "https://example.com/puzzle-master",
        iconName: "sparkles",
        colorClass: "green",
        order: 3,
      },
      {
        title: "Racing Thunder",
        description: "Race at lightning speed through amazing tracks and become the ultimate champion!",
        url: "https://example.com/racing-thunder",
        iconName: "zap",
        colorClass: "orange",
        order: 4,
      },
    ];

    defaultApps.forEach((app) => {
      const id = randomUUID();
      this.apps.set(id, { ...app, id, order: app.order ?? 0 });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getApps(): Promise<App[]> {
    return Array.from(this.apps.values()).sort((a, b) => a.order - b.order);
  }

  async getApp(id: string): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = randomUUID();
    const app: App = { ...insertApp, id, order: insertApp.order ?? 0 };
    this.apps.set(id, app);
    return app;
  }

  async updateApp(id: string, updates: Partial<InsertApp>): Promise<App | undefined> {
    const existing = this.apps.get(id);
    if (!existing) return undefined;
    const updated: App = { ...existing, ...updates };
    this.apps.set(id, updated);
    return updated;
  }

  async deleteApp(id: string): Promise<boolean> {
    return this.apps.delete(id);
  }
}

export const storage = new MemStorage();
