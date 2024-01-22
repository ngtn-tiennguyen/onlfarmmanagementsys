<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getALLDataQLVT
    case "getALLDataQLVT":

        $mang = array();
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select mavt, tenvt from vungtrong
                                    where (mavt like '%" . $search . "%' or tenvt like '%" . $search . "%') order by mavt asc ");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mavt'] = $rows['mavt'];
            $usertemp['tenvt'] = $rows['tenvt'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataThuaByVT
    case "getALLDataThuaByVT":
        $mang = array();
        $mavt = $_GET["mavt"];
        $sql = mysqli_query($conn, "select mathua, tenthua, t.mavt, tenvt from thua t, vungtrong vt 
                                    where t.mavt=vt.mavt and t.mavt='" . $mavt . "'");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mathua'] = $rows['mathua'];
            $usertemp['tenthua'] = $rows['tenthua'];
            $usertemp['mavt'] = $rows['mavt'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataLoByThua
    case "getALLDataLoByThua":

        $mang = array();
        $mathua = $_GET["mathua"];
        $sql = mysqli_query($conn, "select malo, tenlo, l.mathua, tenthua from lo l, thua t
                                    where l.mathua=t.mathua and l.mathua='" . $mathua . "'");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['malo'] = $rows['malo'];
            $usertemp['tenlo'] = $rows['tenlo'];
            $usertemp['mathua'] = $rows['mathua'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataNCTrong
    case "getALLDataNCT":

        $mang = array();
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select manhomctrong,tennhomctrong from nhomctrong
                                    where (manhomctrong like '%" . $search . "%' or tennhomctrong like '%" . $search . "%') order by manhomctrong asc ");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['manhomctrong'] = $rows['manhomctrong'];
            $usertemp['tennhomctrong'] = $rows['tennhomctrong'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataCTByNCT
    case "getALLDataCTByNCT":

        $mang = array();
        $manhomctrong = $_GET["manhomctrong"];
        $sql = mysqli_query($conn, "select macaytrong, tencaytrong, ct.manhomctrong, tennhomctrong from caytrong ct, nhomctrong nct
                                    where ct.manhomctrong=nct.manhomctrong and ct.manhomctrong='" . $manhomctrong . "'");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['macaytrong'] = $rows['macaytrong'];
            $usertemp['tencaytrong'] = $rows['tencaytrong'];
            $usertemp['manhomctrong'] = $rows['manhomctrong'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataDVT
    case "getALLDataDVT":

        $mang = array();
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select madvt, tendvt from dvt
                                    where (madvt like '%" . $search . "%' or tendvt like '%" . $search . "%') order by madvt asc ");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['madvt'] = $rows['madvt'];
            $usertemp['tendvt'] = $rows['tendvt'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getALLDataCDByVT
    case "getALLDataCDByVT":

        $mang = array();
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select macongdoan, tencongdoan from congdoan
                                    where (macongdoan like '%" . $search . "%' or tencongdoan like '%" . $search . "%') order by macongdoan asc ");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['macongdoan'] = $rows['macongdoan'];
            $usertemp['tencongdoan'] = $rows['tencongdoan'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getQLVTPhanTrang
    case "getQLVTPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $vt = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $vt . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "SELECT ql.maqlvt, ql.manongho, ql.mavt, ql.mathua, ql.malo, ql.manhomctrong, ql.macaytrong, soluong, ql.madvt, ql.macongdoan, ngaybd, ngaykt, tenvt, tenthua, tenlo, tennhomctrong, tencaytrong, tendvt, tencongdoan, tennongho
                                    FROM   qlvt ql, vungtrong vt, thua t, lo l, nhomctrong nct, caytrong ct, dvt dv, congdoan cd, nongho nh
                                    WHERE  ql.mavt=vt.mavt AND ql.mathua=t.mathua AND ql.malo=l.malo AND ql.manhomctrong=nct.manhomctrong  AND ql.macaytrong=ct.macaytrong AND ql.madvt=dv.madvt AND ql.macongdoan=cd.macongdoan AND ql.manongho=nh.manongho
                                    AND    (ql.maqlvt like '%" . $search . "%') 
                                           order by maqlvt asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['maqlvt'] = $rows['maqlvt'];
            $usertemp['manongho'] = $rows['manongho'];
            $usertemp['tennongho'] = $rows['tennongho'];
            $usertemp['mavt'] = $rows['mavt'];
            $usertemp['tenvt'] = $rows['tenvt'];
            $usertemp['mathua'] = $rows['mathua'];
            $usertemp['tenthua'] = $rows['tenthua'];
            $usertemp['malo'] = $rows['malo'];
            $usertemp['tenlo'] = $rows['tenlo'];
            $usertemp['manhomctrong'] = $rows['manhomctrong'];
            $usertemp['tennhomctrong'] = $rows['tennhomctrong'];
            $usertemp['macaytrong'] = $rows['macaytrong'];
            $usertemp['tencaytrong'] = $rows['tencaytrong'];
            $usertemp['soluong'] = $rows['soluong'];
            $usertemp['tendvt'] = $rows['tendvt'];
            $usertemp['tencongdoan'] = $rows['tencongdoan'];
            $usertemp['ngaybd'] = $rows['ngaybd'];
            $usertemp['ngaykt'] = $rows['ngaykt'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from qlvt ql, vungtrong vt
                                where ql.mavt=vt.mavt and (ql.maqlvt like '%" . $search . "%') 
                                order by maqlvt asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteQLVT
    case "deleteQLVT":

        $maqlvt = $_GET['maqlvt'];
        $sql = "DELETE FROM `qlvt` WHERE `maqlvt`='" . $maqlvt . "'";


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

        // insertQLVT
    case "insertQLVT":

        $maqlvt = $_GET['maqlvt'];
        $manongho = $_GET['manongho'];
        $mavt = $_GET['mavt'];
        $mathua = $_GET['mathua'];
        $malo = $_GET['malo'];
        $manhomctrong = $_GET['manhomctrong'];
        $macaytrong = $_GET['macaytrong'];
        $soluong = $_GET['soluong'];
        $madvt = $_GET['madvt'];
        $macongdoan = $_GET['macongdoan'];
        $ngaybd = $_GET['ngaybd'];
        $ngaykt = $_GET['ngaykt'];
        $sql = "INSERT INTO `qlvt` (`maqlvt`, `manongho`, `mavt`, `mathua`, `malo`, `manhomctrong`, `macaytrong`, `soluong`, `madvt`, `macongdoan`, `ngaybd`, `ngaykt`) 
                VALUES ('" . $maqlvt . "', '" . $manongho . "', '" . $mavt . "', '" . $mathua . "', '" . $malo . "', '" . $manhomctrong . "', '" . $macaytrong . "', '" . $soluong . "', '" . $madvt . "', '" . $macongdoan . "', '" . $ngaybd . "', '" . $ngaykt . "')";


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

        // updateQLVT
    case "updateQLVT":

        $maqlvt = $_GET['maqlvt'];
        $manongho = $_GET['manongho'];
        $mavt = $_GET['mavt'];
        $mathua = $_GET['mathua'];
        $malo = $_GET['malo'];
        $manhomctrong = $_GET['manhomctrong'];
        $macaytrong = $_GET['macaytrong'];
        $soluong = $_GET['soluong'];
        $madvt = $_GET['madvt'];
        $macongdoan = $_GET['macongdoan'];
        $ngaybd = $_GET['ngaybd'];
        $ngaykt = $_GET['ngaykt'];
        $sql = "UPDATE `qlvt` SET  `manongho`='" . $manongho . "', `mavt`='" . $mavt . "', `mathua`='" . $mathua . "', `malo`='" . $malo . "', `manhomctrong`='" . $manhomctrong . "', `macaytrong`='" . $macaytrong . "',
                                  `soluong`='" . $soluong . "', `madvt`='" . $madvt . "', `macongdoan`='" . $macongdoan . "', `ngaybd`='" . $ngaybd . "', `ngaykt`='" . $ngaykt . "'
                WHERE `maqlvt`='" . $maqlvt . "'";


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
