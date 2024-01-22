$(document).ready(function () {
    swapForm("formhome");

    //menu vùng trồng
    $(".menuvungtrong").click(function () {
        swapForm("formvungtrong");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemvt").prop("disabled", false);//sáng
        $(".btnsuavt").prop("disabled", true);//Mờ
        $(".btnluuvt").prop("disabled", true);//mờ
        showDataTableVTPage(0, record);
    })
    //click vùng trồng
    $(".clickdsvt").click(function () {
        swapForm("formdsvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableVTPage(0, record);
    })

    //menu thửa
    $(".menuthua").click(function () {
        swapForm("formthua");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Thửa</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemthua").prop("disabled", false);//sáng
        $(".btnsuathua").prop("disabled", true);//Mờ
        $(".btnluuthua").prop("disabled", true);//mờ
        showCBVT();
        showDataTableThuaPage(0, record);
    })
    //click thửa
    $(".clickdsthua").click(function () {
        swapForm("formdsthua");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Thửa</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableThuaPage(0, record);
    })

    //menu lô
    $(".menulo").click(function () {
        swapForm("formlo");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Lô</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemlo").prop("disabled", false);//sáng
        $(".btnsualo").prop("disabled", true);//Mờ
        $(".btnluulo").prop("disabled", true);//mờ
        showCBThua();
        showDataTableLoPage(0, record);
    })
    //click lô
    $(".clickdslo").click(function () {
        swapForm("formdslo");
        var st = ' <li class="breadcrumb-item"><a href="#" >Khởi tạo vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Lô</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableLoPage(0, record);
    })

    //menu nhóm cây trồng
    $(".menunhomctrong").click(function () {
        swapForm("formnhomctrong");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Nhóm cây trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemnhomctrong").prop("disabled", false);//sáng
        $(".btnsuanhomctrong").prop("disabled", true);//Mờ
        $(".btnluunhomctrong").prop("disabled", true);//mờ
        showDataTableNCTrongPage(0, record);
    })
    //click nhóm cây trồng
    $(".clickdsnct").click(function () {
        swapForm("formdsnct");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Nhóm cây trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableNCTrongPage(0, record);
    })

    //menu cây trồng
    $(".menucaytrong").click(function () {
        swapForm("formcaytrong");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Cây trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemcaytrong").prop("disabled", false);//sáng
        $(".btnsuacaytrong").prop("disabled", true);//Mờ
        $(".btnluucaytrong").prop("disabled", true);//mờ
        showCBNCT();
        showDataTableCTrongPage(0, record);
    })
    //click cây trồng
    $(".clickdsct").click(function () {
        swapForm("formdsct");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Cây trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showCBNCT();
        showDataTableCTrongPage(0, record);
    })

    //menu đơn vị tính
    $(".menudvt").click(function () {
        swapForm("formdvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Đơn vị tính</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemdvt").prop("disabled", false);//sáng
        $(".btnsuadvt").prop("disabled", true);//Mờ
        $(".btnluudvt").prop("disabled", true);//mờ
        showDataTableDVTPage(0, record);
    })
    //click đơn vị tính
    $(".clickdsdvt").click(function () {
        swapForm("formdsdvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Đơn vị tính</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableDVTPage(0, record);
    })

    //menu công đoạn
    $(".menucongdoan").click(function () {
        swapForm("formcongdoan");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Công đoạn</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemcongdoan").prop("disabled", false);//sáng
        $(".btnsuacongdoan").prop("disabled", true);//Mờ
        $(".btnluucongdoan").prop("disabled", true);//mờ
        showDataTableCDoanPage(0, record);
    })
    //click ds công đoạn
    $(".clickdscd").click(function () {
        swapForm("formdscd");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục canh tác</a></li>' +
            ' <li class="breadcrumb-item active">Công đoạn</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableCDoanPage(0, record);
    })

    //menu quản lý vùng trồng
    $(".menuqlvt").click(function () {
        swapForm("formqlvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Quản lý vùng trồng</a></li>' +
            ' <li class="breadcrumb-item active">Quản lý vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemqlvt").prop("disabled", false);//sáng
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", true);//mờ
        showCBVT_QLVT();
        showCBThuaByVT("");
        showCBLoByThua("");
        showCBNCTByQLVT();
        showCBCTByNCT("");
        showCBDVT();
        showCBCDByVT();
    })
    //click danh sách vùng trồng
    $(".menudsvt").click(function () {
        swapForm("formdsvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>' +
            ' <li class="breadcrumb-item active">Danh sách vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableQLVTPage(0, record);
    })

    //menu nông hộ
    $(".menunongho").click(function () {
        swapForm("formnongho");
        var st = ' <li class="breadcrumb-item"><a href="#" >Quản lý người dùng</a></li>' +
            ' <li class="breadcrumb-item active">Nông hộ</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemnongho").prop("disabled", false);//sáng
        $(".btnsuanongho").prop("disabled", true);//Mờ
        $(".btnluunongho").prop("disabled", true);//mờ
        showDataTableNHPage(0, record);
    })
    // click danh sách nông hộ
    $(".clickdsnh").click(function () {
        swapForm("formdsnh");
        var st = ' <li class="breadcrumb-item"><a href="#" >Quản lý người dùng</a></li>' +
            ' <li class="breadcrumb-item active">Nông hộ</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        showDataTableNHPage(0, record);
    })

    //chuyển form
    function swapForm(f) {
        $(".formhome").addClass("is-hidden");
        $(".formdsvtql").addClass("is-hidden");
        $(".formqlvt").addClass("is-hidden");
        $(".formdscd").addClass("is-hidden");
        $(".formcongdoan").addClass("is-hidden");
        $(".formdsdvt").addClass("is-hidden");
        $(".formdvt").addClass("is-hidden");
        $(".formdsct").addClass("is-hidden");
        $(".formcaytrong").addClass("is-hidden");
        $(".formdsnct").addClass("is-hidden");
        $(".formnhomctrong").addClass("is-hidden");
        $(".formdsthua").addClass("is-hidden");
        $(".formthua").addClass("is-hidden");
        $(".formdslo").addClass("is-hidden");
        $(".formlo").addClass("is-hidden");
        $(".formdsvt").addClass("is-hidden");
        $(".formvungtrong").addClass("is-hidden");
        $(".formdsnh").addClass("is-hidden");
        $(".formnongho").addClass("is-hidden");

        $("." + f).removeClass("is-hidden");
    }
    //button home
    $(".btnhome").click(function () {
        swapForm("formhome");
        var st = ' <li class="breadcrumb-item"><a href="#" ></a></li>' +
            ' <li class="breadcrumb-item active">Trang chủ</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
    });
    //button sửa quản lý vùng trồng
    $(".addListQLVT").on('click', '.btnsuaqlvt', function () {
        swapForm("formqlvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>' +
            ' <li class="breadcrumb-item active">Quản lý vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemqlvt").prop("disabled", true);//mờ
        $(".btnsuaqlvt").prop("disabled", false);//sáng
        $(".btnluuqlvt").prop("disabled", false);//sáng
        showCBVT_QLVT();
        showCBThuaByVT("");
        showCBLoByThua("");
        showCBNCT();
        showCBCTByNCT("");
        showCBDVT();
        showCBCDByVT();
        showDataTableQLVTPage(0, record);
    })
    //button thêm quản lý vùng trồng
    $(".btnthemqlvt").click(function () {
        swapForm("formqlvt");
        var st = ' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>' +
            ' <li class="breadcrumb-item active">Quản lý vùng trồng</li>';
        console.log(st);
        $(".breadcrumbcurrent").html(st);
        $(".btnthemqlvt").prop("disabled", true);//mờ
        $(".btnsuaqlvt").prop("disabled", true);//Mờ
        $(".btnluuqlvt").prop("disabled", false);//sáng
        showCBVT_QLVT();
        showCBThuaByVT("");
        showCBLoByThua("");
        showCBNCT();
        showCBCTByNCT("");
        showCBDVT();
        showCBCDByVT();
        // showDataTableQLVTPage(0, record);
    })
});