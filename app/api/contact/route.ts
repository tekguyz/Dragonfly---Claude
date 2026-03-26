import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real app, you would send an email here using Nodemailer, SendGrid, etc.
    // For now, we'll just simulate a successful submission.
    console.log('Contact form submission:', data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact route:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
