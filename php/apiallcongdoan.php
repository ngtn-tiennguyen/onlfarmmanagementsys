<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getCDoanPhanTrang
    case "getCDoanPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $congdoan = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $congdoan . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select macongdoan, tencongdoan from congdoan
                                 where (macongdoan like '%" . $search . "%' or tencongdoan like '%" . $search . "%') 
                                 order by macongdoan asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['macongdoan'] = $rows['macongdoan'];
            $usertemp['tencongdoan'] = $rows['tencongdoan'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from congdoan 
                                where (macongdoan like '%" . $search . "%' or  tencongdoan like '%" . $search . "%') 
                                order by macongdoan asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteCDoan
    case "deleteCDoan":

        $macongdoan = $_GET['macongdoan'];
        $sql = "DELETE FROM `congdoan` WHERE `macongdoan`='" . $macongdoan . "'";


        if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
            if (mysqli_affected_rows($conn) > 0) { //đảm bảo dữ liệu có thay đổi

                $res["success"] = 1; // {"success":1} //trả về client đối tượng json 
            } else {
                $res["success"] = 0; //{"success":0}//trả về client đối tượng json 
            }
        } else {
            $res["success"] = 0; // {"success":0}//trả về client đối tượng json 
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

        // insertCDoan
    case "insertCDoan":

        $macongdoan = $_GET['macongdoan'];
        $tencongdoan = $_GET['tencongdoan'];
        $sql = "INSERT INTO `congdoan`(`macongdoan`, `tencongdoan`) 
			  VALUES ('" . $macongdoan . "','" . $tencongdoan . "')";


        if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
            if (mysqli_affected_rows($conn) > 0) { //đảm bảo dữ liệu có thay đổi

                $res["success"] = 1; // {"success":1} //trả về client đối tượng json 
            } else {
                $res["success"] = 0; //{"success":0}//trả về client đối tượng json 
            }
        } else {
            $res["success"] = 0; // {"success":0}//trả về client đối tượng json 
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

        // updateCDoan
    case "updateCDoan":

        $macongdoan = $_GET['macongdoan'];
        $tencongdoan = $_GET['tencongdoan'];
        $sql = "UPDATE `congdoan` SET `tencongdoan`='" . $tencongdoan . "' 
                WHERE `macongdoan`='" . $macongdoan . "'";


        if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
            if (mysqli_affected_rows($conn) > 0) { //đảm bảo dữ liệu có thay đổi

                $res["success"] = 1; // {"success":1} //trả về client đối tượng json 
            } else {
                $res["success"] = 0; //{"success":0}//trả về client đối tượng json 
            }
        } else {
            $res["success"] = 0; // {"success":0}//trả về client đối tượng json 
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    default:
        break;
}
