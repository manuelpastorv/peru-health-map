# Perú Budget Decision Lab

Herramienta libre, privada en navegador, para transformar archivos presupuestales **aportados por el usuario** en escenarios y stocktakes descargables. No es un servicio oficial ni predice resultados.

## Ejecución

`python3 -m http.server 8000` desde la raíz y abrir `tools/budget-lab/`.

`cd tools/budget-lab && node --test test.mjs` (Node 20+).

Columnas CSV: `entity,sector,pim,devengado,period` (montos soles con punto decimal, periodos YYYY-MM; único mes).

Todos los datos de ejemplo son ficticios. Datos oficiales: https://www.mef.gob.pe/es/seguimiento-de-la-ejecucion-presupuestal-consulta-amigable

## Arquitectura

HTML/CSS + ES modules estándar. Cálculos enteros en centavos. Ficheros no enviados al servidor. Reportes y CSV se generan localmente. No se requieren servidores, secretos ni IA en runtime.

## Evaluación

El experimento v1.3 vs v1.5 tiene contrato de aceptación y recibos separados. **Esta implementación de producto la redactó el orquestador de la sesión; su existencia no constituye evidencia de generación autónoma por ninguno de los runtimes.** Las capacidades de control se evalúan en el repositorio privado de runtimes. No inferir superioridad estadística con una corrida por versión.
