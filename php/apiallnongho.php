<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getNHPhanTrang
    case "getNHPhanTrang":

        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select manongho, tennongho, gt, namsinh, sdt, email, diachi, urlanh from nongho
                                 where (manongho like '%".$search."%' or tennongho like '%".$search."%' or gt like '%".$search."%' or
                                        namsinh like '%".$search."%' or sdt like '%".$search."%' or email like '%".$search."%' or diachi like '%".$search."%') 
                                 order by manongho asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['manongho']=$rows['manongho'];
			$usertemp['tennongho']=$rows['tennongho'];
            $usertemp['gt']=$rows['gt'];
            $usertemp['namsinh']=$rows['namsinh'];
			$usertemp['sdt']=$rows['sdt'];
            $usertemp['email']=$rows['email'];
            $usertemp['diachi']=$rows['diachi'];
            $usertemp['urlanh']=$rows['urlanh'];
           
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from nongho 
                                where (manongho like '%".$search."%' or tennongho like '%".$search."%') 
                                order by manongho asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;

        // deleteNH
    case "deleteNH":

        $manongho=$_GET['manongho']; 
        $sql="DELETE FROM `nongho` WHERE `manongho`='".$manongho."'";
      
       
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

        // insertNH
    case "insertNH":

        $manongho=$_GET['manongho'];
		$tennongho=$_GET['tennongho'];  
		$gt = $_GET['gt'];  
		$namsinh = $_GET['namsinh'];
        $sdt = $_GET['sdt'];
        $email = $_GET['email'];
        $diachi = $_GET['diachi'];
        $urlanh = $_GET['urlanh'];

        $sql="INSERT INTO `nongho`(`manongho`, `tennongho`, `gt`, `namsinh`, `sdt`, `email`, `diachi`, `urlanh`) VALUES ('".$manongho."','".$tennongho."','".$gt."','".$namsinh."','".$sdt."','".$email."','".$diachi."','".$urlanh."')";
      
       
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

        // updateNH
    case "updateNH":

        $manongho=$_GET['manongho'];
		$tennongho=$_GET['tennongho'];  
		$gt = $_GET['gt'];   //nl2br($_POST['tomtat']);
		$namsinh = $_GET['namsinh'];
        $sdt = $_GET['sdt'];
        $email = $_GET['email'];
        $diachi = $_GET['diachi'];
        $urlanh = $_GET['urlanh'];
        $sql="UPDATE `nongho` SET `tennongho`='".$tennongho."', `gt`='".$gt."', `namsinh`='".$namsinh."', `sdt`='".$sdt."', `email`='".$email."', `diachi`='".$diachi."', `urlanh`='".$urlanh."' WHERE `manongho`='".$manongho."'";
      
       
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
