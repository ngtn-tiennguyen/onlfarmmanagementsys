<?php
require_once("server.php");
$event = $_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
switch ($event) {

        // getALLDataNCTrong
    case "getALLDataNCT":

        $mang = array();
        $sql = mysqli_query($conn, "select manhomctrong, tennhomctrong from nhomctrong");
        while ($rows = mysqli_fetch_array($sql)) {

            $usertemp['manhomctrong'] = $rows['manhomctrong'];
            $usertemp['tennhomctrong'] = $rows['tennhomctrong'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        // getCTrongPhanTrang
    case "getCTrongPhanTrang":

        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select ct.macaytrong, ct.tencaytrong, ct.tomtatcaytrong, ct.manhomctrong, nct.tennhomctrong from caytrong ct, nhomctrong nct
                                 where ct.manhomctrong=nct.manhomctrong and (ct.macaytrong like '%".$search."%' or ct.tencaytrong like '%".$search."%' or ct.tomtatcaytrong like '%".$search."%') 
                                 order by macaytrong asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['macaytrong']=$rows['macaytrong'];
			$usertemp['tencaytrong']=$rows['tencaytrong'];
            $usertemp['tomtatcaytrong']=$rows['tomtatcaytrong'];
            $usertemp['manhomctrong']=$rows['manhomctrong'];
			$usertemp['tennhomctrong']=$rows['tennhomctrong'];
           
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from caytrong ct, nhomctrong nct
                                where ct.manhomctrong=nct.manhomctrong and (ct.macaytrong like '%".$search."%' or  ct.tencaytrong like '%".$search."%') 
                                order by macaytrong asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;

        // deleteCTrong
    case "deleteCTrong":

        $macaytrong=$_GET['macaytrong']; 
        $sql="DELETE FROM `caytrong` WHERE `macaytrong`='".$macaytrong."'";
      
       
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

        // insertCTrong
    case "insertCTrong":

        $macaytrong=$_GET['macaytrong'];
		$tencaytrong=$_GET['tencaytrong'];  
		$tomtatcaytrong = $_GET['tomtatcaytrong'];   //nl2br($_POST['tomtat']);
		$manhomctrong=$_GET['manhomctrong'];
        $sql="INSERT INTO `caytrong`(`macaytrong`, `tencaytrong`, `tomtatcaytrong`, `manhomctrong`) VALUES ('".$macaytrong."','".$tencaytrong."','".$tomtatcaytrong."','".$manhomctrong."')";
      
       
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

        // updateCTrong
    case "updateCTrong":

        $macaytrong=$_GET['macaytrong'];
		$tencaytrong=$_GET['tencaytrong'];  
		$tomtatcaytrong=$_GET['tomtatcaytrong'];  
		$manhomctrong=$_GET['manhomctrong']; 
        $sql="UPDATE `caytrong` SET `tencaytrong`='".$tencaytrong."', `tomtatcaytrong`='".$tomtatcaytrong."', `manhomctrong`='".$manhomctrong."' WHERE `macaytrong`='".$macaytrong."'";
      
       
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
