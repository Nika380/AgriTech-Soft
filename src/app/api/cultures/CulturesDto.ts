interface CultureDto {
  id: number;
  cultureName: string;
  location: string;
  squareMeter: number;
}

export const setCultureDto = async (data: any) => {
  const response: CultureDto = {
    id: data.id,
    cultureName: data.culture_name,
    location: data.culture_location,
    squareMeter: data.square_meter,
  };

  return response;
};
