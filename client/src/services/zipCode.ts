import { ZipCodeResponseModel } from '@models/ZipCodeResponseModel';
import axios from 'axios';

const getZipCodeInfos = async (
  zipCode: string
): Promise<ZipCodeResponseModel> => {
  const zipCodeConverted = zipCode.replace(/\D/g, '');

  const { data } = await axios.get(
    `https://viacep.com.br/ws/${zipCodeConverted}/json`
  );

  if (data.erro) {
    throw new Error('Invalid zip code');
  }

  return {
    city: data.localidade || '',
    district: data.bairro || '',
    publicArea: data.logradouro || '',
    state: data.uf || '',
    zipCode: data.cep || '',
  };
};

export { getZipCodeInfos };
