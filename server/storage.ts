import { type User, type InsertUser, type Match, type InsertMatch, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUsersNearby(userId: string): Promise<User[]>;
  updateUserOnlineStatus(id: string, isOnline: boolean): Promise<void>;

  // Match operations
  getMatch(id: string): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatchStatus(id: string, status: string): Promise<Match | undefined>;
  getUserMatches(userId: string): Promise<Match[]>;
  getMatchBetweenUsers(userId1: string, userId2: string): Promise<Match | undefined>;

  // Message operations
  getMessage(id: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMatchMessages(matchId: string): Promise<Message[]>;
  getUserConversations(userId: string): Promise<{ match: Match; lastMessage: Message; otherUser: User }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private matches: Map<string, Match>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.matches = new Map();
    this.messages = new Map();
    
    // Initialize with some sample users
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const sampleUsers: InsertUser[] = [
      {
        name: "Alex Johnson",
        email: "alex@example.com",
        age: "26",
        bio: "Looking for a workout buddy to push each other to the limit! Love strength training and cardio.",
        location: "2.3 miles away",
        profilePhoto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        workoutTypes: ["Strength Training", "Cardio"],
        preferredTime: "Morning",
        isOnline: true,
      },
      {
        name: "Sarah Chen",
        email: "sarah@example.com",
        age: "24",
        bio: "Yoga enthusiast seeking mindful workout partners. Love combining strength with flexibility training.",
        location: "1.8 miles away",
        profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        workoutTypes: ["Yoga", "Pilates"],
        preferredTime: "Evening",
        isOnline: false,
      },
      {
        name: "Mike Rodriguez",
        email: "mike@example.com",
        age: "29",
        bio: "Marathon runner training for Boston. Looking for dedicated running partners who love early morning sessions.",
        location: "3.1 miles away",
        profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        workoutTypes: ["Running", "Endurance"],
        preferredTime: "Morning",
        isOnline: true,
      },
      {
        name: "Emma Thompson",
        email: "emma@example.com",
        age: "28",
        bio: "CrossFit athlete and personal trainer. Love high-intensity workouts and helping others reach their fitness goals!",
        location: "1.2 miles away",
        profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        workoutTypes: ["CrossFit", "HIIT", "Weight Training"],
        preferredTime: "Any Time",
        isOnline: true,
      }
    ];

    for (const user of sampleUsers) {
      await this.createUser(user);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      lastSeen: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUsersNearby(userId: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.id !== userId);
  }

  async updateUserOnlineStatus(id: string, isOnline: boolean): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.isOnline = isOnline;
      user.lastSeen = new Date();
      this.users.set(id, user);
    }
  }

  async getMatch(id: string): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = {
      ...insertMatch,
      id,
      createdAt: new Date(),
    };
    this.matches.set(id, match);
    return match;
  }

  async updateMatchStatus(id: string, status: string): Promise<Match | undefined> {
    const match = this.matches.get(id);
    if (!match) return undefined;
    
    match.status = status;
    this.matches.set(id, match);
    return match;
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      match => match.userId1 === userId || match.userId2 === userId
    );
  }

  async getMatchBetweenUsers(userId1: string, userId2: string): Promise<Match | undefined> {
    return Array.from(this.matches.values()).find(
      match => 
        (match.userId1 === userId1 && match.userId2 === userId2) ||
        (match.userId1 === userId2 && match.userId2 === userId1)
    );
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMatchMessages(matchId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.matchId === matchId)
      .sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());
  }

  async getUserConversations(userId: string): Promise<{ match: Match; lastMessage: Message; otherUser: User }[]> {
    const userMatches = await this.getUserMatches(userId);
    const conversations = [];

    for (const match of userMatches.filter(m => m.status === 'accepted')) {
      const messages = await this.getMatchMessages(match.id);
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage) {
        const otherUserId = match.userId1 === userId ? match.userId2 : match.userId1;
        const otherUser = await this.getUser(otherUserId);
        
        if (otherUser) {
          conversations.push({
            match,
            lastMessage,
            otherUser,
          });
        }
      }
    }

    return conversations.sort((a, b) => 
      b.lastMessage.timestamp!.getTime() - a.lastMessage.timestamp!.getTime()
    );
  }
}

export const storage = new MemStorage();
