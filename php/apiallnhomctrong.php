<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getNCTrongPhanTrang
    case "getNCTrongPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $nhomctrong = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $nhomctrong . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select manhomctrong, tennhomctrong, motanhomctrong from nhomctrong
                                 where (manhomctrong like '%" . $search . "%' or tennhomctrong like '%" . $search . "%' or motanhomctrong like '%" . $search . "%') 
                                 order by manhomctrong asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['manhomctrong'] = $rows['manhomctrong'];
            $usertemp['tennhomctrong'] = $rows['tennhomctrong'];
            $usertemp['motanhomctrong'] = $rows['motanhomctrong'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from nhomctrong 
                                where (manhomctrong like '%" . $search . "%' or  tennhomctrong like '%" . $search . "%') 
                                order by manhomctrong asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteNCTrong
    case "deleteNCTrong":

        $manhomctrong = $_GET['manhomctrong'];
        $sql = "DELETE FROM `nhomctrong` WHERE `manhomctrong`='" . $manhomctrong . "'";


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

        // insertNCTrong
    case "insertNCTrong":

        $manhomctrong = $_GET['manhomctrong'];
        $tennhomctrong = $_GET['tennhomctrong'];
        $motanhomctrong = $_GET['motanhomctrong'];
        $sql = "INSERT INTO `nhomctrong`(`manhomctrong`, `tennhomctrong`, `motanhomctrong`) 
			  VALUES ('" . $manhomctrong . "','" . $tennhomctrong . "', '" . $motanhomctrong . "')";


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

        // updateNCTrong
    case "updateNCTrong":

        $manhomctrong = $_GET['manhomctrong'];
        $tennhomctrong = $_GET['tennhomctrong'];
        $motanhomctrong = $_GET['motanhomctrong'];
        $sql = "UPDATE `nhomctrong` SET `tennhomctrong`='" . $tennhomctrong . "', `motanhomctrong`='" . $motanhomctrong . "' 
                WHERE `manhomctrong`='" . $manhomctrong . "'";


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
