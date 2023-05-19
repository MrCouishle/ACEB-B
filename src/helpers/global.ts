import { Response } from "express";
import { findMsg_ } from "../estructura";
import axios from 'axios';

export const msg_ = (code: String, campo: String, res: Response) => {
  findMsg_(code, campo, res);
};
export const padStart_ = (str: any, len: any, padstr: string) => {
  let redExpr = {
    $reduce: {
      input: { $range: [0, { $subtract: [len, { $strLenCP: str }] }] },
      initialValue: "",
      in: { $concat: ["$$value", padstr] },
    },
  };
  return {
    $cond: {
      if: { $gte: [{ $strLenCP: str }, len] },
      then: str,
      else: { $concat: [redExpr, str] },
    },
  };
};

export async function getCoordinates(address: string, apiKey: string): Promise<{ latitude: number; longitude: number }> {
  console.log("🚀 ~ file: global.ts:26 ~ getCoordinates ~ apiKey:", apiKey)
  console.log("🚀 ~ file: global.ts:26 ~ getCoordinates ~ address:", address)
  
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];

      if (result.geometry && result.geometry.location) {
        const location = result.geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        return { latitude, longitude };
      }
    }

    throw new Error('No se pudo obtener la ubicación para la dirección especificada');
  } catch (error) {
    console.error('Error al obtener las coordenadas:', error);
    throw error;
  }
  // try {
  //   const response = await axios.get(apiUrl);
  //   const data = response.data;

  //   // Extraer las coordenadas de latitud y longitud
  //   const location = data.results[0].geometry?.location;
  //     const latitude = location.lat;
  //     const longitude = location.lng;
    
  //   return { latitude, longitude };
  // } catch (error) {
  //   console.error('Error al obtener las coordenadas:', error);
  //   throw error;
  // }
  // try {
  //   const response = await axios.get(apiUrl);
  //   const data = response.data;

  //   if (data.results.length === 0) {
  //     throw new Error('No se encontraron resultados para la dirección proporcionada.');
  //   }

  //   const location = data.results[0].geometry.location;
  //   const latitude = location.lat;
  //   const longitude = location.lng;

  //   return { latitude, longitude };
  // } catch (error) {
  //   console.error('Error al obtener las coordenadas:', error);
  //   throw new Error('No se pudieron obtener las coordenadas para la dirección proporcionada.');
  // }
}