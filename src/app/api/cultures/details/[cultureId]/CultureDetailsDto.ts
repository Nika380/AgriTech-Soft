interface CultureDetailsDto {
  id: number;
  taskName: string;
  taskType: number;
  price: number;
  plannedFrom: Date;
  plannedTo: Date;
}

export const setCultureDetailsDto = async (data: any) => {
  const detail: CultureDetailsDto = {
    id: data.id,
    taskName: data.task_name,
    taskType: data.task_type,
    price: data.price,
    plannedFrom: data.planned_from,
    plannedTo: data.planned_to,
  };

  return detail;
};
