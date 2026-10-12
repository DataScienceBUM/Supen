# DOCUMENTACIÓN TÉCNICA Y ANALÍTICA: API DE ESTADÍSTICAS SUPEN
## Sistema Nacional de Pensiones de Costa Rica: Catálogos, Endpoints, KPIs y Especificación para Plataforma Web Interactiva

---

## 1. RESUMEN EJECUTIVO Y CONTEXTO DEL SISTEMA

### 1.1. Propósito de la Documentación
El presente documento constituye la especificación técnica, analítica y funcional integral del **API de Estadísticas de la Superintendencia de Pensiones de Costa Rica (SUPEN)** (`https://webapps.supen.fi.cr/Estadisticas/API/documentacion/index.html`). Su objetivo principal es estructurar y documentar cada uno de los conjuntos de datos abiertos del sistema previsional costarricense, formalizar los indicadores clave de rendimiento (KPIs), modelar las métricas financieras bajo la **Ley de Protección al Trabajador (Ley N.° 7983)** y diseñar la arquitectura de información para una **plataforma web interactiva de transparencia y análisis de pensiones**.

### 1.2. El Sistema de Pensiones en Cifras
El Sistema Nacional de Pensiones (SNP) de Costa Rica supervisado por la SUPEN y normado por el **Consejo Nacional de Supervisión del Sistema Financiero (CONASSIF)** es el mayor acumulador de ahorro institucional del país:
- **Activos Totales Administrados:** Superan los **₡27 billones de colones**.
- **Peso del ROP en la Economía:** El Régimen Obligatorio de Pensión Complementaria (ROP) administra entre **₡13.6 y ₡14.0 billones de colones**, lo que representa cerca del **28% al 30% del Producto Interno Bruto (PIB)** de Costa Rica.
- **Cuentas Individuales:** Más de **3.0 millones de afiliados registrados** en el ROP, con una masa laboral cotizante mensual en el SICERE de entre **1.35 y 1.45 millones de trabajadores**.
- **Concentración de Mercado:** El mercado está integrado por **6 Operadoras de Pensiones Complementarias (OPCs)** autorizadas, con un fuerte peso de entidades ligadas a bancos públicos.

### 1.3. Las 6 Operadoras de Pensiones Complementarias (OPCs) Activas
| Operadora (Código SUPEN) | Denominación Comercial | Naturaleza / Casa Matriz | Cuota ROP Aprox. | Características Distintivas |
| :--- | :--- | :--- | :---: | :--- |
| **POPULAR** (`A04`) | **Popular Pensiones** | Ente Público no Estatal (Banco Popular) | **~39.5% - 40.5%** | **Líder absoluto de mercado.** Recibe la asignación legal por defecto de trabajadores no inscritos. Mayor cobertura territorial. |
| **BN-VITAL** (`A02`) | **BN Vital** | Entidad Pública Comercial (Banco Nacional) | **~18.5% - 19.2%** | **Segunda mayor operadora.** Red de distribución bancaria nacional más extensa, fuerte peso corporativo e institucional. |
| **BCR-PENSION** (`A01`) | **BCR Pensión** | Entidad Pública Comercial (Banco de Costa Rica) | **~15.0% - 15.5%** | **Tercera posición.** Muy consolidada en el sector empresarial e institucional ligado al conglomerado BCR. |
| **BACSJ PENSIONES** (`A05`) | **BAC San José Pensiones** | Entidad Privada (Grupo BAC / Aval) | **~12.8% - 13.5%** | **Líder del sector privado.** Fuerte captación de masa salarial multinacional, canales digitales y planes voluntarios en USD. |
| **CCSS-OPC** (`A06`) | **CCSS OPC** | Ente Público Autónomo (CCSS) | **~7.0% - 7.6%** | Creada por la Caja Costarricense de Seguro Social. Afinidad gremial con trabajadores del sector salud pública. |
| **VIDA PLENA** (`A03`) | **Vida Plena OPC** | Privada / Gremial (JUPEMA) | **~5.0% - 5.5%** | **Nicho magisterial y educativo.** Fuerte arraigo en docentes de escuelas, colegios y universidades públicas. |

*(Nota histórica: En series anteriores a 2020 aparecen registros de entidades absorbidas o cerradas como `INS_PENSIONES` e `IBP_PENSIONES`).*

---

## 2. ESPECIFICACIÓN TÉCNICA GENERAL DEL API REST SUPEN

### 2.1. Arquitectura y Seguridad
- **URL Base:** `https://webapps.supen.fi.cr/estadisticas/api`
- **Protocolo:** HTTPS / RESTful.
- **Autenticación:** **Ninguna (API Pública y Abierta)**. No requiere API Keys, tokens Bearer ni registro de usuario.
- **Formato de Respuesta:** JSON (`application/json; charset=utf-8`).
- **Encabezados Recomendados:**
  ```http
  Accept: application/json
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
  ```

### 2.2. Parámetros Globales de Consulta (Query String)
Todos los endpoints aceptan tres parámetros opcionales en el Query String:

| Parámetro | Tipo | Formato / Ejemplo | Descripción y Comportamiento |
| :--- | :--- | :--- | :--- |
| `Fondo` | `string` | `ROP`, `FCL`, `VOLCA`, etc. | Código mnemónico del fondo. Si se omite, retorna datos de todos los fondos disponibles para el periodo. |
| `FechaInicio` | `string` | `AAAA-MM-DD` (`2024-01-01`) | Fecha de inicio del rango de registros. Si se omite, retorna todo el histórico disponible (o el valor por defecto del sistema). |
| `FechaFinal` | `string` | `AAAA-MM-DD` (`2024-01-31`) | Fecha final del rango de registros. Debe ser mayor o igual a `FechaInicio`. |

> [!IMPORTANT]
> **Optimización y Límites de Rendimiento:**
> - El API de la SUPEN contiene series históricas mensuales que datan desde el año **2010**.
> - Para consultas de endpoints de alto volumen como `/portafolio` y especialmente `/portafolioISIN`, **siempre debe especificarse una fecha de corte puntual** (ej. `FechaInicio=2024-01-31&FechaFinal=2024-01-31`). Consultar rangos de varios años sin filtro en `/portafolioISIN` causará **Timeouts (Error 504 / Gateway Timeout)** debido a la cantidad masiva de títulos individuales.
> - La periodicidad de actualización de los datos en el API es **mensual**, con cortes al último día natural de cada mes (`AAAA-MM-30` o `AAAA-MM-31`).

---

### 2.3. Catálogos Maestros del Sistema

A partir del análisis exhaustivo del archivo de control `API_AFILIADO.xlsx` (Hoja *Catálogo*) y los diccionarios de la SUPEN, se consolidan las siguientes tablas de referencia maestras:

#### A. Catálogo de Fondos (`codigofondo`)
| Código | Nombre Oficial en SUPEN | Pilar / Ley | Régimen Asociado |
| :--- | :--- | :--- | :--- |
| `ROP` | Régimen Obligatorio de Pensión Complementaria | Pilar 2 (Ley 7983) | Obligatorio Complementario (Código 2) |
| `FCL` | Fondo de Capitalización Laboral | Pilar 2 (Ley 7983) | Capitalización Laboral (Código 3) |
| `VOLCA` | Régimen Voluntario Fondos A Colones | Pilar 3 (Ley 7983) | Voluntario Individual (Código 1 / 6) |
| `VOLDA` | Régimen Voluntario Fondos A Dólares | Pilar 3 (Ley 7983) | Voluntario Individual (Código 1 / 6) |
| `VOLCB` | Régimen Voluntario Fondos B Colones | Pilar 3 (Ley 7983) | Voluntario Colectivo (Código 1 / 6) |
| `VOLDB` | Régimen Voluntario Fondos B Dólares | Pilar 3 (Ley 7983) | Voluntario Colectivo (Código 1 / 6) |
| `VOLCC` | Régimen Voluntario Fondos C Colones | Pilar 3 (Ley 7983) | Voluntario Mixto (Código 1 / 6) |
| `VOLDC` | Régimen Voluntario Fondos C Dólares | Pilar 3 (Ley 7983) | Voluntario Mixto (Código 1 / 6) |
| `VRTP` | Renta Temporal de Pensiones (Voluntario) | Pilar 3 | Planes Voluntarios |
| `OCUP` | Regímenes Ocupacionales Complementarios | Ley Especial | Fondos Ocupacionales (ej. Empleados BCR) |
| `BASI` | Regímenes Básicos | Pilar 1 | Reparto / Beneficio Definido |
| `CAP. LEY 752`| Fondos de Capitalización Ley 7523 Colones | Ley 7523 | Precursores de planes de pensiones |
| `ROP_E` / `FCL_E` | Registros Errados / En Aclaración | Control | Subcuentas transitorias de corrección |

