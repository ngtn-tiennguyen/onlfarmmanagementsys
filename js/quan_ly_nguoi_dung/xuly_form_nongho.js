var flagNH = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrNH = [];
$(document).ready(function () {
    // up ảnh
    $("#imgNH").change(function (e) {
        console.log("ok");
        var files = e.target.files;
        console.log("ok" + files[0]);
        upload(files, function (res) {
            console.log("ok" + res);
            if (JSON.parse(res).status == true) {
                $(".preview").attr("src", JSON.parse(res).url);
                console.log("ok" + res);
            } else {
                $("#err").html("Error");
            }
        })
    });
    // button thêm
    $(".btnthemnongho").click(function () {
        $(".btnthemnongho").prop("disabled", true);
        $(".btnsuanongho").prop("disabled", true);//Mờ
        $(".btnluunongho").prop("disabled", false);//mờ
        $(".txtmanongho").val("");
        $(".txttennongho").val("");
        $(".gt").val();
        $(".namsinh").val("");
        $(".sdt").val("");
        $(".email").val("");
        $(".diachi").val("");
        $(".btnupload").val("");
        $(".txtmanongho").focus();
        flagNH = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuanongho").click(function () {
        console.log("click");
        $(".btnthemnongho").prop("disabled", true);
        $(".btnsuanongho").prop("disabled", true);//Mờ
        $(".btnluunongho").prop("disabled", false);//mờ
        flagNH = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluunongho").click(function () {
        if (flagNH == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                manongho: $(".txtmanongho").val(),
                tennongho: $(".txttennongho").val(),
                gt: $(".gt").val(),
                namsinh: $(".namsinh").val(),
                sdt: $(".sdt").val(),
                email: $(".email").val(),
                diachi: $(".diachi").val(),
                urlanh: $(".btnupload").val(),
                event: "insertNH"
            }
            console.log(datasend);
            queryData("php/apiallnongho.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert({
                        message: "Thêm thành công!",
                        size: 'small',
                        buttons: {
                            ok: {
                                label: 'OK',
                                className: 'btn-success'
                            }
                        }
                    });
                    //showDataTableNH();
                    showDataTableNHPage(pagecurrent_nongho, record);
                } else {
                    bootbox.alert({
                        message: "Thêm không thành công!",
                        size: 'small',
                        buttons: {
                            ok: {
                                label: 'OK',
                                className: 'btn-danger'
                            }
                        }
                    });
                }
                $(".txtmanongho").val("");
                $(".txttennongho").val("");
                $(".gt").val();
                $(".namsinh").val("");
                $(".sdt").val("");
                $(".email").val("");
                $(".diachi").val("");
                $(".btnupload").val("");
            });
        } else if (flagNH == 2) { //update
            console.log("update");
            var datasend = {
                manongho: $(".txtmanongho").val(),
                tennongho: $(".txttennongho").val(),
                gt: $(".gt").val(),
                namsinh: $(".namsinh").val(),
                sdt: $(".sdt").val(),
                email: $(".email").val(),
                diachi: $(".diachi").val(),
                urlanh: $(".btnupload").val(),
                event: "updateNH"
            }
            console.log(datasend);
            queryData("php/apiallnongho.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert({
                        message: "Cập nhật thành công!",
                        size: 'small',
                        buttons: {
                            ok: {
                                label: 'OK',
                                className: 'btn-success'
                            }
                        }
                    });
                    // showDataTableNH();
                    showDataTableNHPage(pagecurrent_nongho, record);
                } else {
                    bootbox.alert({
                        message: "Cập nhật không thành công!",
                        size: 'small',
                        buttons: {
                            ok: {
                                label: 'OK',
                                className: 'btn-danger'
                            }
                        }
                    });
                }
                $(".txtmanongho").val("");
                $(".txttennongho").val("");
                $(".gt").val();
                $(".namsinh").val("");
                $(".sdt").val("");
                $(".email").val("");
                $(".diachi").val("");
                $(".btnupload").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlainongho").click(function () {
        $(".txtmanongho").val("");
        $(".txttennongho").val("");
        $(".gt").val();
        $(".namsinh").val("");
        $(".sdt").val("");
        $(".email").val("");
        $(".diachi").val("");
        $(".btnupload").val("");
        flagNH = 0;
        $(".btnthemnongho").prop("disabled", false);//sáng
        $(".btnsuanongho").prop("disabled", false);//Mờ
        $(".btnluunongho").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoanongho").click(function () {
        var ma = $(".txtmanongho").val();
        var ten = $(".txttennongho").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa nông hộ: " + ten.italics().bold() + " này không?",
            buttons: {
                confirm: {
                    label: 'Có',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Không',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log('This was logged in the callback: ' + result);
                if (result == true) {
                    var datasend = {
                        manongho: ma,
                        event: "deleteNH"
                    }
                    queryData("php/apiallnongho.php", datasend, function (res) {
                        console.log(res)
                        if (res.success == 1) {
                            bootbox.alert({
                                message: "Xóa thành công!",
                                size: 'small',
                                buttons: {
                                    ok: {
                                        label: 'OK',
                                        className: 'btn-success'
                                    }
                                }
                            });
                            //showDataTableNH();
                            showDataTableNHPage(pagecurrent_nongho, record);
                        } else {
                            bootbox.alert({
                                message: "Xóa không thành công!",
                                size: 'small',
                                buttons: {
                                    ok: {
                                        label: 'OK',
                                        className: 'btn-danger'
                                    }
                                }
                            });
                        }
                        $(".txtmanongho").val("");
                        $(".txttennongho").val("");
                        $(".gt").val();
                        $(".namsinh").val("");
                        $(".sdt").val("");
                        $(".email").val("");
                        $(".diachi").val("");
                        $(".btnupload").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimnongho").click(function () {
        // showDataTableNH();
        showDataTableNHPage(pagecurrent_nongho, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimnongho").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableNH();
            showDataTableNHPage(pagecurrent_nongho, record);
        }
    })
    //click vaò nút sửa của bảng table NH
    $(".addListNH").on('click', '.btnsuanongho', function () {
        $(".btnthemnongho").prop("disabled", true);
        $(".btnsuanongho").prop("disabled", true);//Mờ
        $(".btnluunongho").prop("disabled", false);//sáng
        flagNH = 2;
        var nongho = $(this).parent().attr("data-nongho");
        $(".txtmanongho").val(arrNH[nongho].manongho);
        $(".txttennongho").val(arrNH[nongho].tennongho);
        $(".gt").val(arrNH[nongho].gt);
        $(".namsinh").val(arrNH[nongho].namsinh);
        $(".sdt").val(arrNH[nongho].sdt);
        $(".email").val(arrNH[nongho].email);
        $(".diachi").val(arrNH[nongho].diachi);
        $(".btnupload").val(arrNH[nongho].urlanh);
        $(".btnsuanongho").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListNH").on('click', '.clickxoanongho', function () {
        var nongho = $(this).parent().attr("data-nongho");
        var ma = arrNH[nongho].manongho;
        var ten = arrNH[nongho].tennongho;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa nông hộ: " + ten.italics().bold() + " này không?",
            buttons: {
                confirm: {
                    label: 'Có',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Không',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log('This was logged in the callback: ' + result);
                if (result == true) {
                    var datasend = {
                        manongho: ma,
                        event: "deleteNH"
                    }
                    queryData("php/apiallnongho.php", datasend, function (res) {
                        console.log(res)
                        if (res.success == 1) {
                            bootbox.alert({
                                message: "Xóa thành công!",
                                size: 'small',
                                buttons: {
                                    ok: {
                                        label: 'OK',
                                        className: 'btn-success'
                                    }
                                }
                            });
                            //showDataTableNH();
                            showDataTableNHPage(pagecurrent_nongho, record);
                        } else {
                            bootbox.alert({
                                message: "Xóa không thành công!",
                                size: 'small',
                                buttons: {
                                    ok: {
                                        label: 'OK',
                                        className: 'btn-danger'
                                    }
                                }
                            });
                        }
                        $(".txtmanongho").val("");
                        $(".txttennongho").val("");
                        $(".gt").val();
                        $(".namsinh").val("");
                        $(".sdt").val("");
                        $(".email").val("");
                        $(".diachi").val("");
                        $(".btnupload").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_nongho = 0;
    $(".numberpagenongho").on('click', 'button', function () {

        pagecurrent_nongho = $(this).val();
        showDataTableNHPage($(this).val(), record);
    })
});
// function showDataTableNH() {
//     var search = $(".txttimnongho").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListNH").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/nongho/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListNH").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrNH = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.manongho + '</td>' +
//                     ' <td>' + d.tennongho + '</td>' +
//                     '<td data-nongho=' + i + ' data-manongho=' + d.manongho + ' data-tennongho="' + d.tennongho + '"><span class="badge bg-danger clickxemnongho">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoanongho"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListNH").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableNHPage(page, record) {
    var search = $(".txttimnongho").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getNHPhanTrang"
    }
    $(".addListNH").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallnongho.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListNH").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagenongho").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrNH = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                var gt = 'Nam';
                if (d.gt == 0) {
                    gt = 'Nữ';
                }
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.manongho + '</td>' +
                    ' <td>' + d.tennongho + '</td>' +
                    ' <td>' + gt + '</td>' +
                    ' <td>' + d.namsinh + '</td>' +
                    ' <td>' + d.sdt + '</td>' +
                    ' <td>' + d.email + '</td>' +
                    ' <td>' + d.diachi + '</td>' +
                    ' <td>' + d.urlanh + '</td>' +
                    '<td data-nongho=' + i + ' data-manongho=' + d.manongho + ' data-tennongho="' + d.tennongho + '" data-gt="' + gt + '" data-namsinh="' + d.namsinh + '" data-sdt="' + d.sdt + '" data-email="' + d.email + '" data-diachi="' + d.diachi + '">' +
                    '<span class="badge btn-outline-dark btnsuanongho"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoanongho"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListNH").html(s);
            buildSlidePage($(".numberpagenongho"), 5, res.page, res.totalpage);
        }
    });
}