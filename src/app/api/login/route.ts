import { isValidateEmail } from "@/app/utils/validate";

// Request 不需要导入，因为它是全局的
export async function POST(request: Request) {
    // 读取请求体
    const body = await request.json();
    const { email, password } = body;
    // 验证数据格式
    if (isValidateEmail(email)) { }
    // 哈希密码

    // 创建用户信息

    // 返回信息
}