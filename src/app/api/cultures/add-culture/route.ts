import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import setAgrocalendarDto from "../../agrocalendar/AgrocalendarDto";

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  const userEmail: any = req.headers.get("email");
  const user = await prisma.users.findFirst({
    where: {
      email: userEmail,
    },
  });
  try {
    const response = await prisma.cultures.create({
      data: {
        culture_name: values.cultureName,
        culture_location: values.location,
        square_meter: parseInt(values.squareMeter),
        created_by: user?.id,
      },
    });
    const createCultureDetails = async (taskName: any, data: any) => {
      const year = dayjs().year();
      let formattedPlannedFrom = dayjs(`${year}-${data.plannedFrom}`).format(
        "YYYY-DD-MM"
      );
      let formattedPlannedTo = dayjs(`${year}-${data.plannedTo}`).format(
        "YYYY-DD-MM"
      );
      if (dayjs(formattedPlannedFrom).isAfter(dayjs(formattedPlannedTo))) {
        formattedPlannedTo = dayjs(formattedPlannedTo)
          .add(1, "year")
          .format("YYYY-DD-MM");
      }
      await prisma.culture_details.create({
        data: {
          task_name: taskName,
          task_type: 2,
          price: 0,
          culture_id: response.id,
          planned_from: new Date(formattedPlannedFrom),
          planned_to: new Date(formattedPlannedTo),
          status: 3,
        },
      });
    };
    if (values.agrocalendar) {
      const calendar = await prisma.agrocalendar.findFirst({
        where: {
          id: parseInt(values.agrocalendar),
        },
      });
      const agroCalendar = await setAgrocalendarDto(calendar);
      if (agroCalendar.gasxvlaDates) {
        createCultureDetails("გასხვლა", agroCalendar.gasxvlaDates);
      }
      if (agroCalendar.daavadebebiDates) {
        createCultureDetails(
          "დაავადებებთან ბრძოლა",
          agroCalendar.daavadebebiDates
        );
      }
      if (agroCalendar.damushavebaDates) {
        createCultureDetails(
          "ნათესების დამუშავება",
          agroCalendar.damushavebaDates
        );
      }
      if (agroCalendar.morwkvaDates) {
        createCultureDetails("მორწყვა", agroCalendar.morwkvaDates);
      }
      if (agroCalendar.plantingDates) {
        createCultureDetails("რგვა-თესვა", agroCalendar.plantingDates);
      }
      if (agroCalendar.sasuqebiDates) {
        createCultureDetails("სასუქის შეტანა", agroCalendar.sasuqebiDates);
      }
      if (agroCalendar.mosavaliDates) {
        createCultureDetails("მოსავლის აღება", agroCalendar.mosavaliDates);
      }
    }
    return NextResponse.json("culture added successfully", { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
