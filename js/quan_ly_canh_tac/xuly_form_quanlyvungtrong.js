var flagQLVT = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrQLVT = [];
$(document).ready(function () {
    // button thêm
    $(".btnthemqlvt").click(function () {
        $(".btnthemqlvt").prop("disabled", true);//mờ
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", false);//sáng
        $(".maqlvt").val("");
        $(".manhql").val("");
        $(".cbvtbyqlvt").val("NULL");
        $(".cbthuabyvt").val("NULL");
        $(".cblobythua").val("NULL");
        $(".cbnctbyqlvt").val();
        $(".cbctbynct").val("NULL");
        $(".soluong").val("");
        $(".cbdvt").val("NULL");
        $(".cbcongdoanbyvt").val("NULL");
        $(".ngaybd").val("");
        $(".ngaykt").val("");
        $(".maqlvt").focus();
        flagQLVT = 1;
        /* 
         */
    })
    // button sửa
    $(".btnsuaqlvt").click(function () {
        console.log("click");
        $(".btnthemqlvt").prop("disabled", true);
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", false);//sáng
        flagQLVT = 2;
        /* 
         */
    })
    // button lưu
    $(".btnluuqlvt").click(function () {
        if (flagQLVT == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                maqlvt: $(".maqlvt").val(),
                manongho: $(".manhql").val(),
                mavt: $(".cbvtbyqlvt").val(),
                mathua: $(".cbthuabyvt").val(),
                malo: $(".cblobythua").val(),
                manhomctrong: $(".cbnctbyqlvt").val(),
                macaytrong: $(".cbctbynct").val(),
                madvt: $(".cbdvt").val(),
                macongdoan: $(".cbcongdoanbyvt").val(),
                soluong: $(".soluong").val(),
                ngaybd: $(".ngaybd").val(),
                ngaykt: $(".ngaykt").val(),
                event: "insertQLVT"
            }
            console.log(datasend);
            queryData("php/apiallqlvt.php", datasend, function (res) {
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
                    //showDataTableQLVT();
                    showDataTableQLVTPage(pagecurrent_qlvt, record);
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
                $(".maqlvt").val("");
                $(".manhql").val("");
                $(".cbvtbyqlvt").val("NULL");
                $(".cbthuabyvt").val("NULL");
                $(".cblobythua").val("NULL");
                $(".cbnctbyqlvt").val();
                $(".cbctbynct").val("NULL");
                $(".soluong").val("");
                $(".cbdvt").val("NULL");
                $(".cbcongdoanbyvt").val("NULL");
                $(".ngaybd").val("");
                $(".ngaykt").val("");
            });
        } else if (flagQLVT == 2) { //update
            console.log("update");
            var datasend = {
                maqlvt: $(".maqlvt").val(),
                manongho: $(".manhql").val(),
                mavt: $(".cbvtbyqlvt").val(),
                mathua: $(".cbthuabyvt").val(),
                malo: $(".cblobythua").val(),
                manhomctrong: $(".cbnctbyqlvt").val(),
                macaytrong: $(".cbctbynct").val(),
                madvt: $(".cbdvt").val(),
                macongdoan: $(".cbcongdoanbyvt").val(),
                soluong: $(".soluong").val(),
                ngaybd: $(".ngaybd").val(),
                ngaykt: $(".ngaykt").val(),
                event: "updateQLVT"
            }
            console.log(datasend);
            queryData("php/apiallqlvt.php", datasend, function (res) {
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
                    // showDataTableQLVT();
                    showDataTableQLVTPage(pagecurrent_qlvt, record);
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
                $(".maqlvt").val("");
                $(".manhql").val("");
                $(".cbvtbyqlvt").val("NULL");
                $(".cbthuabyvt").val("NULL");
                $(".cblobythua").val("NULL");
                $(".cbnctbyqlvt").val("NULL");
                $(".cbctbynct").val("NULL");
                $(".soluong").val("");
                $(".cbdvt").val("NULL");
                $(".cbcongdoanbyvt").val("NULL");
                $(".ngaybd").val("");
                $(".ngaykt").val("");
            });
        }
    })
    //bắt sự kiện nhấn button làm lại
    $(".btnlamlaiqlvt").click(function () {
        $(".maqlvt").val("");
        $(".manhql").val("");
        $(".cbvtbyqlvt").val("NULL");
        $(".cbthuabyvt").val("NULL");
        $(".cblobythua").val("NULL");
        $(".cbnctbyqlvt").val("NULL");
        $(".cbctbynct").val("NULL");
        $(".soluong").val("");
        $(".cbdvt").val("NULL");
        $(".cbcongdoanbyvt").val("NULL");
        $(".ngaybd").val("");
        $(".ngaykt").val("");
        flagQLVT = 0;
        $(".btnthemqlvt").prop("disabled", false);//sáng
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", true);//mờ
    });
    //Nhấn vào button xóa
    $(".btnxoaqlvt").click(function () {
        var ma = $(".maqlvt").val();
        bootbox.confirm({
            message: "Bạn có đồng ý xóa mã vùng trồng: " + ma.italics().bold() + " này không?",
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
                        maqlvt: ma,
                        event: "deleteQLVT"
                    }
                    queryData("php/apiallqlvt.php", datasend, function (res) {
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
                            //showDataTableQLVT();
                            showDataTableQLVTPage(pagecurrent_qlvt, record);
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
                        $(".maqlvt").val("");
                        $(".manhql").val("");
                        $(".cbvtbyqlvt").val("NULL");
                        $(".cbthuabyvt").val("NULL");
                        $(".cblobythua").val("NULL");
                        $(".cbnctbyqlvt").val("NULL");
                        $(".cbctbynct").val("NULL");
                        $(".soluong").val("");
                        $(".cbdvt").val("NULL");
                        $(".cbcongdoanbyvt").val("NULL");
                        $(".ngaybd").val("");
                        $(".ngaykt").val("");
                    });
                }
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimqlvt").click(function () {
        // showDataTableQLVT();
        showDataTableQLVTPage(pagecurrent_qlvt, record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimqlvt").keyup(function (e) {
        if (e.which == 13) { //13: Enter
            //  showDataTableQLVT();
            showDataTableQLVTPage(pagecurrent_qlvt, record);
        }
    })
    //click vaò nút sửa của bảng table qlvt
    $(".addListQLVT").on('click', '.btnsuaqlvt', function () {
        $(".btnthemqlvt").prop("disabled", true);
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", false);//sáng
        flagQLVT = 2;
        var qlvt = $(this).parent().attr("data-qlvt");
        $(".maqlvt").val(arrQLVT[qlvt].maqlvt);
        $(".manhql").val(arrQLVT[qlvt].manongho);
        $(".cbvtbyqlvt").val(arrQLVT[qlvt].mavt);
        $(".cbthuabyvt").val(arrQLVT[qlvt].mathua);
        $(".cblobythua").val(arrQLVT[qlvt].malo);
        $(".cbnctbyqlvt").val(arrQLVT[qlvt].manhomctrong);
        $(".cbctbynct").val(arrQLVT[qlvt].macaytrong);
        $(".soluong").val(arrQLVT[qlvt].soluong);
        $(".cbdvt").val(arrQLVT[qlvt].madvt);
        $(".cbcongdoanbyvt").val(arrQLVT[qlvt].macongdoan);
        $(".ngaybd").val(arrQLVT[qlvt].ngaybd);
        $(".ngaykt").val(arrQLVT[qlvt].ngaykt);
        $(".btnsuaqlvt").prop("disabled", true);
    });
    //Nhấn nút xóa
    $(".addListQLVT").on('click', '.clickxoaqlvt', function () {
        var qlvt = $(this).parent().attr("data-qlvt");
        var ma = arrQLVT[qlvt].maqlvt;
        bootbox.confirm({
            message: "Bạn có đồng ý xóa mã vùng trồng: " + ma.italics().bold() + " này không?",
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
                        maqlvt: ma,
                        event: "deleteQLVT"
                    }
                    queryData("php/apiallqlvt.php", datasend, function (res) {
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
                            //showDataTableQLVT();
                            showDataTableQLVTPage(pagecurrent_qlvt, record);
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
                        $(".maqlvt").val("");
                        $(".manhql").val("");
                        $(".cbvtbyqlvt").val("NULL");
                        $(".cbthuabyvt").val("NULL");
                        $(".cblobythua").val("NULL");
                        $(".cbnctbyqlvt").val("NULL");
                        $(".cbctbynct").val("NULL");
                        $(".soluong").val("");
                        $(".cbdvt").val("NULL");
                        $(".cbcongdoanbyvt").val("NULL");
                        $(".ngaybd").val("");
                        $(".ngaykt").val("");
                    });
                }
            }
        });
    });
    //phân trang
    var pagecurrent_qlvt = 0;
    $(".numberpageqlvt").on('click', 'button', function () {

        pagecurrent_qlvt = $(this).val();
        showDataTableQLVTPage($(this).val(), record);
    })
    //SỰ KIỆN FOCUS VÀ CHANGE
    //CBB Thửa by Vùng trồng
    $(".cbvtbyqlvt").on('change', function () {
        console.log($(this).val());
        showCBThuaByVT($(this).val());
    })
    $(".cbvtbyqlvt").on('focus', function () {
        console.log($(this).val());
        showCBThuaByVT($(this).val());
    });
    //CBB Lô by Thửa
    $(".cbthuabyvt").on('change', function () {
        console.log($(this).val());
        showCBLoByThua($(this).val());
    })
    $(".cbthuabyvt").on('focus', function () {
        console.log($(this).val());
        showCBLoByThua($(this).val());
    });
    //CBB Cây trồng by Nhóm cây trồng
    $(".cbnctbyqlvt").on('change', function () {
        console.log($(this).val());
        showCBCTByNCT($(this).val());
    })
    $(".cbnctbyqlvt").on('focus', function () {
        console.log($(this).val());
        showCBCTByNCT($(this).val());
    });
});

