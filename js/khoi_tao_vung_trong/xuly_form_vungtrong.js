var flagVT = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrVT = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemvt").click(function () {
        $(".btnthemvt").prop("disabled", true);
        $(".btnsuavt").prop("disabled", true);//Mờ
        $(".btnluuvt").prop("disabled", false);//mờ
        $(".txtmavt").val("");
        $(".txttenvt").val("");
        $(".txtdientichvt").val("");
        $(".txttinhtp").val("");
        $(".txtmavt").focus();
        flagVT = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuavt").click(function () {
        console.log("click");
        $(".btnthemvt").prop("disabled", true);
        $(".btnsuavt").prop("disabled", true);//Mờ
        $(".btnluuvt").prop("disabled", false);//mờ
        flagVT = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluuvt").click(function () {
        if (flagVT == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                mavt: $(".txtmavt").val(),
                tenvt: $(".txttenvt").val(),
                dientichvt: $(".txtdientichvt").val(),
                tinhtp: $(".txttinhtp").val(),
                event: "insertVT"
            }
            console.log(datasend);
            queryData("php/apiallvt.php", datasend, function (res) {
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
                    //showDataTableVT();
                    showDataTableVTPage(pagecurrent_vt, record);
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
                $(".txtmavt").val("");
                $(".txttenvt").val("");
                $(".txtdientichvt").val("");
                $(".txttinhtp").val("");
            });
        } else if (flagVT == 2) { //update
            console.log("update");
            var datasend = {
                mavt: $(".txtmavt").val(),
                tenvt: $(".txttenvt").val(),
                dientichvt: $(".txtdientichvt").val(),
                tinhtp: $(".txttinhtp").val(),
                event: "updateVT"
            }
            console.log(datasend);
            queryData("php/apiallvt.php", datasend, function (res) {
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
                    // showDataTableVT();
                    showDataTableVTPage(pagecurrent_vt, record);
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
                $(".txtmavt").val("");
                $(".txttenvt").val("");
                $(".txtdientichvt").val("");
                $(".txttinhtp").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaivt").click(function () {
        $(".txtmavt").val("");
        $(".txttenvt").val("");
        $(".txtdientichvt").val("");
        $(".txttinhtp").val("");
        flagVT = 0;
        $(".btnthemvt").prop("disabled", false);//sáng
        $(".btnsuavt").prop("disabled", false);//Mờ
        $(".btnluuvt").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoavt").click(function () {
        var ma = $(".txtmavt").val();
        var ten = $(".txttenvt").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa vùng trồng: " + ten.italics().bold() + " này không?",
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
                        mavt: ma,
                        event: "deleteVT"
                    }
                    queryData("php/apiallvt.php", datasend, function (res) {
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
                            //showDataTableVT();
                            showDataTableVTPage(pagecurrent_vt, record);
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
                        $(".txtmavt").val("");
                        $(".txttenvt").val("");
                        $(".txtdientichvt").val("");
                        $(".txttinhtp").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimvt").click(function () {
        // showDataTableVT();
        showDataTableVTPage(pagecurrent_vt, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimvt").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableVT();
            showDataTableVTPage(pagecurrent_vt, record);
        }
    })
    //click vaò nút sửa của bảng table VT
    $(".addListVT").on('click', '.btnsuavt', function () {
        $(".btnthemvt").prop("disabled", true);
        $(".btnsuavt").prop("disabled", true);//Mờ
        $(".btnluuvt").prop("disabled", false);//sáng
        flagVT = 2;
        var vt = $(this).parent().attr("data-vt");
        $(".txtmavt").val(arrVT[vt].mavt);
        $(".txttenvt").val(arrVT[vt].tenvt);
        $(".txtdientichvt").val(arrVT[vt].dientichvt);
        $(".txttinhtp").val(arrVT[vt].tinhtp);
        $(".btnsuavt").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListVT").on('click', '.clickxoavt', function () {
        var vt = $(this).parent().attr("data-vt");
        var ma = arrVT[vt].mavt;
        var ten = arrVT[vt].tenvt;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa vùng trồng: " + ten.italics().bold() + " này không?",
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
                        mavt: ma,
                        event: "deleteVT"
                    }
                    queryData("php/apiallvt.php", datasend, function (res) {
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
                            //showDataTableVT();
                            showDataTableVTPage(pagecurrent_vt, record);
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
                        $(".txtmavt").val("");
                        $(".txttenvt").val("");
                        $(".txtdientichvt").val("");
                        $(".txttinhtp").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_vt = 0;
    $(".numberpagevt").on('click', 'button', function () {

        pagecurrent_vt = $(this).val();
        showDataTableVTPage($(this).val(), record);
    })
});
// function showDataTableVT() {
//     var search = $(".txttimvt").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListVT").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/vt/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListVT").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrVT = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.mavt + '</td>' +
//                     ' <td>' + d.tenvt + '</td>' +
//                     '<td data-vt=' + i + ' data-mavt=' + d.mavt + ' data-tenvt="' + d.tenvt + '"><span class="badge bg-danger clickxemvt">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoavt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListVT").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableVTPage(page, record) {
    var search = $(".txttimvt").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getVTPhanTrang"
    }
    $(".addListVT").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallvt.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListVT").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagevt").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrVT = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.mavt + '</td>' +
                    ' <td>' + d.tenvt + '</td>' +
                    ' <td>' + d.dientichvt + '</td>' +
                    ' <td>' + d.tinhtp + '</td>' +
                    '<td data-vt=' + i + ' data-mavt=' + d.mavt + ' data-tenvt="' + d.tenvt + '" data-tinhtp="' + d.tinhtp + '" data-dientichvtvt="' + d.dientichvt + '">' +
                    '<span class="badge btn-outline-dark btnsuavt"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoavt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListVT").html(s);
            buildSlidePage($(".numberpagevt"), 5, res.page, res.totalpage);
        }
    });
}