#### B. Catálogo de Regímenes Previsionales (`codigoregimen`)
| Código | Denominación del Régimen | Descripción Legal |
| :---: | :--- | :--- |
| `1` | **PLANES VOLUNTARIOS** | Ahorro voluntario individual con beneficios fiscales (Ley 7983). |
| `2` | **RÉGIMEN OBLIGATORIO COMPLEMENTARIO (ROP)** | Capitalización individual obligatoria del 4.25% del salario. |
| `3` | **FONDO DE CAPITALIZACIÓN LABORAL (FCL)** | Cesantía anticipada del 1.5% del salario patronal. |
| `4` | **REGÍMENES BÁSICOS** | IVM (CCSS), Magisterio Nacional (JUPEMA), Poder Judicial. |
| `5` | **REGÍMENES OCUPACIONALES COMPLEMENTARIOS** | Fondos de ahorro y retiro creados por convenciones o empresas. |
| `6` | **PLANES VOLUNTARIOS COLECTIVOS** | Ahorro voluntario bajo esquemas corporativos/patronales. |

#### C. Catálogo de Cuentas Contables Clave (`codigocuenta` en `/Cuenta`)
| Código Contable | Descripción de la Cuenta | Importancia Analítica |
| :--- | :--- | :--- |
| `1100000000000` | **ACTIVO NETO DEL FONDO DE PENSIONES** | Patrimonio total líquido administrado por el fondo. |
| `1300000000000` | **VALOR CUOTA (NAV)** | Precio de la unidad de participación del fondo. |
| `2100000000000` | **ACTIVO TOTAL** | Suma de inversiones, cuentas por cobrar y efectivo. |
| `2120000000000` | **INVERSIONES EN INSTRUMENTOS FINANCIEROS** | Cartera de títulos valores a valor de mercado. |
| `2200000000000` | **PASIVOS** | Cuentas por pagar operativas y comisiones devengadas. |
| `2300000000000` | **PATRIMONIO** | Aportes acumulados de afiliados + rendimientos retenidos. |
| `2400000000000` | **GASTOS** | Costos operacionales deducibles del fondo. |
| `2500000000000` | **INGRESOS** | Ganancias de capital, cupones, dividendos e intereses. |

#### D. Catálogo de Modalidades de Inversión (`codigomodalidadinversion`)
| Código | Modalidad de Inversión | Descripción Financiera |
| :--- | :--- | :--- |
| `DE` | Deuda Estandarizada Nivel I | Bonos soberanos líquidos (Hacienda, BCCR, Tesoro USA). |
| `D2` / `D3` | Deuda Estandarizada Nivel II / III | Bonos corporativos o emisiones con menor liquidez. |
| `DI` | Deuda Individual | Pagarés o títulos individuales no seriados. |
| `E1` / `E2` / `E3` | Exchange Traded Funds (ETFs) Niveles I-III | Fondos cotizados en bolsa (ej. S&P 500, MSCI World). |
| `AC` | Acciones | Renta variable de empresas cotizadas. |
| `AD` | American Depositary Receipts (ADR) | Acciones extranjeras transadas en bolsas de EE.UU. |
| `P1` / `P2` / `P3` | Participaciones en Fondos de Inversión I-III | Fondos mutuos o de inversión locales e internacionales. |
| `NE` | Nota Estructurada con Capital Protegido | Instrumentos híbridos derivados con piso de capital. |
| `FC` | Cobertura Tipo de Cambio - Futuro | Derivados cambiarios para cobertura USD/CRC. |
| `RE` / `PV` | Reportos / Préstamos de Valores | Operaciones de liquidez a muy corto plazo. |

#### E. Demografía, Moneda y Escalas
- **Moneda (`codigomoneda`):** `1` = Colones (`CRC`), `2` = Dólares (`USD`).
- **Sexo (`codigosexo`):** `M` = Masculino / Hombre, `F` = Femenino / Mujer.
- **Rango Etario (`codigorangoedad`):**
  - `1`: `< 31` años
  - `2`: `31 A < 45` años
  - `3`: `45 A < 59` años
  - `4`: `59 A < 100` años
  - `5`: `>= 100` años

---

## 3. DOCUMENTACIÓN EXHAUSTIVA DE CADA ENDPOINT

A continuación se detalla cada uno de los 8 endpoints disponibles, su especificación OpenAPI, parámetros, diccionario de campos según los manuales oficiales de la SUPEN, carga útil real (payload de muestra) y su aplicabilidad funcional.

---

### 3.1. Endpoint: `/estadisticas/api/comision`
- **Método HTTP:** `GET`
- **Descripción:** Devuelve las comisiones cobradas por cada operadora en cada fondo. Permite evaluar la comisión histórica sobre aportes y sobre rendimientos, así como la **comisión vigente sobre saldo administrado**.
- **Parámetros:**
  - `Fondo` (opcional): Código de fondo (ej. `ROP`, `FCL`, `VOLCA`).
  - `FechaInicio` / `FechaFinal` (opcional): Rango en formato `AAAA-MM-DD`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Nombre comercial de la operadora (ej. `POPULAR`, `BN-VITAL`, `BCR-PENSION`). |
| `tipo` | `string` | Nominal | Base de cobro de la comisión: `SALDO` (vigente), `APORTE` o `RENDIMIENTO` (históricos). |
| `comisión` | `number` | Razón (%) | Porcentaje de comisión anualizada cobrada (ej. `0.35`, `2.0`). En tipos inactivos es `null`. |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del reporte (`2024-01-31T00:00:00`). |
| `codigoregimen` | `integer` | Nominal | Código numérico del régimen previsional (1 a 6). |
| `régimen` | `string` | Nominal | Denominación del régimen previsional. |
| `codigofondo` | `string` | Nominal | Sigla mnemónica del fondo (ej. `ROP`, `FCL`). |
| `fondo` | `string` | Nominal | Nombre descriptivo del fondo administrado. |

#### Ejemplo de Respuesta Real (JSON)
```json
[
  {
    "entidad": "POPULAR",
    "tipo": "SALDO",
    "comisión": 0.35,
    "fecha": "2024-01-31T00:00:00",
    "codigoregimen": 2,
    "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
    "codigofondo": "ROP",
    "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
  },
  {
    "entidad": "BN-VITAL",
    "tipo": "SALDO",
    "comisión": 0.35,
    "fecha": "2024-01-31T00:00:00",
    "codigoregimen": 2,
    "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
    "codigofondo": "ROP",
    "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
  }
]
```

#### Utilidad y Desgloses para la Web
- **Comparador de Costos:** Permite identificar inmediatamente si una operadora cobra por debajo del tope regulatorio fijado por el CONASSIF (actualmente 0.35% anual sobre saldo en ROP).
- **Serie Temporal de Reducción de Comisiones:** Gráfica escalonada que muestra cómo la comisión bajó desde el 1.10% en los años 2000 hasta el 0.35% actual.
- **Simulador de Fee Drag:** Base matemática para calcular el dinero que pierde un trabajador a lo largo de 35 años por el cobro de administración.

---

