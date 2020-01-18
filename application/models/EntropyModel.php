<?php defined('BASEPATH') OR exit('No direct script access allowed');

class EntropyModel extends CI_Model
{
    function tampil_data(){
		return $this->db->get('datastring');
    }

    function tampil_detail($where,$table){		
        return $this->db->get_where($table,$where);
    }

    function tampil_kalkulasi($where,$table){		
        return $this->db->get_where($table,$where);
    }
    
    function input_data($data,$table){
		  $this->db->insert($table,$data);
    }
    
    function ambil_data($where,$table){		
        return $this->db->get_where($table,$where);
    }

    function update_data($where,$data,$table){
		  $this->db->where($where);
		  $this->db->update($table,$data);
    }	
  

    function fillDictionary(&$dictionary, $data, $value = '') {
      if (!is_array($data[0][1])) {
        $dictionary[$data[0][1]] = $value.'0';
      } else {
        $this->fillDictionary($dictionary, $data[0][1], $value.'0');
      }
      if (isset($data[1])) {
        if (!is_array($data[1][1])) {
          $dictionary[$data[1][1]] = $value.'1';
        } else {
          $this->fillDictionary($dictionary, $data[1][1], $value.'1');
        }
      }
    }

    function hapus_data($where,$table){
      $this->db->where($where);
      $this->db->delete($table);
    }
}