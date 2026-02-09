# Metodología de Cálculo - Simulador Contigo Futuro

Este documento detalla la lógica financiera utilizada en el `Simulador de Patrimonio` para garantizar la transparencia y la precisión de las proyecciones mostradas al usuario.

## 1. Fórmula Base: Interés Compuesto Iterativo

No utilizamos una fórmula simplificada de valor futuro simple. El cálculo se realiza mediante un **bucle iterativo anual** que simula el flujo de caja real de un inversor. Esto permite mayor precisión al sumar las aportaciones anuales antes de aplicar el rendimiento del periodo.

### La Lógica (Pseudocódigo):

Para cada año desde la `Edad Actual` hasta la `Edad de Jubilación (65)`:

1.  **Inicio del año:** Se toma el `Saldo Acumulado` del año anterior.
2.  **Aportaciones:** Se suma la `Aportación Mensual * 12`.
3.  **Rendimiento:** Se aplica la tasa de interés correspondiente al perfil sobre el total (Saldo + Aportaciones).
    *   *Nota: Esto asume que las aportaciones generan rentabilidad media durante el año, simplificando el modelo a periodos anuales.*
4.  **Resultado:** Nuevo Saldo Acumulado.

```typescript
Saldo_Final = (Saldo_Anterior + Aportacion_Anual) * (1 + Tasa_Rentabilidad)
```

---

## 2. Escenarios y Tasas de Rentabilidad (Hipótesis)

Las tasas utilizadas son estimaciones netas proyectadas basadas en el comportamiento histórico de carteras con perfiles de riesgo similares (Renta Fija, Mixta y Renta Variable Global).

### A. Escenario Base (Benchmark / Ahorro Tradicional)
Utilizado para comparar el "coste de oportunidad" de no invertir.
*   **Tasa:** `2.00%`
*   **Justificación:** Representa una aproximación a la inflación media histórica o a la rentabilidad de depósitos bancarios tradicionales/Letras del Tesoro conservadoras.

### B. Escenario Optimizado (Contigo Futuro)
Las tasas varían según el perfil de riesgo seleccionado por el usuario en el formulario:

| Perfil | Tasa Anual Estimada | Composición Típica (Referencia) |
| :--- | :--- | :--- |
| **Conservador** | **3.50%** | Predominancia de Renta Fija, volatilidad baja. |
| **Equilibrado** | **5.50%** | Cartera Mixta (50/50 RF/RV), equilibrio riesgo/retorno. |
| **Dinámico** | **8.00%** | Predominancia de Renta Variable Global, alta volatilidad pero mayor retorno a largo plazo. |

---

## 3. Variables de Entrada

*   **Capital Inicial:** Monto líquido disponible al inicio (Año 0).
*   **Aportación Mensual:** Se anualiza multiplicando por 12. Se asume constante (sin indexación por inflación para mantener la simplicidad visual, lo que hace el cálculo conservador en términos de poder adquisitivo real).
*   **Horizonte Temporal:** Calculado como `65 - Edad Actual`.
    *   *Límite:* Si el usuario tiene más de 55 años, se proyectan mínimo 10 años o hasta 20 años para mostrar el efecto a largo plazo.

## 4. Métricas de Salida

*   **Patrimonio Proyectado:** El saldo final acumulado.
*   **Beneficio Neto (Total Profit):** `Saldo Final - (Capital Inicial + Suma Total de Aportaciones)`.
*   **Multiplicador:** Relación entre el dinero obtenido y el dinero aportado (`Saldo Final / Capital Aportado`).

---

## 5. Aviso Legal (Disclaimer)

*Los cálculos son simulaciones meramente informativas y no constituyen una oferta contractual ni garantía de rentabilidad futura. Las rentabilidades pasadas no garantizan las futuras. La fiscalidad dependerá de la situación personal de cada inversor y de la legislación vigente en el momento del rescate.*
