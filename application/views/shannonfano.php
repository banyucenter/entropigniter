

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
                                        <h5 class="m-b-10">Shannon Fano Entropy</h5>
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
												<div class="form-group">
                                                            <label for="exampleInputEmail1">String</label>
                                                            <input type="text" name="input" id="input"  class="form-control" required placeholder="Masukan String">
                                                            <br>
                                                            <button type="button" class="btn btn-primary" onclick="shannon_fano(getElementById('input').value)">Encode</button>
                                                </div>

                                                <div class="form-group">
                                                <div id="freq_table"></div>

                                                <!-- Tabela de frequências -->
                                                <div id="codes_table"></div>

                                                <table class="table table-bordered" id="example" class="display">
                                                    <thead class="thead-dark">
                                                        <tr>
                                                            
                                                            <th>Encoding</th>
                                                            <th>Lavg</th>
                                                            <th>Jumlah BIT</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td> <p id="bit_code"></p></td>
                                                            <td> <p id="entropy"></p></td>
                                                            <td> <p id="jumlahbit"></p></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                </div>

                                                <div class="form-group">
                                                            <label for="exampleInputEmail1">Decode</label>
                                                            <input type="text" name="input" id="decode"  class="form-control" required placeholder="Masukan Code">
                                                            <br>
                                                            <button type="button" class="btn btn-primary" onclick="decompress(getElementById('decode').value)">Decode</button>
                                                </div>
                                                
                                                <div><textarea id="result_decode" class="form-control"></textarea></div>
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
    <script src="<?php echo base_url().'assets/template/';?>assets/js/shannonfano.js"></script>
    <script src="<?php echo base_url().'assets/template/';?>assets/js/vendor-all.min.js"></script>
	<script src="<?php echo base_url().'assets/template/';?>assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url().'assets/template/';?>assets/js/pcoded.min.js"></script>

</body>
</html>
