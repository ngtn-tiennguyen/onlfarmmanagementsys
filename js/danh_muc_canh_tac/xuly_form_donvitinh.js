var flagDVT = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrDVT = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemdvt").click(function () {
        $(".btnthemdvt").prop("disabled", true);
        $(".btnsuadvt").prop("disabled", true);//Mờ
        $(".btnluudvt").prop("disabled", false);//mờ
        $(".txtmadvt").val("");
        $(".txttendvt").val("");
        $(".txtmadvt").focus();
        flagDVT = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuadvt").click(function () {
        console.log("click");
        $(".btnthemdvt").prop("disabled", true);
        $(".btnsuadvt").prop("disabled", true);//Mờ
        $(".btnluudvt").prop("disabled", false);//mờ
        flagDVT = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluudvt").click(function () {
        if (flagDVT == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                madvt: $(".txtmadvt").val(),
                tendvt: $(".txttendvt").val(),
                event: "insertDVT"
            }
            console.log(datasend);
            queryData("php/apialldvt.php", datasend, function (res) {
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
                    //showDataTableDVT();
                    showDataTableDVTPage(pagecurrent_dvt, record);
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
                $(".txtmadvt").val("");
                $(".txttendvt").val("");
            });
        } else if (flagDVT == 2) { //update
            console.log("update");
            var datasend = {
                madvt: $(".txtmadvt").val(),
                tendvt: $(".txttendvt").val(),
                event: "updateDVT"
            }
            console.log(datasend);
            queryData("php/apialldvt.php", datasend, function (res) {
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
                    // showDataTableDVT();
                    showDataTableDVTPage(pagecurrent_dvt, record);
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
                $(".txtmadvt").val("");
                $(".txttendvt").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaidvt").click(function () {
        $(".txtmadvt").val("");
        $(".txttendvt").val("");
        flagDVT = 0;
        $(".btnthemdvt").prop("disabled", false);//sáng
        $(".btnsuadvt").prop("disabled", false);//Mờ
        $(".btnluudvt").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoadvt").click(function () {
        var ma = $(".txtmadvt").val();
        var ten = $(".txttendvt").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa đơn vị tính: " + ten.italics().bold() + " này không?",
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
                        madvt: ma,
                        event: "deleteDVT"
                    }
                    queryData("php/apialldvt.php", datasend, function (res) {
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
                            //showDataTableDVT();
                            showDataTableDVTPage(pagecurrent_dvt, record);
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
                        $(".txtmadvt").val("");
                        $(".txttendvt").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimdvt").click(function () {
        // showDataTableDVT();
        showDataTableDVTPage(pagecurrent_dvt, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimdvt").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableDVT();
            showDataTableDVTPage(pagecurrent_dvt, record);
        }
    })
    //click vaò nút sửa của bảng table DVT
    $(".addListDVT").on('click', '.btnsuadvt', function () {
        $(".btnthemdvt").prop("disabled", true);
        $(".btnsuadvt").prop("disabled", true);//Mờ
        $(".btnluudvt").prop("disabled", false);//sáng
        flagDVT = 2;
        var dvt = $(this).parent().attr("data-dvt");
        $(".txtmadvt").val(arrDVT[dvt].madvt);
        $(".txttendvt").val(arrDVT[dvt].tendvt);
        $(".btnsuadvt").prop("disabled", false);
    });
    //Nhấn nút xóa
    $(".addListDVT").on('click', '.clickxoadvt', function () {
        var dvt = $(this).parent().attr("data-dvt");
        var ma = arrDVT[dvt].madvt;
        var ten = arrDVT[dvt].tendvt;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa đơn vị tính: " + ten.italics().bold() + " này không?",
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
                        madvt: ma,
                        event: "deleteDVT"
                    }
                    queryData("php/apialldvt.php", datasend, function (res) {
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
                            //showDataTableDVT();
                            showDataTableDVTPage(pagecurrent_dvt, record);
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
                        $(".txtmadvt").val("");
                        $(".txttendvt").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_dvt = 0;
    $(".numberpagedvt").on('click', 'button', function () {

        pagecurrent_dvt = $(this).val();
        showDataTableDVTPage($(this).val(), record);
    })
});
// function showDataTableDVT() {
//     var search = $(".txttimdvt").val();
//     console.log("serach=" + search);
//     var datasend = {
//         search: search
//     }
//     $(".addListDVT").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');

//     queryData("php/dvt/apigetdata.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListDVT").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
//         } else {
//             arrDVT = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     '<td>' + stt + '</td>' +
//                     '<td>' + d.madvt + '</td>' +
//                     ' <td>' + d.tendvt + '</td>' +
//                     '<td data-dvt=' + i + ' data-madvt=' + d.madvt + ' data-tendvt="' + d.tendvt + '"><span class="badge bg-danger clickxemdvt">' +
//                     '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoadvt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListDVT").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableDVTPage(page, record) {
    var search = $(".txttimdvt").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getDVTPhanTrang"
    }
    $(".addListDVT").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apialldvt.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListDVT").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpagedvt").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrDVT = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.madvt + '</td>' +
                    ' <td>' + d.tendvt + '</td>' +
                    '<td data-dvt=' + i + ' data-madvt=' + d.madvt + ' data-tendvt="' + d.tendvt + '">' +
                    '<span class="badge btn-outline-dark btnsuadvt"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoadvt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListDVT").html(s);
            buildSlidePage($(".numberpagedvt"), 5, res.page, res.totalpage);
        }
    });
}
