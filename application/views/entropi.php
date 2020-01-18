
    <!-- [ Main Content ] start -->
    <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
            <div class="pcoded-content">
                <div class="pcoded-inner-content">
                    <!-- [ breadcrumb ] start -->
                    <div class="page-header">
                        <div class="page-block">
                            <div class="row align-items-center">
                                <div class="col-md-12">
                                    <div class="page-header-title">
                                        <h5 class="m-b-10">Kalkulator Entropy</h5>
                                    </div>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="feather icon-home"></i></a></li>
                                        <li class="breadcrumb-item"><a href="<?php echo base_url().'home'?>">Home</a></li>
                                        <li class="breadcrumb-item"><a href="javascript:">Kalkulator</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- [ breadcrumb ] end -->
                    <div class="main-body">
                        <div class="page-wrapper">
                            <!-- [ Main Content ] start -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Perhitungan Entropi</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12">
												<form action="<?php echo base_url('home/tambah') ?>" method="post" enctype="multipart/form-data" >
                                                        <div class="form-group">
                                                            <label for="exampleInputEmail1">String</label>
                                                            <input type="text"  class="form-control" name="inputan" required placeholder="Masukan String">
                                                            
                                                        </div>
                                                        
                                                        <input class="btn btn-success" type="submit" name="btn" value="Save" />
                                                        
                                                        
												</form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Hasil Perhitungan</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12">
												<table class="table" id="example" class="display">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Nama Inputan String</th>
                                                            <th>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    <?php 
                                                        $no = 1;
                                                        foreach($string as $dstring){
                                                    ?>
                                                        <tr>
                                                            <th scope="row"><?php echo $no++;?></th>
															<td><?php echo $dstring->inputan;?></td>
                                                            <td>
															
                                                            <?php 
                                                            if($dstring->sudah_hitung==1){?>
                                                                <a href="<?php echo base_url('home/detail/'.$dstring->id);?>" class="btn btn-success">DETAIL</a>
                                                                <a href="<?php echo base_url('home/hapus/'.$dstring->id);?>" class="btn btn-danger" onclick="return confirm('Yakin akan dihapus?');">HAPUS</a>
                                                           <?php 
                                                            }else {?>
                                                                <a href="<?php echo base_url('home/hitung/'.$dstring->id);?>" class="btn btn-info" >HITUNG ENTROPY</a>
                                                            <?php 
                                                            }
                                                            ?>
                                                            
                                                        </td>
                                                        </tr>
                                                        <?php }?>
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Input group -->
                                    
                                </div>
                            </div>
                            <!-- [ Main Content ] end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <script src="<?php echo base_url().'assets/template/';?>assets/js/vendor-all.min.js"></script>
	<script src="<?php echo base_url().'assets/template/';?>assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url().'assets/template/';?>assets/js/pcoded.min.js"></script>

</body>
</html>
