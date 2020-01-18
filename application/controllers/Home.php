<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this->load->model('EntropyModel');
		$this->load->library('form_validation');
	}

	public function index(){
		$data['string'] = $this->EntropyModel->tampil_data()->result();
		$this->load->view('component/headtop',$data);
		$this->load->view('component/sidebar',$data);
		$this->load->view('component/header',$data);
		$this->load->view('entropi',$data);
	}

	function tambah(){
		$inputan = $this->input->post('inputan');
		$data = array(
			'inputan' => $inputan,
			'total_character' => strlen($inputan)
			);
		$this->EntropyModel->input_data($data,'datastring');
		redirect('home');
	}

	

	function hitung($id){
		$where = array('id' => $id);
		$datahitung = $this->EntropyModel->ambil_data($where,'datastring')->result();
		//print_r($datahitung);
		foreach ($datahitung as $value) 
    	$array[] = $value->inputan;
		print_r($array);

		$datastring = $array[0];
		
		foreach (count_chars($datastring, 1) as $i => $val) {
			$data = array(
				'id_data' => $id,
				'simbol' => chr($i),
				'jumlah' => $val
				);
			
			
			$this->EntropyModel->input_data($data,'split');
			
			
		 }

		 $cekhitung = array(
			'sudah_hitung' => '1'
		);
		$this->EntropyModel->update_data($where,$cekhitung,'datastring');
	
		redirect('home/detail/'.$id);

	}

	function detail($id){

		$where = array('id_data' => $id);
		$data['simbol'] = $this->EntropyModel->tampil_detail($where,'v_frek')->result();
		$data['kalkulasi_entropy']= $this->EntropyModel->tampil_kalkulasi($where,'kalkulasi_entropy')->result();
		$this->load->view('component/headtop',$data);
		$this->load->view('component/sidebar',$data);
		$this->load->view('component/header',$data);
		$this->load->view('detail',$data);

	}

	function detailhuffman($id){
		$where = array('id' => $id);
		$data['huffman'] = $this->EntropyModel->tampil_detail($where,'data_huffman')->result();
		$data['kalkulasi_huffman'] = $this->EntropyModel->tampil_detail($where,'kalkulasi_huffman')->result();
		$this->load->view('component/headtop',$data);
		$this->load->view('component/sidebar',$data);
		$this->load->view('component/header',$data);
		$this->load->view('huffman',$data);
	}


	function shannonfano(){
		$this->load->view('component/headtop');
		$this->load->view('component/sidebar');
		$this->load->view('component/header');
		$this->load->view('shannonfano');
	}

	function huffmancoding(){
		$this->load->view('component/headtop');
		$this->load->view('component/sidebar');
		$this->load->view('component/header');
		$this->load->view('huffmancoding');
		
	}

	function uniformcoding(){
		$this->load->view('component/headtop');
		$this->load->view('component/sidebar');
		$this->load->view('component/header');
		$this->load->view('uniformcoding');
		
	}

	function tentang(){
		$this->load->view('component/headtop');
		$this->load->view('component/sidebar');
		$this->load->view('component/header');
		$this->load->view('tentang');
		
	}

	function hapus($id){
		$where = array('id' => $id);
		$this->EntropyModel->hapus_data($where,'datastring');
		redirect('home');
	}

}
