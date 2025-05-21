interface LocationInfo {
  country: string;
  countryCode: string;
  language: string;
}

export const getLocationInfo = async (): Promise<LocationInfo> => {
  try {
    // Primero intentamos obtener la ubicación del navegador
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Llamamos a la API de geocodificación inversa
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    );
    const data = await response.json();

    // Determinamos el idioma basado en el país
    const countryCode = data.address.country_code.toUpperCase();
    let language = 'es'; // Por defecto español

    if (countryCode === 'CA') {
      language = 'en'; // Inglés para Canadá
    } else if (countryCode === 'CO') {
      language = 'es'; // Español para Colombia
    }

    return {
      country: data.address.country,
      countryCode,
      language,
    };
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    // Valores por defecto si no podemos obtener la ubicación
    return {
      country: 'Unknown',
      countryCode: 'UN',
      language: 'es',
    };
  }
}; 