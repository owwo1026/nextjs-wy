import { create } from '@/app/repository/user';
import { sendVerificationEmail } from '@/app/service/email/verify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, passwordConfirm } = await req.json();
    await create({
      name,
      email,
      password,
      passwordConfirm,
    });
    sendVerificationEmail(name, email);
    return NextResponse.json({ message: '帳號新增成功' });
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
