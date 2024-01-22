var flagNCTrong = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrNCTrong = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemnhomctrong").click(function () {
        $(".btnthemnhomctrong").prop("disabled", true);
        $(".btnsuanhomctrong").prop("disabled", true);//Mờ
        $(".btnluunhomctrong").prop("disabled", false);//mờ
        $(".txtmanhomctrong").val("");
        $(".txttennhomctrong").val("");
        $(".motanhomctrong").val("");
        $(".txtmanhomctrong").focus();
        flagNCTrong = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuanhomctrong").click(function () {
        console.log("click");
        $(".btnthemnhomctrong").prop("disabled", true);
        $(".btnsuanhomctrong").prop("disabled", true);//Mờ
        $(".btnluunhomctrong").prop("disabled", false);//mờ
        flagNCTrong = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluunhomctrong").click(function () {
        if (flagNCTrong == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                manhomctrong: $(".txtmanhomctrong").val(),
                tennhomctrong: $(".txttennhomctrong").val(),
                motanhomctrong: $(".motanhomctrong").val(),
                event: "insertNCTrong"
            }
            console.log(datasend);
            queryData("php/apiallnhomctrong.php", datasend, function (res) {
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
                    //showDataTableNCTrong();
                    showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
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
                $(".txtmanhomctrong").val("");
                $(".txttennhomctrong").val("");
                $(".motanhomctrong").val("");
            });
        } else if (flagNCTrong == 2) { //update
            console.log("update");
            var datasend = {
                manhomctrong: $(".txtmanhomctrong").val(),
                tennhomctrong: $(".txttennhomctrong").val(),
                motanhomctrong: $(".motanhomctrong").val(),
                event: "updateNCTrong"
            }
            console.log(datasend);
            queryData("php/apiallnhomctrong.php", datasend, function (res) {
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
                    // showDataTableNCTrong();
                    showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
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
                $(".txtmanhomctrong").val("");
                $(".txttennhomctrong").val("");
                $(".motanhomctrong").val("");
                $(".cbvt").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlainhomctrong").click(function () {
        $(".txtmanhomctrong").val("");
        $(".txttennhomctrong").val("");
        $(".motanhomctrong").val("");
        $(".cbvt").val();
        flagNCTrong = 0;
        $(".btnthemnhomctrong").prop("disabled", false);//sáng
        $(".btnsuanhomctrong").prop("disabled", false);//Mờ
        $(".btnluunhomctrong").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoanhomctrong").click(function () {
        var ma = $(".txtmanhomctrong").val();
        var ten = $(".txttennhomctrong").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa nhóm cây trồng: " + ten.italics().bold() + " này không?",
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
                        manhomctrong: ma,
                        event: "deleteNCTrong"
                    }
                    queryData("php/apiallnhomctrong.php", datasend, function (res) {
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
                            //showDataTableNCTrong();
                            showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
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
                        $(".txtmanhomctrong").val("");
                        $(".txttennhomctrong").val("");
                        $(".motanhomctrong").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimnhomctrong").click(function () {
        // showDataTableNCTrong();
        showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimnhomctrong").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableNCTrong();
            showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
        }
    })
    //click vaò nút sửa của bảng table NCT
    $(".addListNCTrong").on('click', '.btnsuanhomctrong', function () {
        $(".btnthemnhomctrong").prop("disabled", true);
        $(".btnsuanhomctrong").prop("disabled", true);//Mờ
        $(".btnluunhomctrong").prop("disabled", false);//sáng
        flagNCTrong = 2;
        var nhomctrong = $(this).parent().attr("data-nhomctrong");
        $(".txtmanhomctrong").val(arrNCTrong[nhomctrong].manhomctrong);
        $(".txttennhomctrong").val(arrNCTrong[nhomctrong].tennhomctrong);
        $(".motanhomctrong").val(arrNCTrong[nhomctrong].motanhomctrong);
        $(".btnsuanhomctrong").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListNCTrong").on('click', '.clickxoanhomctrong', function () {
        var nhomctrong = $(this).parent().attr("data-nhomctrong");
        var ma = arrNCTrong[nhomctrong].manhomctrong;
        var ten = arrNCTrong[nhomctrong].tennhomctrong;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa nhóm cây trồng: " + ten.italics().bold() + " này không?",
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
                        manhomctrong: ma,
                        event: "deleteNCTrong"
                    }
                    queryData("php/apiallnhomctrong.php", datasend, function (res) {
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
                            //showDataTableNCTrong();
                            showDataTableNCTrongPage(pagecurrent_nhomctrong, record);
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
                        $(".txtmanhomctrong").val("");
                        $(".txttennhomctrong").val("");
                        $(".motanhomctrong").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_nhomctrong = 0;
    $(".numberpagenhomctrong").on('click', 'button', function () {

        pagecurrent_nhomctrong = $(this).val();
        showDataTableNCTrongPage($(this).val(), record);
    })
});
// function showDataTableNCTrong() {
//     var search = $(".txttimnhomctrong").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListNCTrong").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/nhomctrong/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListNCTrong").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrNCTrong = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.manhomctrong + '</td>' +
//                     ' <td>' + d.tennhomctrong + '</td>' +
//                     '<td data-nhomctrong=' + i + ' data-manhomctrong=' + d.manhomctrong + ' data-tennhomctrong="' + d.tennhomctrong + '"><span class="badge bg-danger clickxemnhomctrong">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoanhomctrong"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListNCTrong").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableNCTrongPage(page, record) {
    var search = $(".txttimnhomctrong").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getNCTrongPhanTrang"
    }
    $(".addListNCTrong").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallnhomctrong.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListNCTrong").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagenhomctrong").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrNCTrong = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.manhomctrong + '</td>' +
                    ' <td>' + d.tennhomctrong + '</td>' +
                    ' <td>' + d.motanhomctrong + '</td>' +
                    '<td data-nhomctrong=' + i + ' data-manhomctrong=' + d.manhomctrong + ' data-tennhomctrong="' + d.tennhomctrong + '" data-motanhomctrongnhomctrong="' + d.motanhomctrong + '">' +
                    '<span class="badge btn-outline-dark btnsuanhomctrong"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoanhomctrong"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListNCTrong").html(s);
            buildSlidePage($(".numberpagenhomctrong"), 5, res.page, res.totalpage);
        }
    });
}
