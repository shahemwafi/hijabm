import mongoose, { Mongoose } from 'mongoose';

// For Next.js hot reloads and Vercel serverless, use a global cache
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local or Vercel dashboard');
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 20, // Increased for better concurrency
      serverSelectionTimeoutMS: 3000, // Reduced timeout for faster failure detection
      socketTimeoutMS: 30000, // Reduced socket timeout
      family: 4, // Use IPv4, skip trying IPv6
      // Performance optimizations
      maxIdleTimeMS: 15000, // Reduced idle time
      minPoolSize: 2, // Maintain at least 2 connections
      // Connection pooling optimizations
      compressors: ['zlib'], // Enable compression
      zlibCompressionLevel: 6, // Balanced compression
      // Read preferences for better performance
      readPreference: 'primaryPreferred',
      // Write concerns for better performance
      writeConcern: { w: 1, j: false },
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }
  
  return cached.conn;
}

export default dbConnect; 