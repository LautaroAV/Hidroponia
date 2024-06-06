import serial
import time
from supabase import create_client, Client

# Configurar la conexión serial (ajusta el puerto y la velocidad según tu configuración)
ser = serial.Serial('COM4', 9600)  # Reemplaza 'COM4' con el puerto correcto en tu sistema

# Esperar un poco para asegurarse de que la conexión esté establecida
time.sleep(2)

# Configurar la conexión con Supabase
url = "https://tzpvhdiixvehgizkojhk.supabase.co"
api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cHZoZGlpeHZlaGdpemtvamhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NzYzNDAsImV4cCI6MjAxNTA1MjM0MH0.2vkRI0WaVbGrfAExdK4JP2JgbyqkcqMYtjYVV0ni7ZI"

supabase: Client = create_client(url, api_key)

try:
    while True:
        # Leer una línea del puerto serie
        line = ser.readline().decode('utf-8').strip()
        # Verificar si la línea no está vacía
        if line:
            # Dividir la línea en valores separados por comas
            data = line.split(',')
            if len(data) == 4:
                soil_moisture, humidity, temperature, light_level = data
                
                # Convertir los valores a enteros
                soil_moisture = int(float(soil_moisture))
                humidity = int(float(humidity))
                temperature = int(float(temperature))
                light_level = int(float(light_level))

                # Insertar los datos en las tablas correspondientes en Supabase
                response_nivel_agua = supabase.table('nivel_agua').insert({"valor": soil_moisture, "hora": time.strftime("%H:%M:%S"), "fecha": time.strftime("%Y-%m-%d")}).execute()
                response_humedad = supabase.table('humedad').insert({"valor": humidity, "hora": time.strftime("%H:%M:%S"), "fecha": time.strftime("%Y-%m-%d")}).execute()
                response_temperatura = supabase.table('temperatura').insert({"valor": temperature, "hora": time.strftime("%H:%M:%S"), "fecha": time.strftime("%Y-%m-%d")}).execute()
                response_luz = supabase.table('luz').insert({"valor": light_level, "hora": time.strftime("%H:%M:%S"), "fecha": time.strftime("%Y-%m-%d")}).execute()

                print(f"Data logged: {data}")
        time.sleep(2)  # Ajusta el intervalo según tu necesidad
except KeyboardInterrupt:
    print("Data logging stopped.")

# Cerrar la conexión serial
ser.close()