### 3.2. Endpoint: `/estadisticas/api/rendimiento`
- **Método HTTP:** `GET`
- **Descripción:** Retorna las rentabilidades oficiales calculadas por la SUPEN bajo la metodología de **Valor Cuota Promedio Mensual**, desagregadas por tipo (Nominal vs. Real) y periodicidad (12 meses, 36 meses, 60 meses, 10 años e histórica).
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Nombre de la operadora de pensiones. |
| `tipo` | `string` | Nominal | Tipo de cálculo: `NOMINAL` o `REAL` (ajustado por inflación IPC). |
| `periodicidad` | `string` | Ordinal | Horizonte temporal: `12 MESES`, `36 MESES`, `60 MESES`, `10 AÑOS`, `HISTÓRICA`. |
| `rentabilidad` | `number` | Razón (%) | Tasa geométrica anualizada de rentabilidad en porcentaje (ej. `8.1`, `3.45`). |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del cálculo (`2024-01-31T00:00:00`). |
| `codigoregimen` | `integer` | Nominal | Código de régimen previsional. |
| `régimen` | `string` | Nominal | Nombre del régimen. |
| `codigofondo` | `string` | Nominal | Sigla del fondo (`ROP`, `FCL`, etc.). |
| `fondo` | `string` | Nominal | Nombre completo del fondo. |

#### Ejemplo de Respuesta Real (JSON)
```json
[
  {
    "entidad": "BACSJ PENSIONES",
    "tipo": "NOMINAL",
    "periodicidad": "10 AÑOS",
    "rentabilidad": 8.1,
    "fecha": "2024-01-31T00:00:00",
    "codigoregimen": 2,
    "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
    "codigofondo": "ROP",
    "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
  },
  {
    "entidad": "BACSJ PENSIONES",
    "tipo": "REAL",
    "periodicidad": "36 MESES",
    "rentabilidad": 2.85,
    "fecha": "2024-01-31T00:00:00",
    "codigoregimen": 2,
    "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
    "codigofondo": "ROP",
    "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
  }
]
```

#### Utilidad y Desgloses para la Web
- **Ranking Semáforo de Operadoras:** Permite rankear a las 6 OPCs por **Rentabilidad Real Neta a 36 y 60 meses**, el estándar internacional que elimina el ruido publicitario de corto plazo.
- **Gráficos Multi-Línea Temporales:** Evolución del rendimiento real histórico de cada fondo contra una banda de referencia de la inflación costarricense.
- **Educación Financiera (Minusvalías vs. Ganancias):** Permite ilustrar de forma interactiva la recuperación tras caídas de mercado (ej. el rebote de 2023-2024 tras las minusvalías de 2022).

---

### 3.3. Endpoint: `/estadisticas/api/portafolio`
- **Método HTTP:** `GET`
- **Descripción:** Proporciona la composición agregada del portafolio de inversiones de cada fondo, clasificada por emisor/gestor institucional, clase de instrumento, sector económico, moneda y plazo de vencimiento.
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Operadora de pensiones titular de la cartera. |
| `codigoentidad` | `string` | Nominal | Código de operadora (ej. `A01`, `A02`, `A04`). |
| `codigomoneda` | `integer` | Nominal | `1` = Colones, `2` = Dólares. |
| `moneda` | `string` | Nominal | Moneda del instrumento (`COLONES`, `DÓLARES`). |
| `codigomodalidadinversion` | `string` | Nominal | Código mnemónico de modalidad (ej. `DE`, `AC`, `E1`). |
| `modalidadinversion` | `string` | Nominal | Descripción de la modalidad de inversión. |
| `codigoinstrumento` | `integer` | Nominal | Código numérico del tipo de instrumento. |
| `instrumento` | `string` | Nominal | Tipo de instrumento (`DEUDA ESTANDARIZADA`, `ACCIONES`, etc.). |
| `codigofondoinversion`| `integer` | Nominal | Código del fondo de inversión si aplica (o `-1` / `NO DISPONIBLE`). |
| `fondoinversion` | `string` | Nominal | Nombre del fondo de inversión en el que invierte. |
| `codigoplazo` | `integer` | Ordinal | Código ordinal del rango de vencimiento. |
| `plazo` | `string` | Ordinal | Rango de plazo (ej. `< 360 DÍAS`, `ENTRE 360 Y 1800 DÍAS`, `> 1800 DÍAS`). |
| `codigosector` | `integer` | Nominal | Código del sector: `1` = Público, `2` = Privado, `3` = Externo. |
| `sector` | `string` | Nominal | Sector emisor: `PUBLICO`, `PRIVADO`, etc. |
| `codigoemisor_gestor` | `string` | Nominal | Código oficial del emisor (ej. `G` = Hacienda, `BCCR`, etc.). |
| `emisor_gestor` | `string` | Nominal | Nombre del emisor: `MINISTERIO DE HACIENDA`, `BANCO CENTRAL`, etc. |
| `montocolones` | `number` | Razón | Valor de mercado de la posición expresado en Colones (₡). |
| `montodolares` | `number` | Razón | Valor de mercado de la posición expresado en Dólares ($). |
| `tipo` | `string` | Nominal | Clasificación de `EMISOR` o `GESTOR` (ej. SAFIs administradoras). |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del balance de cartera. |
| `codigoregimen` / `régimen` | `int`/`str` | Nominal | Régimen previsional correspondiente. |
| `codigofondo` / `fondo` | `str`/`str` | Nominal | Código y nombre del fondo consultado. |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidad": "BN-VITAL",
  "codigoentidad": "A02",
  "codigomoneda": 1,
  "moneda": "COLONES",
  "codigomodalidadinversion": "DE",
  "modalidadinversion": "(2020) DEUDA ESTANDARIZADA NIVEL I",
  "codigoinstrumento": 1,
  "instrumento": "DEUDA ESTANDARIZADA",
  "codigofondoinversion": "-1",
  "fondoinversion": "NO DISPONIBLE",
  "codigoplazo": 3,
  "plazo": "ENTRE 360 Y 1800 DÍAS",
  "codigosector": 1,
  "sector": "PUBLICO",
  "codigoemisor_gestor": "G",
  "emisor_gestor": "MINISTERIO DE HACIENDA",
  "montocolones": 185420300450.0,
  "montodolares": 361443080.8,
  "tipo": "EMISOR",
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 2,
  "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
  "codigofondo": "ROP",
  "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
}
```

#### Utilidad y Desgloses para la Web
- **Monitor de Deuda Soberana:** Calcula con precisión matemática qué porcentaje del ROP y de cada operadora está invertido en bonos del Gobierno de Costa Rica vs. el Sector Exterior.
- **Treemaps de Asignación de Activos:** Permite visualizar rectángulos proporcionales por Sector (Público/Privado/Externo) y Moneda (CRC vs. USD).
- **Evolución Temporal de la Diversificación:** Gráfico de áreas apiladas que muestra la apertura hacia inversiones internacionales desde 2018 en adelante.

---

### 3.4. Endpoint: `/estadisticas/api/portafolioISIN`
- **Método HTTP:** `GET`
- **Descripción:** El endpoint más granular y detallado del API. Devuelve cada título valor individual presente en las carteras de los fondos, identificado unívocamente por su código **ISIN (International Securities Identification Number)**.
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.
- **Consideración Crítica:** Debido al volumen extremo de datos (miles de instrumentos individuales por corte), **se debe consultar obligatoriamente para una única fecha de corte** (ej. `FechaInicio=2024-01-31&FechaFinal=2024-01-31`) para evitar errores de timeout.

#### Diccionario de Datos
Contiene todos los 24 campos de `/portafolio` más el campo identificador:
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `isin` | `string` | Nominal | Código ISIN único internacional de 12 caracteres del título (ej. `CRG0000B22J5`, `US0378331005`, `IE00B4L5Y983`). |
| *(24 campos restantes)* | *(iguales a `/portafolio`)* | | Entidad, emisor, instrumento, montos colones/dólares, plazos, sector, etc. |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidad": "BN-VITAL",
  "codigoentidad": "A02",
  "codigomoneda": 1,
  "moneda": "COLONES",
  "codigomodalidadinversion": "DE",
  "modalidadinversion": "(2020) DEUDA ESTANDARIZADA NIVEL I",
  "codigoinstrumento": 1,
  "instrumento": "DEUDA ESTANDARIZADA",
  "codigofondoinversion": "-1",
  "fondoinversion": "NO DISPONIBLE",
  "codigoplazo": 3,
  "plazo": "ENTRE 360 Y 1800 DÍAS",
  "codigosector": 1,
  "sector": "PUBLICO",
  "codigoemisor_gestor": "G",
  "emisor_gestor": "MINISTERIO DE HACIENDA",
  "montocolones": 1045145330.0,
  "montodolares": 2037240.91,
  "isin": "CRG0000B22J5",
  "tipo": "EMISOR",
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 5,
  "régimen": "FONDO DE CAPITALIZACIÓN LABORAL",
  "codigofondo": "FCL",
  "fondo": "CAPITALIZACION LABORAL (11)"
}
```

