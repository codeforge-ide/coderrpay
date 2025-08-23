import { CivicUser } from '../civic/types';

export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  apiKey?: string;
}

export const getAppwriteConfig = (): AppwriteConfig => {
  return {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    apiKey: process.env.APPWRITE_API_KEY,
  };
};

export const createAppwriteUserFromCivic = async (civicUser: CivicUser) => {
  try {
    const appwriteUser = {
      $id: civicUser.id,
      email: civicUser.email,
      name: civicUser.name,
      avatar: civicUser.avatar,
      provider: 'civic',
      ethereum_address: civicUser.ethereum?.address,
    };

    return appwriteUser;
  } catch (error) {
    console.error('Error creating Appwrite user from Civic:', error);
    throw error;
  }
};

export const syncCivicUserToAppwrite = async (civicUser: CivicUser) => {
  try {
    // Create a custom JWT session with Civic user data
    // This is a placeholder - in a real implementation, you would:
    // 1. Create an Appwrite user account if it doesn't exist
    // 2. Use Appwrite's custom JWT or OAuth to create a session
    // 3. Store additional user preferences and metadata
    
    const userData = await createAppwriteUserFromCivic(civicUser);
    
    // For now, we'll return the user data
    // In production, this should create an actual Appwrite session
    return userData;
  } catch (error) {
    console.error('Error syncing Civic user to Appwrite:', error);
    throw error;
  }
};

export const createCustomJWTForCivicUser = async (civicUser: CivicUser) => {
  try {
    // This is a placeholder for creating a custom JWT
    // In a real implementation, you would:
    // 1. Use a server-side endpoint to create a signed JWT
    // 2. Use Appwrite's custom authentication with the JWT
    // 3. Return the Appwrite session
    
    const jwt = {
      userId: civicUser.id,
      email: civicUser.email,
      provider: 'civic',
      ethernet_address: civicUser.ethereum?.address,
      timestamp: Date.now(),
    };

    return jwt;
  } catch (error) {
    console.error('Error creating custom JWT:', error);
    throw error;
  }
};