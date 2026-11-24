// === REFERENCE_TEXT (orientación, sin respuestas directas) ===
var REFERENCE_TEXT = [
  "===================================",
  "  ARCHIVO DE REFERENCIA · TEMA 3",
  "===================================",
  "",
  "3.1 NO SUPERVISADO Y AUTOENCODERS",
  "  - Sin etiquetas: el modelo busca estructura.",
  "  - Tres familias: reunir lo parecido, resumir muchas",
  "    variables en pocas y crear ejemplos nuevos.",
  "  - Agrupar: se alterna asignar puntos a centros y",
  "    mover los centros; el resultado depende del inicio.",
  "  - Proyecciones lineales: buscan los ejes donde más",
  "    varían los datos.",
  "  - Autoencoder: comprime la entrada en un código pequeño",
  "    y la reconstruye. Se entrena comparando la salida",
  "    con la propia entrada.",
  "  - Variantes: con ruido en la entrada, con código grande",
  "    pero regularizado, probabilística.",
  "  - Usos: comprimir, limpiar, detectar lo raro (lo que",
  "    se reconstruye mal), aprender representaciones.",
  "",
  "3.2 MODELOS GENERATIVOS (GAN)",
  "  - Discriminar: aprender una frontera entre clases.",
  "    Generar: aprender cómo se distribuyen los datos.",
  "  - Dos redes en duelo: una crea a partir de ruido y la",
  "    otra intenta distinguir lo real de lo creado.",
  "  - Se entrenan por turnos con objetivos opuestos.",
  "  - Retos: inestabilidad, falta de variedad, evaluación.",
  "  - Otras familias generativas: VAE y modelos que",
  "    eliminan ruido poco a poco.",
  "",
  "3.3 REDES DE BASE RADIAL (RBF)",
  "  - Cada neurona oculta mide el parecido de la entrada",
  "    con un prototipo (su centro): respuesta local.",
  "  - La anchura de la campana decide hasta dónde llega.",
  "  - Salida: combinación lineal de las campanas.",
  "  - Entrenamiento en dos pasos: colocar los centros sin",
  "    mirar etiquetas y ajustar los pesos de salida.",
  "  - Buenas interpolando en pocas dimensiones; sufren",
  "    cuando la dimensión crece.",
  "",
].join("\n");

