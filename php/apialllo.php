<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getALLDataThua
    case "getALLDataThua":

        $mang = array();
        $sql = mysqli_query($conn, "select mathua, tenthua from thua");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['mathua'] = $rows['mathua'];
            $usertemp['tenthua'] = $rows['tenthua'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getLoPhanTrang
    case "getLoPhanTrang":

        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select l.malo, l.tenlo, l.dientichlo, l.mathua, t.tenthua from lo l, thua t
                                 where l.mathua=t.mathua and (l.malo like '%".$search."%' or l.tenlo like '%".$search."%' or l.dientichlo like '%".$search."%' or t.tenthua like '%".$search."%') 
                                 order by malo asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['malo']=$rows['malo'];
			$usertemp['tenlo']=$rows['tenlo'];
            $usertemp['dientichlo']=$rows['dientichlo'];
            $usertemp['mathua']=$rows['mathua'];
			$usertemp['tenthua']=$rows['tenthua'];
           
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from lo l, thua t
                                where l.mathua=t.mathua and (l.malo like '%".$search."%' or  l.tenlo like '%".$search."%') 
                                order by malo asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;

        // deleteThua
    case "deleteLo":

        $malo=$_GET['malo']; 
        $sql="DELETE FROM `lo` WHERE `malo`='".$malo."'";
      
       
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
    case "insertLo":

        $malo=$_GET['malo'];
		$tenlo=$_GET['tenlo'];  
		$dientichlo=$_GET['dientichlo'];
		$mathua=$_GET['mathua'];  
        $sql="INSERT INTO `lo`(`malo`, `tenlo`, `dientichlo`, `mathua`) VALUES ('".$malo."','".$tenlo."','".$dientichlo."', '".$mathua."')";
      
       
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
    case "updateLo":

        $malo=$_GET['malo'];
		$tenlo=$_GET['tenlo'];  
		$dientichlo=$_GET['dientichlo']; 
		$mathua=$_GET['mathua'];  
        $sql="UPDATE `lo` SET `tenlo`='".$tenlo."', `dientichlo`='".$dientichlo."', `mathua`='".$mathua."' WHERE `malo`='".$malo."'";
      
       
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
