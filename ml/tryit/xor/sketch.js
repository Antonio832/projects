var xor = function (p) {
    let nn; //Objeto destinado a ser la red neuronal

    let data = [{ //Inputs con etiquetas
        input: [0, 0],
        outputs: [0]
    }, {
        input: [0, 1],
        outputs: [1]
    }, {
        input: [1, 0],
        outputs: [1]
    }, {
        input: [1, 1],
        outputs: [0]
    }];

    let slider; //Para ajustar el Learning rate

    //Botones
    let resetButton;
    let fourNN;

    let c; //Para guardar el canvas

    //Setup es la primera funcion que se ejecuta, se ejecuta una sola vez
    p.setup = function () {

        //Creando canvas de trabajo
        c = p.createCanvas(600, 600);

        //Creando red neuronal, 2 inputs, 2 capas, un output.
        nn = new NeuralNetwork(2, 2, 1); // La red es una red completamente conectada

        p.noStroke(); //Quita bordes entre rectuangulos

        //Creando boton para reiniciar
        resetButton = p.createButton('Reinicia');
        resetButton.parent("resetNN");
        resetButton.mousePressed(redo);

        //Creando boton para reiniciar pero con 4 capas
        fourNN = p.createButton('Pruebalo');
        fourNN.parent("NN4");
        fourNN.mousePressed(redo4);

        //Creando slider para el learning rate
        slider = p.createSlider(0, 0.5, 0.1, 0.01);
        slider.parent('inSlide');

    }

    //Funcion para 4 capas
    function redo4() {
        nn = new NeuralNetwork(2, 4, 1);
    }

    //Funcion reiniciar
    function redo() {
        nn = new NeuralNetwork(2, 2, 1);
    }

    //Funcion pinta que se ejecuta 60 veces por segundo
    p.draw = function () {
        //pinta el background de negro
        p.background(0);

        // Entrenamos la red neuronal 150 veces por cuadro, siempre asegurandonos
        // de que los datos sean aleatoriamente elegidos para entrenar.
        for (let i = 0; i < 150; i++) {
            let random_data = p.random(data);   //Escoge un elemento random de la lista de datos con etiquetas
            nn.train(random_data.input, random_data.outputs);//La funcion train es llamada con el elemento elegido aleatoriamente junto con su etiqueta esperada
        }

        //Ajusta el learning rate segun el input del usuario
        nn.setLearningRate(slider.value());

        //Para dibujar los cuadros y seleccionar regiones en medio de los 4 valores entrenados
        let res = 10,
            cols = p.width / res,
            ren = p.height / res;

        //Recorremos todo el canvas
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < ren; j++) {
                let x1 = i / cols;
                let x2 = j / ren;

                let inputs = [x1, x2];

                //Hacemos prediccion segun los elementos recorridos por el canvas
                let y = nn.predict(inputs);

                //Para darle el color
                p.fill(y * 255);
                p.rect(i * res, j * res, res, res);
            }
        }
    }
}

var sketchXOR = new p5(xor, 'canvas');
