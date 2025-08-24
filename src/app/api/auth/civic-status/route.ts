import { NextResponse } from 'next/server';
import { getUser } from '@civic/auth/nextjs';

export async function GET() {
  try {
    const user = await getUser();
    
    if (user) {
      return NextResponse.json({
        isAuthenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name || 'Unknown User',
          avatar: user.picture,
        }
      });
    } else {
      return NextResponse.json({
        isAuthenticated: false,
        user: null
      });
    }
  } catch (error) {
    console.error('Error checking Civic auth status:', error);
    return NextResponse.json({
      isAuthenticated: false,
      user: null
    });
  }
}