#### Utilidad y Desgloses para la Web
- **Buscador de Títulos (ISIN Screener):** Un buscador interactivo estilo Bloomberg/Morningstar donde un usuario o periodista ingresa `CRG...` o `US...` y ve qué operadoras tienen ese bono, cuánto dinero tienen colocado y qué peso representa.
- **Trazador de Inversiones Internacionales:** Revela las tenencias en fondos como Vanguard S&P 500 ETF, iShares Core MSCI World, bonos soberanos de EE.UU. u otros vehículos globales.
- **Escalera de Vencimientos (Maturity Ladder):** Agrupación por año de vencimiento de los bonos para monitorear el riesgo de refinanciamiento de la deuda soberana.

---

### 3.5. Endpoint: `/estadisticas/api/LT` (Libre Transferencia)
- **Método HTTP:** `GET`
- **Descripción:** Reporta la **matriz completa de traspasos de afiliados y recursos entre operadoras de origen y de destino**. Cada registro representa una operadora de origen (`entidadorigen`) y contiene columnas para cada una de las operadoras del mercado, indicando la cantidad de afiliados trasladados (`_C`) y el monto monetario total traspasado (`_M`).
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos (Estructura Matricial)
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidadorigen` | `string` | Nominal | Operadora de la cual salen los afiliados y recursos (OPC cedente). |
| `codigomoneda` / `moneda` | `int`/`str` | Nominal | Moneda de los fondos transferidos (`1` Colones / `2` Dólares). |
| `BN_VITAL_C` / `BN_VITAL_M` | `int`/`num` | Razón | Cantidad de personas (`_C`) y Monto en dinero (`_M`) transferidos hacia BN Vital. |
| `POPULAR_C` / `POPULAR_M` | `int`/`num` | Razón | Cantidad de personas y Monto transferidos hacia Popular Pensiones. |
| `BACSJ_PENSIONES_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto transferidos hacia BAC San José Pensiones. |
| `BCR_PENSION_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto transferidos hacia BCR Pensión. |
| `VIDA_PLENA_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto transferidos hacia Vida Plena. |
| `CCSS_OPC_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto transferidos hacia CCSS OPC. |
| `INS_PENSIONES_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto hacia INS Pensiones (histórico). |
| `IBP_PENSIONES_C` / `..._M` | `int`/`num` | Razón | Cantidad de personas y Monto hacia IBP Pensiones (histórico). |
| `fecha` | `string` (date-time)| Fecha | Mes de reporte de los traslados ejecutados. |
| `codigoregimen` / `régimen` | `int`/`str` | Nominal | Régimen previsional de los fondos. |
| `codigofondo` / `fondo` | `str`/`str` | Nominal | Fondo de procedencia (`ROP`, `FCL`, etc.). |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidadorigen": "BCR-PENSION",
  "codigomoneda": 1,
  "moneda": "COLONES",
  "BN_VITAL_C": 805,
  "BN_VITAL_M": 2401130854.44,
  "POPULAR_C": 1073,
  "POPULAR_M": 7404409329.01,
  "VIDA_PLENA_C": 64,
  "VIDA_PLENA_M": 629261458.83,
  "BACSJ_PENSIONES_C": 412,
  "BACSJ_PENSIONES_M": 3150240110.20,
  "CCSS_OPC_C": 95,
  "CCSS_OPC_M": 810450000.00,
  "BCR_PENSION_C": 0,
  "BCR_PENSION_M": 0.0,
  "INS_PENSIONES_C": 0,
  "INS_PENSIONES_M": 0.0,
  "IBP_PENSIONES_C": 0,
  "IBP_PENSIONES_M": 0.0,
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 2,
  "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
  "codigofondo": "ROP",
  "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
}
```

#### Utilidad y Desgloses para la Web
- **Diagrama de Sankey / Cuerdas (Chord Diagram):** Es la fuente de datos ideal para visualizar los flujos bilaterales de migración entre operadoras: bandas que nacen en las entidades de origen y conectan con las de destino con grosor proporcional al dinero o número de personas.
- **Cálculo de Tasa Neta de Migración:**
  $$\text{Ganancia Neta}_i = \sum_{j \neq i} M_{j \to i} - \sum_{j \neq i} M_{i \to j}$$
  Permite identificar de forma transparente qué operadoras ganan o pierden afiliados y capital cada mes.
- **Correlación con Rentabilidad:** Permite investigar si los trabajadores se trasladan racionalmente persiguiendo mayor rentabilidad real o influidos por campañas de ventas bancarias.

---

### 3.6. Endpoint: `/estadisticas/api/Afiliado`
- **Método HTTP:** `GET`
- **Descripción:** Contiene la demografía laboral y salarial del sistema previsional, clasificando los registros por sexo, grupo de edad, cantidad total de afiliados registrados, cantidad de cotizantes efectivos (aportantes) y montos de salario/aporte promedio.
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Operadora de pensiones. |
| `codigosexo` / `sexo` | `str`/`str` | Nominal | `M` = `MASCULINO`, `F` = `FEMENINO`. |
| `codigorangoedad` | `integer` | Ordinal | Código de 1 a 5 para el grupo etario. |
| `rangoedad` | `string` | Ordinal | `< 31`, `31 A < 45`, `45 A < 59`, `59 A < 100`, `>= 100`. |
| `afiliados` | `integer` | Razón | Cantidad total de personas afiliadas registradas en el fondo. |
| `aportantes` | `integer` | Razón | Cantidad de trabajadores que efectivamente cotizaron en el mes. |
| `salario_o_aporte_colones`| `number` | Razón | Monto de salario o aporte promedio mensual en Colones (₡). |
| `salario_o_aporte_dolares`| `number` | Razón | Monto de salario o aporte promedio mensual en Dólares ($). |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del reporte. |
| `codigoregimen` / `régimen` | `int`/`str` | Nominal | Régimen previsional. |
| `codigofondo` / `fondo` | `str`/`str` | Nominal | Fondo consultado (`ROP`, `FCL`, etc.). |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidad": "BN-VITAL",
  "codigosexo": "F",
  "sexo": "FEMENINO",
  "codigorangoedad": 3,
  "rangoedad": " 45 A < 59",
  "afiliados": 60979,
  "aportantes": 22454,
  "salario_o_aporte_colones": 612149297.0,
  "salario_o_aporte_dolares": 1193226.96,
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 2,
  "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
  "codigofondo": "ROP",
  "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
}
```

#### Utilidad y Desgloses para la Web
- **Pirámide Poblacional Interactiva de Pensiones:** Visualización con cohortes etarias en el eje vertical y desglose hombre/mujer para explorar la demografía de aportantes de cada operadora.
- **Tasa de Densidad de Cotización:** Métrica calculada $\frac{\text{Aportantes}}{\text{Afiliados}}$, que revela la intermitencia laboral (en el ejemplo: $22.454 / 60.979 \approx 36.8\%$).
- **Monitoreo de la Brecha Salarial de Género:** Permite graficar el diferencial salarial cotizado entre hombres y mujeres en cada grupo de edad y operadora.

---

