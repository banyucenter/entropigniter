
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
                                            <h5>Hasil Perhitungan</h5>
                                        </div>
                                        
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12">
												<table class="table" id="example" class="display">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Simbol</th>
                                                            <th>Jumlah</th>
                                                            <th>Probabilitas</th>
                                                            <th>Self Information</th>
                                                            <th>Pj x Log2 (1/Pj)</th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    <?php 
                                                        $no = 1;
                                                        foreach($simbol as $dsimbol){
                                                    ?>
                                                        <tr>
                                                            <th scope="row"><?php echo $no++;?></th>
                                                            <td><?php echo $dsimbol->simbol;?></td>
                                                            <td><?php echo $dsimbol->jumlah;?></td>
                                                            <td><?php echo $dsimbol->probabilitas;?></td>
                                                            <td><?php echo $dsimbol->self_information;?></td>
                                                            <td><?php echo $dsimbol->nilaientropi;?></td>
                                                        </tr>
                                                        <?php }?>
                                                        
                                                    </tbody>
                                                </table>
                                                
                                                </div>

                                                <table class="table table-bordered" id="example" class="display">
                                                    <thead class="thead-dark">
                                                        <tr>
                                                            
                                                            <th>Jumlah Simbol</th>
                                                            <th>Frekuensi</th>
                                                            <th>Jumlah Probabilitas</th>
                                                            <th>Entropy</th>
                                                            <th>Jumlah BIT</th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    <?php 
                                                        foreach($kalkulasi_entropy as $entropis){?>
                                                    
                                                        <tr>
                                                            
                                                            <td><?php echo  $entropis->jumlah_simbol;?></td>
                                                            <td><?php echo $entropis->jumlah;?></td>
                                                            <td><?php echo $entropis->probabilitas;?></td>
                                                            <td><?php echo $entropis->entropy;?></td>
                                                            <td><?php echo $entropis->jumlah_bit;?></td>
                                                        </tr>
                                                        <?php }?>
                                                        
                                                    </tbody>
                                                </table>
                
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
