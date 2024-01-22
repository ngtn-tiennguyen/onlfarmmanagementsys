var flagCDoan = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrCDoan = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemcongdoan").click(function () {
        $(".btnthemcongdoan").prop("disabled", true);
        $(".btnsuacongdoan").prop("disabled", true);//Mờ
        $(".btnluucongdoan").prop("disabled", false);//mờ
        $(".txtmacongdoan").val("");
        $(".txttencongdoan").val("");
        $(".txtmacongdoan").focus();
        flagCDoan = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuacongdoan").click(function () {
        console.log("click");
        $(".btnthemcongdoan").prop("disabled", true);
        $(".btnsuacongdoan").prop("disabled", true);//Mờ
        $(".btnluucongdoan").prop("disabled", false);//mờ
        flagCDoan = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluucongdoan").click(function () {
        if (flagCDoan == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                macongdoan: $(".txtmacongdoan").val(),
                tencongdoan: $(".txttencongdoan").val(),
                event: "insertCDoan"
            }
            console.log(datasend);
            queryData("php/apiallcongdoan.php", datasend, function (res) {
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
                    //showDataTableCDoan();
                    showDataTableCDoanPage(pagecurrent_congdoan, record);
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
                $(".txtmacongdoan").val("");
                $(".txttencongdoan").val("");
            });
        } else if (flagCDoan == 2) { //update
            console.log("update");
            var datasend = {
                macongdoan: $(".txtmacongdoan").val(),
                tencongdoan: $(".txttencongdoan").val(),
                event: "updateCDoan"
            }
            console.log(datasend);
            queryData("php/apiallcongdoan.php", datasend, function (res) {
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
                    // showDataTableCDoan();
                    showDataTableCDoanPage(pagecurrent_congdoan, record);
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
                $(".txtmacongdoan").val("");
                $(".txttencongdoan").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaicongdoan").click(function () {
        $(".txtmacongdoan").val("");
        $(".txttencongdoan").val("");
        flagCDoan = 0;
        $(".btnthemcongdoan").prop("disabled", false);//sáng
        $(".btnsuacongdoan").prop("disabled", false);//Mờ
        $(".btnluucongdoan").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoacongdoan").click(function () {
        var ma = $(".txtmacongdoan").val();
        var ten = $(".txttencongdoan").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa công đoạn: " + ten.italics().bold() + " này không?",
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
                        macongdoan: ma,
                        event: "deleteCDoan"
                    }
                    queryData("php/apiallcongdoan.php", datasend, function (res) {
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
                            //showDataTableCDoan();
                            showDataTableCDoanPage(pagecurrent_congdoan, record);
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
                        $(".txtmacongdoan").val("");
                        $(".txttencongdoan").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimcongdoan").click(function () {
        // showDataTableCDoan();
        showDataTableCDoanPage(pagecurrent_congdoan, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimcongdoan").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableCDoan();
            showDataTableCDoanPage(pagecurrent_congdoan, record);
        }
    })
    //click vaò nút sửa của bảng table CDoan
    $(".addListCDoan").on('click', '.btnsuacongdoan', function () {
        $(".btnthemcongdoan").prop("disabled", true);
        $(".btnsuacongdoan").prop("disabled", true);//Mờ
        $(".btnluucongdoan").prop("disabled", false);//sáng
        flagCDoan = 2;
        var congdoan = $(this).parent().attr("data-congdoan");
        $(".txtmacongdoan").val(arrCDoan[congdoan].macongdoan);
        $(".txttencongdoan").val(arrCDoan[congdoan].tencongdoan);
        $(".btnsuacongdoan").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListCDoan").on('click', '.clickxoacongdoan', function () {
        var congdoan = $(this).parent().attr("data-congdoan");
        var ma = arrCDoan[congdoan].macongdoan;
        var ten = arrCDoan[congdoan].tencongdoan;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa công đoạn: " + ten.italics().bold() + " này không?",
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
                        macongdoan: ma,
                        event: "deleteCDoan"
                    }
                    queryData("php/apiallcongdoan.php", datasend, function (res) {
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
                            //showDataTableCDoan();
                            showDataTableCDoanPage(pagecurrent_congdoan, record);
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
                        $(".txtmacongdoan").val("");
                        $(".txttencongdoan").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_congdoan = 0;
    $(".numberpagecongdoan").on('click', 'button', function () {

        pagecurrent_congdoan = $(this).val();
        showDataTableCDoanPage($(this).val(), record);
    })
});
// function showDataTableCDoan() {
//     var search = $(".txttimcongdoan").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListCDoan").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/congdoan/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListCDoan").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrCDoan = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.macongdoan + '</td>' +
//                     ' <td>' + d.tencongdoan + '</td>' +
//                     '<td data-congdoan=' + i + ' data-macongdoan=' + d.macongdoan + ' data-tencongdoan="' + d.tencongdoan + '"><span class="badge bg-danger clickxemcongdoan">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoacongdoan"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListCDoan").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableCDoanPage(page, record) {
    var search = $(".txttimcongdoan").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getCDoanPhanTrang"
    }
    $(".addListCDoan").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallcongdoan.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListCDoan").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagecongdoan").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrCDoan = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.macongdoan + '</td>' +
                    ' <td>' + d.tencongdoan + '</td>' +
                    '<td data-congdoan=' + i + ' data-macongdoan=' + d.macongdoan + ' data-tencongdoan="' + d.tencongdoan + '">' +
                    '<span class="badge btn-outline-dark btnsuacongdoan"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoacongdoan"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListCDoan").html(s);
            buildSlidePage($(".numberpagecongdoan"), 5, res.page, res.totalpage);
        }
    });
}
