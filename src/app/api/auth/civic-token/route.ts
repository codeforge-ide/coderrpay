import { NextRequest, NextResponse } from 'next/server';
import { Client, Users } from 'node-appwrite';

// Server-side Appwrite client for generating custom tokens
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id')
  .setKey(process.env.APPWRITE_API_KEY || '');

const users = new Users(client);

export async function POST(request: NextRequest) {
  try {
    const { civicUser } = await request.json();
    
    if (!civicUser || !civicUser.email) {
      return NextResponse.json({ error: 'Invalid Civic user data' }, { status: 400 });
    }

    // Create or get user ID based on Civic email
    let userId: string;
    
    try {
      // Try to find existing user by email
      const existingUsers = await users.list([`email=${civicUser.email}`]);
      if (existingUsers.users.length > 0) {
        userId = existingUsers.users[0].$id;
      } else {
        // Create new user if doesn't exist
        const newUser = await users.create(
          'unique()',
          civicUser.email,
          civicUser.phone,
          undefined, // password (not needed for custom token)
          civicUser.name || civicUser.email.split('@')[0] // name
        );
        userId = newUser.$id;
      }
    } catch (error) {
      console.error('Error handling user:', error);
      return NextResponse.json({ error: 'Failed to handle user' }, { status: 500 });
    }

    // Generate custom token for the user
    const token = await users.createToken(userId, 300); // 5 minutes expiry

    return NextResponse.json({
      userId: token.userId,
      secret: token.secret,
    });

  } catch (error) {
    console.error('Error creating custom token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}