// function showDataTableQLVT() {
//     var search = $(".txttimqlvt").val();
//     console.log("search=" + search);
//     var datasend = {
//         search: search,
//         event: "getQLVTPhanTrang"
//     }
//     $(".addListQLVT").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

//     queryData("php/apiallqlvt.php", datasend, function (res) {
//         console.log(res)
//         var data = res.items;
//         if (data.length == 0) {
//             $(".addListQLVT").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
//         } else {
//             arrQLVT = data;
//             var s = '';
//             var stt = 1;
//             for (var i in data) {
//                 var d = data[i];
//                 s = s + ' <tr>' +
//                     ' <td>' + stt + '</td>' +
//                     ' <td>' + d.maqlvt + '</td>' +
//                     ' <td>' + d.tenvt + '</td>' +
//                     ' <td>' + d.tenthua + '</td>' +
//                     ' <td>' + d.tenlo + '</td>' +
//                     ' <td>' + d.tennhomctrong + '</td>' +
//                     ' <td>' + d.tencaytrong + '</td>' +
//                     ' <td>' + d.soluong + '</td>' +
//                     ' <td>' + d.tendvt + '</td>' +
//                     ' <td>' + d.ngaybd + '</td>' +
//                     ' <td>' + d.ngaykt + '</td>' +
//                     ' <td>' + d.tencongdoan + '</td>' +
//                     ' <td>' + d.tennongho + '</td>' +
//                     '<td data-qlvt=' + i + ' data-maqlvt=' + d.maqlvt + ' data-tenqlvt="' + d.tennongho + '" ' +
//                     ' data-tenvt="' + d.tenvt + '" data-tenthua="' + d.tenthua + '" ' +
//                     ' data-tenlo="' + d.tenlo + '" data-tennhomctrong="' + d.tennhomctrong + '" data-tencaytrong="' + d.tencaytrong + '" ' +
//                     ' data-soluong="' + d.soluong + '" data-tencongdoan="' + d.tencongdoan + '"  data-tendvt="' + d.tendvt + '" data-ngaybt="' + d.ngaybd + '" data-ngaykt="' + d.ngaykt + '">' +
//                     '<span class="badge btn-outline-dark btnsuaqlvt"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
//                     '<span class="badge btn-outline-danger clickxoaqlvt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
//                     '</tr>';
//                 stt++;
//             }
//             //    console.log(s);
//             $(".addListQLVT").html(s);
//         }
//     });
// }
//có sử dụng phân trang
function showDataTableQLVTPage(page, record) {
    var search = $(".txttimqlvt").val();
    console.log("search=" + search);
    var datasend = {
        page: page,
        record: record,
        search: search,
        event: "getQLVTPhanTrang"
    }
    $(".addListQLVT").html('<tr><td colspan="100%"><img src="images/loading.gif" width="20px" height="20px"> Đang tải dữ liệu</td></tr>');

    queryData("php/apiallqlvt.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if (data.length == 0) {
            $(".addListQLVT").html('<tr><td colspan="100%"><span class="badge bg-block bg-danger"><i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;Không có dữ liệu</span></td></tr>');
            $(".numberpageqlvt").html("");
        } else {
            var stt = 1;
            stt = printSTT(record, res.page);
            arrQLVT = data;
            var s = '';

            for (var i in data) {
                var d = data[i];
                s = s + ' <tr>' +
                    ' <td>' + stt + '</td>' +
                    ' <td>' + d.maqlvt + '</td>' +
                    ' <td>' + d.tenvt + '</td>' +
                    ' <td>' + d.tenthua + '</td>' +
                    ' <td>' + d.tenlo + '</td>' +
                    ' <td>' + d.tennhomctrong + '</td>' +
                    ' <td>' + d.tencaytrong + '</td>' +
                    ' <td>' + d.soluong + '</td>' +
                    ' <td>' + d.tendvt + '</td>' +
                    ' <td>' + d.ngaybd + '</td>' +
                    ' <td>' + d.ngaykt + '</td>' +
                    ' <td>' + d.tencongdoan + '</td>' +
                    ' <td>' + d.tennongho + '</td>' +
                    '<td data-qlvt=' + i + ' data-maqlvt=' + d.maqlvt + ' data-tenqlvt="' + d.tennongho + '" ' +
                    ' data-tenvt="' + d.tenvt + '" data-tenthua="' + d.tenthua + '" ' +
                    ' data-tenlo="' + d.tenlo + '" data-tennhomctrong="' + d.tennhomctrong + '" data-tencaytrong="' + d.tencaytrong + '" ' +
                    ' data-soluong="' + d.soluong + '" data-tencongdoan="' + d.tencongdoan + '"  data-tendvt="' + d.tendvt + '" data-ngaybt="' + d.ngaybd + '" data-ngaykt="' + d.ngaykt + '">' +
                    '<span class="badge btn-outline-dark btnsuaqlvt"><i class="fa fa-pencil-square-o"></i>&nbsp;Sửa</span>&nbsp;' +
                    '<span class="badge btn-outline-danger clickxoaqlvt"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                    '</tr>';
                stt++;
            }
            //    console.log(s);
            $(".addListQLVT").html(s);
            buildSlidePage($(".numberpageqlvt"), 5, res.page, res.totalpage);
        }
    });
}
// cb vùng trồng by qlvt
function showCBVT_QLVT() {
    var datasend = {
        event: "getALLDataQLVT",
        search: ""
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn vùng trồng</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.mavt + '">' + d.tenvt + '</option>';
        }
        $(".cbvtbyqlvt").html(ht);
    });
}

