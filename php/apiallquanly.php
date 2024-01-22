<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getQLPhanTrang
    case "getQLPhanTrang":

        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select maquanl, tenquanly, pass, chucvu, urlanh from quanly
                                 where (email like '%".$search."%' or tenquanly like '%".$search."%' or chucvu like '%".$search."%') 
                                 order by email asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['email']=$rows['email'];
			$usertemp['tenquanly']=$rows['tenquanly'];
            $usertemp['pass']=$rows['pass'];
            $usertemp['chucvu']=$rows['chucvu'];
            $usertemp['urlanh']=$rows['urlanh'];
           
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from quanly 
                                where (email like '%".$search."%' or tenquanly like '%".$search."%') 
                                order by email asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;

        // deleteQL
    case "deleteQL":

        $email=$_GET['email']; 
        $sql="DELETE FROM `quanly` WHERE `email`='".$email."'";
      
       
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

        // insertQL
    case "insertQL":

        $email=$_GET['email'];
		$tenquanly=$_GET['tenquanly'];  
		$pass = $_GET['pass'];  
		$chucvu = $_GET['chucvu'];
        $urlanh = $_GET['urlanh'];

        $sql="INSERT INTO `quanly`(`email`, `tenquanly`, `pass`, `chucvu`, `urlanh`) VALUES ('".$email."','".$tenquanly."',,'".$pass."','".$chucvu."','".$urlanh."')";
      
       
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

        // updateQL
    case "updateQL":

        $email=$_GET['email'];
		$tenquanly=$_GET['tenquanly'];  
		$pass = $_GET['pass'];  
		$chucvu = $_GET['chucvu'];
        $urlanh = $_GET['urlanh'];
        $sql="UPDATE `quanly` SET `tenquanly`='".$tenquanly."', `pass`='".$pass."', `chucvu`='".$chucvu."', `urlanh`='".$urlanh."' WHERE `email`='".$email."'";
      
       
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
