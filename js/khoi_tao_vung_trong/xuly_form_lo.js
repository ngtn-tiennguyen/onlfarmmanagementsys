var flagLo = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrLo = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemlo").click(function () {
        $(".btnthemlo").prop("disabled", true);
        $(".btnsualo").prop("disabled", true);//Mờ
        $(".btnluulo").prop("disabled", false);//mờ
        $(".txtmalo").val("");
        $(".txttenlo").val("");
        $(".txtdientichlo").val("");
        $(".cbthua").val("NULL");
        $(".txtmalo").focus();
        flagLo = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsualo").click(function () {
        console.log("click");
        $(".btnthemlo").prop("disabled", true);
        $(".btnsualo").prop("disabled", true);//Mờ
        $(".btnluulo").prop("disabled", false);//mờ
        flagLo = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluulo").click(function () {
        if (flagLo == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                malo: $(".txtmalo").val(),
                tenlo: $(".txttenlo").val(),
                dientichlo: $(".txtdientichlo").val(),
                mathua: $(".cbthua").val(),
                event: "insertLo"
            }
            console.log(datasend);
            queryData("php/apialllo.php", datasend, function (res) {
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
                    //showDataTableLo();
                    showDataTableLoPage(pagecurrent_lo, record);
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
                $(".txtmalo").val("");
                $(".txttenlo").val("");
                $(".txtdientichlo").val("");
                $(".cbthua").val("NULL");
            });
        } else if (flagLo == 2) { //update
            console.log("update");
            var datasend = {
                malo: $(".txtmalo").val(),
                tenlo: $(".txttenlo").val(),
                dientichlo: $(".txtdientichlo").val(),
                mathua: $(".cbthua").val(),
                event: "updateLo"
            }
            console.log(datasend);
            queryData("php/apialllo.php", datasend, function (res) {
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
                    // showDataTableLo();
                    showDataTableLoPage(pagecurrent_lo, record);
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
                $(".txtmalo").val("");
                $(".txttenlo").val("");
                $(".txtdientichlo").val("");
                $(".cbthua").val("NULL");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlailo").click(function () {
        $(".txtmalo").val("");
        $(".txttenlo").val("");
        $(".txtdientichlo").val("");
        $(".cbthua").val("NULL");
        flagLo = 0;
        $(".btnthemlo").prop("disabled", false);//sáng
        $(".btnsualo").prop("disabled", false);//Mờ
        $(".btnluulo").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoalo").click(function () {
        var ma = $(".txtmalo").val();
        var ten = $(".txttenlo").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa lô: " + ten.italics().bold() + " này không?",
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
                        malo: ma,
                        event: "deleteLo"
                    }
                    queryData("php/apialllo.php", datasend, function (res) {
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
                            //showDataTableLo();
                            showDataTableLoPage(pagecurrent_lo, record);
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
                        $(".txtmalo").val("");
                        $(".txttenlo").val("");
                        $(".txtdientichlo").val("");
                        $(".cbthua").val("NULL");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimlo").click(function () {
        // showDataTableLo();
        showDataTableLoPage(pagecurrent_lo, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimlo").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableLo();
            showDataTableLoPage(pagecurrent_lo, record);
        }
    })
    //click vaò nút sửa của bảng table Lo
    $(".addListLo").on('click', '.btnsualo', function () {
        $(".btnthemlo").prop("disabled", true);
        $(".btnsualo").prop("disabled", true);//Mờ
        $(".btnluulo").prop("disabled", false);//sáng
        flagLo = 2;
        var lo = $(this).parent().attr("data-lo");
        $(".txtmalo").val(arrLo[lo].malo);
        $(".txttenlo").val(arrLo[lo].tenlo);
        $(".txtdientichlo").val(arrLo[lo].dientichlo);
        $(".cbthua").val(arrLo[lo].mathua);
        $(".btnsualo").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListLo").on('click', '.clickxoalo', function () {
        var lo = $(this).parent().attr("data-lo");
        var ma = arrLo[lo].malo;
        var ten = arrLo[lo].tenlo;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa lô: " + ten.italics().bold() + " này không?",
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
                        malo: ma,
                        event: "deleteLo"
                    }
                    queryData("php/apialllo.php", datasend, function (res) {
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
                            //showDataTableLo();
                            showDataTableLoPage(pagecurrent_lo, record);
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
                        $(".txtmalo").val("");
                        $(".txttenlo").val("");
                        $(".txtdientichlo").val("");
                        $(".cbthua").val("NULL");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_lo = 0;
    $(".numberpagelo").on('click', 'button', function () {

        pagecurrent_lo = $(this).val();
        showDataTableLoPage($(this).val(), record);
    })
});
// function showDataTableLo() {
//     var search = $(".txttimlo").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListLo").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/lo/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListLo").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrLo = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.malo + '</td>' +
//                     ' <td>' + d.tenlo + '</td>' +
//                     '<td data-lo=' + i + ' data-malo=' + d.malo + ' data-tenlo="' + d.tenlo + '"><span class="badge bg-danger clickxemlo">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoalo"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListLo").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableLoPage(page, record) {
    var search = $(".txttimlo").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getLoPhanTrang"
    }
    $(".addListLo").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apialllo.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListLo").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagelo").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrLo = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.malo + '</td>' +
                    ' <td>' + d.tenlo + '</td>' +
                    ' <td>' + d.dientichlo + '</td>' +
                    ' <td>' + d.tenthua + '</td>' +
                    '<td data-lo=' + i + ' data-malo=' + d.malo + ' data-tenlo="' + d.tenlo + '" data-dientichlolo="' + d.dientichlo + '" data-tenthua="' + d.tenthua + '">' +
                    '<span class="badge btn-outline-dark btnsualo"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoalo"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListLo").html(s);
            buildSlidePage($(".numberpagelo"), 5, res.page, res.totalpage);
        }
    });
}
// cb thửa
function showCBThua() {
    var datasend = {
        event: "getALLDataThua"
    }
    queryData("php/apialllo.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn thửa</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.mathua + '">' + d.tenthua + '</option>';
        }
        $(".cbthua").html(ht);
    });
}