// === REFERENCE_TEXT (orientación, sin respuestas directas) ===
var REFERENCE_TEXT = [
  "===================================",
  "  ARCHIVO DE REFERENCIA · TEMA 4",
  "===================================",
  "",
  "4.1 REDES CONVOLUCIONALES (CNN)",
  "  - Un filtro pequeño se desliza por la imagen y",
  "    reutiliza los mismos pesos en cada posición.",
  "  - Padding: rellenar bordes. Stride: tamaño del salto.",
  "  - Pooling: resume bloques de la imagen; reduce tamaño.",
  "  - Campo receptivo: zona de la entrada que «ve» una",
  "    neurona; crece al apilar capas.",
  "  - Parámetros de una convolución: dependen del tamaño",
  "    del filtro, de los canales de entrada y del número",
  "    de filtros (más un sesgo por filtro).",
  "  - Trucos: aumentar los datos, reutilizar redes",
  "    preentrenadas.",
  "",
  "4.2 MODELOS RECURRENTES (RNN / LSTM)",
  "  - Una RNN lee la secuencia paso a paso y arrastra",
  "    un estado que resume lo visto hasta entonces.",
  "  - Retropropagar a través del tiempo multiplica muchos",
  "    factores: el gradiente puede apagarse o dispararse.",
  "  - LSTM: un estado de memoria y tres puertas que",
  "    deciden qué se borra, qué se escribe y qué se",
  "    muestra. Cuatro bloques de pesos por capa.",
  "  - Keras: entrada 3-D (lote, pasos, características).",
  "  - Bidireccional: necesita la secuencia completa.",
  "  - Series temporales: ventanas deslizantes.",
  "",
  "4.3 ATENCIÓN Y TRANSFORMERS",
  "  - Query (qué busco), Key (qué ofrezco), Value",
  "    (qué aporto). Afinidad = producto escalar.",
  "  - Las puntuaciones se escalan antes de la softmax",
  "    para que no se sature.",
  "  - Multi-cabeza: varias atenciones en paralelo que se",
  "    reparten la dimensión del modelo.",
  "  - El orden se inyecta aparte (codificación posicional).",
  "  - Máscara: impide mirar posiciones prohibidas.",
  "  - Familias: solo codificador, solo decodificador,",
  "    codificador-decodificador.",
  "  - Coste: todas las parejas de tokens se comparan.",
  "  - Generar: voraz, muestreo, temperatura, top-k.",
  "",
].join("\n");

