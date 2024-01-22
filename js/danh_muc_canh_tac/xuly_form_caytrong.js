var flagCTrong = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrCTrong = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemcaytrong").click(function () {
        $(".btnthemcaytrong").prop("disabled", true);
        $(".btnsuacaytrong").prop("disabled", true);//Mờ
        $(".btnluucaytrong").prop("disabled", false);//mờ
        $(".txtmacaytrong").val("");
        $(".txttencaytrong").val("");
        $(".tomtatcaytrong").val("");
        $(".cbnct").val("NULL");
        $(".txtmacaytrong").focus();
        flagCTrong = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuacaytrong").click(function () {
        console.log("click");
        $(".btnthemcaytrong").prop("disabled", true);
        $(".btnsuacaytrong").prop("disabled", true);//Mờ
        $(".btnluucaytrong").prop("disabled", false);//mờ
        flagCTrong = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluucaytrong").click(function () {
        if (flagCTrong == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                macaytrong: $(".txtmacaytrong").val(),
                tencaytrong: $(".txttencaytrong").val(),
                tomtatcaytrong: $(".tomtatcaytrong").val(),
                manhomctrong: $(".cbnct").val(),
                event: "insertCTrong"
            }
            console.log(datasend);
            queryData("php/apiallcaytrong.php", datasend, function (res) {
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
                    //showDataTableCTrong();
                    showDataTableCTrongPage(pagecurrent_caytrong, record);
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
                $(".txtmacaytrong").val("");
                $(".txttencaytrong").val("");
                $(".tomtatcaytrong").val("");
                $(".cbnct").val("NULL");
            });
        } else if (flagCTrong == 2) { //update
            console.log("update");
            var datasend = {
                macaytrong: $(".txtmacaytrong").val(),
                tencaytrong: $(".txttencaytrong").val(),
                tomtatcaytrong: $(".tomtatcaytrong").val(),
                manhomctrong: $(".cbnct").val(),
                event: "updateCTrong"
            }
            console.log(datasend);
            queryData("php/apiallcaytrong.php", datasend, function (res) {
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
                    // showDataTableCTrong();
                    showDataTableCTrongPage(pagecurrent_caytrong, record);
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
                $(".txtmacaytrong").val("");
                $(".txttencaytrong").val("");
                $(".tomtatcaytrong").val("");
                $(".cbnct").val("NULL");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaicaytrong").click(function () {
        $(".txtmacaytrong").val("");
        $(".txttencaytrong").val("");
        $(".tomtatcaytrong").val("");
        $(".cbnct").val("NULL");
        flagCTrong = 0;
        $(".btnthemcaytrong").prop("disabled", false);//sáng
        $(".btnsuacaytrong").prop("disabled", false);//Mờ
        $(".btnluucaytrong").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoacaytrong").click(function () {
        var ma = $(".txtmacaytrong").val();
        var ten = $(".txttencaytrong").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa cây trồng: " + ten.italics().bold() + " này không?",
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
                        macaytrong: ma,
                        event: "deleteCTrong"
                    }
                    queryData("php/apiallcaytrong.php", datasend, function (res) {
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
                            //showDataTableCTrong();
                            showDataTableCTrongPage(pagecurrent_caytrong, record);
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
                        $(".txtmacaytrong").val("");
                        $(".txttencaytrong").val("");
                        $(".tomtatcaytrong").val("");
                        $(".cbnct").val("NULL");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimcaytrong").click(function () {
        // showDataTableCTrong();
        showDataTableCTrongPage(pagecurrent_caytrong, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimcaytrong").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableCTrong();
            showDataTableCTrongPage(pagecurrent_caytrong, record);
        }
    })
    //click vaò nút sửa của bảng table CTrong
    $(".addListCTrong").on('click', '.btnsuacaytrong', function () {
        $(".btnthemcaytrong").prop("disabled", true);
        $(".btnsuacaytrong").prop("disabled", true);//Mờ
        $(".btnluucaytrong").prop("disabled", false);//sáng
        flagCTrong = 2;
        var caytrong = $(this).parent().attr("data-caytrong");
        $(".txtmacaytrong").val(arrCTrong[caytrong].macaytrong);
        $(".txttencaytrong").val(arrCTrong[caytrong].tencaytrong);
        $(".tomtatcaytrong").val(arrCTrong[caytrong].tomtatcaytrong);
        $(".cbnct").val(arrCTrong[caytrong].manhomctrong);
        $(".btnsuacaytrong").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListCTrong").on('click', '.clickxoacaytrong', function () {
        var caytrong = $(this).parent().attr("data-caytrong");
        var ma = arrCTrong[caytrong].macaytrong;
        var ten = arrCTrong[caytrong].tencaytrong;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa cây trồng: " + ten.italics().bold() + " này không?",
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
                        macaytrong: ma,
                        event: "deleteCTrong"
                    }
                    queryData("php/apiallcaytrong.php", datasend, function (res) {
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
                            //showDataTableCTrong();
                            showDataTableCTrongPage(pagecurrent_caytrong, record);
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
                        $(".txtmacaytrong").val("");
                        $(".txttencaytrong").val("");
                        $(".tomtatcaytrong").val("");
                        $(".cbnct").val("NULL");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_caytrong = 0;
    $(".numberpagecaytrong").on('click', 'button', function () {

        pagecurrent_caytrong = $(this).val();
        showDataTableCTrongPage($(this).val(), record);
    })
});
// function showDataTableCTrong() {
//     var search = $(".txttimcaytrong").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListCTrong").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/caytrong/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListCTrong").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrCTrong = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.macaytrong + '</td>' +
//                     ' <td>' + d.tencaytrong + '</td>' +
//                     '<td data-caytrong=' + i + ' data-macaytrong=' + d.macaytrong + ' data-tencaytrong="' + d.tencaytrong + '"><span class="badge bg-danger clickxemcaytrong">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoacaytrong"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListCTrong").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableCTrongPage(page, record) {
    var search = $(".txttimcaytrong").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getCTrongPhanTrang"
    }
    $(".addListCTrong").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallcaytrong.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListCTrong").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagecaytrong").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrCTrong = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.macaytrong + '</td>' +
                    ' <td>' + d.tencaytrong + '</td>' +
                    ' <td>' + d.tennhomctrong + '</td>' +
                    ' <td>' + d.tomtatcaytrong + '</td>' +
                    '<td data-caytrong=' + i + ' data-macaytrong=' + d.macaytrong + ' data-tencaytrong="' + d.tencaytrong + '" data-tomtatcaytrong="' + d.tomtatcaytrong + '" data-tennhomctrong="' + d.tennhomctrong + '">' +
                    '<span class="badge btn-outline-dark btnsuacaytrong"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoacaytrong"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListCTrong").html(s);
            buildSlidePage($(".numberpagecaytrong"), 5, res.page, res.totalpage);
        }
    });
}
// cb nhóm cây trồng
function showCBNCT() {
    var datasend = {
        event: "getALLDataNCT"
    }
    queryData("php/apiallcaytrong.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn nhóm cây trồng</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.manhomctrong + '">' + d.tennhomctrong + '</option>';
        }
        $(".cbnct").html(ht);
    });
}