# CCPE-01 — Experimento Agent Runtime v1.3 versus candidata v1.4
Fecha: 24 de octubre de 2026. Producto: Crédito Claro Perú (cálculo local de comparación de créditos personales). Ambos modelos de datos son ejemplos ficticios. Estado: PROBADO EN ENTORNO AISLADO; no afirmar publicado hasta verificación del enlace HTTP real.

## Veredicto
**Empate funcional en el producto; diferencia comprobada en la capa de verificación del runtime.** A y B cumplen el contrato numérico y las pruebas de navegador. B muestra una advertencia contextual si el dinero neto recibido difiere, ofrece una guía de decisión más explícita y empaqueta la web en un solo HTML. La original A también funciona y su interfaz es más compacta.

### Métricas observadas
- Navegador: 25/25 checks A; 25/25 B; Chromium con scripts ejecutados por `page.set_content()` porque la navegación `file://` está bloqueada por la política del entorno. Se comprobaron descargas reales HTML y CSV, manejo de errores, texto hostil, fórmula CSV, ejemplo de tasas engañosas, prepago, responsive 390px, ausencia de peticiones externas durante la prueba. No debe confundirse con HTTP/Pages en producción.
- Matemáticas: suite Python independent oracle y Node `test_math.py`: 5 pruebas de alto nivel OK, incluyendo 65 escenarios aleatorios reproducibles de 2 ofertas y ambos motores, TEA=TCEA sin costos, consistencia de capital, cuotas, prepago y validaciones.
- Seguridad del runtime: 8/8 unit tests. En v1.3 se reprodujeron localmente de forma inocua dos defectos de implementación: `contiene:` puede pasar con exit code 7; `done_when.check` del contrato puede ejecutar un programa dentro de los permisos del proceso. Esos hallazgos provienen de la ruta de código `reference/agent-runtime/agent_runtime/assurance.py` del repo privado, SHA 7f9f9556bdf03d2567f3910bf5d907d603c94a02. No es un ataque a usuario ni exploit de red.
- En la candidata 1.4 se desarrolló `harness14/checker_v14.py` en el prototipo: IDs de verificación tipados, rechazo de `check` arbitrario, hashes vinculados al contenido leído, rutas restringidas al scope, checks estáticos para ausencia de networking y evidencia de browser. Los checks no ejecutan shell. **No sustituye al sandbox real y no inspecciona semánticamente cualquier código posible.**
- Tamaño de entrega offline (aproximado): A HTML autocontenido 21 KB; B HTML autocontenido 29.5 KB. La versión B introduce estructura de guía y validación adicional a costa de mayor volumen de código. No se midieron horas humanas independientes, costo de tokens ni resultados de usuarios reales.

### Préstamos ficticios de referencia
| Variable | Oferta A | Oferta B |
|---|---:|---:|
| Monto nominal | S/10,000 | S/10,000 |
| Plazo | 24 meses | 24 meses |
| TEA | 18% | 22% |
| Seguro mensual sobre saldo | 0.18% | 0.04% |
| Comisión mensual | S/15 | S/0 |
| Comisión al desembolso | S/280 | S/0 |
| Neto recibido | S/9,720 | S/10,000 |
| Cuota inicial con seguros/cargos | S/525.82 | S/513.21 |
| Pagos acumulados | S/12,424.55 | S/12,274.11 |
| TCEA estimada mensual | 27.98% | 22.58% |
| Costo sobre neto | S/2,704.55 | S/2,274.11 |

**Observación válida:** B anuncia más TEA, pero tiene menor TCEA estimada y menos pagos totales en este caso. Entrega además S/280 adicionales de efectivo neto. Es peligroso comparar únicamente TEA o sumar montos con distinta cantidad neta recibida: B advierte esta diferencia. TCEA estimada no es la TCEA contractual validada por una entidad.

