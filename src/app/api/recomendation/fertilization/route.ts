import { NextResponse } from "next/server";
import OpenAI from "openai";
import Translate from "translate";

export async function POST(req: Request, res: any) {
  let { values } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  values = JSON.parse(
    await Translate(JSON.stringify(values), { from: "ka", to: "en" })
  );
  try {
    const gptResponse: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Given the soil nutrient levels for ${values.crop} (such as pH ${values.pHLevel}, Nitrogen ${values.nitrogenLevel}, Phosphorus ${values.phosphorusLevel}, Potassium ${values.potassiumLevel}, and organic matter ${values.organicMatter}), what specific fertilizer plan do you recommend for optimal ${values.crop} cultivation, and should the fertilizer be organic or synthetic? Give me meaninful answer, do not tell me anything about my text, do not say that info is not enough, just use this information and give me recommendation for fertilizers, return name and type of fertilizer, nothing else, i just need type and names of fertilizers, no other data, remove this type of text from response: Based on the provided soil nutrient levels for ${values.crop} cultivation, the specific fertilizer plan to optimize growth may include:, just return recommendation, nothing else, i do not need any more words other than recommendation`,
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let response;

    await Translate(gptResponse.choices[0].message.content, {
      from: "en",
      to: "ka",
    }).then((text: any) => {
      console.log(text);
      response = text.replace(/\\/g, " ").replace(/\n/g, " ");
    });

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
