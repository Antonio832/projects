var clasif = function (p) {
    let clasificador;

    let resDiv;
    let c;

    let input;

    let video;

    p.setup = function () {
        c = p.createCanvas(600, 600);
        p.background(0);

        video = p.createCapture(p.VIDEO);
        video.size(128,128);

        let setup = {
            inputs: [128, 128, 4],
            task: 'imageClassification',
        };

        const modelData = {
            model: 'model/model.json',
            metadata: 'model/model_meta.json',
            weights: 'model/model.weights.bin',
        }
        clasificador = ml5.neuralNetwork(setup);
        clasificador.load(modelData, modeloCargado);

        resDiv = p.createDiv('Cargando modelo...');

        input = p.createGraphics(128, 128);
    }

    function modeloCargado() {
        console.log('Modelo exitosamente cargado');
        clasificaImagen();
    }



    function clasificaImagen() {
        //input.copy(c, 0, 0, 600, 600, 0, 0, 128, 128);

        clasificador.classify({
            image: video
        }, obtuvoRes);
    }

    function obtuvoRes(err, resuldatos) {
        if (err) {
            console.log("[ERROR]: Epale! esto salio mal -> " + err);
            return;
        }

        let etiqueta = resuldatos[0].label;
        let seguridad = p.nf(100 * resuldatos[0].confidence, 2, 0);

        resDiv.html(`Estoy viendo un ${etiqueta}!! estoy un ${seguridad} % seguro`);

        clasificaImagen();
    }

    p.draw = function () { 
        p.image(video,0,0,p.width,p.height);
        video.hide();
    }
}

var sketchClasif = new p5(clasif, 'canvas')