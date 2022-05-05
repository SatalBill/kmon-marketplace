export const GENERATION_TO_REQ: Record<string, string> = {
  gen_0: '0',
  gen_1: '1',
  gen_2: '2',
  gen_3: '3',
  gen_4: '4',
  gen_5: '5',
  gen_6: '6',
  gen_7: '7',
  gen_8: '8',
  gen_9: '9'
}

export const SKIN_TYPE_TO_REQ: Record<string, string> = {
  Feather: '0',
  Skin: '1',
  Scale: '2',
  'Short hairs': '3',
  'Long hairs': '4'
}

export const SEX_TO_REQ: Record<string, string> = {
  Male: '6_10',
  Female: '0_5',
  Male_Female: '0_10'
}

export const STATUS_TO_REQ: Record<string, string> = {
  Egg: '0',
  Hatched: '1',
  Junior: '2',
  Egg_Hatched: '0_1',
  Egg_Junior: '0_2',
  Egg_Hatched_Junior: '0_1_2',
  Egg_Junior_Hatched: '0_2_1',
  Hatched_Egg: '1_0',
  Hatched_Junior: '1_2',
  Hatched_Egg_Junior: '1_0_2',
  Hatched_Junior_Egg: '1_2_0',
  Junior_Egg: '2_0',
  Junior_Hatched: '2_1',
  Junior_Egg_Hatched: '2_0_1',
  Junior_Hatched_Egg: '2_1_0'
}

export const UNFREEZABLE_TO_REQ: Record<string, string> = {
  No: '0',
  Yes: '1'
}
