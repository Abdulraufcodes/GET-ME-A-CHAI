import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  await connectDb();
  const users = await User.find();

  return Response.json(users);
}