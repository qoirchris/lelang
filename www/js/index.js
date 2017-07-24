var server = 'localhost';

$(document).on("pageshow", "#pagebarang", function(){
	// TAMPIL DATA
	$.ajax({
        method: 'get',
        url: 'http://'+server+'/apilelang/selectall.php',
        dataType: 'json',
        success: tampilSukses,
        error: pesanGagal
    });

	function tampilSukses(data){
		//if (data.status == '1') {
			var barang = data;
			$("#konten-brg").empty();

			// TAMPIL DATA PER BARANG
			for (var i = 0; i < barang.length; i++) {
				$("#konten-brg").append('<div class="col-md-12"> <div class="card"> <div class="header"> <h2> '+barang[i].nama+' <small><span class="badge bg-green">Rp. '+pisahKoma(barang[i].harga)+',-</span></small> </h2> </div> <div class="body"> <div id="aniimated-thumbnials" class="list-unstyled row clearfix"> <div class="col-md-12"> <a href="#pagedetailbrg" class="a-detail" data-sub-html="Description" param="'+barang[i].id+'"> <img class="img-responsive thumbnail" src="http://'+server+'/apilelang/'+barang[i].photo_path+'"> </a> </div> </div> <h5>Tanggal Lelang : <br/><br/> <span class="badge bg-red text-center">'+barang[i].tanggal_mulai.substr(0,10)+' s/d '+barang[i].tanggal_akhir.substr(0,10)+'</span></h5> <div> <p>'+barang[i].deskripsi+'</p> <div class="row"> <div class="col-xs-6"> <button type="button" class="btn btn-block btn-lg bg-deep-orange waves-effect btn-pilih" data-toggle="modal" data-target="#smallModal2" param="'+barang[i].id+'"><i class="material-icons">done</i> Pilih</button> </div> <div class="col-xs-6"> <a href="#pagedetailbrg" id="btndetailbrg" class="btn btn-block btn-lg bg-blue waves-effect a-detail" param="'+barang[i].id+'"><i class="material-icons">&#xe8ef;</i> Detail</a> </div> </div> </div> </div> </div> </div>');
			}
		//}
	}
});

function pesanGagal(){
	alert('Ooppss, ERROR!');
}

function pisahKoma(angka){
	return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#konten-brg").on('click', 'button.btn-pilih', function(event){
	var param = '&id='+$(this).attr('param');
	$.ajax({
        method: 'post',
        url: 'http://'+server+'/apilelang/tampil.php',
        data: param,
        dataType: 'json',
        success: tampilDataSukses,
        error: pesanGagal
	});
	function tampilDataSukses(data){
	    //alert('mulai tampil data!');
	    var barang = data;
	    tglplus1 = addDays(barang[0].tanggal_akhir, 1);
	    //alert(tglplus1);
	    var counttgl = tglplus1.substr(0,10).replace(/\-/g,'/');
		$('#clock2').countdown(counttgl, function(event) {
		  var $this = $(this).html(event.strftime('<span class="label-waktu label-danger">%dh %Hj %Mm %Sd</span>'));
		});

	}
});


