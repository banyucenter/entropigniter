
//Struktur Simpul
function Node(data, bit, left, right) {
    this.data = data;
    this.bit = bit;
    this.left = left;
    this.right = right;
    this.show = show;
    this.insert = insert;
}

function show() {
    return this.data;
}

//Struktur BST
function BST() {
    this.root = null;
}

//Dapatkan kode karakter (yang merupakan daun di pohon)
function getLeafsCodes(node, array, code = "") {
    
    if (node.left != null) {
        getLeafsCodes(node.left, array, code.concat("0"));
    }
    if (node.right != null) {
        getLeafsCodes(node.right, array, code.concat("1"));
    }
    if (node.left == null && node.right == null) {
        array.push([node.show(), code, code.length]);
    }
}

//Buat pohon
function createTree(freq) {
    var tree = new BST();
    var root_name = "";
    for (var i = 0; i < freq.length; i++) {
        root_name = root_name.concat(freq[i][0]);
    }
    var rootNode = new Node(root_name, null, null, null);
    tree.root = rootNode;
    tree.root.insert(freq);

    return tree;
}

//Masukkan elemen ke dalam pohon, dengan mempertimbangkan bahwa Anda harus memecah + - array 
//setengah jalan sesuai dengan peluang (lihat calcSlice ())
function insert(freq) {
    var aux;
    var slice = calcSlice(freq) + 1;
    var node_name = "";
    //Masukkan ke kiri
    aux = freq.slice(0, slice);
    for (var i = 0; i < aux.length; i++) {
        node_name = node_name.concat(aux[i][0]);
    }
    this.left = new Node(node_name, 0, null, null);
    if (aux.length > 1)
        this.left.insert(aux);
    var node_name = "";
    //Sisipkan ke kanan
    aux = freq.slice(slice, freq.length);
    for (var i = 0; i < aux.length; i++) {
        node_name = node_name.concat(aux[i][0]);
    }
    this.right = new Node(node_name, 1, null, null);
    if (aux.length > 1)
        this.right.insert(aux);
}

//Hasilkan tabel freq
function freqsTable(tableData) {
    var table = document.createElement('table');
    var theader = document.createElement('thead');
    var tableBody = document.createElement('tbody');

    table.setAttribute('class','table table-bordered');
    theader.innerHTML = "<tr><th>Simbol</th><th>Kemunculan.</th><th>Probabilitas.</th></tr>"

    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        table.appendChild(theader)
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    return table;
}

//Buat tabel kode
function codesTable(tableData) {
    var table = document.createElement('table');
    var theader = document.createElement('thead');
    var tableBody = document.createElement('tbody');

    
    table.setAttribute('class','table table-bordered');
    theader.innerHTML = "<tr><th>Simbol</th><th>Codeword</th><th>Panjang Code</th></tr>"

    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        table.appendChild(theader)
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    return table;
}
var sorted = [];
var freq = {};
var alf = [];
//Shannon Fano Pra-Pemrosesan
function sf_pp(data) {
    //Tulis Kode Pra-pemrosesan
    for (var i = 0; i < data.length; i++) {
        var character = data.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
            alf.push(character);
        }
    }
    for (var i = 0; i < alf.length; i++) {
        freq[alf[i]] = (freq[alf[i]] / data.length).toFixed(3);
    }
   
    for (var char in freq)
        sorted.push([char,Math.round(freq[char]* data.length),freq[char]])
    sorted.sort(function (a, b) { return b[1] - a[1] })

    console.log("soreted")
    console.log(sorted)
    return sorted;
}

//Hitung tempat untuk membagi array freq
function calcSlice(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += parseFloat(data[i][1]);
    }

    var soma = parseFloat(data[0][1]);
    var halfTotal = total / 2;
    var j = 1;
    for (j = 1; soma + parseFloat(data[j][1]) <= halfTotal; j++) {
        soma += parseFloat(data[j][1]);
    }
    return j - 1;
}

//Konversi array ke Object {key => value}
function arrayToObject(array) {
    var Obj = {};
    for (var i = 0; i < array.length; i++) {
        Obj[array[i][0]] = array[i][1];
    }
    return Obj;
}

//Hasilkan kode bit dari string awal
function compress(data, codes_ary) {
    var bit_code = "";
    var codes = arrayToObject(codes_ary);
    for (var i = 0; i < data.length; i++) {
        bit_code += " " + codes[data[i]];
    }
    return bit_code;
}


//Fungsi decoding code
function decompress(data) {
    var aux = "";
    var word = "";

    var dataArray = data.split(" ");
    var caracters = [];

    var alphabet = [];
    getLeafsCodes(tree.root, alphabet);

   console.log("A : "+ alphabet);
    dataArray.forEach(function (a) {
        alphabet.forEach(function (word) {
            console.log(a, word[0], word[1]);
            if (a === word[1])
                caracters.push(word[0]);
        }
        );
    });

    word = caracters.join("");

    $('#result_decode').html(word);
    return word;
}

//Fungsi encoding string
function shannon_fano(data) {
    var freq = sf_pp(data);
    console.log("freq")
    console.log(freq)
    //cetak tabel frekuensi
    $('#freq_table').html(freqsTable(freq));
    //buat pohon biner
    tree = createTree(freq);
    //Menghasilkan kode
    var codes = [];
    getLeafsCodes(tree.root, codes);
    $('#codes_table').html(codesTable(codes));
    //Mengompresi String awal ke 0 dan 1
    var bitCode = compress(data, codes);
    document.getElementById('bit_code').innerHTML = bitCode;
    document.getElementById('decode').value = bitCode;
    
    console.log(codes);

    var i;
    var average = 0;
    var lavg=0;

    console.log(data.length);

    for (i = 0; freq.length; i++) {

        var x = freq[i][2]* codes[i][2];
        average += x;
        lavg = average;

        $('#entropy').html(lavg);
        $('#jumlahbit').html(lavg * data.length);
    } 
}
