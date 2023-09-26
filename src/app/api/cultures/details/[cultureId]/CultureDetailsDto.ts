interface CultureDetailsDto {
  id: number;
  taskName: string;
  taskType: number;
  price: number;
  plannedAt: Date;
}

export const setCultureDetailsDto = async (data: any) => {
  const detail: CultureDetailsDto = {
    id: data.id,
    taskName: data.task_name,
    taskType: data.task_type,
    price: data.price,
    plannedAt: data.planned_at,
  };

  return detail;
};
