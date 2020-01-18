function convert() {
    var output = document.getElementById("hasilencode");
    var input = document.getElementById("input").value;
    var deinput = document.getElementById("inputcode");

    output.value = "";
    var simbol = "";
    var codeascii = "";
    var codeword = "";
    var jumlahcode = "";

    for (var i = 0; i < input.length; i++) {
        output.innerHTML += input[i].charCodeAt(0).toString(2) + " ";
        deinput.value += input[i].charCodeAt(0).toString(2) + " ";
        simbol += input[i] + "<hr>";
        codeascii += input[i].charCodeAt(0) + "<hr>";;
        codeword += input[i].charCodeAt(0).toString(2) + "<hr>";
        jumlahcode += input[i].charCodeAt(0).toString(2).length + "<hr>";

    }

    document.getElementById("asimbol").innerHTML = simbol;
    document.getElementById("kodeascii").innerHTML = codeascii;
    document.getElementById("codes").innerHTML = codeword;
    document.getElementById("jumlahcode").innerHTML = jumlahcode;

    getFrequency(input);


}

function getFrequency(string) {
    var freq = {};
    for (var i = 0; i < string.length; i++) {
        var character = string.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
        }
    }

    var asimbol = "";
    var amuncul = "";
    var probabilitas = "";

    var kemunculan = [];

    for (var key in freq) {
        asimbol += key + "<hr>";
        amuncul += freq[key] + "<hr>";
        kemunculan.push(freq[key]);
        probabilitas += freq[key] / string.length + "<hr>";
    }

    console.log("kemunculan");
    console.log(kemunculan[0]);
    console.log(kemunculan.length);
    console.log(string.length);

    document.getElementById("simbol").innerHTML = asimbol;
    document.getElementById("kemunculan").innerHTML = amuncul;
    document.getElementById("probabilities").innerHTML = probabilitas;

    var y;
    var average = 0;
    var lavg = 0;
    var input = document.getElementById("input").value;


    for (var i = 0; i < kemunculan.length; i++) {
        x = kemunculan[i]*7;
        average += x;
        lavg = average/input.length;
        $('#lavg').html(lavg);
        $('#jumlahbit').html(lavg * input.length);
    }
    return freq;
}

//hitungentropy(kemunculan);

function hitungentropy(kemunculan) {
    var y;
    var average = 0;
    var lavg = 0;
    var input = document.getElementById("input").value;

    for (y = 0; kemunculan.length; y++) {
        var x = kemunculan[y] * 7;
        average += x;
        lavg = average / input.length;
        console.log(lavg);
        $('#lavg').html(lavg);
        $('#jumlahbit').html(lavg * input.length);
    }
}


function bintotext() {
    var input = document.getElementById("inputcode").value;
    var binString = '';

    input.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    document.getElementById("hasildecode").innerHTML = binString;
    return binString;
}

