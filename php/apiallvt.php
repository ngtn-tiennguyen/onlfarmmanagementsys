<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getVTPhanTrang
    case "getVTPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $vt = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $vt . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select mavt, tenvt, dientichvt, tinhtp from vungtrong
                                 where (mavt like '%" . $search . "%' or tenvt like '%" . $search . "%' or dientichvt like '%" . $search . "%' or tinhtp like '%" . $search . "%') 
                                 order by mavt asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mavt'] = $rows['mavt'];
            $usertemp['tenvt'] = $rows['tenvt'];
            $usertemp['dientichvt'] = $rows['dientichvt'];
            $usertemp['tinhtp'] = $rows['tinhtp'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from vungtrong 
                                where (mavt like '%" . $search . "%' or  mavt like '%" . $search . "%') 
                                order by mavt asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteVT
    case "deleteVT":

        $mavt = $_GET['mavt'];
        $sql = "DELETE FROM `vungtrong` WHERE `mavt`='" . $mavt . "'";


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

        // insertVT
    case "insertVT":

        $mavt = $_GET['mavt'];
        $tenvt = $_GET['tenvt'];
        $dientichvt = $_GET['dientichvt'];
        $tinhtp = $_GET['tinhtp'];
        $sql = "INSERT INTO `vungtrong`(`mavt`, `tenvt`, `dientichvt`, `tinhtp`) 
			  VALUES ('" . $mavt . "','" . $tenvt . "', '" . $dientichvt . "', '" . $tinhtp . "')";


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

        // updateVT
    case "updateVT":

        $mavt = $_GET['mavt'];
        $tenvt = $_GET['tenvt'];
        $dientichvt = $_GET['dientichvt'];
        $tinhtp = $_GET['tinhtp'];
        $sql = "UPDATE `vungtrong` SET `tenvt`='" . $tenvt . "', `dientichvt`='" . $dientichvt . "', `tinhtp`='" . $tinhtp . "' 
                WHERE `mavt`='" . $mavt . "'";


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