### 3.7. Endpoint: `/estadisticas/api/Beneficio`
- **Método HTTP:** `GET`
- **Descripción:** Reporta los beneficios otorgados y retiros pagados a los afiliados, detallando la cantidad de personas beneficiadas, montos totales desembolsados en colones y dólares, tipología del beneficio (Renta Vitalicia, Retiro Programado, Renta Permanente, Transitorios Ley 9906, etc.), sexo y rango de edad.
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Operadora de pensiones que efectúa el pago. |
| `codigosexo` / `sexo` | `str`/`str` | Nominal | Clasificación de género del beneficiario (`M` / `F`). |
| `codigorangoedad` / `rangoedad` | `int`/`str` | Ordinal | Grupo de edad del beneficiario al momento del pago. |
| `codigotipobeneficio` | `string` | Nominal | Código de clasificación del beneficio otorgado. |
| `tipobeneficio` | `string` | Nominal | Modalidad: `RENTA PERMANENTE`, `RETIRO PROGRAMADO`, etc. |
| `beneficio` | `integer` | Razón | Cantidad de personas beneficiarias que recibieron pago en el mes. |
| `beneficiocolones` | `number` | Razón | Monto monetario total pagado en Colones (₡). |
| `beneficiodolares` | `number` | Razón | Monto monetario total pagado en Dólares ($). |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del reporte. |
| `codigoregimen` / `régimen` | `int`/`str` | Nominal | Régimen previsional. |
| `codigofondo` / `fondo` | `str`/`str` | Nominal | Fondo de donde proviene el desembolso (`ROP`, `FCL`, etc.). |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidad": "BACSJ PENSIONES",
  "codigosexo": "F",
  "sexo": "FEMENINO",
  "codigorangoedad": 1,
  "rangoedad": " < 31",
  "codigotipobeneficio": "1",
  "tipobeneficio": "RENTA PERMANENTE",
  "beneficio": 29,
  "beneficiocolones": 1150099.48,
  "beneficiodolares": 2241.82,
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 2,
  "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
  "codigofondo": "ROP",
  "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
}
```

#### Utilidad y Desgloses para la Web
- **Distribución de Modalidades de Jubilación del ROP:** Gráficos que revelan qué porcentaje de jubilados opta por Retiro Programado vs. Renta Permanente o Renta Vitalicia.
- **Monitor de Retiros Quinquenales del FCL:** Visualización del ciclo económico de 5 años en Costa Rica cuando cientos de miles de trabajadores retiran su Fondo de Capitalización Laboral.
- **Pensión Promedio Efectiva:** Cálculo del monto medio mensual que reciben los jubilados del ROP ($\frac{\text{beneficiocolones}}{\text{beneficio}}$).

---

### 3.8. Endpoint: `/estadisticas/api/Cuenta`
- **Método HTTP:** `GET`
- **Descripción:** Devuelve la información contable y financiera estandarizada de los fondos de pensiones, permitiendo extraer el **Activo Neto del Fondo**, el **Valor Cuota (NAV)**, Inversiones en Valores, Pasivos, Patrimonio, Ingresos y Gastos devengados.
- **Parámetros:** `Fondo`, `FechaInicio`, `FechaFinal`.

#### Diccionario de Datos
| Campo | Tipo JSON | Escala | Descripción Oficial SUPEN |
| :--- | :--- | :--- | :--- |
| `entidad` | `string` | Nominal | Operadora de pensiones gestora del fondo. |
| `codigocuenta` | `string` | Nominal | Código de cuenta contable estandarizado (ej. `0110000000000`, `0130000000000`). |
| `cuenta` | `string` | Nominal | Denominación contable oficial (ej. `ACTIVO NETO DEL FONDO DE PENSIONES`). |
| `montocolones` | `number` | Razón | Saldo contable de la cuenta expresado en Colones (₡). |
| `montodolares` | `number` | Razón | Saldo contable de la cuenta expresado en Dólares ($). |
| `fecha` | `string` (date-time)| Fecha | Fecha de corte del balance contable. |
| `codigoregimen` / `régimen` | `int`/`str` | Nominal | Régimen previsional. |
| `codigofondo` / `fondo` | `str`/`str` | Nominal | Fondo contable reportado (`ROP`, `FCL`, `VOLCA`, etc.). |

#### Ejemplo de Respuesta Real (JSON)
```json
{
  "entidad": "BN-VITAL",
  "codigocuenta": "0110000000000",
  "cuenta": "ACTIVO NETO DEL FONDO DE PENSIONES",
  "montocolones": 2144947850088.42,
  "montodolares": 4181021890.16,
  "fecha": "2024-01-31T00:00:00",
  "codigoregimen": 2,
  "régimen": "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
  "codigofondo": "ROP",
  "fondo": "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
}
```

#### Utilidad y Desgloses para la Web
- **Serie Temporal del Valor Cuota (NAV Histórico):** Base para reconstruir la curva diaria/mensual del valor cuota de cada operadora desde 2010 a la fecha, permitiendo calcular rentabilidades a cualquier horizonte personalizado.
- **Cuota de Mercado Patrimonial:** Desglose del total de activos administrados por cada operadora para dimensionar su tamaño sistémico.
- **Análisis de Solvencia y Balance:** Visualización de la estructura Activo - Pasivo = Patrimonio de cada fondo.

---

## 4. CONTEXTO PREVISIONAL COSTARRICENSE, KPIS E ÍNDICES FINANCIEROS ESENCIALES

---

### 4.1. Arquitectura Multipilar en Costa Rica
El sistema previsional costarricense reformado por la Ley 7983 se organiza en 4 niveles complementarios:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARQUITECTURA MULTIPILAR                         │
├────────────────────────────────────────────────────────────────────────┤
│ Pilar 3: Régimen Voluntario Complementario (RVPC)                     │
│          Ahorro individual/colectivo (CRC / USD) con incentivo fiscal  │
├────────────────────────────────────────────────────────────────────────┤
│ Pilar 2: Régimen Obligatorio de Pensión Complementaria (ROP) + FCL     │
│          Capitalización individual obligatoria gestionada por OPCs    │
├────────────────────────────────────────────────────────────────────────┤
│ Pilar 1: Régimen Básico Obligatorio (Reparto / Beneficio Definido)    │
│          IVM (CCSS), JUPEMA (Magisterio), Poder Judicial               │
├────────────────────────────────────────────────────────────────────────┤
│ Pilar 0: Régimen No Contributivo (RNC)                                │
│          Asistencial / Pobreza Extrema (CCSS / FODESAF)               │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Pilar 1 (Básico Obligatorio - Reparto):** El IVM de la CCSS cubre a la mayoría de asalariados. Con las reformas paramétricas vigentes desde 2024 (edad mínima 65 años con 300 cuotas para hombres, 63 para mujeres con 405 cuotas), la tasa de reemplazo estimada bajó hacia rangos del **43% al 50%**.
2. **Pilar 2 (ROP y FCL - Capitalización Individual):**
   - **ROP:** Aporte mensual obligatorio del **4.25%** del salario reportado en planilla (3.25% patronal + 1.0% trabajador). Administrado por la OPC elegida por el trabajador en cuentas individuales de capitalización pura.
   - **FCL:** Aporte patronal del **1.5%** mensual (auxilio anticipado de cesantía). Se entrega al trabajador ante cese laboral o cada **5 años continuos con el mismo patrono (retiro quinquenal)**.
3. **Pilar 3 (Planes Voluntarios RVPC):** Ahorro complementario deducible del Impuesto sobre la Renta hasta por un máximo del **10% del salario bruto mensual**.

---

### 4.2. Fórmulas Matemáticas y Metodología Oficial SUPEN

#### A. Valor Cuota Diario y Promedio Mensual
El patrimonio del fondo se divide en unidades idénticas denominadas cuotas:
$$VC_t = \frac{\text{Activo Total}_t - \text{Pasivo Total}_t}{N_t}$$
Para neutralizar la volatilidad de fin de mes, la SUPEN utiliza el **Valor Cuota Promedio Mensual ($\overline{VC}_m$)** sobre los primeros 30 días de cada mes:
$$\overline{VC}_m = \frac{1}{30} \sum_{d=1}^{30} VC_{m,d}$$

#### B. Rentabilidad Nominal Anualizada Geométrica
Para un periodo de $n$ meses entre el mes actual $t$ y el mes base $t-n$:
$$R_{nom}(t, t-n) = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-n}} \right)^{\frac{12}{n}} - 1$$
- A 12 meses ($n=12$): $R_{nom, 12m} = \frac{\overline{VC}_t}{\overline{VC}_{t-12}} - 1$
- A 36 meses ($n=36$): $R_{nom, 36m} = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-36}} \right)^{1/3} - 1$
- A 60 meses ($n=60$): $R_{nom, 60m} = \left( \frac{\overline{VC}_t}{\overline{VC}_{t-60}} \right)^{1/5} - 1$

#### C. Rentabilidad Real Anualizada Neta (Ecuación de Fisher)
La rentabilidad real descuenta la inflación oficial del IPC (INEC):
$$R_{real}(t, t-n) = \frac{R_{nom}(t, t-n) - \pi(t, t-n)}{1 + \pi(t, t-n)}$$
Donde la inflación anualizada del periodo es:
$$\pi(t, t-n) = \left( \frac{\overline{IPC}_t}{\overline{IPC}_{t-n}} \right)^{\frac{12}{n}} - 1$$

> [!TIP]
> **¿Por qué la Rentabilidad Real Neta a 36 y 60 meses es el estándar correcto?**
> 1. Las pensiones son pasivos a 30-40 años que buscan mantener el poder de compra futuro. Una rentabilidad nominal del 7% con inflación del 8% destruye riqueza real (-0.93%).
> 2. La comisión diaria se deduce antes de fijar el valor cuota; por ende, la rentabilidad por valor cuota es **estrictamente neta de comisiones**.
> 3. Las ventanas de 36 y 60 meses suavizan los ciclos transitorios de tasas de interés y shocks cambiarios.

---

### 4.3. Estructura de Comisiones y "Fee Drag" a 35 Años
- **Tope Máximo Vigente:** Rige el tope de **0.35% anual sobre saldo administrado** en el ROP aprobado por CONASSIF (en los años 2000 el cobro era de hasta 1.10%).
- **El Impacto del Interés Compuesto (Fee Drag):**
  A pesar de que el 0.35% parece un porcentaje reducido, su cobro continuado durante 35 años de vida laboral reduce el saldo final de pensión:
  $$\text{Fee Drag Ratio} = 1 - \frac{FV_{\text{con comisión}}}{FV_{\text{sin comisión}}}$$
  - **Con comisión de 0.35%:** La reducción en el patrimonio final acumulado es de aproximadamente **~7.5%**.
  - **Con la comisión histórica de 1.10%:** La reducción en el patrimonio final alcanzaba entre **~21.5% y ~24.0%**.
  - Esto demuestra que la reducción regulatoria de comisiones impulsada por CONASSIF salvaguardó más de un 15% del ahorro previsional neto de los costarricenses.

---

### 4.4. Gestión de Riesgos de Portafolio

```
┌────────────────────────────────────────────────────────────────────────┐
│               ESTRUCTURA DE PORTAFOLIOS DEL ROP (SNP)                  │
├────────────────────────────────┬───────────────────────────────────────┤
│ Por Emisor:                    │ • Gobierno Central (Hacienda): 55-65% │
│                                │ • Exterior (ETFs/Global):      18-25% │
│                                │ • BCCR / Bancos Locales:       10-15% │
│                                │ • Corporativo Local:           < 5%   │
├────────────────────────────────┼───────────────────────────────────────┤
│ Por Moneda:                    │ • Colones (CRC):               65-70% │
│                                │ • Dólares (USD):               30-35% │
├────────────────────────────────┼───────────────────────────────────────┤
│ Por Instrumento:               │ • Deuda Soberana Tasa Fija/UD: 50-60% │
│                                │ • Fondos/ETFs Renta Variable:  12-18% │
│                                │ • Deuda Internacional Grado Inv: 8-12%│
│                                │ • Bonos Financieros Locales:   5-10%  │
└────────────────────────────────┴───────────────────────────────────────┘
```

1. **Concentración en Deuda Pública Soberana:** Entre el **55% y 65%** del ROP está invertido en títulos de deuda interna del Ministerio de Hacienda. Si bien ofrece rendimientos atractivos, genera una alta interdependencia entre la salud fiscal del Estado y la solvencia del ahorro de los trabajadores.
2. **Límite de Inversión en el Exterior:** El reglamento faculta a las operadoras a invertir hasta un **50% de los activos fuera de Costa Rica**. Actualmente la exposición ronda entre el **19% y el 25%**, mayoritariamente en ETFs indexados globales y bonos grado de inversión.
3. **El Episodio de Minusvalías de 2022:** La combinación de la subida de tasas de la Reserva Federal (caída del mercado bursátil internacional) con una fuerte apreciación del colón frente al dólar generó minusvalías contables en 2022. Quienes no se trasladaron de operadora recuperaron el valor con creces durante 2023-2024.
4. **Hito Estructural: Fondos Generacionales (2029):**
   Aprobados por el CONASSIF para regir a partir de **enero de 2029**, sustituyendo el fondo único por **4 fondos generacionales**:
   - **Fondo A (Nacidos $\le$ 1969):** Próximos a pensión. Cartera ultraconservadora de baja duración para proteger el capital.
   - **Fondo B (Nacidos 1970 - 1979):** Perfil moderado conservador.
   - **Fondo C (Nacidos 1980 - 1989):** Perfil de crecimiento moderado.
   - **Fondo D (Nacidos $\ge$ 1990):** Jóvenes. Perfil dinámico con mayor exposición a renta variable internacional para maximizar el crecimiento a largo plazo.

---

### 4.5. Libre Transferencia y Dinámica Conductual
- **Derecho de Traslado:** Cualquier trabajador puede cambiar de operadora sin costo alguno cada **6 meses calendario**.
- **Sesgo de Recencia:** La evidencia demuestra que muchos afiliados se cambian observando únicamente el ranking de rentabilidad de los últimos 12 meses ("performance chasing"), consolidando pérdidas contables al liquidar cuotas deprimidas durante caídas transitorias de mercado.

---

### 4.6. Modalidades de Retiro del ROP y Reformas de la Ley 9906
La **Ley N.° 9906 (octubre de 2020)** introdujo flexibilidad en las modalidades de desembolso del ROP:
1. **Renta Vitalicia:** Se transfiere el saldo a una compañía de seguros (INS) que garantiza una mensualidad fija de por vida. La aseguradora asume el riesgo financiero y de longevidad.
2. **Retiro Programado:** El dinero permanece en la OPC generando rendimientos. La pensión mensual se recalcula cada 12 meses dividiendo el saldo entre la expectativa de vida actuarial del afiliado.
3. **Renta Permanente:** El afiliado retira periódicamente únicamente los rendimientos reales devengados en los últimos 36 meses, preservando el capital principal intacto para herencia.
4. **Transitorio XX (Ley 9906, vigente hasta febrero de 2030):** Permite a los nuevos jubilados retirar el ROP en mensualidades equivalentes a la cantidad de cuotas efectivamente aportadas al régimen (con un piso mínimo del 20% de la pensión mínima del IVM).
5. **Retiro por Enfermedad Terminal:** Permite el retiro del **100% del saldo acumulado en un solo tracto**.

---

## 5. ARQUITECTURA DE INFORMACIÓN PARA LA PLATAFORMA WEB INTERACTIVA

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │      PLATAFORMA PREVISIONAL SUPEN COSTA RICA           │
                                    │              (Arquitectura Web)                        │
                                    └───────────────────────────┬────────────────────────────┘
                                                                │
     ┌──────────────────┬────────────────────────┬──────────────┴───────┬────────────────────────┬──────────────────┐
     │                  │                        │                      │                        │                  │
┌────┴──────┐   ┌───────┴──────┐         ┌───────┴──────┐       ┌───────┴──────┐         ┌───────┴──────┐   ┌───────┴──────┐
│  MÓDULO 0 │   │   MÓDULOS    │         │  HERRAMIENTA │       │   MÓDULOS    │         │  HERRAMIENTA │   │   SISTEMA    │
│  PANEL    │   │  FINANCIEROS │         │  ESTRATÉGICA │       │  DEMOGRAFÍA  │         │  ANALÍTICA   │   │  EDUCATIVO   │
│ EJECUTIVO │   │              │         │              │       │  Y RETIRO    │         │              │   │              │
└────┬──────┘   └───────┬──────┘         └───────┬──────┘       └───────┬──────┘         └───────┬──────┘   └───────┬──────┘
     │                  │                        │                      │                        │                  │
     ├─ Panorama Sist.  ├─ Rendimientos (/rend)  ├─ Simulador           ├─ Movilidad (/LT)       ├─ ISIN Screener   ├─ Glosario
     ├─ Activos Totales ├─ Comisiones (/comis)   │  "Elige tu OPC"      ├─ Afiliados (/Afiliado) │  (/portafolio)   │  Contextual
     └─ Tickers Mercado ├─ Portafolio (/port)    ├─ Monitor Deuda Gob.  ├─ Beneficios (/Benefic) └─ Deep Portfolio  └─ Metodología
                        └─ Contabilidad (/Cuent) └─ Fee Drag 30 Años    └─ Dinámica FCL 5 Años      Explorer           y Fórmulas
```

