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
  console.log('Creating Appwrite user from Civic user:', civicUser);
  
  try {
    const appwriteUser = {
      $id: civicUser.id,
      email: civicUser.email,
      name: civicUser.name,
      avatar: civicUser.avatar,
      provider: 'civic',
      ethereum_address: civicUser.ethereum?.address,
    };

    console.log('Appwrite user data:', appwriteUser);
    return appwriteUser;
  } catch (error) {
    console.error('Error creating Appwrite user from Civic:', error);
    throw error;
  }
};

export const syncCivicUserToAppwrite = async (civicUser: CivicUser) => {
  console.log('Syncing Civic user to Appwrite database...');
  
  try {
    const userData = await createAppwriteUserFromCivic(civicUser);
    return userData;
  } catch (error) {
    console.error('Error syncing Civic user to Appwrite:', error);
    throw error;
  }
};

export const createCustomJWTForCivicUser = async (civicUser: CivicUser) => {
  console.log('Creating custom JWT for Civic user authentication...');
  
  try {
    const jwt = {
      userId: civicUser.id,
      email: civicUser.email,
      provider: 'civic',
      ethereum_address: civicUser.ethereum?.address,
      timestamp: Date.now(),
    };

    console.log('Custom JWT payload:', jwt);
    return jwt;
  } catch (error) {
    console.error('Error creating custom JWT:', error);
    throw error;
  }
};