Con un pago extraordinario S/1000 en el mes 6 aplicado después de la cuota y opción reducir plazo, A cambia a 22 meses y pagos acumulados S/12,092.84; B cambia a 22 meses y S/11,937.67. Ambos cálculos incluyen el pago extra, de modo que la variación de pagos equivale a menor interés/seguro/comisiones proyectados, **no** a cancelación gratuita de capital.

## Evaluación honesta de diferencias
| Dimensión | A: Kernel/contrato v1.3 | B: v1.4 candidata + perfil de entrega |
|---|---|---|
| Requisitos funcionales | 25/25 | 25/25 |
| Oracle numérico | 65 escenarios aleatorios + límites | Igual |
| Responsabilidad de los datos | Sin servidor | Sin servidor |
| Guía al usuario | Análisis y explicación | Historia guiada y advertencia de desembolsos distintos |
| Superficie de código | Menor (~21KB autocontenido) | Mayor (~29.5KB autocontenido) |
| Contrato/verificador | Referencia v1.3 reproduce los dos defectos de la auditoría | Verificador prototipo pasa 8 pruebas de seguridad (incluye contraste) |
| OS sandbox, MFA, firma, datos en producción | No se probó | No se probó |
| Experiencia con usuarios | No observada | No observada |
| Publicación HTTP | Por verificar externamente | Por verificar externamente |

## Fallas de diseño experimental que impiden causalidad
Ambos prototipos fueron desarrollados por el mismo GPT-6, en la misma sesión, con conocimiento del contrato común y la suite; NO son dos agentes independientes ni una muestra aleatoria ciega. La principal diferencia impuesta por ingeniería 1.4 está en la infraestructura de verificación, no en la calidad financiera del producto. Por ello, sería exagerado declarar que v1.4 hace más inteligente al LLM o que su mejor diseño visual se debe al texto de instrucciones.

## Reglas propuestas para v1.4, pendientes de promoción
1. `done_when` solo referencia IDs de comprobación code-owned tipadas, con parámetros validados; jamás comandos arbitrarios redactados por el modelo como verificador privilegiado.
2. Una comprobación externa exige salida exitosa y valor esperado, ambos, según contrato de la herramienta. Si se usa stdout, exit != 0 es FAIL.
3. El recibo debe enlazar un hash del artefacto observado en el propio chequeo y después de la última modificación; si cambia, se invalida.
4. Controles que no existen en el host real (sandbox de ficheros/red, secreto, timeout, control MCP, RBAC) quedan `SIN_VERIFICAR` o BLOQUEADOS, nunca declarados seguros por texto.
5. Aplicaciones públicas necesitan prueba de usuario final en URL deseada, de móvil, datos y exportaciones; no equiparar commit, PR o preview READY con RELEASED.
6. Reconciliación de efectos externos debe tratar consultas inconclusas, en vuelo o eventualmente consistentes como `INDETERMINADO`; no reintentar por ausencia aparente sin idempotencia fuerte y verificación autoritativa.
7. Repetir comparaciones con tareas no vistas, dos sesiones independientes y verificador ciego; medir tiempo humano, defectos reales, falsos verdes, latencia y complejidad.

## Fuentes
SBS (explicación de TCEA): https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/aprende-sobre-creditos ; SBS (pagos anticipados): https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/durantelavigenciadelcredito . Estas fuentes no certifican que la presente calculadora replique el cronograma de alguna empresa. Proyecto ilustrativo, no asesoría financiera ni captación de crédito.

## Reproducción sin CI paga
- `python -m unittest discover -s tests -p 'test_math.py' -v`
- `python tests/test_browser.py` (Chromium y Playwright instalados; usa set_content para política de ejecución de este entorno)
- `python -m unittest discover -s tests -p 'test_security.py' -v`

**Criterio para nombrar oficialmente v1.4:** pruebas en el checkout real del runtime con controles del host y PR de cambio, proyecto sin regresiones, sandbox y efecto externo negativo, al menos un build retenido en sesión independiente. Por ahora: candidata, no reemplazo.