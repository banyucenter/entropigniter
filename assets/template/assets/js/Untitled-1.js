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
		graph_history.push('digraph  {' + make_digraph(frequency) + '}');
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

function make_digraph_helper(root, list) {
	if (root.left != null) {
		list.push('"' + root.chr + ' ' + root.freq + '"' + ' -> ' + '"' + root.left.chr + ' ' + root.left.freq + '"' + ' [ label = 0];');
		make_digraph_helper(root.left, list);
	}
	if (root.right != null) {
		list.push('"' + root.chr + ' ' + root.freq + '"' + ' -> ' + '"' + root.right.chr + ' ' + root.right.freq + '"' + ' [ label = 1 ];');
		make_digraph_helper(root.right, list);
	}
}



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
		//console.log( key, dict[key] );
		asimbol += key + "<br>";
		akemunculan += dict[key] + "<br>";
		kemunculan.push([dict[key],key]);

		probabilitas += dict[key]/str.length + "<br>";
	}
	
	document.getElementById("simbol").innerHTML = asimbol;
	document.getElementById("kemunculan").innerHTML = akemunculan;
	document.getElementById("probabilities").innerHTML = probabilitas;
	
//	document.getElementById("jumlahbit").innerHTML = str.length * la;
	return frequency;
	
}




function make_digraph(root) {
	list = [];
	for (i = 0; i < root.length; i++) {
		if (root[i].show) {

			make_digraph_helper(root[i], list, i);
		}
	}
	return list.join(' ');
}

function freq_to_string(freq) {
	var resp = "";
	for (i = 0; i < freq.length; i++) {
		resp += freq[i].chr + " : " + freq[i].freq + '\n';
	}
	//console.log(resp);
	return resp;
}

function encode(text) {
	encoded_text = "";
	for (i = 0; i < text.length; i++) {
		encoded_text += enc_dict[text[i]]
		
	}
	//console.log(encoded_text);
	return encoded_text
}

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

function calculatecr(original_str, enc_str) {
	//return original_str.length * 8 + ":" + enc_str.length + " (" + (original_str.length * 8 / enc_str.length).toFixed(2) + ")";
	return (original_str.length * 8 / enc_str.length).toFixed(2);
}

function gerar() {
	freq_history = [];
	enc_dict = {};
	dec_dict = {};
	frequency = [];
	graph_history = [];
	$("#texto_saida").text("");
	var str = document.getElementById("input").value;
	frequency = make_frequency(str);
	
	graph_history.push('digraph  {}');
	make_tree(frequency);
	make_codes_helper(frequency[0], enc_dict, dec_dict, "");
	
	console.log(dec_dict);
	console.log(enc_dict);

	var asimbol = "";
	var acode = "";
	var jumlahcode = "";
	

	var kemunculannya = []
	var dectdictnya = []
	var a = "";
	for (var keya in kemunculan){
		//console.log("DICT:"+key, dec_dict[key] );
		a = kemunculan[keya]
		kemunculannya.push(a);
		
	}

	console.log(kemunculannya)
	console.log(kemunculannya[0][0])//1
	console.log(kemunculannya[1][0])//1
	console.log(kemunculannya[0][1])//P
	console.log(kemunculannya[1][1])//U
	console.log(kemunculannya[2][1])//R
	
	
	for (var key in dec_dict){
		//console.log("DICT:"+key, dec_dict[key] );
		asimbol += dec_dict[key] + "<br>";
		acode += key + "<br>";
		jumlahcode += key.length + "<br>";
		dectdictnya.push([dec_dict[key],key.length])
		
	}

	console.log(dectdictnya)
	console.log(dectdictnya[0][0])//P
	console.log(dectdictnya[1][0])//U
	console.log(dectdictnya[2][0])//R
	console.log(dectdictnya[0][1])//2
	console.log(dectdictnya[1][1])//3
	console.log(dectdictnya[2][1])//3

	var average = 0;
/*
	for(y=0;y<kemunculan.length;y++){
		for(z=0;z<kemunculan.length;y++){
			if(kemunculannya[y][1] == dectdictnya[z][0]){
				x = kemunculannya[y][0] * dectdictnya[z][1]
				console.log("x:"+x)
				average += x
			}else {
				console.log("tidak match");
			}
		}
	}

	console.log("AVERAGE:"+average)*/

	document.getElementById("asimbol").innerHTML = asimbol;
	document.getElementById("codes").innerHTML = acode;
	document.getElementById("jumlahcode").innerHTML = jumlahcode;

	/*$("#graph").load(window.location.href + " #graph");
	d3.select("#graph").graphviz()
		.zoom(false)
		.fade(false)
		.renderDot(graph_history[w]);*/
}

/*function hist_prox() {
	if (w < freq_history.length - 1) {
		w++;
	}
	console.log(w);
	console.log(freq_history);
	$("#hist_freq").text(freq_history[w]);
	d3.select("#graph").graphviz()
		.zoom(false)
		.fade(false)
		.renderDot(graph_history[w]);
}
function hist_ant() {
	if (w > 0) {
		w--;
	}
	$("#hist_freq").text(freq_history[w]);
	make_tree(frequency);
	$("#graph").load(window.location.href + " #graph");
	d3.select("#graph").graphviz()
		.zoom(false)
		.fade(false)
		.renderDot(graph_history[w]);
}*/


function show_code() {
	gerar();
	
	str = document.getElementById("input").value;
	$("#hasilencode").text(encode(str));
	$("#lavg").text(calculatecr(str, encode(str)));
	$("#jumlahbit").text(str.length*calculatecr(str, encode(str)));
	$("#inputcode").val(encode(str));
}

function show_decode() {
	
	str = document.getElementById("inputcode").value;
	$("#hasildecode").text(decode(str));
	
	//console.log(decode(str));

}

