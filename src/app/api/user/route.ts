import { list } from '@/app/repository/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // const { name, email, password, passwordConfirm } = await req.json();
    console.log('GET req', req);
    const users = await list();
    return NextResponse.json(
      {
        success: true,
        statusCode: 200,
        message: 'success',
        data: users,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log('create error', error);
    return NextResponse.json(
      {
        message: error.message || '發生未知錯誤',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // 只有在開發模式下回傳 stack
        code: error.code || 'UNKNOWN_ERROR',
      },
      { status: 400 },
    );
  }
}
