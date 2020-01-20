var kemunculan = [];
var banyakcode = [];

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
        output.innerHTML += "0"+input[i].charCodeAt(0).toString(2) + " ";
        deinput.value += "0"+input[i].charCodeAt(0).toString(2) + " ";
        simbol += input[i] + "<hr>";
        codeascii += input[i].charCodeAt(0) + "<hr>";;
        codeword += "0"+input[i].charCodeAt(0).toString(2) + "<hr>";

        jumlahcode += input[i].charCodeAt(0).toString(2).length+1 + "<hr>";
        banyakcode.push([input[i].charCodeAt(0).toString(2).length+1, input[i]]);

    }

    document.getElementById("asimbol").innerHTML = simbol;
    document.getElementById("kodeascii").innerHTML = codeascii;
    document.getElementById("codes").innerHTML = codeword;
    document.getElementById("jumlahcode").innerHTML = jumlahcode;

    getFrequency(input);

    var arr3 = multiDimensionalUnique(banyakcode);
    console.log(kemunculan);
    console.log(arr3);

    var arr1 = kemunculan,
        arr2 = arr3,
        inventory = Object.create(null);

    arr1.forEach(function (a) {
        this[a[1]] = a;
    }, inventory);

    arr2.forEach(function (a) {
        if (!this[a[1]]) {
            this[a[1]] = [0, a[1]];
            arr1.push(this[a[1]]);
        }
        this[a[1]][0] *= a[0];
    }, inventory);


    var lavg = 0;

    for (var i = 0; i < arr1.length; i++) {
		var x = arr1[i][0];
		lavg += x;
    }
    
    $('#lavg').html(lavg);
    $('#jumlahbit').html(lavg * input.length);


}

//Jumlahkan 2 array bernilai angka
function arrSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == 'object') {
            sum += arrSum(arr[i]);
        } else if (Number(arr[i])) {
            sum += arr[i];
        }
    }
    return sum;
}


//mengambil kemunculan simbol secara unik
function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    //console.log(uniques);
    return uniques;
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



    for (var key in freq) {
        asimbol += key + "<hr>";
        amuncul += freq[key] + "<hr>";

        probabilitas += freq[key] / string.length + "<hr>";
        kemunculan.push([freq[key] / string.length, key]);
    }

    document.getElementById("simbol").innerHTML = asimbol;
    document.getElementById("kemunculan").innerHTML = amuncul;
    document.getElementById("probabilities").innerHTML = probabilitas;




    /*for (var i = 0; i < kemunculan.length; i++) {
       
        x = kemunculan[i]*8;
        average += x;
        lavg = average;
        $('#lavg').html(lavg);
        $('#jumlahbit').html(lavg * input.length);
    }*/
    return freq;
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