// === QUESTION BANK: 4 temas x 12 (4 fácil + 4 medio + 4 difícil) ===
var QUESTION_BANK = [
  // ---------------- No supervisado ----------------
  {
    topic: "No supervisado",
    tier: 1,
    title: "Datos sin etiqueta",
    type: "mc",
    question: "¿Qué caracteriza al aprendizaje no supervisado?",
    options: [
      "A) Cada ejemplo lleva su etiqueta correcta",
      "B) Un agente aprende de recompensas y castigos",
      "C) Solo funciona con imágenes y con texto",
      "D) Busca estructura en datos sin etiquetas",
    ],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "Piensa en qué falta en los datos con respecto a la clasificación supervisada.",
    feedback: {
      correct:
        "Sin etiquetas: el modelo busca grupos, ejes de variación o la forma de los datos.",
      incorrect:
        "No supervisado = solo X, sin y. El modelo busca estructura por sí mismo.",
    },
  },
  {
    topic: "No supervisado",
    tier: 1,
    title: "El precio del dato",
    type: "tf",
    question:
      "En general, los datos sin etiquetar son mucho más baratos de conseguir que los etiquetados.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Etiquetar exige tiempo de personas, a menudo expertas.",
    feedback: {
      correct: "Fotos, registros o textos sobran; etiquetarlos es lo caro.",
      incorrect:
        "Es verdadero: etiquetar requiere trabajo humano, y por eso el no supervisado es tan útil.",
    },
  },
  {
    topic: "No supervisado",
    tier: 1,
    title: "Agrupar",
    type: "fill",
    question:
      "El algoritmo ___ agrupa los datos en K grupos alternando dos pasos: asignar cada punto a su centro más cercano y recalcular los centros.",
    options: null,
    correctAnswer: "k-means",
    acceptedAnswers: [
      "k-means",
      "kmeans",
      "k means",
      "k-medias",
      "k medias",
      "kmedias",
    ],
    hint: "Su nombre lleva la K de los grupos y la palabra «media».",
    feedback: {
      correct:
        "k-means: asignar al centro más cercano y mover cada centro a la media de su grupo.",
      incorrect: "Es k-means (k-medias).",
    },
  },
  {
    topic: "No supervisado",
    tier: 1,
    title: "Ejes principales",
    type: "short",
    question:
      "¿Qué técnica lineal clásica proyecta los datos en las direcciones de máxima varianza para reducir dimensiones? (siglas)",
    options: null,
    correctAnswer: "PCA",
    acceptedAnswers: [
      "pca",
      "acp",
      "analisis de componentes principales",
      "componentes principales",
      "análisis de componentes principales",
    ],
    hint: "En castellano se llama «análisis de componentes principales».",
    feedback: {
      correct: "PCA (análisis de componentes principales).",
      incorrect: "Es PCA (ACP en castellano).",
    },
  },
  {
    topic: "No supervisado",
    tier: 2,
    title: "Un paso de k-means",
    type: "mc",
    question:
      "k-means en 1-D con centros c₁ = 2 y c₂ = 8. ¿A qué centro va el punto x = 6 y cuál será el nuevo c₂ si su grupo queda {6, 8, 10}?",
    options: [
      "A) A c₂; el nuevo c₂ vale 8",
      "B) A c₁; el nuevo c₂ vale 9",
      "C) A c₂; el nuevo c₂ vale 6",
      "D) A c₁; el nuevo c₂ vale 8",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "Compara las dos distancias; después, el centro pasa a la media de su grupo.",
    feedback: {
      correct: "|6 − 8| = 2 < |6 − 2| = 4 → c₂. Media de {6, 8, 10} = 8.",
      incorrect:
        "x = 6 está a 2 de c₂ y a 4 de c₁, así que va con c₂; la media de {6, 8, 10} es 8.",
    },
  },
  {
    topic: "No supervisado",
    tier: 2,
    title: "Siempre a mejor",
    type: "tf",
    question:
      "La inercia de k-means (suma de distancias al cuadrado a los centros) nunca aumenta de una iteración a la siguiente.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Analiza por separado los dos pasos: reasignar puntos y mover centros. ¿Alguno puede empeorar la suma?",
    feedback: {
      correct:
        "Asignar al centro más cercano y mover al promedio solo pueden bajar (o mantener) la inercia.",
      incorrect:
        "Es verdadero: por eso k-means siempre converge, aunque sea a un mínimo local.",
    },
  },
  {
    topic: "No supervisado",
    tier: 2,
    title: "Varios intentos",
    type: "fill",
    question:
      "Para que una mala inicialización no arruine k-means, se ejecuta varias veces con inicios distintos y se elige la solución de menor ___.",
    options: null,
    correctAnswer: "inercia",
    acceptedAnswers: [
      "inercia",
      "inertia",
      "sse",
      "suma de distancias al cuadrado",
    ],
    hint: "Es la medida que k-means intenta minimizar.",
    feedback: {
      correct: "La de menor inercia (en scikit-learn, n_init).",
      incorrect: "Se elige la de menor inercia.",
    },
  },
  {
    topic: "No supervisado",
    tier: 2,
    title: "La tercera familia",
    type: "short",
    question:
      "Además de agrupar y reducir dimensión, ¿cuál es la tercera gran familia del aprendizaje no supervisado vista en el tema? (un verbo)",
    options: null,
    correctAnswer: "generar",
    acceptedAnswers: [
      "generar",
      "generacion",
      "generación",
      "generativos",
      "modelos generativos",
      "generativa",
    ],
    hint: "Es la familia a la que pertenecen los modelos del subtema 3.2.",
    feedback: {
      correct:
        "Generar: aprender cómo son los datos para crear ejemplos nuevos.",
      incorrect: "Es generar (VAE, GAN, difusión…).",
    },
  },
  {
    topic: "No supervisado",
    tier: 3,
    title: "Mala salida",
    type: "mc",
    question:
      "Puntos 1-D [1, 2, 4, 7, 8, 10] y centros iniciales 1 y 2. Tras la PRIMERA iteración de k-means, ¿dónde quedan los centros?",
    options: [
      "A) En 1,5 y 7,25",
      "B) En 2,33 y 8,33",
      "C) En 1 y 6,2",
      "D) En 2 y 6,2",
    ],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Asigna los seis puntos con los centros de partida y calcula solo una media por grupo.",
    feedback: {
      correct: "Grupos {1} y {2, 4, 7, 8, 10}: centros 1 y 31/5 = 6,2.",
      incorrect:
        "En la primera iteración solo el 1 va con c₁; el resto va con c₂, cuya media es 6,2.",
    },
  },
  {
    topic: "No supervisado",
    tier: 3,
    title: "Código repetido",
    type: "fill",
    question:
      "Con PCA de 1 componente sobre los puntos (0, 1) y (0, −1), proyectando sobre el eje horizontal, ambos reciben el código ___.",
    options: null,
    correctAnswer: "0",
    acceptedAnswers: ["0", "cero", "0.0", "0,0"],
    hint: "Proyectar sobre el eje horizontal es quedarse con la coordenada x.",
    feedback: {
      correct:
        "Los dos reciben 0: dos puntos distintos, mismo código. Imposible reconstruirlos.",
      incorrect: "Ambos tienen x = 0, así que los dos reciben el código 0.",
    },
  },
  {
    topic: "No supervisado",
    tier: 3,
    title: "La circunferencia",
    type: "mc",
    question:
      "Los datos están sobre una circunferencia. ¿Por qué PCA de 1 componente no basta y un autoencoder no lineal sí podría?",
    options: [
      "A) Porque PCA no admite valores negativos",
      "B) Porque la forma es curva y PCA solo proyecta en rectas",
      "C) Porque el autoencoder siempre usa más datos",
      "D) Porque PCA necesita etiquetas para funcionar",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "Hay un único número que describe cada punto, pero su relación con (x, y) no es lineal.",
    feedback: {
      correct:
        "Un grado de libertad (el ángulo), pero curvo: PCA es lineal y el autoencoder no lineal puede aprenderlo.",
      incorrect:
        "PCA solo proyecta sobre rectas; la circunferencia necesita una función curva como el ángulo.",
    },
  },
  {
    topic: "No supervisado",
    tier: 3,
    title: "Autoencoder lineal",
    type: "tf",
    question:
      "Un autoencoder con activaciones lineales y pérdida MSE aprende el mismo subespacio que PCA.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "¿Qué es lo mejor que puede hacer una transformación lineal para comprimir con error cuadrático mínimo?",
    feedback: {
      correct: "Sin no linealidades, lo óptimo es el subespacio de PCA.",
      incorrect:
        "Es verdadero: la ventaja del autoencoder aparece al añadir activaciones no lineales.",
    },
  },

  // ---------------- Autoencoders ----------------
  {
    topic: "Autoencoders",
    tier: 1,
    title: "El espejo",
    type: "mc",
    question: "¿Qué intenta producir un autoencoder a su salida?",
    options: [
      "A) La etiqueta de clase de la entrada",
      "B) Una imagen nueva elegida al azar",
      "C) Una reconstrucción de su propia entrada",
      "D) La probabilidad de que la entrada sea real",
    ],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Piensa en con qué se compara la salida al calcular la pérdida.",
    feedback: {
      correct: "Salida ≈ entrada: se entrena para reconstruir, sin etiquetas.",
      incorrect:
        "El objetivo del autoencoder es reconstruir su propia entrada.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 1,
    title: "El embudo",
    type: "tf",
    question:
      "El cuello de botella (código) de un autoencoder suele tener menos neuronas que la entrada.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Recuerda la forma de embudo del dibujo del tema.",
    feedback: {
      correct:
        "Al obligar a comprimir, la red tiene que quedarse con lo esencial.",
      incorrect:
        "Es verdadero: es el autoencoder «undercomplete», el más habitual.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 1,
    title: "Las dos mitades",
    type: "fill",
    question:
      "Un autoencoder tiene dos partes: el codificador, que comprime, y el ___, que reconstruye.",
    options: null,
    correctAnswer: "decodificador",
    acceptedAnswers: [
      "decodificador",
      "decoder",
      "descodificador",
      "el decodificador",
    ],
    hint: "Es la mitad simétrica del codificador.",
    feedback: {
      correct: "Codificador → código → decodificador.",
      incorrect: "Es el decodificador (decoder).",
    },
  },
  {
    topic: "Autoencoders",
    tier: 1,
    title: "Donde viven los códigos",
    type: "short",
    question:
      "¿Cómo se llama el espacio de representaciones comprimidas donde viven los códigos de un autoencoder?",
    options: null,
    correctAnswer: "espacio latente",
    acceptedAnswers: [
      "espacio latente",
      "latente",
      "latent space",
      "el espacio latente",
    ],
    hint: "La palabra significa «oculto» y también se usa para el vector z de una GAN.",
    feedback: {
      correct:
        "El espacio latente: puntos cercanos ahí suelen ser datos parecidos.",
      incorrect: "Es el espacio latente.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 2,
    title: "Cuánto comprime",
    type: "mc",
    question:
      "Un autoencoder MNIST tiene la arquitectura 784 → 128 → 32 → 128 → 784. ¿Cuál es su factor de compresión?",
    options: ["A) 6,1 veces", "B) 4 veces", "C) 128 veces", "D) 24,5 veces"],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "Compara el tamaño de la entrada con el del cuello de botella, no con el de la capa intermedia.",
    feedback: {
      correct: "784 / 32 = 24,5.",
      incorrect: "Entrada / código = 784 / 32 = 24,5.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 2,
    title: "Limpiar el ruido",
    type: "fill",
    question:
      "Un autoencoder ___ recibe la entrada con ruido añadido y aprende a devolverla limpia.",
    options: null,
    correctAnswer: "denoising",
    acceptedAnswers: [
      "denoising",
      "de eliminacion de ruido",
      "de eliminación de ruido",
      "eliminador de ruido",
      "denoiser",
    ],
    hint: "Es la variante del laboratorio de MNIST; su nombre en inglés significa «quitar ruido».",
    feedback: {
      correct: "Denoising: entrada ruidosa, objetivo limpio.",
      incorrect: "Es el autoencoder denoising (de eliminación de ruido).",
    },
  },
  {
    topic: "Autoencoders",
    tier: 2,
    title: "Copiar no vale",
    type: "tf",
    question:
      "Si el código tiene más neuronas que la entrada y no hay ninguna regularización, el autoencoder puede limitarse a copiar la entrada.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "¿Qué le impediría aprender algo parecido a la identidad?",
    feedback: {
      correct:
        "Error casi cero, pero sin aprender estructura. Hace falta un cuello de botella o regularización.",
      incorrect:
        "Es verdadero: sin restricción, copiar es la solución más fácil.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 2,
    title: "Píxeles entre 0 y 1",
    type: "short",
    question:
      "¿Qué función de activación pondrías en la última capa para que los píxeles reconstruidos queden entre 0 y 1?",
    options: null,
    correctAnswer: "sigmoide",
    acceptedAnswers: [
      "sigmoide",
      "sigmoid",
      "sigmoidea",
      "la sigmoide",
      "logistica",
      "logística",
    ],
    hint: "Es la misma que se usa en la salida de un clasificador binario.",
    feedback: {
      correct:
        "La sigmoide, normalmente con pérdida de entropía cruzada binaria.",
      incorrect: "Es la sigmoide.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 3,
    title: "Medir la reconstrucción",
    type: "mc",
    question:
      "x = [1, 0, 1, 0] y la reconstrucción x̂ = [0,9, 0,2, 0,6, 0,1]. ¿Cuánto vale el error cuadrático medio (MSE)?",
    options: ["A) 0,055", "B) 0,22", "C) 0,236", "D) 0,10"],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "Resta, eleva al cuadrado, suma y divide entre el número de píxeles.",
    feedback: {
      correct: "(0,01 + 0,04 + 0,16 + 0,01) / 4 = 0,22 / 4 = 0,055.",
      incorrect:
        "Cuadrados: 0,01, 0,04, 0,16, 0,01; suma 0,22; entre 4, 0,055. (0,236 sería la BCE.)",
    },
  },
  {
    topic: "Autoencoders",
    tier: 3,
    title: "Cazar anomalías",
    type: "mc",
    question:
      "Autoencoder entrenado con transacciones normales: error medio 0,020 y desviación 0,005. Con umbral media + 3σ, ¿qué errores se marcan como anómalos entre 0,028, 0,041 y 0,190?",
    options: [
      "A) Solo el 0,190",
      "B) El 0,041 y el 0,190",
      "C) Los tres",
      "D) Ninguno de ellos",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "Calcula primero el umbral y compara cada error con él.",
    feedback: {
      correct: "Umbral = 0,020 + 0,015 = 0,035: superan 0,041 y 0,190.",
      incorrect:
        "Umbral 0,035: el 0,028 queda por debajo; 0,041 y 0,190 lo superan.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 3,
    title: "La capa más cara",
    type: "fill",
    question:
      "En el autoencoder 784 → 128 → 32 → 128 → 784, la primera capa Dense(128) tiene ___ parámetros.",
    options: null,
    correctAnswer: "100480",
    acceptedAnswers: ["100480", "100.480", "100 480", "100,480"],
    hint: "Cada neurona tiene un peso por píxel de entrada y un sesgo.",
    feedback: {
      correct: "(784 + 1)·128 = 100.480.",
      incorrect: "(784 + 1)·128 = 100.480.",
    },
  },
  {
    topic: "Autoencoders",
    tier: 3,
    title: "Sin ejemplos de fraude",
    type: "tf",
    question:
      "Para detectar fraude con un autoencoder hace falta entrenarlo con muchos ejemplos de fraude etiquetados.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "¿Qué datos ve el autoencoder durante el entrenamiento en la detección de anomalías?",
    feedback: {
      correct:
        "Falso: se entrena solo con lo normal; lo raro se reconstruye mal y destaca.",
      incorrect:
        "Es falso: basta con datos normales. Los fraudes solo hacen falta para elegir el umbral.",
    },
  },

  // ---------------- GAN ----------------
  {
    topic: "GAN",
    tier: 1,
    title: "El detective",
    type: "mc",
    question: "¿Qué papel tiene el discriminador en una GAN?",
    options: [
      "A) Decidir si una muestra es real o generada",
      "B) Generar imágenes a partir de un ruido",
      "C) Comprimir la imagen en un código pequeño",
      "D) Etiquetar las clases del conjunto de datos",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "En la metáfora del tema, una red es el falsificador y la otra…",
    feedback: {
      correct: "El detective: da la probabilidad de que la muestra sea real.",
      incorrect:
        "El discriminador clasifica real frente a generado; el que genera es el generador.",
    },
  },
  {
    topic: "GAN",
    tier: 1,
    title: "Materia prima",
    type: "tf",
    question:
      "El generador de una GAN recibe como entrada un vector de ruido aleatorio z.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "¿De dónde sale la variedad entre una muestra generada y la siguiente?",
    feedback: {
      correct: "Cada z distinto produce una muestra distinta.",
      incorrect: "Es verdadero: de ruido a imagen.",
    },
  },
  {
    topic: "GAN",
    tier: 1,
    title: "Cara o cruz",
    type: "fill",
    question:
      "En el equilibrio ideal de una GAN, el discriminador da una probabilidad de ___ a cualquier muestra.",
    options: null,
    correctAnswer: "0,5",
    acceptedAnswers: ["0,5", "0.5", "50%", "50 %", "1/2", "0.50", "0,50"],
    hint: "Si ya no distingue lo real de lo falso, ¿qué le queda?",
    feedback: {
      correct: "0,5: ya no puede distinguir y adivina al azar.",
      incorrect: "Es 0,5 (50 %).",
    },
  },
  {
    topic: "GAN",
    tier: 1,
    title: "Siempre lo mismo",
    type: "short",
    question:
      "¿Cómo se llama el fallo en que el generador produce casi siempre la misma salida, sea cual sea z? (en inglés o en castellano)",
    options: null,
    correctAnswer: "mode collapse",
    acceptedAnswers: [
      "mode collapse",
      "colapso de modos",
      "colapso de modo",
      "colapso modal",
    ],
    hint: "El generador se queda con un solo «modo» de la distribución.",
    feedback: {
      correct: "Mode collapse (colapso de modos): calidad sin variedad.",
      incorrect: "Es el mode collapse (colapso de modos).",
    },
  },
  {
    topic: "GAN",
    tier: 2,
    title: "Dos formas de aprender",
    type: "mc",
    question: "¿Qué diferencia a un modelo generativo de uno discriminativo?",
    options: [
      "A) El discriminativo crea muestras nuevas de cada clase",
      "B) El generativo modela la distribución y puede crear muestras",
      "C) El generativo solo funciona con datos etiquetados",
      "D) Los dos aprenden exactamente la misma función",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "«¿Es un 7?» frente a «dibuja un 7».",
    feedback: {
      correct: "Discriminar = frontera; generar = cómo son los datos.",
      incorrect:
        "El generativo aprende la distribución de los datos y puede muestrear de ella.",
    },
  },
  {
    topic: "GAN",
    tier: 2,
    title: "Juego de suma cero",
    type: "tf",
    question:
      "En una GAN, el discriminador y el generador se entrenan con objetivos opuestos.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Uno quiere acertar; el otro quiere que se equivoque.",
    feedback: {
      correct: "Es un juego minimax: lo que gana uno lo pierde el otro.",
      incorrect: "Es verdadero: es un juego adversario.",
    },
  },
  {
    topic: "GAN",
    tier: 2,
    title: "Mismo rango",
    type: "fill",
    question:
      "Si la salida del generador usa tanh, los píxeles reales (0–255) deben escalarse al rango [−1, ___].",
    options: null,
    correctAnswer: "1",
    acceptedAnswers: ["1", "uno", "+1", "1.0", "1,0"],
    hint: "Revisa entre qué valores se mueve la tangente hiperbólica.",
    feedback: {
      correct: "tanh ∈ [−1, 1]: los reales también, con p/127,5 − 1.",
      incorrect: "tanh da valores en [−1, 1].",
    },
  },
  {
    topic: "GAN",
    tier: 2,
    title: "La otra familia",
    type: "short",
    question:
      "¿Qué familia de modelos generativos, hoy muy usada en imagen, genera quitando ruido poco a poco?",
    options: null,
    correctAnswer: "difusión",
    acceptedAnswers: [
      "difusion",
      "difusión",
      "modelos de difusion",
      "modelos de difusión",
      "diffusion",
      "diffusion models",
    ],
    hint: "Su nombre viene de un proceso físico en el que algo se dispersa gradualmente.",
    feedback: {
      correct: "Los modelos de difusión: denoising iterativo.",
      incorrect: "Son los modelos de difusión.",
    },
  },
  {
    topic: "GAN",
    tier: 3,
    title: "El error más caro",
    type: "mc",
    question:
      "D(x) = 0,9 y 0,6 para dos imágenes reales; D(G(z)) = 0,3 y 0,8 para dos falsas. ¿Cuál de las cuatro aporta más pérdida al discriminador?",
    options: [
      "A) La real con 0,9",
      "B) La real con 0,6",
      "C) La falsa con 0,3",
      "D) La falsa con 0,8",
    ],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "Busca el caso en que D se equivoca con más seguridad.",
    feedback: {
      correct: "−ln(1 − 0,8) = −ln 0,2 ≈ 1,61: la mayor de las cuatro.",
      incorrect:
        "La falsa con 0,8: D la cree real con mucha seguridad; −ln 0,2 ≈ 1,61.",
    },
  },
  {
    topic: "GAN",
    tier: 3,
    title: "Pérdida en equilibrio",
    type: "fill",
    question:
      "En el equilibrio (D = 0,5 para todo), la pérdida del discriminador vale ln 2 ≈ ___ (con tres decimales).",
    options: null,
    correctAnswer: "0,693",
    acceptedAnswers: ["0,693", "0.693", "0,6931", "0.6931"],
    hint: "Es el logaritmo natural de 2.",
    feedback: {
      correct: "ln 2 ≈ 0,693: la pérdida de una GAN no baja hasta cero.",
      incorrect: "ln 2 ≈ 0,693.",
    },
  },
  {
    topic: "GAN",
    tier: 3,
    title: "Gradiente útil",
    type: "mc",
    question:
      "Con D(G(z)) = 0,01, ¿cuántas veces más fuerte es el gradiente de −ln D(G(z)) que el de ln(1 − D(G(z)))?",
    options: [
      "A) Igual de fuerte",
      "B) Unas 2 veces",
      "C) Unas 100 veces",
      "D) Unas 10 veces",
    ],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "La derivada de ln u es 1/u. Compara 1/0,01 con 1/0,99.",
    feedback: {
      correct: "1/0,01 = 100 frente a 1/0,99 ≈ 1,01: unas 100 veces.",
      incorrect:
        "|−1/D| = 100 y |−1/(1 − D)| ≈ 1,01: unas 100 veces. Por eso se usa la versión no saturante.",
    },
  },
  {
    topic: "GAN",
    tier: 3,
    title: "Leer las pérdidas",
    type: "tf",
    question:
      "Que la pérdida del generador no baje hasta cero significa que la GAN no está aprendiendo.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "Recuerda cuánto valen las pérdidas en el equilibrio ideal.",
    feedback: {
      correct:
        "Falso: en el equilibrio rondan 0,69. Hay que mirar las muestras generadas.",
      incorrect:
        "Es falso: la pérdida de una GAN oscila; la calidad se juzga viendo las imágenes.",
    },
  },

  // ---------------- RBF ----------------
  {
    topic: "RBF",
    tier: 1,
    title: "Parecido a un prototipo",
    type: "mc",
    question: "¿De qué depende la activación de una neurona oculta RBF?",
    options: [
      "A) Del producto escalar entre pesos y entrada",
      "B) De la distancia entre la entrada y un centro",
      "C) Del número de capas que tenga la red",
      "D) De la etiqueta del ejemplo de entrada",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "«Radial» se refiere a algo que solo depende del radio.",
    feedback: {
      correct:
        "φ depende de ‖x − c‖: cuanto más cerca del centro, mayor respuesta.",
      incorrect:
        "Depende de la distancia al centro; el producto escalar es el del perceptrón.",
    },
  },
  {
    topic: "RBF",
    tier: 1,
    title: "En el centro",
    type: "tf",
    question:
      "La activación gaussiana de una neurona RBF vale 1 justo en su centro.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "¿Cuánto vale la exponencial de 0?",
    feedback: {
      correct: "Distancia 0 → exp(0) = 1, el máximo.",
      incorrect: "Es verdadero: exp(0) = 1.",
    },
  },
  {
    topic: "RBF",
    tier: 1,
    title: "La anchura",
    type: "fill",
    question:
      "En la gaussiana de una neurona RBF, la anchura de la campana la controla el parámetro ___ (una letra griega).",
    options: null,
    correctAnswer: "sigma",
    acceptedAnswers: ["sigma", "σ", "la sigma"],
    hint: "Es la misma letra que se usa para la desviación típica.",
    feedback: {
      correct:
        "σ (sigma): pequeña → picos estrechos; grande → campanas anchas.",
      incorrect: "Es σ (sigma).",
    },
  },
  {
    topic: "RBF",
    tier: 1,
    title: "El problema imposible",
    type: "short",
    question:
      "¿Qué función lógica clásica, no separable por una recta, resuelve una red RBF con solo dos centros? (siglas)",
    options: null,
    correctAnswer: "XOR",
    acceptedAnswers: ["xor", "o exclusivo", "or exclusivo", "el xor"],
    hint: "Es la misma que no podía resolver el perceptrón simple en el Tema 2.",
    feedback: { correct: "El XOR.", incorrect: "Es el XOR (o exclusivo)." },
  },
  {
    topic: "RBF",
    tier: 2,
    title: "Calcular una campana",
    type: "mc",
    question:
      "Centro c = (1, 2) y σ = 1. ¿Cuánto vale φ en B = (2, 2)? (dato: e^−0,5 ≈ 0,607)",
    options: ["A) 1", "B) 0,368", "C) 0,607", "D) 0,018"],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Primero la distancia al cuadrado; después divide entre 2σ².",
    feedback: {
      correct: "‖B − c‖² = 1 → exp(−1/2) ≈ 0,607.",
      incorrect: "Distancia² = 1; exp(−1/2) ≈ 0,607.",
    },
  },
  {
    topic: "RBF",
    tier: 2,
    title: "Lejos de casa",
    type: "tf",
    question: "Una red RBF extrapola bien lejos de los datos de entrenamiento.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "¿Qué les pasa a todas las campanas cuando te alejas de sus centros?",
    feedback: {
      correct:
        "Falso: lejos de los centros todas las φ ≈ 0 y la salida cae al sesgo.",
      incorrect: "Es falso: una RBF interpola, pero no extrapola.",
    },
  },
  {
    topic: "RBF",
    tier: 2,
    title: "Colocar los centros",
    type: "fill",
    question:
      "El entrenamiento clásico de una RBF tiene dos pasos: colocar los centros con ___ y resolver los pesos de salida por mínimos cuadrados.",
    options: null,
    correctAnswer: "k-means",
    acceptedAnswers: [
      "k-means",
      "kmeans",
      "k means",
      "k-medias",
      "k medias",
      "clustering",
    ],
    hint: "Es un algoritmo de agrupamiento del subtema 3.1.",
    feedback: {
      correct:
        "k-means: los centros de los grupos son los centros de las campanas.",
      incorrect: "Es k-means.",
    },
  },
  {
    topic: "RBF",
    tier: 2,
    title: "Sin gradiente",
    type: "short",
    question:
      "Con los centros ya fijados, ¿con qué método se obtienen los pesos de salida sin usar descenso del gradiente? (dos palabras)",
    options: null,
    correctAnswer: "mínimos cuadrados",
    acceptedAnswers: [
      "minimos cuadrados",
      "mínimos cuadrados",
      "least squares",
      "por minimos cuadrados",
      "pseudoinversa",
    ],
    hint: "La salida es lineal en los pesos: es una regresión lineal.",
    feedback: {
      correct: "Mínimos cuadrados: resolver Φ·w ≈ y de golpe.",
      incorrect: "Es por mínimos cuadrados (solución cerrada).",
    },
  },
  {
    topic: "RBF",
    tier: 3,
    title: "El XOR transformado",
    type: "mc",
    question:
      "XOR con centros (0, 0) y (1, 1) y φ = exp(−‖x − c‖²). ¿Qué par (φ₁, φ₂) corresponde al punto (0, 1)?",
    options: [
      "A) (0,368, 0,368)",
      "B) (1, 0,135)",
      "C) (0,135, 1)",
      "D) (0,607, 0,607)",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "El punto está a la misma distancia de los dos centros. ¿Cuál es esa distancia al cuadrado?",
    feedback: {
      correct: "Distancia² = 1 a ambos centros → (e⁻¹, e⁻¹) ≈ (0,368, 0,368).",
      incorrect:
        "‖(0,1) − (0,0)‖² = 1 y ‖(0,1) − (1,1)‖² = 1, así que φ₁ = φ₂ = e⁻¹ ≈ 0,368.",
    },
  },
  {
    topic: "RBF",
    tier: 3,
    title: "La maldición",
    type: "fill",
    question:
      "Con una rejilla de 10 centros por dimensión, una entrada de 10 variables necesita 10^___ centros.",
    options: null,
    correctAnswer: "10",
    acceptedAnswers: ["10", "diez", "10^10"],
    hint: "Una rejilla multiplica los centros de cada dimensión.",
    feedback: {
      correct: "10¹⁰ = diez mil millones de centros.",
      incorrect: "10 por dimensión y 10 dimensiones: 10¹⁰.",
    },
  },
  {
    topic: "RBF",
    tier: 3,
    title: "Elegir la anchura",
    type: "mc",
    question:
      "k-means da K = 4 centros y la mayor distancia entre dos de ellos es 6. Con la regla σ = d_max / √(2K), ¿cuánto vale σ?",
    options: ["A) 0,75", "B) 1,5", "C) 3", "D) ≈ 2,12"],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "√8 está entre 2 y 3.",
    feedback: {
      correct: "6 / √8 ≈ 6 / 2,83 ≈ 2,12.",
      incorrect: "σ = 6 / √(2·4) = 6 / √8 ≈ 2,12.",
    },
  },
  {
    topic: "RBF",
    tier: 3,
    title: "Mismo tamaño, otro aprendizaje",
    type: "tf",
    question:
      "Una RBF con 10 entradas, 50 centros y 1 salida tiene tantos valores como un MLP 10 → 50 → 1 (601), pero solo 51 se ajustan de forma supervisada.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Cuenta coordenadas de los centros, anchuras y pesos de salida con sesgo.",
    feedback: {
      correct:
        "500 + 50 + 51 = 601; los centros salen de k-means y solo los 51 pesos de salida usan las etiquetas.",
      incorrect:
        "Es verdadero: 500 coordenadas + 50 anchuras + 51 pesos = 601, y solo los 51 últimos son supervisados.",
    },
  },
];

// === SALAS: se asignan por posición en la partida ===
var ROOMS = {
  s1: {
    room: "&#127760; ZONA DE CARGA",
    narrative:
      "Despiertas en un mundo que parece real… pero los píxeles tiemblan en los bordes. SIMULACRO, una red generativa, ha construido todo lo que ves.",
  },
  s2: {
    room: "&#129694; SALA DE LOS ESPEJOS",
    narrative:
      "Cada espejo devuelve una copia casi perfecta de ti, reconstruida desde un código diminuto. Algunas copias fallan.",
  },
  A: {
    room: "&#128230; COMPRESOR LATENTE",
    narrative:
      "Entras en el embudo del autoencoder: todo se estrecha hasta caber en unos pocos números.",
  },
  B: {
    room: "&#127917; FORJA DE FALSIFICACIONES",
    narrative:
      "El generador fabrica caras, paisajes y objetos a partir de ruido. El discriminador los vigila sin descanso.",
  },
  s3: {
    room: "&#127756; NÚCLEO DE AGRUPACIÓN",
    narrative:
      "Millones de puntos flotan y se agrupan alrededor de centros que se desplazan sin parar.",
  },
  C: {
    room: "&#128276; CAMPO DE CAMPANAS",
    narrative:
      "El suelo se curva en campanas gaussianas. Solo responden cuando pisas cerca de su centro.",
  },
  D: {
    room: "&#9878; TRIBUNAL DEL DISCRIMINADOR",
    narrative:
      "Un juez sin rostro decide qué es real y qué es falso. Esta vez, el juicio es sobre ti.",
  },
  s4: {
    room: "&#128682; SALIDA DE LA SIMULACIÓN",
    narrative:
      "La puerta al mundo real está delante. Tres pruebas más y SIMULACRO dejará de generar tu realidad.",
  },
};
function _withRoom(arr, key) {
  return arr.map(function (q) {
    var c = {};
    for (var k in q) c[k] = q[k];
    c.room = ROOMS[key].room;
    c.narrative = ROOMS[key].narrative;
    return c;
  });
}
function _assignRooms() {
  shared1 = _withRoom(shared1, "s1");
  shared2 = _withRoom(shared2, "s2");
  branch1A = _withRoom(branch1A, "A");
  branch1B = _withRoom(branch1B, "B");
  shared3 = _withRoom(shared3, "s3");
  branch2C = _withRoom(branch2C, "C");
  branch2D = _withRoom(branch2D, "D");
  shared4 = _withRoom(shared4, "s4");
}
QUESTION_BANK.forEach(function (q) {
  q.room = "&#128190; " + q.topic.toUpperCase();
  q.narrative = "Banco de preguntas · " + q.topic + " · nivel " + q.tier;
});

// === PHRASES (16 finales) ===
// índice = hash(nombre)*4 + ruta: 0 = Compresor+Campanas, 1 = Compresor+Tribunal, 2 = Forja+Campanas, 3 = Forja+Tribunal
var PHRASES = [
  "Comprimiste la simulación hasta su esencia y la reconstruiste sin errores. La puerta se abre.",
  "Del espacio latente al juicio final: viste lo que SIMULACRO escondía en su código.",
  "Ninguna falsificación te engañó y ninguna campana te atrapó. Eres más real que la simulación.",
  "Engañaste al discriminador mejor que el propio generador. SIMULACRO se rinde.",
  "Encontraste el cuello de botella y escapaste por él. Lo esencial siempre cabe en pocos números.",
  "Tu reconstrucción fue tan buena que el juez la declaró real. Bienvenido/a al mundo exterior.",
  "Ruido a la entrada, realidad a la salida: has aprendido a generar tu propio camino.",
  "Generador y discriminador llegaron al equilibrio… y tú saliste por el hueco entre los dos.",
  "Agrupaste lo parecido, comprimiste lo esencial y mediste cada distancia. Simulación superada.",
  "Del k-means al autoencoder: has encontrado la estructura que nadie te etiquetó.",
  "Ni el mode collapse ni la maldición de la dimensionalidad pudieron detenerte.",
  "D(tú) = 0,5: ni el discriminador sabe ya si eres real. Y eso significa que has ganado.",
  "Cada campana respondió a tu paso: estabas siempre cerca del centro correcto.",
  "Tu espacio latente es más ordenado que el de SIMULACRO. Despiertas en el mundo real.",
  "Interpolaste entre la ilusión y la realidad, y elegiste la realidad.",
  "Sin etiquetas, sin mapas y sin ayuda: has escapado de la simulación con todo el Tema 3 en la cabeza.",
];
