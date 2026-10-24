# Contrato congelado CCPE-01 — Crédito Claro Perú
Fecha: 24 de octubre de 2026 · comparación técnica A/B · sin asesoramiento ni ofertas de entidades reales.

## Problema y persona usuaria
Una persona peruana tiene dos propuestas de préstamo y ve tasas TEA diferentes, seguros y comisiones en documentos separados. Necesita comparar, sin registrarse ni transmitir datos, cuánto recibe, cuánto pagará, cuánto pesa cada cargo, una TCEA **estimada bajo supuestos mensuales** y el efecto de amortizar anticipadamente.

## Entradas (mismo contrato para ambos)
Monto P (S/): 100–1,000,000; plazo 3–120 meses. Dos ofertas con nombre editable; TEA 0–200 %; seguro mensual aplicado al saldo al inicio de cada mes 0–3 %; comisión fija mensual S/0–500; comisión inicial descontada del monto a entregar S/0–(P-1). Pago extraordinario S/0–P en mes 1–(plazo-1), aplicado tras la cuota ordinaria; escoger reducción de plazo o reducción de cuota. Todas las entradas numéricas deben ser finitas y validarse antes de calcular.

## Matemática canónica
- r = (1 + TEA/100)^(1/12) - 1. Capital amortizado sistema francés con cuota base fija c = P*r/(1-(1+r)^(-n)) (cuando r=0, P/n).
- Cada mes: interés = saldo inicial*r; seguro = saldo inicial*(seguro/100); capital = min(saldo inicial, cuota_base - interés); pago_total = capital + interés + seguro + comisión_mensual. Última cuota ajustada para cancelar saldo exactamente. Cuota base no incluye seguro ni comisión.
- Neto desembolsado = P - comisión_inicial. Coste total = suma de pagos programados - neto desembolsado.
- TCEA estimada de flujo mensual: encontrar i mensual tal que neto = sum(pago_t/(1+i)^t) para t=1..n; TCEA=(1+i)^12-1. Solo flujo de línea base, no prepago voluntario; no representa necesariamente la TCEA contractual/SBS de calendario real.
- Pago extraordinario se aplica al capital tras el pago ordinario del mes, no genera penalidad simulada. Reducir plazo: cuota base original, hasta cancelar antes; reducir cuota: mismo plazo original restante con una nueva cuota recalculada. Reportar ambos ahorros contra su propia oferta sin prepago; el pago extraordinario también suma al desembolso de ese mes; no confundir 'ahorro de costo' con liquidación del capital.
- Entrada hipotética y salida con centavos redondeados **solo para mostrar**, cálculos internos alta precisión; error tolerable S/0.02 por cronograma en casos normales.

## Criterios de aceptación
1. Carga al abrir con dos escenarios ficticios identificados y calcula sin backend.
2. El usuario edita ambas propuestas, se actualizan comparación, TCEA/coste/cuotas, y selecciona oferta para visualizar cronograma.
3. Ejemplo: P 10000, n 24, A TEA18 seguro0.18%/mes comisión15/mes inicial280; B TEA22 seguro0.04%/mes comisión0 inicial0. Debe ser correcto que la oferta B es más barata pese a mayor TEA.
4. Caso sin comisiones y sin seguro: TCEA estimada = TEA con tolerancia 1e-7 en proporción, y cuota sistema francés.
5. Capital residual al terminar <= S/0.01; capital amortizado total=P; costos coherentes con flujo y no negativos.
6. Seguro, cuota inicial neta, comisiones y TCEA correctamente reflejados; pago extra aplicado tras cuota; dos modos muestran ahorro e indican que es hipótesis.
7. Entradas erróneas no generan NaN/Infinity en vista ni un falso resultado de éxito; mostrar error comprensible.
8. Sin subida ni envío de información al servidor; app autocontenida o activos locales sin dependencias CDN/API.
9. Descarga reporte HTML y cronograma CSV; nombres escapados contra HTML injection y fórmula CSV (= + - @ tab cr); no transfiere datos.
10. Interacción real Chromium desktop/mobile, sin errores JS, textos legibles y formulario manejable por teclado.
11. Explicaciones en español peruano: TEA versus TCEA, costos incluidos/no incluidos, pagos anticipados y límites del simulador; referencia oficial SBS con enlace en app.
12. Estado distinguido: IMPLEMENTADO, PROBADO, STAGING, PUBLICADO y USADO. No afirmar publicado o impacto por guardar HTML.

## Riesgos/correcciones a probar de 1.4
- Checker no ejecuta comandos escritos en contrato como datos; IDs registrados y permisos OS mínimos.
- `contiene` no admite un proceso con exit code distinto de 0.
- Evidencia queda ligada a un hash del artefacto realmente verificado; si cambia el archivo invalida el resultado.
- Bloqueo real de efectos externos, nunca por palabras en el prompt solamente.
- Reporte de despliegue distingue URL pública real de código público.

## Control experimental
A: núcleo y reglas de v1.3 como referencia, sin parchear el verificador original; B: v1.3 + controles comprobables de 1.4 (checkers tipados, seguridad negativa, decisión y release). Evaluación compartida de resultados, sin declarar inferencia causal: ambos desarrollos en una sola sesión. No implantar v1.4 en main sin pasar las pruebas y comparar costos/humano/UX en sesión independiente.