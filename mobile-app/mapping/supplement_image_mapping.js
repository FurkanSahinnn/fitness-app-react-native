// Supplement resimleri static import mapping
const SUPPLEMENT_IMAGES_PATH = '../assets/images/supplements/';

const supplementImages = {
  'CLA (Konjuge Linoleik Asit)': require(`${SUPPLEMENT_IMAGES_PATH}CLA (Konjuge Linoleik Asit).png`),
  'Kollajen': require(`${SUPPLEMENT_IMAGES_PATH}Kollajen.png`),
  'Glukozamin': require(`${SUPPLEMENT_IMAGES_PATH}Glukozamin.png`),
  'L-Karnitin': require(`${SUPPLEMENT_IMAGES_PATH}L-Karnitin.png`),
  'ZMA': require(`${SUPPLEMENT_IMAGES_PATH}ZMA.png`),
  'K Vitamini': require(`${SUPPLEMENT_IMAGES_PATH}K Vitamini.png`),
  'C Vitamini': require(`${SUPPLEMENT_IMAGES_PATH}C Vitamini.png`),
  'Glutamin': require(`${SUPPLEMENT_IMAGES_PATH}Glutamin.png`),
  'Zerdeçal (Kurkumin)': require(`${SUPPLEMENT_IMAGES_PATH}Zerdeçal (Kurkumin).png`),
  'Koenzim Q10': require(`${SUPPLEMENT_IMAGES_PATH}Koenzim Q10.png`),
  'L-Tirozin': require(`${SUPPLEMENT_IMAGES_PATH}L-Tirozin.png`),
  'Probiyotikler': require(`${SUPPLEMENT_IMAGES_PATH}Probiyotikler.png`),
  'Vitamin B12': require(`${SUPPLEMENT_IMAGES_PATH}Vitamin B12.png`),
  'Melatonin': require(`${SUPPLEMENT_IMAGES_PATH}Melatonin.png`),
  'L-Theanine': require(`${SUPPLEMENT_IMAGES_PATH}L-Theanine.png`),
  'L-Arginin': require(`${SUPPLEMENT_IMAGES_PATH}L-Arginin.png`),
  'Rhodiola Rosea': require(`${SUPPLEMENT_IMAGES_PATH}Rhodiola Rosea.png`),
  'Ashwagandha': require(`${SUPPLEMENT_IMAGES_PATH}Ashwagandha.png`),
  'Çinko': require(`${SUPPLEMENT_IMAGES_PATH}Çinko.png`),
  'Magnezyum': require(`${SUPPLEMENT_IMAGES_PATH}Magnezyum.png`),
  'Whey Protein': require(`${SUPPLEMENT_IMAGES_PATH}Whey Protein.png`),
  'Omega-3 Yağ Asitleri': require(`${SUPPLEMENT_IMAGES_PATH}Omega-3 Yağ Asitleri.png`),
  'Kafein': require(`${SUPPLEMENT_IMAGES_PATH}Kafein.png`),
  'L-Citrulline': require(`${SUPPLEMENT_IMAGES_PATH}L-Citrulline.png`),
  'BCAA': require(`${SUPPLEMENT_IMAGES_PATH}BCAA.png`),
  'Beta-Alanin': require(`${SUPPLEMENT_IMAGES_PATH}Beta-Alanin.png`),
  'Kreatin': require(`${SUPPLEMENT_IMAGES_PATH}Kreatin.png`),
};

export const getSupplementImage = (supplementName) => {
  return supplementImages[supplementName] || null;
};

export default supplementImages; 