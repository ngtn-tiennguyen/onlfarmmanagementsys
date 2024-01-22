<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getALLDataVT
    case "getALLDataVT":

        $mang = array();
        $sql = mysqli_query($conn, "select mavt,tenvt from vungtrong");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mavt'] = $rows['mavt'];
            $usertemp['tenvt'] = $rows['tenvt'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getThuaPhanTrang
    case "getThuaPhanTrang":

        $mang = array();
        $record = $_GET['record']; //số dòng cần lấy
        $page = $_GET['page']; //số trang mà client gửi lên

        $vt = $page * $record; //tính toán lại vi trị cần lấy
        $limit = 'limit ' . $vt . ' , ' . $record;
        $search = $_GET["search"];
        $sql = mysqli_query($conn, "select t.mathua, t.tenthua, t.dientichthua, t.mavt, vt.tenvt from thua t, vungtrong vt
                                 where t.mavt=vt.mavt and (t.mathua like '%" . $search . "%' or t.tenthua like '%" . $search . "%' or t.dientichthua like '%" . $search . "%') 
                                 order by mathua asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mathua'] = $rows['mathua'];
            $usertemp['tenthua'] = $rows['tenthua'];
            $usertemp['dientichthua'] = $rows['dientichthua'];
            $usertemp['mavt'] = $rows['mavt'];
            $usertemp['tenvt'] = $rows['tenvt'];

            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from thua t, vungtrong vt
                                where t.mavt=vt.mavt and (t.mathua like '%" . $search . "%' or  t.tenthua like '%" . $search . "%') 
                                order by mathua asc ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // deleteThua
    case "deleteThua":

        $mathua=$_GET['mathua']; 
        $sql="DELETE FROM `thua` WHERE `mathua`='".$mathua."'";
      
       
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;

        // insertThua
    case "insertThua":

        $mathua=$_GET['mathua'];
		$tenthua=$_GET['tenthua'];  
		$dientichthua=$_GET['dientichthua'];  
		$mavt=$_GET['mavt'];
        $sql="INSERT INTO `thua` (`mathua`, `tenthua`, `dientichthua`, `mavt`) VALUES ('".$mathua."','".$tenthua."','".$dientichthua."', '".$mavt."')";
      
       
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;

        // updateThua
    case "updateThua":

        $mathua=$_GET['mathua'];
		$tenthua=$_GET['tenthua'];  
		$dientichthua=$_GET['dientichthua'];   
		$mavt=$_GET['mavt'];
        $sql="UPDATE `thua` SET `tenthua`='".$tenthua."', `dientichthua`='".$dientichthua."', mavt='".$mavt."' WHERE `mathua`='".$mathua."'";
      
       
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;

    default:
        break;
}
