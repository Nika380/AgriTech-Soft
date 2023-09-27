import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: any) {
  try {
    const image = await req.formData();
    const file: any = image.get("file");

    // Send the file data as a FormData object
    const formData = new FormData();
    formData.append("file", file);

    let response;
    // try {
    //   response = await axios.post(
    //     "http://localhost:8000/predict-grapes",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    //   return NextResponse.json("Error from AI endpoint", { status: 409 });
    // }
    // const res = {
    //   content: response.data,
    // };
    return NextResponse.json("file is correct", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
