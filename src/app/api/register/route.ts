import prisma from "@/app/lib/prisma";
import { isValidateEmail, isValidatePassword } from "@/app/utils/validate";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // 读取请求体
    const { email, password } = await request.json();
    // 验证数据格式
    console.log(isValidateEmail(email), isValidatePassword(password))
    if (!isValidateEmail(email) || !isValidatePassword(password)) {
        return NextResponse.json({
            message: 'Invalid email or password'
        }, {
            status: 400,
            statusText: 'Bad Request'
        })
    }
    // 验证是否存在此邮箱的账户
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user) {
        return NextResponse.json({
            message: "Email already exists"
        }, { status: 400 });
    }
    // 同步哈希密码
    const hash = bcrypt.hashSync(password, 8);
    // 创建用户
    await prisma.user.create({
        data: {
            email,
            password: hash
        }
    })

    // 生成token


    // 返回成功信息
    return NextResponse.json({ message: 'success', token: '' }, { status: 200 })
}