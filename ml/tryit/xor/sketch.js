let nn;
let data = [{
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

let slider;

let c;

function setup() {
    c = createCanvas(600, 600);
    nn = new NeuralNetwork(2, 2, 1);
    //noStroke();
    slider = createSlider(0,0.5,0.1,0.01);
}

function draw() {
    background(0);

    for (let i = 0; i < 150; i++) {
        let random_data = random(data);
        nn.train(random_data.input, random_data.outputs);
    }

    nn.setLearningRate(slider.value());

    let res = 10,
        cols = width / res,
        ren = height / res;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < ren; j++) {
            let x1 = i / cols;
            let x2 = j / ren;
            let inputs = [x1, x2];
            noStroke();
            let y = nn.predict(inputs);

            fill(y * 255);
            rect(i * res, j * res, res, res);
        }
    }

}