### 5.1. Estructura de Navegación y Vistas Principales

#### Vista 0: Panel Ejecutivo Panorámico (`/`)
- **Objetivo:** Responder en 10 segundos: ¿Cuál es el estado de la salud previsional en Costa Rica?
- **Endpoints:** `/Cuenta`, `/rendimiento`, `/comision`, `/Afiliado`.
- **Componentes:**
  - *KPI Cards:* Total Activo Administrado (₡ y $), Cotizantes Activos en SICERE, Rentabilidad Real Ponderada del Sistema a 5 años, Comisión Media Ponderada.
  - *Treemap de Cuota de Mercado:* Participación de las 6 operadoras sobre el activo administrado.
  - *Gráfico de Crecimiento Histórico:* Crecimiento del patrimonio total del SNP desde 2010.

#### Vista 1: Rendimientos y Ranking Previsional (`/rendimientos`)
- **Objetivo:** Mostrar con objetividad qué operadora genera mayor rentabilidad real neta.
- **Endpoints:** `/rendimiento`, `/comision`.
- **Componentes:**
  - *Tabla Ranking Semáforo:* Ordenada por Rendimiento Real Neto a 60 meses (verde: cuartil superior, amarillo: medio, naranja: inferior).
  - *Gráfico de Líneas Multi-Operadora:* Evolución del rendimiento real a 36 meses contra la inflación.
  - *Diagrama de Dispersión (Riesgo vs. Retorno):* Volatilidad del valor cuota vs. Rendimiento anualizado.

