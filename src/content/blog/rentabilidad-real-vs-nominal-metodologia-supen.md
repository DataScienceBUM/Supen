---
title: "Rentabilidad Real vs. Rentabilidad Nominal: La Metodología Oficial de la SUPEN Explicada"
description: "Descubre cómo se calculan las tasas oficiales de rentabilidad: el Valor Cuota Promedio Mensual, la ecuación de Fisher y el ajuste por inflación del IPC."
publishDate: 2024-03-28
author: "Observatorio SUPEN"
category: "indices"
categoryLabel: "Índices & Métricas"
tags: ["Rentabilidad Real", "Rentabilidad Nominal", "Metodología SUPEN", "Ecuación de Fisher", "IPC"]
readTimeMinutes: 7
featured: false
relatedSimulator: "/rendimientos"
relatedSimulatorLabel: "Consultar Tabla de Rentabilidades Reales"
---

# Rentabilidad Real vs. Rentabilidad Nominal: La Metodología Oficial de la SUPEN Explicada

Cuando las operadoras de pensiones difunden sus resultados anuales o en publicidad comercial, a menudo destacan cifras atractivas como: *"¡Rendimiento del 9.5%!"*. Sin embargo, en finanzas y economía previsional, una cifra nominal sin contexto de inflación carece de utilidad real para un trabajador.

La **Superintendencia de Pensiones (SUPEN)** implementa una metodología estricta y armonizada para calcular las rentabilidades oficiales que publican mensualmente en su API estadística. En este artículo explicamos paso a paso su formulación matemática y por qué debes prestar atención a la **Rentabilidad Real**.

---

## 1. La Ilusión Monetaria: Nominal vs. Real

- **Rentabilidad Nominal ($R_{nom}$):** Es el porcentaje en que crece tu saldo monetario en colones brutos. Si tenías ₡100.000 y al cabo de un año tienes ₡108.000, tu rentabilidad nominal fue del 8.0%.
- **Inflación ($\pi$):** Es el aumento generalizado en el nivel de precios de bienes y servicios básicos (alimentos, salud, vivienda), medido en Costa Rica por el **Índice de Precios al Consumidor (IPC)** del Instituto Nacional de Estadística y Censos (INEC).
- **Rentabilidad Real ($R_{real}$):** Es el incremento efectivo en tu **capacidad de compra**. Mide si al jubilarte podrás comprar más o menos bienes en el supermercado que los que podrías comprar hoy.

> **Ejemplo clarificador:**
> Si tu operadora te ofrece una rentabilidad nominal del **7.0%**, pero ese año la inflación en Costa Rica fue del **8.5%**, en términos reales tu ahorro se deterioró en aproximadamente un **-1.38%**. Tu cuenta tiene más dígitos de colones, pero esos colones compran menos pan, arroz o medicinas.

---

## 2. La Metodología Oficial de la SUPEN

Para evitar manipulaciones de fin de mes o picos puntuales de volatilidad, la SUPEN sigue tres pasos metodológicos:

### Paso A: El Valor Cuota Promedio Mensual ($\overline{VC}_m$)
En lugar de tomar únicamente el valor cuota del último día del mes (que podría verse afectado por el cierre de un contrato o una liquidación aislada), la SUPEN calcula el **promedio aritmético de los primeros 30 días de cada mes calendario**:

$$\overline{VC}_m = \frac{1}{30} \sum_{d=1}^{30} VC_{m,d}$$

### Paso B: Tasa Nominal Anualizada Geométrica
Para evaluar un periodo de $n$ meses entre el mes de corte $t$ y el mes base $t-n$, la SUPEN utiliza una tasa de crecimiento geométrica anualizada:

$$R_{nom}(t, t-n) = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-n}} \right)^{\frac{12}{n}} - 1$$

- **A 12 meses ($n=12$):** $R_{nom, 12m} = \frac{\overline{VC}_t}{\overline{VC}_{t-12}} - 1$
- **A 36 meses ($n=36$):** $R_{nom, 36m} = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-36}} \right)^{1/3} - 1$
- **A 60 meses ($n=60$):** $R_{nom, 60m} = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-60}} \right)^{1/5} - 1$

### Paso C: La Ecuación de Fisher para la Rentabilidad Real
Para obtener la rentabilidad real neta, no se realiza una simple resta aritmética ($R_{nom} - \pi$), sino la **descomposición de Fisher exacta**:

$$R_{real}(t, t-n) = \frac{R_{nom}(t, t-n) - \pi(t, t-n)}{1 + \pi(t, t-n)}$$

Donde la tasa de inflación anualizada para el mismo horizonte temporal es calculada utilizando el IPC promedio del INEC:

$$\pi(t, t-n) = \left( \frac{\overline{IPC}_t}{\overline{IPC}_{t-n}} \right)^{\frac{12}{n}} - 1$$

---

## 3. ¿Por Qué las Ventanas a 36 y 60 Meses son el Estándar Técnico?

La normativa del CONASSIF y las mejores prácticas de la OCDE recomiendan evaluar a los gestores previsionales en horizontes de **36 meses (3 años)** y **60 meses (5 años)** por tres razones fundamentales:

1. **Ciclos de Política Monetaria:** Un ciclo de alza o baja de tasas de interés por parte del Banco Central de Costa Rica (BCCR) o la Fed suele durar entre 2 y 4 años. Una ventana de 5 años permite evaluar cómo se desempeñó la operadora tanto en periodos de tasas altas como de tasas bajas.
2. **Neutralización del Tipo de Cambio:** Costa Rica experimenta fluctuaciones cambiarias cíclicas del dólar respecto al colón. En ventanas de 5 años, estos movimientos tienden a suavizarse, reflejando el rendimiento subyacente de los activos.
3. **Incentivo a la Inversión a Largo Plazo:** Si las operadoras fueran evaluadas o castigadas únicamente por el resultado a 12 meses, sus gestores se verían tentados a colocar el dinero en depósitos a plazo fijo de muy corto plazo, renunciando a inversiones en infraestructura o renta variable global que ofrecen mucho mayor retorno a largo plazo.

---

## 4. Consulta los Datos Oficiales en Tiempo Real

En nuestro módulo de **[Rendimientos](/rendimientos)** puedes filtrar y ordenar la tabla en tiempo real seleccionando entre:
- **Rentabilidad Real a 60 meses** (nuestra métrica recomendada para el ranking).
- **Rentabilidad Real a 36 meses**.
- **Rentabilidad Real a 12 meses**.
- **Rentabilidad Nominal histórica**.
