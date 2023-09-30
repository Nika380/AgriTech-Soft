import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: any) {
  const options = [
    {
      value: 1,
      endpoint: "predict-grapes",
    },
    {
      value: 2,
      endpoint: "predict-tomato",
    },
    {
      value: 3,
      endpoint: "predict-pepper",
    },
    {
      value: 4,
      endpoint: "predict-potato",
    },
  ];

  try {
    const data = await req.formData();
    const image: any = data.get("file");
    const file = new FormData();
    file.append("file", image);
    const option: any = data.get("option");
    const selectedOption = options.find(
      (opt) => opt.value === parseInt(option)
    );
    let response;
    try {
      response = await axios.post(
        `http://192.168.50.224:8000/${selectedOption?.endpoint}`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json("Error from AI endpoint", { status: 409 });
    }
    const res = {
      content: response.data,
    };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