#### Vista 2: Comisiones y Estructura de Costos (`/comisiones`)
- **Objetivo:** Transparentar el costo de administración y el cumplimiento regulatorio.
- **Endpoints:** `/comision`, `/Cuenta`.
- **Componentes:**
  - *Gráfico de Escalones Histórico:* Caída del tope de comisiones del ROP desde 2005 hasta el 0.35% actual.
  - *Comparativa de Barras:* Comisión vigente por operadora para ROP, FCL y Voluntarios.
  - *Monto Recaudado por Operadora:* Estimación en colones de los ingresos por administración.

#### Vista 3: Asignación de Activos y Portafolios (`/portafolios`)
- **Objetivo:** Analizar la macro-distribución de los ahorros (Soberano vs. Exterior vs. Moneda).
- **Endpoints:** `/portafolio`.
- **Componentes:**
  - *Treemap Jerárquico:* Sector (Público/Privado/Externo) $\to$ Instrumento $\to$ Emisor.
  - *Gráfico de Áreas Apiladas al 100%:* Evolución histórica de la cuota en el exterior vs. Hacienda.
  - *Gráfico de Dona de Monedas:* Distribución porcentual en Colones (CRC) vs. Dólares (USD).

#### Vista 4: Explorador Granular de Inversiones por ISIN (`/isin-screener`)
- **Objetivo:** Permitir a analistas y periodistas inspeccionar cada título valor en cartera.
- **Endpoints:** `/portafolioISIN`.
- **Componentes:**
  - *Buscador Omnibox Universal:* Filtro por código ISIN, emisor o descripción de título.
  - *Tabla Financiera Virtualizada:* Monto valorado en ₡ y $, peso en la cartera, tipo de interés.
  - *Escalera de Vencimientos:* Distribución de vencimiento de bonos por año.
  - *Drawer / Modal de Tenencias Cruzadas:* Cuánto tiene cada una de las 6 OPCs en ese ISIN.

#### Vista 5: Flujos de Movilidad y Libre Transferencia (`/transferencias`)
- **Objetivo:** Rastrear hacia dónde se trasladan los afiliados y qué operadoras sufren fuga neta.
- **Endpoints:** `/LT`.
- **Componentes:**
  - *Diagrama de Sankey / Cuerdas Interactivo:* Cintas visuales que conectan operadoras de origen y destino con grosor según personas o dinero transferido.
  - *Gráfico de Barras Divergentes:* Saldo neto de traslados (ganancia neta vs. pérdida neta mensual).

#### Vista 6: Demografía Laboral y Brechas (`/afiliados`)
- **Objetivo:** Analizar la dinámica del empleo formal y las desigualdades previsionales.
- **Endpoints:** `/Afiliado`.
- **Componentes:**
  - *Pirámide Poblacional Interactiva:* Cohortes etarias con toggle entre Afiliados y Cotizantes.
  - *Monitor de Densidad de Cotización:* % de aportantes activos sobre registrados a lo largo del tiempo.
  - *Gráfico de Brecha Salarial de Género:* Comparativa de salarios medios masculinos vs. femeninos.

#### Vista 7: Beneficios y Retiros (`/beneficios`)
- **Objetivo:** Examinar la etapa de desacumulación y jubilación.
- **Endpoints:** `/Beneficio`.
- **Componentes:**
  - *Distribución por Modalidad de Retiro:* Cantidad de pensionados en Retiro Programado vs. Renta Vitalicia vs. Renta Permanente.
  - *Ciclo Quinquenal del FCL:* Gráfico de desembolsos masivos del FCL cada 5 años.
  - *Pensión Promedio Mensual:* Monto medio recibido en colones por los jubilados del ROP.

#### Vista 8: Contabilidad y Valor Cuota (`/contabilidad`)
- **Objetivo:** Acceder a la solidez financiera y series históricas del NAV.
- **Endpoints:** `/Cuenta`.
- **Componentes:**
  - *Serie Temporal del Valor Cuota (NAV):* Curva histórica con zoom interactivo (1A, 3A, 5A, Todo).
  - *Gráfico de Cascada (Waterfall):* Desglose de Activo - Pasivo = Activo Neto del Fondo.

---

## 6. ESPECIFICACIÓN DE HERRAMIENTAS INTERACTIVAS DE ALTO VALOR AGREGADO

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                    CENTRO DE HERRAMIENTAS INTERACTIVAS Y SIMULADORES                         │
├───────────────────────────────┬───────────────────────────────┬──────────────────────────────┤
│ 1. "ELIGE TU OPC"             │ 2. MONITOR DE DEUDA PÚBLICA   │ 3. FEE DRAG SIMULATOR        │
│    Simulador Comparativo      │    Riesgo Soberano vs Exterior│    Costo a 30 Años           │
│                               │                               │                              │
│ • Input: Salario, Saldo, Edad │ • Deuda Hacienda/BCCR vs Wall │ • Compara saldo con comi-    │
│ • Semáforo RNE (Estilo CONSAR)│   Street / Extranjero         │   sión cero vs cobrada       │
│ • Proyección diferencial ₡/USD│ • Gauge de Concentración HHI  │ • Revela el costo oculto     │
│ • Proyección pensión mensual  │ • Mapa Global de Inversiones  │   del interés compuesto      │
├───────────────────────────────┴───────────────────────────────┴──────────────────────────────┤
│ 4. TRAZADOR DE TÍTULOS E INVERSIONES INTERNACIONALES POR ISIN                                │
│ • Omnibox de búsqueda por código ISIN, Emisor (Hacienda, Apple, Vanguard)                    │
│ • Matriz de tenencias cruzadas entre las 6 OPCs y cronograma de vencimientos                 │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.1. Herramienta 1: Simulador / Comparador "Elige tu OPC"
Inspirado en el estándar del Indicador de Rendimiento Neto (IRN) de CONSAR México y el comparador de AFP de Chile:
- **Entradas del Usuario:**
  - Salario mensual bruto actual (₡).
  - Saldo acumulado en el ROP (₡) (con estimador automático según edad).
  - Edad actual y edad esperada de retiro (65 años por defecto).
  - Operadora actual en la que cotiza.
