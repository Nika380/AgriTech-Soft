import { prisma } from "@/prisma";

interface CultureDto {
  id: number;
  cultureName: string;
  location: string;
  squareMeter: number;
  expense: number;
  income: number;
}

export const setCultureDto = async (data: any) => {
  const detailsList = await prisma.culture_details.findMany({
    where: {
      culture_id: parseInt(data.id),
    },
  });

  let detExpense = 0;
  let detIncome = 0;
  await Promise.all(
    detailsList.map(async (detail) => {
      if (detail.task_type === 1) {
        detIncome += detail.price;
      } else if (detail.task_type === 2) {
        detExpense += detail.price;
      }
    })
  );
  const response: CultureDto = {
    id: data.id,
    cultureName: data.culture_name,
    location: data.culture_location,
    squareMeter: data.square_meter,
    expense: detExpense,
    income: detIncome,
  };

  return response;
};
