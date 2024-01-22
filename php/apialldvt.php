<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getDVTPhanTrang
    case "getDVTPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $dvt = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $dvt . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select madvt, tendvt from dvt
                                 where (madvt like '%" . $search . "%' or tendvt like '%" . $search . "%') 
                                 order by madvt asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['madvt'] = $rows['madvt'];
            $usertemp['tendvt'] = $rows['tendvt'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from dvt 
                                where (madvt like '%" . $search . "%' or  tendvt like '%" . $search . "%') 
                                order by madvt asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteDVT
    case "deleteDVT":

        $madvt = $_GET['madvt'];
        $sql = "DELETE FROM `dvt` WHERE `madvt`='" . $madvt . "'";


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

        // insertDVT
    case "insertDVT":

        $madvt = $_GET['madvt'];
        $tendvt = $_GET['tendvt'];
        $sql = "INSERT INTO `dvt`(`madvt`, `tendvt`) 
			  VALUES ('" . $madvt . "','" . $tendvt . "')";


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

        // updateDVT
    case "updateDVT":

        $madvt = $_GET['madvt'];
        $tendvt = $_GET['tendvt'];
        $sql = "UPDATE `dvt` SET `tendvt`='" . $tendvt . "' 
                WHERE `madvt`='" . $madvt . "'";


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
