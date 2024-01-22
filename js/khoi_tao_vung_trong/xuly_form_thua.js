var flagThua = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrThua = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemthua").click(function () {
        $(".btnthemthua").prop("disabled", true);
        $(".btnsuathua").prop("disabled", true);//Mờ
        $(".btnluuthua").prop("disabled", false);//mờ
        $(".txtmathua").val("");
        $(".txttenthua").val("");
        $(".txtdientichthua").val("");
        $(".cbvtbythua").val("NULL");
        $(".txtmathua").focus();
        flagThua = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuathua").click(function () {
        console.log("click");
        $(".btnthemthua").prop("disabled", true);
        $(".btnsuathua").prop("disabled", true);//Mờ
        $(".btnluuthua").prop("disabled", false);//mờ
        flagThua = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluuthua").click(function () {
        if (flagThua == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                mathua: $(".txtmathua").val(),
                tenthua: $(".txttenthua").val(),
                dientichthua: $(".txtdientichthua").val(),
                mavt: $(".cbvtbythua").val(),
                event: "insertThua"
            }
            console.log(datasend);
            queryData("php/apiallthua.php", datasend, function (res) {
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
                    //showDataTableThua();
                    showDataTableThuaPage(pagecurrent_thua, record);
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
                $(".txtmathua").val("");
                $(".txttenthua").val("");
                $(".txtdientichthua").val("");
                $(".cbvtbythua").val("NULL");
            });
        } else if (flagThua == 2) { //update
            console.log("update");
            var datasend = {
                mathua: $(".txtmathua").val(),
                tenthua: $(".txttenthua").val(),
                dientichthua: $(".txtdientichthua").val(),
                mavt: $(".cbvtbythua").val(),
                event: "updateThua"
            }
            console.log(datasend);
            queryData("php/apiallthua.php", datasend, function (res) {
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
                    // showDataTableThua();
                    showDataTableThuaPage(pagecurrent_thua, record);
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
                $(".txtmathua").val("");
                $(".txttenthua").val("");
                $(".txtdientichthua").val("");
                $(".cbvtbythua").val("NULL");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaithua").click(function () {
        $(".txtmathua").val("");
        $(".txttenthua").val("");
        $(".txtdientichthua").val("");
        $(".cbvtbythua").val("NULL");
        flagThua = 0;
        $(".btnthemthua").prop("disabled", false);//sáng
        $(".btnsuathua").prop("disabled", false);//Mờ
        $(".btnluuthua").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoathua").click(function () {
        var ma = $(".txtmathua").val();
        var ten = $(".txttenthua").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa thửa: " + ten.italics().bold() + " này không?",
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
                        mathua: ma,
                        event: "deleteThua"
                    }
                    queryData("php/apiallthua.php", datasend, function (res) {
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
                            //showDataTableThua();
                            showDataTableThuaPage(pagecurrent_thua, record);
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
                        $(".txtmathua").val("");
                        $(".txttenthua").val("");
                        $(".txtdientichthua").val("");
                        $(".cbvtbythua").val("NULL");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimthua").click(function () {
        // showDataTableThua();
        showDataTableThuaPage(pagecurrent_thua, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimthua").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableThua();
            showDataTableThuaPage(pagecurrent_thua, record);
        }
    })
    //click vaò nút sửa của bảng table Thua
    $(".addListThua").on('click', '.btnsuathua', function () {
        $(".btnthemthua").prop("disabled", true);
        $(".btnsuathua").prop("disabled", true);//Mờ
        $(".btnluuthua").prop("disabled", false);//sáng
        flagThua = 2;
        var thua = $(this).parent().attr("data-thua");
        $(".txtmathua").val(arrThua[thua].mathua);
        $(".txttenthua").val(arrThua[thua].tenthua);
        $(".txtdientichthua").val(arrThua[thua].dientichthua);
        $(".cbvtbythua").val(arrThua[thua].mavt);
        $(".btnsuathua").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListThua").on('click', '.clickxoathua', function () {
        var thua = $(this).parent().attr("data-thua");
        var ma = arrThua[thua].mathua;
        var ten = arrThua[thua].tenthua;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa thửa: " + ten.italics().bold() + " này không?",
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
                        mathua: ma,
                        event: "deleteThua"
                    }
                    queryData("php/apiallthua.php", datasend, function (res) {
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
                            //showDataTableThua();
                            showDataTableThuaPage(pagecurrent_thua, record);
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
                        $(".txtmathua").val("");
                        $(".txttenthua").val("");
                        $(".txtdientichthua").val("");
                        $(".cbvtbythua").val("NULL");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_thua = 0;
    $(".numberpagethua").on('click', 'button', function () {

        pagecurrent_thua = $(this).val();
        showDataTableThuaPage($(this).val(), record);
    })
});
// function showDataTableThua() {
//     var search = $(".txttimthua").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListThua").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/thua/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListThua").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrThua = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.mathua + '</td>' +
//                     ' <td>' + d.tenthua + '</td>' +
//                     '<td data-thua=' + i + ' data-mathua=' + d.mathua + ' data-tenthua="' + d.tenthua + '"><span class="badge bg-danger clickxemthua">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoathua"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListThua").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableThuaPage(page, record) {
    var search = $(".txttimthua").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getThuaPhanTrang"
    }
    $(".addListThua").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallthua.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListThua").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagethua").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrThua = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.mathua + '</td>' +
                    ' <td>' + d.tenthua + '</td>' +
                    ' <td>' + d.dientichthua + '</td>' +
                    ' <td>' + d.tenvt + '</td>' +
                    '<td data-thua=' + i + ' data-mathua=' + d.mathua + ' data-tenthua="' + d.tenthua + '" data-vungtrong="' + d.vungtrong + '" data-dientichthuathua="' + d.dientichthua + '" data-tenvungtrong="' + d.tenvt + '">' +
                    '<span class="badge btn-outline-dark btnsuathua"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoathua"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListThua").html(s);
            buildSlidePage($(".numberpagethua"), 5, res.page, res.totalpage);
        }
    });
}
// cb vùng trồng
function showCBVT() {
    var datasend = {
        event: "getALLDataVT"
    }
    queryData("php/apiallthua.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn vùng trồng</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.mavt + '">' + d.tenvt + '</option>';
        }
        $(".cbvtbythua").html(ht);
    });
}