// cb thửa by vùng trồng
function showCBThuaByVT(mavt) {
    var datasend = {
        mavt: mavt,
        event: "getALLDataThuaByVT"
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn thửa</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.mathua + '">' + d.tenthua + '</option>';
        }
        $(".cbthuabyvt").html(ht);
    });
}

// cb lô by thửa
function showCBLoByThua(mathua) {
    var datasend = {
        mathua: mathua,
        event: "getALLDataLoByThua"
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn lô</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.malo + '">' + d.tenlo + '</option>';
        }
        $(".cblobythua").html(ht);
    });
}
// cb nhóm cây trồng
function showCBNCTByQLVT() {
    var datasend = {
        event: "getALLDataNCT",
        search: ""
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn nhóm cây trồng</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.manhomctrong + '">' + d.tennhomctrong + '</option>';
        }
        $(".cbnctbyqlvt").html(ht);
    });
}
// cb cây trồng
function showCBCTByNCT(manhomctrong) {
    var datasend = {
        event: "getALLDataCTByNCT",
        manhomctrong: manhomctrong
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn cây trồng</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.macaytrong + '">' + d.tencaytrong + '</option>';
        }
        $(".cbctbynct").html(ht);
    });
}
// cb đơn vị tính
function showCBDVT() {
    var datasend = {
        event: "getALLDataDVT",
        search: ""
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Đơn vị</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.madvt + '">' + d.tendvt + '</option>';
        }
        $(".cbdvt").html(ht);
    });
}
// cb đơn vị tính
function showCBCDByVT() {
    var datasend = {
        event: "getALLDataCDByVT",
        search: ""
    }
    queryData("php/apiallqlvt.php", datasend, function (res) {
        var data = res.items;
        var ht = '<option value="NULL">Chọn công đoạn</option>';
        for (var i in data) {
            var d = data[i];
            ht = ht + '<option value="' + d.macongdoan + '">' + d.tencongdoan + '</option>';
        }
        $(".cbcongdoanbyvt").html(ht);
    });
}