$("#konten-brg").on('click', 'a.a-detail', function(event){
    var param = '&id='+$(this).attr('param');
    //$('#btfrsimpan').attr('param',$(this).attr('param')); 
    //alert(param);
    $.ajax({
        method: 'post',
        url: 'http://'+server+'/apilelang/tampil.php',
        data: param,
        dataType: 'json',
        success: tampilDataSukses,
        error: pesanGagal
	});

	function tampilDataSukses(data){
	    //alert('mulai tampil data!');
	    var barang = data;
	    $('#tdnama').empty();
	    $('#tdtglmulai').empty();
	    $('#tdtglselesai').empty();
	    $('#tdkategori').empty();
	    $('#tdhrgmin').empty();
	    $('#tddeskripsi').empty();

	    $('#imgdetail1').attr("src", "http://"+server+"/apilelang/"+barang[0].photo_path);
	    $('#tdnama').append(barang[0].nama);
	    $('#tdtglmulai').append(barang[0].tanggal_mulai.substr(0,10));
	    $('#tdtglselesai').append(barang[0].tanggal_akhir.substr(0,10));
	    $('#tdkategori').append(barang[0].kategori_id);
	    $('#tdhrgmin').append(pisahKoma(barang[0].harga));
	    $('#tddeskripsi').append(barang[0].deskripsi);
	    tglplus1 = addDays(barang[0].tanggal_akhir, 1);
	    //alert(tglplus1);
	    var counttgl = tglplus1.substr(0,10).replace(/\-/g,'/');
		$('#clock').countdown(counttgl, function(event) {
		  var $this = $(this).html(event.strftime('<span class="label-waktu label-danger">%dh %Hj %Mm %Sd</span>'));
		});
	}
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    var tgl = result.getFullYear()+'/'+(result.getMonth()+1)+'/'+result.getDate();
    return tgl;
}

$(document).on("pagehide", '#pagedetailbrg', function(){
	$('#smallModal').css("display", "none");
	$('#smallModal').removeClass("in");

	$('.modal-backdrop').remove();
	$('body').removeClass("modal-open");
});

// ACTION MENU
	$('.menu-home').click(function(){
		window.location = "#pagehome";
	});
	$('.menu-barang').click(function(){
		window.location = "#pagebarang";
	});
	$('.menu-jadwal').click(function(){
		window.location = "#pagejadwal";
	});
	$('.menu-profil').click(function(){
		window.location = "#pageprofil";
	});
	$('.menu-login').click(function(){
		window.location = "#pagelogin";
	});
	$('.menu-syarat').click(function(){
		window.location = "#pagesyarat";
	});
	$('.menu-about').click(function(){
		window.location = "#pageabout";
	});
// END ACTION MENU

$('#btnpgprofilok').click(function(){
	var uniquekey = $('#inpunique').val();
	if (uniquekey == '') {
		alert("Unique Key Tidak Boleh Kosong!");
	} else{
		var param = "&key="+uniquekey;
		$.ajax({
			method: 'post',
			url: 'http://'+server+'/apilelang/getprofil.php',
			data: param,
			dataType: 'json',
			success: suksesGetProfil,
			error: pesanGagal,
		});
	}

	function suksesGetProfil(data){
		//alert('Berhasil!');
		var profil = data;

		$('#detnama').empty();
		$('#detnik').empty();
		$('#detnorek').empty();
		$('#detalamat').empty();
		$('#detnohp').empty();
		$('#detjaminan').empty();

		$('#detnama').append(profil[0].nama);
		$('#detnik').append(profil[0].nik);
		$('#detnorek').append(profil[0].nomor_rekening);
		$('#detalamat').append(profil[0].alamat);
		$('#detnohp').append(profil[0].nomor_telepon);
		$('#detjaminan').append(profil[0].nominal);
	}
});

$('#btnlogin').click(function() {
	var inplognik = $('#inplognik').val();
	var inpunique = $('#inploguniq').val();

	if (inplognik == '' || inpunique == '') {
		alert('NIK atak Unique Key Tidak Boleh Kosong!');
	} else {
		var param = "&nik="+inplognik+"&key="+inpunique;
		$.ajax({
			method : 'post',
			url : 'http://'+server+'/apilelang/login.php',
			data : param,
			dtatype : 'json',
			success : suksesLogin,
			error : pesanGagal,
		});
	}

	function suksesLogin(data) {
		alert('Login Sukses!');
	}

});

$(document).on("pageshow", "#pagejadwal", function(){
	$.ajax({
		method : 'get',
		url : 'http://'+server+'/apilelang/selectall.php',
		dataType : 'json',
		success : suksesGetJadwal,
		error : pesanGagal
	});

	function suksesGetJadwal(data){
		var jadwal = data;
		$('#konten-jadwal').empty();
		//alert('OK');
		for (var i = 0; i < jadwal.length; i++) {
			$('#konten-jadwal').append('<tr><td><strong>'+jadwal[i].nama+'</strong></td></tr><tr><td>'+jadwal[i].tanggal_mulai.substr(0,10)+' s/d '+jadwal[i].tanggal_akhir.substr(0,10)+'</td></tr>');
		}
	}
});