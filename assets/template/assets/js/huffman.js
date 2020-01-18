//algoritma huffman
var freq_history = [];
var graph_history = [];
var enc_dict = {};
var dec_dict = {};
var frequency = [];
var kemunculan = [];
var w = 0;
var p = 0;

function TreeNode(chr, freq) {
	this.chr = chr;
	this.freq = freq;
	this.left = null;
	this.right = null;
	this.show = false;
}

function insert(arr, node) {
	if (arr.length == 0) {
		arr.push(node);
	}
	else {
		var flag = false;
		for (i = 0; i < arr.length; i++) {
			if (node.freq > arr[i].freq) {
				arr.splice(i, 0, node);
				flag = true;
				break;
			}
		}
		if (!flag) {
			arr.push(node);
		}
	}
}

function compare(a, b) {
	if (a.freq > b.freq)
		return -1;
	if (a.freq < b.freq)
		return 1;
	return 0;
}
//buat pohon huffman
function make_tree(frequency) {
	frequency.sort(compare);
	freq_history.push(freq_to_string(frequency));
	while (frequency.length > 1) {
		right = frequency.pop();
		left = frequency.pop();
		new_node = new TreeNode(left.chr + right.chr, left.freq + right.freq);
		new_node.left = left;
		new_node.right = right;
		new_node.show = true;
		insert(frequency, new_node);
		freq_history.push(freq_to_string(frequency));
	}
}

function make_codes_helper(root, dict, revdict, current_code) {
	if (root != null) {
		if (root.left == null && root.right == null) {
			dict[root.chr] = current_code;
			revdict[current_code] = root.chr;
		} else {
			make_codes_helper(root.left, dict, revdict, current_code + "0");
			make_codes_helper(root.right, dict, revdict, current_code + "1");
		}
	}
}

//fungsi hitung frekuensi string
function make_frequency(str) {
	dict = {};
	for (i = 0; i < str.length; i++) {
		if (dict[str[i]] === undefined) {
			dict[str[i]] = 0;
		}
		dict[str[i]]++;
	}
	frequency = [];
	var asimbol = "";
	var akemunculan = "";
	var probabilitas = "";
	for (var key in dict) {
		frequency.push(new TreeNode(key, dict[key]));
		asimbol += key + "<hr>";
		akemunculan += dict[key] + "<hr>";
		kemunculan.push([dict[key], key]);

		probabilitas += dict[key] / str.length + "<hr>";
	}

	document.getElementById("simbol").innerHTML = asimbol;
	document.getElementById("kemunculan").innerHTML = akemunculan;
	document.getElementById("probabilities").innerHTML = probabilitas;
	return frequency;
}

//fungsi ubah frekuensi ke string
function freq_to_string(freq) {
	var resp = "";
	for (i = 0; i < freq.length; i++) {
		resp += freq[i].chr + " : " + freq[i].freq + '\n';
	}
	return resp;
}

//fungsi encode
function encode(text) {
	encoded_text = "";
	for (i = 0; i < text.length; i++) {
		encoded_text += enc_dict[text[i]]

	}
	return encoded_text
}

//fungsi decode
function decode(text) {
	current_code = "";
	decoded_text = "";

	for (i = 0; i < text.length; i++) {
		current_code += text[i];
		if (current_code in dec_dict) {

			character = dec_dict[current_code];
			decoded_text += character;
			current_code = "";
		}
	}
	return decoded_text;
}

//Jalankan fungsi secara keseluruhan
function generate() {
	freq_history = [];
	enc_dict = {};
	dec_dict = {};
	frequency = [];
	graph_history = [];
	var str = document.getElementById("input").value;
	frequency = make_frequency(str);

	make_tree(frequency);
	make_codes_helper(frequency[0], enc_dict, dec_dict, "");

	var asimbol = "";
	var acode = "";
	var jumlahcode = "";

	var kemunculannya = []
	var dectdictnya = []
	var a = "";
	for (var keya in kemunculan) {
		a = kemunculan[keya]
		kemunculannya.push(a);
	}

	for (var key in dec_dict) {
		//console.log("DICT:"+key, dec_dict[key] );
		asimbol += dec_dict[key] + "<hr>";
		acode += key + "<hr>";
		jumlahcode += key.length + "<hr>";
		dectdictnya.push([key.length, dec_dict[key]])

	}

	document.getElementById("asimbol").innerHTML = asimbol;
	document.getElementById("codes").innerHTML = acode;
	document.getElementById("jumlahcode").innerHTML = jumlahcode;

	var arr1 = kemunculannya,
		arr2 = dectdictnya,
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

	x = arrSum(arr1)
	lavg = x / str.length;
	$('#lavg').html(lavg);
	$('#jumlahbit').html(lavg * str.length);
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

function show_code() {
	generate();
	str = document.getElementById("input").value;
	$("#hasilencode").text(encode(str));
	$("#inputcode").val(encode(str));
}

function show_decode() {
	str = document.getElementById("inputcode").value;
	$("#hasildecode").text(decode(str));
}

