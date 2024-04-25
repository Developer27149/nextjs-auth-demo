import prisma from "@/app/lib/prisma";
import { isValidateEmail, isValidatePassword } from "@/app/utils/validate";
import bcrypt from 'bcryptjs';
export async function POST(request: Request) {
    // 读取请求体
    const body = await request.json();
    const { email, password } = body;
    // 验证数据格式
    if (!isValidateEmail(email) || !isValidatePassword(password)) {
        return Response.json({
            message: "Invalid email or password"
        }, { status: 400 });
    }
    // 验证是否存在此邮箱的账户
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user) {
        return Response.json({
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
    // 返回成功信息
    return Response.json({ message: 'success' }, { status: 200 })
}