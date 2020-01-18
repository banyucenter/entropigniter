function node() {
    this.left = null;
    this.right = null;
    this.prob = null;
    this.value = null;
    this.code = "";
    this.parent = null;
    this.visited = false;
}

var elems = [];
var elem;
var encodes = [];
let label;
var result;

function huffman() {
    const input = document.getElementById("input").value;
    const probabilities = getProbabilities(input);
    const codes = getCodes(probabilities);

    result = kodirajHuffman(input, codes);
    let simbol = "";
    let temp = "";
    let kemunculan = "";
    let arrkemunculan = [];
    for (const elem in probabilities) {
        temp += probabilities[elem] + "<br/>";
        simbol += elem + "<br/>";
        eprobabilitas = probabilities[elem];
        kemunculan += probabilities[elem] * input.length + "<br/>";
        arrkemunculan.push(probabilities[elem] * input.length);
    }
    document.getElementById("simbol").innerHTML = simbol;
    document.getElementById("kemunculan").innerHTML = kemunculan;
    document.getElementById("probabilities").innerHTML = temp;

    console.log(arrkemunculan);

    temp = "";

    var asimbol = "";
    var acode = "";
    var jumlahcode = "";


    for (elem in codes) {
        label = elem == ' ' ? '' : elem;
        // elems.push(label);

        temp += label + " = " + codes[elem] + "<br/>";
        asimbol += label + "<br/>";
        acode += codes[elem] + "<br/>";
        // elems.push(codes[elem]);
        // encodes.push(codes[elem]);
        jumlahcode += codes[elem].length + "<br/>";
        //elems.push(codes[elem].length);
    }
    console.log("ELEMS " + elems);
    console.log("ENCODES " + encodes);
    console.log("LABEL " + label);
    document.getElementById("asimbol").innerHTML = asimbol;
    document.getElementById("codes").innerHTML = acode;
    document.getElementById("jumlahcode").innerHTML = jumlahcode;
    document.getElementById("result").innerHTML = result;
    document.getElementById("lavg").innerHTML = result.length / input.length;
}


var sortedSimbol = [];
var sortedProb = [];

function getCodes(prob) {
    let tree = new Array();
    let secondTree = new Array();

    this.getNext = function () {
        if (tree.length > 0 && secondTree.length > 0 &&
            tree[0].prob < secondTree[0].prob)
            return tree.shift();

        if (tree.length > 0 && secondTree.length > 0 &&
            tree[0].prob > secondTree[0].prob)
            return secondTree.shift();

        if (tree.length > 0)
            return tree.shift();

        return secondTree.shift();
    }
    sortedProb = new Array();

    let codes = new Array();

    let x = 0;
    for (const elem in prob) {
        sortedProb[x] = new Array(elem, prob[elem]);
        sortedSimbol[x] = new Array(elem);
        x = x + 1;
    }


    sortedProb = sortedProb.sort((a, b) => {
        return b[1] - a[2];
    });
    x = 0;

    for (const elem in sortedProb) {
        tree[x] = new node();
        tree[x].prob = sortedProb[elem][1];
        tree[x].value = sortedProb[elem][0];
        x = x + 1;
    }
    while (tree.length + secondTree.length > 1) {
        const left = getNext();
        const right = getNext();
        const newnode = new node();
        newnode.left = left;
        newnode.right = right;
        newnode.prob = left.prob + right.prob;
        newnode.left.parent = newnode;
        newnode.right.parent = newnode;
        secondTree.push(newnode);
        console.log("se= " + secondTree);
    }

    let currentnode = secondTree[0];
    let code = "";
    while (currentnode) {
        if (currentnode.value) {
            codes[currentnode.value] = code;
            code = code.substr(0, code.length - 1);
            currentnode.visited = true;
            currentnode = currentnode.parent;
        } else if (!currentnode.left.visited) {
            currentnode = currentnode.left;
            code += "0";
        } else if (!currentnode.right.visited) {
            currentnode = currentnode.right;
            code += "1";
        } else {
            currentnode.visited = true;
            currentnode = currentnode.parent;
            code = code.substr(0, code.length - 1);
        }
    }

    console.log("e=" + codes);
    return codes;
}


function kodirajHuffman(input, codes) {
    const result = input.split("");
    for (const elem in result) {
        result[elem] = codes[result[elem]];
    }
    console.log("c=" + result);
    return result.join("");
}

function getProbabilities(input) {
    let prob = new Array();
    let x = 0;
    const len = input.length;
    while (x < len) {
        var chr = input.charAt(x);
        if (prob[chr]) {
            prob[chr] = prob[chr] + 1;
        } else {
            prob[chr] = 1;
        }
        x++;
    }

    for (const elem in prob) {
        prob[elem] = prob[elem] / len;
    }

    console.log("d=" + prob);
    return prob;
}

function decode(tree, encoded) {
    output = '';

    //console.log("Encode= " + str);
    //console.log("Tree= " + tree);
    tree = sortedProb;
    p = tree;
    encoded = result;

    console.log('simbol = ' + encoded);
    console.log('tree = ' + tree[0][0]);//p
    console.log('tree = ' + tree[0][1]);
    console.log('tree = ' + tree[1][0]);//u
    for (var bit in encoded) {
        if (encoded[bit] == '0')
            p = p[0][0];

        else
            p = p[1][0];

        if (typeof (p) == typeof ('')) {
            output += p;
            p = tree;

        }
    }
    console.log("Decode: " + output);

    return output
}

huffman()