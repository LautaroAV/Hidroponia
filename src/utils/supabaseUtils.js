// supabaseUtils.js
import { supabase } from '../data/supabase'; 

export async function obtenerUltimoRegistro(tabla, columna) {
  let { data, error } = await supabase
    .from(tabla)
    .select(`${columna}, fecha, hora`) 
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`Error fetching data from ${tabla}:`, error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function obtenerRegistroMantenimiento() {
  const mantenimiento = 'mantenimiento'; 

  let { data, error } = await supabase
    .from(mantenimiento)
    .select(`tipo_sensor, tipo_mantenimiento, fecha, hora`)
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`Error fetching data from ${mantenimiento}:`, error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function obtenerDatos(tabla, campos) {
    let { data, error } = await supabase.from(tabla).select("*");
    if (error) {
        console.error(`Error fetching data from ${tabla}:`, error);
        return { valores: [], fechas: [] };
    }

    const valores = data?.map(objeto => objeto[campos.valor]);
    const fechas = data?.map(objeto => objeto[campos.fecha]);
    return { valores, fechas };
}
