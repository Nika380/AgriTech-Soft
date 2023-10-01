interface AgrocalendarDto {
  id: number;
  cultureName: string | null;
  plantingStart: string | null;
  plantingEnd: string | null;
  gaxvlaStart: string | null;
  gasxvlaEnd: string | null;
  natesebisDamushavebaStart: string | null;
  natesebisDamushavebaEnd: string | null;
  sasuqebisShetanaStart: string | null;
  sasuqebisShetanaEnd: string | null;
  morwkvaStart: string | null;
  morwkvaEnd: string | null;
  daavadebebtanBrdzolaStart: string | null;
  daavadebebtanBrdzolaEnd: string | null;
  mosavlisAgebaStart: string | null;
  mosavlisAgebaEnd: string | null;
}

const setAgrocalendarDto = async (data: any) => {
  const response = {
    id: data.id,
    cultureName: data.culture_name,
    plantingDates: {
      plannedFrom: data.planting_start,
      plannedTo: data.planting_end,
    },
    gasxvlaDates: {
      plannedFrom: data.gaxvla_start,
      plannedTo: data.gasxvla_end,
    },
    damushavebaDates: {
      plannedFrom: data.natesebis_damushaveba_start,
      plannedTo: data.natesebis_damushaveba_end,
    },
    sasuqebiDates: {
      plannedFrom: data.sasuqebis_shetana_start,
      plannedTo: data.sasuqebis_shetana_end,
    },
    morwkvaDates: {
      plannedFrom: data.morwkva_start,
      plannedTo: data.morwkva_end,
    },
    daavadebebiDates: {
      plannedFrom: data.daavadebebtan_brdzola_start,
      plannedTo: data.daavadebebtan_brdzola_end,
    },
    mosavaliDates: {
      plannedFrom: data.mosavlis_ageba_start,
      plannedTo: data.mosavlis_ageba_end,
    },
  };
  return response;
};

export default setAgrocalendarDto;