- **Modelo de Cálculo:**
  - Proyección de aportes mensuales del 4.25% ajustados por crecimiento salarial real.
  - Tasa neta histórica a 5 años de cada operadora: $r_{\text{neto}, i} = r_{\text{real}, 5a, i} - c_i$.
  - Capital final proyectado al retiro y pensión mensual estimada según factores actuariales de retiro programado de SUPEN.
- **Salida al Usuario:**
  - **Ranking con Semáforo:** Destaca la mejor y peor opción para su perfil particular.
  - **Diferencial Monetario Concreto:** *"Elegir la operadora con mejor rentabilidad histórica podría representar una diferencia de ₡8.450.000 adicionales al jubilarte"*.
  - Enlace directo a la guía de trámite de Libre Transferencia en SICERE con Firma Digital.

### 6.2. Herramienta 2: Monitor de Riesgo Soberano y Deuda Pública
- **Entradas / Métricas:** Concentración agregada en Ministerio de Hacienda + BCCR vs. Inversiones Internacionales.
- **Visualización:**
  - **Manómetro (Gauge) de Concentración Soberana:** Muestra el porcentaje de cada operadora con marcadores de alerta sobre límites prudenciales.
  - **Mapa Mundial de Tenencias (Choropleth Map):** Mapa interactivo que resalta los países custodios y mercados donde están invertidos los ahorros (EE.UU., Irlanda, Luxemburgo, Europa, Asia).
  - **Simulador de Sensibilidad Cambiaria:** Permite modelar el impacto en el portafolio ante una variación del $\pm 5\%$ o $\pm 10\%$ en el tipo de cambio USD/CRC.

### 6.3. Herramienta 3: Calculadora del Costo de Comisiones a 30 Años (Fee Drag)
- **Objetivo Educativo:** Demostrar cómo una comisión del 0.35% o 0.50% afecta el patrimonio a lo largo de décadas.
- **Visualización:** Gráfico de abanico con dos curvas divergentes: Curva A (Patrimonio con comisión 0%) vs. Curva B (Patrimonio neto con la comisión cobrada), acompañado de un gráfico de dona que desglosa:
  1. Capital aportado de tu bolsillo.
  2. Rendimientos netos generados.
  3. Comisiones acumuladas absorbidas por la operadora.

### 6.4. Herramienta 4: Trazador de Inversiones Internacionales por ISIN
- **Objetivo Institucional:** Buscar cualquier instrumento transado en bolsa y ver qué operadoras costarricenses lo poseen.
- **Funcionalidad:** Omnibox con autocompletado para emisores como *Ministerio de Hacienda*, *Tesoro de EE.UU.*, *Vanguard S&P 500 ETF*, *Apple*, *Microsoft*, *BlackRock*, desplegando una matriz de tenencias cruzadas y valor de mercado por operadora.

---

## 7. REQUERIMIENTOS DE UX/UI, ACCESIBILIDAD Y ESTÁNDARES COSTARRICENSES

### 7.1. Convenciones Financieras Costarricenses
- **Moneda Dual (Colones ₡ y Dólares $):**
  - Colones: Símbolo `₡` con separador de miles con punto y decimal con coma (ej. `₡ 14.250.800,50`).
  - Dólares: Símbolo `$` o código `USD` (ej. `$ 27.500,00 USD`).
  - Toggle global en el header para alternar la vista entre CRC y USD utilizando el tipo de cambio de referencia del BCCR.
- **Uso Estricto del Término "Billón":**
  - En español costarricense, "billón" equivale a un millón de millones ($10^{12}$), no al "billion" anglosajón ($10^9$).
  - La interfaz rotulará explícitamente `₡ Millones` ($10^6$) y `₡ Billones (millones de millones)` ($10^{12}$) con tooltips de ayuda.

### 7.2. Accesibilidad (WCAG AAA) y Visualización de Datos
- **Tipografía Financiera:** Tipografías sans-serif de alta legibilidad con cifras tabulares activadas (`font-variant-numeric: tabular-nums`) para garantizar alineación vertical perfecta de columnas numéricas.
- **Paleta de Colores No Excluyente:**
  - Prohibido el uso exclusivo de Rojo/Verde para denotar positivo/negativo (barrera crítica para daltónicos).
  - Uso de paletas contrastantes accesibles (Azul Cobalto para líderes/superior, Naranja Cálido para alertas/inferior) combinadas siempre con iconos ($\blacktriangle$ alza, $\blacktriangledown$ baja, $\bullet$ neutro).
- **Estructura Estándar de Gráficos:**
  - Título declarativo con la conclusión (ej. *"Popular Pensiones y BN Vital concentran el 59% del mercado"*).
  - Subtítulo con métrica y periodo exacto (ej. *"% del activo neto administrado, corte a enero 2024"*).
  - Nota al pie con fuente trazable (ej. *"Fuente: SUPEN, API de Estadísticas /Cuenta"*).
  - Vista alternativa accesible `<details><summary>Ver tabla de datos</summary>` debajo de cada gráfico.

### 7.3. Glosario Previsional Contextual (Micro-Interacciones)
Cada término técnico previsional que aparezca en la interfaz contará con un subrayado punteado sutil que despliega un tooltip explicativo accesible:
- **ROP:** Régimen Obligatorio de Pensión Complementaria (ahorro individual del 4.25% del salario).
- **FCL:** Fondo de Capitalización Laboral (ahorro patronal del 1.5% retirable cada 5 años o por desempleo).
- **Valor Cuota (NAV):** Precio contable unitario de una porción del fondo; sube cuando el fondo genera rendimientos.
- **Libre Transferencia (LT):** Derecho legal gratuito de trasladar los fondos a otra operadora tras 6 meses de permanencia.
- **Rentabilidad Real:** Ganancia financiera efectiva tras restar la inflación (IPC); refleja el verdadero poder de compra ganado.
- **Minusvalía:** Reducción contable transitoria en la cotización de mercado de un título; no es una pérdida real a menos que se venda el instrumento.
- **Código ISIN:** Identificador alfanumérico global único de 12 caracteres para un título valor bursátil.
- **Retiro Programado:** Modalidad de pensión donde el dinero sigue en la OPC y la mensualidad se recalcula anualmente.
- **Renta Vitalicia:** Modalidad donde el saldo se traslada a una aseguradora a cambio de una pensión fija de por vida.

### 7.4. Recomendaciones de Arquitectura Frontend para el Futuro Desarrollo
- **Framework Base:** Astro (SSG/SSR) con Tailwind CSS v4 para máximo rendimiento y mínima sobrecarga de JavaScript.
- **Visualizaciones de Datos:** `@observablehq/plot` pre-renderizado en el servidor a **SVG estático puro (0 KB de JavaScript cliente)** para el 80% de los gráficos informativos.
- **Islas Reactivas (`client:visible`):** Reservar JavaScript exclusivamente para los módulos interactivos que requieren cálculo inmediato del usuario (Simulador "Elige tu OPC", Trazador ISIN y Diagrama Sankey).
- **Caché y Proxy de Datos:** Diseñar un cron o worker intermedio que consulte el API de SUPEN una vez al mes (o tras cada publicación oficial) y guarde los datasets normalizados en una base de datos local / JSON estático, evitando latencias o caídas del servicio público ante alta concurrencia ciudadana.