// === QUESTION BANK: 4 temas x 12 (4 fácil + 4 medio + 4 difícil) ===
var QUESTION_BANK = [
  // ---------------- CNN ----------------
  {
    topic: "CNN",
    tier: 1,
    title: "El ojo de la IA",
    type: "mc",
    question: "¿Qué hace una capa convolucional con una imagen?",
    options: [
      "A) Desliza un mismo filtro pequeño por toda la imagen",
      "B) Conecta cada píxel con todas las neuronas siguientes",
      "C) Se queda con el máximo de cada bloque de la imagen",
      "D) Ordena los píxeles por intensidad antes de clasificar",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "Piensa en por qué una CNN tiene tan pocos parámetros comparada con una red densa.",
    feedback: {
      correct:
        "El mismo filtro se reutiliza en todas las posiciones: pesos compartidos y conexiones locales.",
      incorrect:
        "La convolución aplica un filtro pequeño, siempre el mismo, en cada posición de la imagen. Lo del máximo es el pooling.",
    },
  },
  {
    topic: "CNN",
    tier: 1,
    title: "Capas sin memoria",
    type: "tf",
    question: "Una capa de max pooling 2×2 no tiene parámetros entrenables.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "¿Qué tendría que aprender una operación que solo elige el mayor de cuatro números?",
    feedback: {
      correct:
        "El pooling solo resume (máximo o media): no tiene pesos que ajustar.",
      incorrect:
        "Es verdadero: el max pooling se limita a quedarse con el máximo de cada bloque, sin pesos.",
    },
  },
  {
    topic: "CNN",
    tier: 1,
    title: "Bordes intactos",
    type: "fill",
    question:
      'En Keras, con padding="___" la salida de una convolución con stride 1 conserva el alto y el ancho de la entrada.',
    options: null,
    correctAnswer: "same",
    acceptedAnswers: ["same", '"same"', "padding same", 'padding="same"'],
    hint: "Hay dos opciones de padding en Keras; la otra reduce el tamaño.",
    feedback: {
      correct:
        '"same" rellena los bordes para conservar el tamaño; "valid" no rellena y lo reduce.',
      incorrect:
        'La respuesta es "same". Con "valid" la salida se encoge K − 1 píxeles.',
    },
  },
  {
    topic: "CNN",
    tier: 1,
    title: "Datos multiplicados",
    type: "short",
    question:
      "¿Cómo se llama la técnica que crea variantes de las imágenes de entrenamiento (giros, recortes, cambios de brillo) para reducir el sobreajuste?",
    options: null,
    correctAnswer: "data augmentation",
    acceptedAnswers: [
      "data augmentation",
      "aumento de datos",
      "aumentación de datos",
      "augmentation",
      "aumentado de datos",
      "data augmentation (aumento de datos)",
    ],
    hint: "Se aplica solo durante el entrenamiento y no necesita etiquetar imágenes nuevas.",
    feedback: {
      correct:
        "Data augmentation: la red ve versiones distintas de cada imagen y generaliza mejor.",
      incorrect: "Es data augmentation (aumento de datos).",
    },
  },
  {
    topic: "CNN",
    tier: 2,
    title: "Medir la salida",
    type: "mc",
    question:
      "Entrada 32×32, filtro 5×5, sin padding y con stride 1. ¿Qué tamaño tiene la salida?",
    options: ["A) 32×32", "B) 27×27", "C) 28×28", "D) 30×30"],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Cuenta en cuántas posiciones distintas cabe el filtro entero a lo largo de una fila.",
    feedback: {
      correct: "(32 − 5)/1 + 1 = 28.",
      incorrect: "Sin padding: (W − K)/S + 1 = (32 − 5)/1 + 1 = 28.",
    },
  },
  {
    topic: "CNN",
    tier: 2,
    title: "Contar pesos",
    type: "fill",
    question:
      "Una capa Conv2D con 16 filtros 3×3 aplicada a una imagen RGB tiene ___ parámetros (con sesgo).",
    options: null,
    correctAnswer: "448",
    acceptedAnswers: ["448", "448 parametros", "448 parámetros"],
    hint: "Cada filtro mira 3×3 píxeles en cada uno de los canales de color, y lleva un sesgo.",
    feedback: {
      correct: "(3·3·3 + 1)·16 = 28·16 = 448.",
      incorrect:
        "Cada filtro tiene 3·3·3 = 27 pesos + 1 sesgo = 28; por 16 filtros, 448.",
    },
  },
  {
    topic: "CNN",
    tier: 2,
    title: "Ver más lejos",
    type: "tf",
    question:
      "Dos convoluciones 3×3 apiladas (stride 1) tienen el mismo campo receptivo que una sola convolución 5×5.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Cada nueva capa 3×3 amplía la zona vista en un píxel por cada lado.",
    feedback: {
      correct: "3 → 5: cada capa 3×3 suma 2. Y con menos pesos y una ReLU más.",
      incorrect:
        "Es verdadero: la primera ve 3×3 y la segunda, 3×3 de esas, es decir 5×5 píxeles.",
    },
  },
  {
    topic: "CNN",
    tier: 2,
    title: "Conocimiento prestado",
    type: "mc",
    question: "¿En qué consiste el transfer learning en visión por ordenador?",
    options: [
      "A) Copiar imágenes de otro dataset para tener más datos",
      "B) Reutilizar una red preentrenada y ajustar sus últimas capas",
      "C) Entrenar dos redes a la vez para que una corrija a la otra",
      "D) Pasar los pesos de la capa de salida a la capa de entrada",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "Las primeras capas de una CNN aprenden bordes y texturas que sirven para casi cualquier imagen.",
    feedback: {
      correct:
        "Se parte de una red entrenada (p. ej. en ImageNet), se congela la base y se entrena una cabeza nueva.",
      incorrect:
        "Transfer learning es reaprovechar lo que aprendió una red preentrenada y ajustar solo la parte final.",
    },
  },
  {
    topic: "CNN",
    tier: 3,
    title: "La primera capa de ResNet",
    type: "short",
    question:
      "Entrada 224×224, filtro 7×7, padding 3 y stride 2. ¿Qué ancho tiene la salida? (solo el número)",
    options: null,
    correctAnswer: "112",
    acceptedAnswers: ["112", "112x112", "112×112", "112 x 112"],
    hint: "Suma el relleno de los dos lados, resta el filtro, divide por el salto (redondeando hacia abajo) y no olvides la posición inicial.",
    feedback: {
      correct: "⌊(224 − 7 + 6)/2⌋ + 1 = 111 + 1 = 112.",
      incorrect: "⌊(W − K + 2P)/S⌋ + 1 = ⌊223/2⌋ + 1 = 112.",
    },
  },
  {
    topic: "CNN",
    tier: 3,
    title: "La capa más cara",
    type: "mc",
    question:
      'Conv2D(32 filtros, 3×3, padding="same") sobre 28×28×1 → MaxPooling 2×2 → Flatten → Dense(10). ¿Cuántos parámetros tiene la capa Dense?',
    options: ["A) 7.850", "B) 2.570", "C) 250.890", "D) 62.730"],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: 'Sigue la forma: "same" conserva 28×28, el pooling divide por 2, y Flatten multiplica alto × ancho × canales.',
    feedback: {
      correct: "14·14·32 = 6.272 entradas; (6.272 + 1)·10 = 62.730.",
      incorrect:
        "Tras el pooling queda 14×14×32 = 6.272 valores; la Dense tiene (6.272 + 1)·10 = 62.730.",
    },
  },
  {
    topic: "CNN",
    tier: 3,
    title: "Filtros pequeños",
    type: "fill",
    question:
      "Tres capas 3×3 con 64 canales de entrada y 64 de salida suman 110.592 pesos. Una única capa 7×7 con los mismos canales tiene ___ pesos (sin sesgos).",
    options: null,
    correctAnswer: "200704",
    acceptedAnswers: ["200704", "200.704", "200 704", "200,704"],
    hint: "Pesos de una capa = alto del filtro × ancho × canales de entrada × canales de salida.",
    feedback: {
      correct:
        "7·7·64·64 = 200.704: casi el doble que las tres capas 3×3 con el mismo campo receptivo.",
      incorrect: "7·7·64·64 = 49·4.096 = 200.704.",
    },
  },
  {
    topic: "CNN",
    tier: 3,
    title: "Imágenes más grandes",
    type: "tf",
    question:
      "Si duplicas el tamaño de la imagen de entrada, el número de parámetros de una capa Conv2D también se duplica.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "Revisa de qué cosas depende la cuenta de parámetros de una convolución.",
    feedback: {
      correct:
        "Falso: los parámetros solo dependen del filtro, de los canales y del número de filtros. Crece la salida, no los pesos.",
      incorrect:
        "Es falso: el mismo filtro se aplica en más posiciones, pero sigue siendo el mismo filtro.",
    },
  },

  // ---------------- RNN y LSTM ----------------
  {
    topic: "RNN y LSTM",
    tier: 1,
    title: "La memoria del sistema",
    type: "mc",
    question: "¿Qué distingue a una red recurrente (RNN) de una red densa?",
    options: [
      "A) Usa filtros que se deslizan por la imagen",
      "B) Procesa todos los elementos a la vez y sin orden",
      "C) Arrastra un estado oculto de un paso al siguiente",
      "D) Solo puede trabajar con entradas binarias",
    ],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Piensa en cómo recuerda la red lo que leyó en los pasos anteriores.",
    feedback: {
      correct:
        "El estado oculto hₜ resume lo visto y se pasa al siguiente paso.",
      incorrect:
        "Una RNN lee la secuencia paso a paso y pasa su estado oculto de un paso al siguiente.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 1,
    title: "Pesos reciclados",
    type: "tf",
    question:
      "Una RNN usa los mismos pesos en todos los pasos de la secuencia.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Recuerda la red «desenrollada» en el tiempo: ¿cuántas celdas distintas hay realmente?",
    feedback: {
      correct:
        "Una sola celda aplicada en cada paso: pesos compartidos en el tiempo.",
      incorrect:
        "Es verdadero: por eso los parámetros no dependen de la longitud de la secuencia.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 1,
    title: "Señal perdida",
    type: "short",
    question:
      "¿Cómo se llama el problema por el que el gradiente se hace casi cero al retropropagar a través de muchos pasos de tiempo?",
    options: null,
    correctAnswer: "desvanecimiento del gradiente",
    acceptedAnswers: [
      "desvanecimiento del gradiente",
      "gradiente que se desvanece",
      "vanishing gradient",
      "vanishing gradients",
      "desvanecimiento de gradiente",
      "gradiente desvanecido",
      "el gradiente que se desvanece",
    ],
    hint: "Multiplicar muchos factores menores que 1 lleva a un número diminuto. ¿Cómo se llama eso en inglés o en castellano?",
    feedback: {
      correct:
        "El gradiente que se desvanece (vanishing gradient): la red no aprende dependencias largas.",
      incorrect: "Es el desvanecimiento del gradiente (vanishing gradient).",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 1,
    title: "La puerta que borra",
    type: "fill",
    question:
      "En una LSTM, la puerta de ___ decide qué parte del estado de memoria anterior se conserva.",
    options: null,
    correctAnswer: "olvido",
    acceptedAnswers: ["olvido", "forget", "forget gate", "olvidar"],
    hint: "Las tres puertas deciden qué se borra, qué se escribe y qué se muestra. Esta es la primera.",
    feedback: {
      correct:
        "La puerta de olvido f multiplica a Cₜ₋₁: cerca de 1 conserva, cerca de 0 borra.",
      incorrect: "Es la puerta de olvido (forget gate).",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 2,
    title: "Actualizar la memoria",
    type: "mc",
    question:
      "En una celda LSTM: f = 0,5, Cₜ₋₁ = 2, i = 1 y C̃ = 0,4. ¿Cuánto vale el nuevo estado Cₜ?",
    options: ["A) 1,4", "B) 2,4", "C) 0,8", "D) 1,0"],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "Lo que se conserva de antes más lo que se escribe de nuevo.",
    feedback: {
      correct: "Cₜ = f·Cₜ₋₁ + i·C̃ = 0,5·2 + 1·0,4 = 1,4.",
      incorrect: "Cₜ = f·Cₜ₋₁ + i·C̃ = 1 + 0,4 = 1,4.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 2,
    title: "Apilar capas",
    type: "fill",
    question:
      "En Keras, para apilar dos capas LSTM, la primera necesita return_sequences=___.",
    options: null,
    correctAnswer: "True",
    acceptedAnswers: [
      "true",
      "verdadero",
      "return_sequences=true",
      "true (verdadero)",
    ],
    hint: "La segunda LSTM necesita recibir una secuencia, no un único vector.",
    feedback: {
      correct:
        "return_sequences=True devuelve un hₜ por paso: una secuencia 3-D para la siguiente LSTM.",
      incorrect:
        "Es True: con False solo sale el último estado y la segunda LSTM no recibe secuencia.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 2,
    title: "Leer en los dos sentidos",
    type: "tf",
    question:
      "Una LSTM bidireccional es adecuada para predecir en tiempo real el siguiente valor de una serie mientras llegan los datos.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "Para leer «hacia atrás», ¿qué tiene que estar disponible?",
    feedback: {
      correct:
        "Falso: una red bidireccional necesita la secuencia completa, y el futuro todavía no ha llegado.",
      incorrect:
        "Es falso: la dirección hacia atrás necesita ver el final de la secuencia antes de responder.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 2,
    title: "Freno de emergencia",
    type: "short",
    question:
      "¿Qué técnica contiene el gradiente explosivo recortando su norma cuando supera un umbral?",
    options: null,
    correctAnswer: "gradient clipping",
    acceptedAnswers: [
      "gradient clipping",
      "clipping",
      "recorte del gradiente",
      "recorte de gradiente",
      "clipnorm",
      "recortar el gradiente",
      "clipping del gradiente",
    ],
    hint: "Se configura en el optimizador y actúa antes de aplicar cada actualización de pesos.",
    feedback: {
      correct: "Gradient clipping: si la norma supera el umbral, se reescala.",
      incorrect:
        "Es gradient clipping (recorte del gradiente), por ejemplo clipnorm=1.0.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 3,
    title: "Contar la celda",
    type: "fill",
    question:
      "Una capa LSTM(32) que recibe 10 características por paso tiene ___ parámetros.",
    options: null,
    correctAnswer: "5504",
    acceptedAnswers: ["5504", "5.504", "5 504", "5,504"],
    hint: "Son cuatro bloques iguales; cada uno mira la entrada y el estado anterior, y lleva sesgos.",
    feedback: {
      correct: "4·[32·(32 + 10) + 32] = 4·1.376 = 5.504.",
      incorrect: "4·[nₕ·(nₕ + nₓ) + nₕ] = 4·(32·42 + 32) = 5.504.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 3,
    title: "Cortar la serie",
    type: "mc",
    question:
      "Una serie de 100 valores se corta en ventanas de 10 pasos para predecir el valor siguiente. ¿Cuántos ejemplos salen y qué forma tiene X?",
    options: [
      "A) 100 ejemplos, X = (100, 10, 1)",
      "B) 91 ejemplos, X = (91, 10, 1)",
      "C) 90 ejemplos, X = (90, 1, 10)",
      "D) 90 ejemplos, X = (90, 10, 1)",
    ],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "La última ventana tiene que dejar sitio a su objetivo. Y Keras espera (ejemplos, pasos, características).",
    feedback: {
      correct:
        "100 − 10 = 90 ventanas; X = (90, 10, 1): 10 pasos con 1 característica.",
      incorrect:
        "Salen 100 − 10 = 90 ejemplos, y la forma es (ejemplos, pasos, características) = (90, 10, 1).",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 3,
    title: "Diez pasos atrás",
    type: "mc",
    question:
      "En una RNN simple, cada paso hacia atrás multiplica el gradiente por 0,5. ¿Cuánto queda tras 10 pasos?",
    options: ["A) 0,05", "B) ≈ 0,001", "C) 0,5", "D) ≈ 0,1"],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "No es una resta: es multiplicar diez veces por el mismo factor.",
    feedback: {
      correct: "0,5¹⁰ ≈ 0,001: el gradiente casi desaparece.",
      incorrect: "0,5¹⁰ = 1/1.024 ≈ 0,001.",
    },
  },
  {
    topic: "RNN y LSTM",
    tier: 3,
    title: "Secuencias más largas",
    type: "tf",
    question:
      "Si la entrada de una LSTM pasa de 50 a 500 pasos de tiempo, su número de parámetros se multiplica por 10.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "Revisa qué términos aparecen en la fórmula de parámetros de una LSTM.",
    feedback: {
      correct:
        "Falso: la longitud no aparece en la cuenta. La misma celda se aplica en cada paso.",
      incorrect:
        "Es falso: los parámetros dependen de nₕ y nₓ, no del número de pasos.",
    },
  },

  // ---------------- Atención y Transformers ----------------
  {
    topic: "Atención",
    tier: 1,
    title: "El cuello de botella",
    type: "mc",
    question:
      "¿Qué problema resolvió la atención en los traductores seq2seq con LSTM?",
    options: [
      "A) Que las imágenes de entrada fueran demasiado grandes",
      "B) Tener que resumir toda la frase en un único vector",
      "C) La falta de datos etiquetados para poder traducir",
      "D) La lentitud de la función softmax en la salida",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "Piensa en qué recibía el decodificador antes de la atención.",
    feedback: {
      correct:
        "El decodificador solo recibía el último estado del codificador; la atención le deja mirar todas las posiciones.",
      incorrect:
        "El problema era el cuello de botella: toda la frase comprimida en un solo vector.",
    },
  },
  {
    topic: "Atención",
    tier: 1,
    title: "La mezcla",
    type: "tf",
    question:
      "En self-attention, la salida de cada token es una media ponderada de los vectores Value de los tokens a los que atiende.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Los pesos salen de una softmax, así que suman 1.",
    feedback: {
      correct:
        "Pesos (softmax de Q·Kᵀ) × V: una mezcla ponderada de los valores.",
      incorrect:
        "Es verdadero: salida = pesos de atención · V, y los pesos suman 1.",
    },
  },
  {
    topic: "Atención",
    tier: 1,
    title: "Escalado",
    type: "fill",
    question:
      "En la atención, las puntuaciones Q·Kᵀ se dividen por la raíz cuadrada de ___ antes de la softmax.",
    options: null,
    correctAnswer: "dk",
    acceptedAnswers: [
      "dk",
      "d_k",
      "dₖ",
      "d k",
      "la dimension de las claves",
      "dimension de las keys",
      "la dimension de k",
    ],
    hint: "Es la dimensión de los vectores que se multiplican en el producto escalar.",
    feedback: {
      correct: "Se divide por √dₖ para que la softmax no se sature.",
      incorrect: "Es √dₖ, la dimensión de las keys (y queries).",
    },
  },
  {
    topic: "Atención",
    tier: 1,
    title: "Solo decodificador",
    type: "short",
    question:
      "¿Qué familia de modelos Transformer usa solo el decodificador, con máscara causal, para generar texto? (siglas)",
    options: null,
    correctAnswer: "GPT",
    acceptedAnswers: [
      "gpt",
      "la familia gpt",
      "modelos gpt",
      "decoder-only",
      "familia gpt",
    ],
    hint: "La «G» de sus siglas significa «generativo».",
    feedback: {
      correct: "GPT: Generative Pre-trained Transformer, solo decodificador.",
      incorrect:
        "Es la familia GPT. BERT usa solo el codificador y T5 los dos.",
    },
  },
  {
    topic: "Atención",
    tier: 2,
    title: "No mirar el futuro",
    type: "mc",
    question: "¿Para qué sirve la máscara causal en un decodificador?",
    options: [
      "A) Para eliminar las palabras más frecuentes del texto",
      "B) Para que las cabezas no compartan parámetros",
      "C) Para que cada token solo vea a los anteriores y a sí mismo",
      "D) Para igualar la longitud de todas las frases del lote",
    ],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "Al entrenar a predecir la siguiente palabra, ¿qué sería hacer trampa?",
    feedback: {
      correct:
        "Las posiciones futuras se ponen a −∞ antes de la softmax: peso 0.",
      incorrect:
        "La máscara causal impide que un token atienda a los que vienen después.",
    },
  },
  {
    topic: "Atención",
    tier: 2,
    title: "Sin orden",
    type: "tf",
    question:
      "Sin codificación posicional, la self-attention no tiene forma de saber en qué orden aparecen los tokens.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Si barajas las filas de Q, K y V, ¿cambia alguna afinidad?",
    feedback: {
      correct:
        "La atención trata los tokens como un conjunto; el orden se inyecta con la codificación posicional.",
      incorrect:
        "Es verdadero: por eso se suman (o rotan) vectores de posición a los embeddings.",
    },
  },
  {
    topic: "Atención",
    tier: 2,
    title: "Repartir cabezas",
    type: "fill",
    question:
      "Con d_model = 512 y 8 cabezas de atención, cada cabeza trabaja con vectores de dimensión ___.",
    options: null,
    correctAnswer: "64",
    acceptedAnswers: ["64", "d=64", "dk=64"],
    hint: "Las cabezas se reparten la dimensión del modelo a partes iguales.",
    feedback: {
      correct: "512 / 8 = 64.",
      incorrect: "dₖ = d_model / cabezas = 512 / 8 = 64.",
    },
  },
  {
    topic: "Atención",
    tier: 2,
    title: "Creatividad",
    type: "short",
    question:
      "¿Cómo se llama el parámetro de generación que, al subirlo, aplana la distribución y hace el texto más variado?",
    options: null,
    correctAnswer: "temperatura",
    acceptedAnswers: ["temperatura", "temperature", "la temperatura", "t"],
    hint: "Divide los logits antes de la softmax; el nombre viene de la física.",
    feedback: {
      correct: "La temperatura: T alta aplana, T baja afila.",
      incorrect: "Es la temperatura (T).",
    },
  },
  {
    topic: "Atención",
    tier: 3,
    title: "Doble de texto",
    type: "mc",
    question:
      "Una secuencia pasa de 1.000 a 2.000 tokens. ¿Cuánto crece el cálculo de las puntuaciones de atención?",
    options: [
      "A) Se duplica",
      "B) No cambia",
      "C) Crece un 50 %",
      "D) Se multiplica por 4",
    ],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "Cada token se compara con todos los demás.",
    feedback: {
      correct: "n² puntuaciones: (2n)² = 4n².",
      incorrect:
        "La matriz de puntuaciones es n × n: duplicar n multiplica por 4.",
    },
  },
  {
    topic: "Atención",
    tier: 3,
    title: "Proyecciones",
    type: "fill",
    question:
      "Las cuatro proyecciones W_Q, W_K, W_V y W_O, de 512×512 y con sesgo, suman ___ parámetros.",
    options: null,
    correctAnswer: "1050624",
    acceptedAnswers: ["1050624", "1.050.624", "1 050 624", "1,050,624"],
    hint: "Calcula una matriz con su sesgo y multiplica por cuatro.",
    feedback: {
      correct: "4·(512·512 + 512) = 4·262.656 = 1.050.624.",
      incorrect:
        "Cada proyección: 512·512 + 512 = 262.656; por cuatro, 1.050.624.",
    },
  },
  {
    topic: "Atención",
    tier: 3,
    title: "Enfriar el modelo",
    type: "mc",
    question:
      "Con logits [2, 1, 0] y T = 1, la softmax da ≈ [0,67, 0,24, 0,09]. Con T = 0,5, ¿qué pasa con la probabilidad de la primera palabra?",
    options: [
      "A) Sube a ≈ 0,87",
      "B) Baja a ≈ 0,51",
      "C) Se queda en 0,67",
      "D) Pasa a ser exactamente 1",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "Dividir por 0,5 duplica las diferencias entre logits. ¿Eso afila o aplana?",
    feedback: {
      correct: "Logits [4, 2, 0] → e⁴/(e⁴ + e² + 1) ≈ 0,87.",
      incorrect:
        "Con T = 0,5 los logits pasan a [4, 2, 0] y la primera sube a ≈ 0,87 (nunca llega a 1).",
    },
  },
  {
    topic: "Atención",
    tier: 3,
    title: "Más cabezas",
    type: "tf",
    question:
      "Tener 8 cabezas de dimensión 64 cuesta más parámetros que tener 1 cabeza de dimensión 512.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "¿Qué tamaño tienen en total las matrices de proyección en los dos casos?",
    feedback: {
      correct: "Falso: las 8 cabezas se reparten las mismas matrices 512×512.",
      incorrect:
        "Es falso: el coste es el mismo, la proyección de 512 se parte en 8 trozos de 64.",
    },
  },

  // ---------------- Integración ----------------
  {
    topic: "Integración",
    tier: 1,
    title: "Elegir el arma",
    type: "mc",
    question:
      "¿Qué arquitectura usarías como punto de partida para clasificar radiografías?",
    options: [
      "A) Una LSTM unidireccional",
      "B) Una CNN preentrenada en imágenes",
      "C) Un perceptrón de una sola capa",
      "D) Una red de base radial",
    ],
    correctAnswer: "B",
    acceptedAnswers: null,
    hint: "¿Qué estructura tienen los datos: secuencia, tabla o rejilla de píxeles?",
    feedback: {
      correct: "Datos en rejilla → CNN, idealmente con transfer learning.",
      incorrect: "Para imágenes, una CNN (mejor aún, preentrenada).",
    },
  },
  {
    topic: "Integración",
    tier: 1,
    title: "Compartir",
    type: "tf",
    question:
      "Las CNN comparten pesos en el espacio y las RNN los comparten en el tiempo.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Piensa en qué se reutiliza en cada caso: el filtro y la celda.",
    feedback: {
      correct: "El mismo filtro en cada posición; la misma celda en cada paso.",
      incorrect: "Es verdadero: es la idea común que las hace eficientes.",
    },
  },
  {
    topic: "Integración",
    tier: 1,
    title: "La revolución de 2017",
    type: "short",
    question:
      "¿Qué arquitectura, basada solo en atención, sustituyó a las LSTM en traducción automática a partir de 2017?",
    options: null,
    correctAnswer: "Transformer",
    acceptedAnswers: [
      "transformer",
      "transformers",
      "el transformer",
      "arquitectura transformer",
    ],
    hint: "El artículo se titulaba «Attention is all you need».",
    feedback: { correct: "El Transformer.", incorrect: "Es el Transformer." },
  },
  {
    topic: "Integración",
    tier: 1,
    title: "El hilo de la memoria",
    type: "fill",
    question:
      "En una red recurrente, la información de los pasos anteriores viaja en el estado ___.",
    options: null,
    correctAnswer: "oculto",
    acceptedAnswers: ["oculto", "hidden", "oculto (h)", "h", "oculto h"],
    hint: "Se suele escribir hₜ.",
    feedback: {
      correct: "El estado oculto hₜ.",
      incorrect: "Es el estado oculto (hidden state, hₜ).",
    },
  },
  {
    topic: "Integración",
    tier: 2,
    title: "Etiquetar un contrato",
    type: "mc",
    question:
      "Quieres marcar cada palabra de un contrato ya redactado como «persona», «empresa» u «otro». ¿Qué configuración encaja?",
    options: [
      "A) seq → seq bidireccional, una salida por palabra",
      "B) seq → 1 unidireccional, una salida por contrato",
      "C) Una CNN 2D aplicada sobre el texto como imagen",
      "D) seq → 1 bidireccional, una salida por contrato",
    ],
    correctAnswer: "A",
    acceptedAnswers: null,
    hint: "¿Cuántas etiquetas necesitas? ¿Está el texto completo disponible desde el principio?",
    feedback: {
      correct:
        "Una etiqueta por palabra (return_sequences=True) y el texto completo permite leer en ambos sentidos.",
      incorrect:
        "Hace falta una salida por palabra, y como el contrato ya está escrito se puede usar bidireccional.",
    },
  },
  {
    topic: "Integración",
    tier: 2,
    title: "Voz en directo",
    type: "tf",
    question:
      "Para transcribir voz en directo, mientras la persona habla, una LSTM bidireccional es la mejor elección.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "F",
    acceptedAnswers: null,
    hint: "¿Puedes leer hacia atrás algo que todavía no se ha dicho?",
    feedback: {
      correct:
        "Falso: en directo no existe el futuro de la secuencia; hace falta un modelo causal.",
      incorrect: "Es falso: bidireccional exige tener la secuencia completa.",
    },
  },
  {
    topic: "Integración",
    tier: 2,
    title: "Adaptar un gigante",
    type: "short",
    question:
      "A un BERT preentrenado se le añade una capa de salida y se entrena unas pocas épocas con reseñas etiquetadas. ¿Cómo se llama esa fase?",
    options: null,
    correctAnswer: "fine-tuning",
    acceptedAnswers: [
      "fine-tuning",
      "fine tuning",
      "finetuning",
      "ajuste fino",
      "afinado",
      "afinamiento",
    ],
    hint: "Es la segunda fase después del preentrenamiento; su nombre en inglés tiene dos palabras.",
    feedback: {
      correct: "Fine-tuning (ajuste fino).",
      incorrect: "Es el fine-tuning (ajuste fino).",
    },
  },
  {
    topic: "Integración",
    tier: 2,
    title: "Lo que no cuenta",
    type: "fill",
    question:
      "Una CNN y una LSTM tienen algo en común: su número de parámetros NO depende del ___ de la entrada (píxeles o pasos).",
    options: null,
    correctAnswer: "tamaño",
    acceptedAnswers: [
      "tamaño",
      "tamano",
      "longitud",
      "tamaño de la entrada",
      "size",
      "largo",
    ],
    hint: "Recuerda los ejercicios de duplicar la imagen o alargar la secuencia.",
    feedback: {
      correct:
        "Pesos compartidos: más píxeles o más pasos no añaden parámetros.",
      incorrect: "Es el tamaño (o la longitud) de la entrada.",
    },
  },
  {
    topic: "Integración",
    tier: 3,
    title: "La gran ventaja",
    type: "mc",
    question:
      "¿Qué ventaja clave tiene un Transformer frente a una LSTM al entrenar?",
    options: [
      "A) Necesita menos memoria con secuencias largas",
      "B) Su coste crece linealmente con la longitud",
      "C) No necesita datos de entrenamiento etiquetados",
      "D) Procesa todas las posiciones en paralelo",
    ],
    correctAnswer: "D",
    acceptedAnswers: null,
    hint: "La LSTM tiene que esperar al paso anterior. ¿Y la atención?",
    feedback: {
      correct:
        "Todas las posiciones a la vez con productos de matrices: ideal para GPU. A cambio, coste n².",
      incorrect:
        "La ventaja es el paralelismo. A y B son, de hecho, sus puntos débiles.",
    },
  },
  {
    topic: "Integración",
    tier: 3,
    title: "Primera capa mínima",
    type: "short",
    question:
      "Una capa Conv2D con 8 filtros 3×3 se aplica a una imagen en escala de grises. ¿Cuántos parámetros tiene? (solo el número)",
    options: null,
    correctAnswer: "80",
    acceptedAnswers: ["80", "80 parametros", "80 parámetros"],
    hint: "Escala de grises significa un único canal. Y no olvides el sesgo.",
    feedback: {
      correct: "(3·3·1 + 1)·8 = 80.",
      incorrect: "(3·3·1 + 1)·8 = 10·8 = 80.",
    },
  },
  {
    topic: "Integración",
    tier: 3,
    title: "Costes comparados",
    type: "tf",
    question:
      "El cálculo de la atención crece con el cuadrado de la longitud de la secuencia; el de una LSTM crece de forma lineal, pero paso a paso.",
    options: ["VERDADERO", "FALSO"],
    correctAnswer: "V",
    acceptedAnswers: null,
    hint: "Compara «todos con todos» con «uno detrás de otro».",
    feedback: {
      correct: "Atención: n² en paralelo. LSTM: n pasos en secuencia.",
      incorrect:
        "Es verdadero: ese es exactamente el intercambio entre las dos arquitecturas.",
    },
  },
  {
    topic: "Integración",
    tier: 3,
    title: "Lo que dice la celda",
    type: "mc",
    question:
      "Una celda LSTM tiene Cₜ = 1,7 y puerta de salida o = 0,27. Sabiendo que tanh(1,7) ≈ 0,935, ¿cuánto vale hₜ?",
    options: ["A) ≈ 1,70", "B) ≈ 0,46", "C) ≈ 0,25", "D) ≈ 0,94"],
    correctAnswer: "C",
    acceptedAnswers: null,
    hint: "La salida es el estado pasado por tanh y filtrado por la puerta de salida.",
    feedback: {
      correct: "hₜ = o·tanh(Cₜ) = 0,27·0,935 ≈ 0,25.",
      incorrect:
        "hₜ = o·tanh(Cₜ) = 0,27·0,935 ≈ 0,25. Guarda mucho, pero dice poco.",
    },
  },
];

// === SALAS: se asignan por posición en la partida, no por pregunta ===
var ROOMS = {
  s1: {
    room: "&#128421; TERMINAL DE ACCESO",
    narrative:
      "La consola parpadea. NEXUS, la IA del laboratorio, ha bloqueado el sistema y solo deja pasar a quien demuestre que entiende cómo piensa una red.",
  },
  s2: {
    room: "&#128293; FIREWALL NIVEL 1",
    narrative:
      "Un muro de código verde se alza ante ti. Cada respuesta correcta abre una grieta en el cortafuegos.",
  },
  A: {
    room: "&#128065; NÚCLEO DE VISIÓN",
    narrative:
      "Entras en las capas convolucionales de NEXUS: miles de filtros te observan desde las paredes.",
  },
  B: {
    room: "&#129504; BANCO DE MEMORIA",
    narrative:
      "Celdas LSTM laten en hilera. Sus puertas se abren y se cierran recordando y olvidando.",
  },
  s3: {
    room: "&#128451; BASE DE DATOS CENTRAL",
    narrative:
      "Los pesos de NEXUS fluyen por los racks. Un error aquí y la alarma despertará a todo el sistema.",
  },
  C: {
    room: "&#128272; NODO ENCRIPTADO",
    narrative:
      "Las claves de cifrado giran en una espiral de tokens. Solo quien domine las cuentas podrá descifrarlas.",
  },
  D: {
    room: "&#128225; MATRIZ DE ATENCIÓN",
    narrative:
      "Cada nodo mira a todos los demás. Las conexiones brillan según su afinidad: Query contra Key.",
  },
  s4: {
    room: "&#9889; ROOT ACCESS",
    narrative:
      "Estás en el núcleo. Tres órdenes más y NEXUS volverá a obedecer a los humanos.",
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
// En el modo banco, cada pregunta muestra su bloque temático
QUESTION_BANK.forEach(function (q) {
  q.room = "&#128190; " + q.topic.toUpperCase();
  q.narrative = "Banco de preguntas · " + q.topic + " · nivel " + q.tier;
});

// === PHRASES (16 finales: hash(nombre) x ramas) ===
var PHRASES = [
  // índice = hash(nombre)*4 + ruta: 0 = Visión+Cifrado, 1 = Visión+Atención, 2 = Memoria+Cifrado, 3 = Memoria+Atención
  "Cegaste sus filtros y descifraste sus claves: NEXUS ya no ve ni guarda secretos.",
  "Del filtro 3×3 a la matriz Q·Kᵀ: has recorrido la historia del deep learning en una noche.",
  "Vaciaste su memoria y rompiste su cifrado: la puerta de olvido de NEXUS se cerró para siempre.",
  "Del estado oculto al Transformer: reconstruiste el camino que llevó a los grandes modelos de lenguaje.",
  "Cada convolución fue una grieta en el cortafuegos y cada cuenta, una llave. Acceso root concedido.",
  "Viste como una CNN y miraste como la atención: todo a la vez. NEXUS se rinde.",
  "Recordaste lo que importaba y olvidaste lo que no. Las cuentas de NEXUS ya no tienen secretos.",
  "Venciste a la memoria y a la atención: las secuencias ya no esconden nada.",
  "Pesos compartidos contra pesos compartidos: ganaste tú. La visión de NEXUS vuelve a ser solo píxeles.",
  "Ni el pooling ni la softmax pudieron contigo. El laboratorio vuelve a manos humanas.",
  "Sus celdas LSTM laten por última vez: su gradiente se desvaneció; el tuyo no.",
  "Con √dₖ, máscaras y cabezas múltiples desmontaste su memoria y su atención pieza a pieza.",
  "Has demostrado que una imagen es estructura, no solo píxeles. El núcleo cifrado se abre.",
  "Filtros y afinidades, rejillas y tokens: dominas las dos formas de mirar de NEXUS.",
  "Tu memoria a largo plazo superó a la de NEXUS. Sus claves obedecen ahora tus órdenes.",
  "Secuencia completa, atención total: escapas del laboratorio con todo el Tema 4 en la cabeza."
];
