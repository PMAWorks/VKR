<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// получаем соединение с базой данных 
include_once '../config/database.php';

// создание объекта товара 
include_once '../objects/Shared.php';

if($_SERVER['HTTP_REFERER']){
        $pieces = explode("/", $_SERVER['HTTP_REFERER']);
        if($pieces[2] != 'pamian.site'){
            http_response_code(200);
            echo json_encode('Неавторизированное обращение. В доступе отказано.');
            return;
        }
}
else{
        echo('Неавторизированное обращение. В доступе отказано.');
        return;
}

$database = new Database();
$db = $database->getConnection();

$Shared = new Shared($db);

$Photo = $_POST['Photo'];
$Type = $_POST['Type'];
$PartnerID = $_POST['PartnerID'];
 
 
 
 
 $path = "../Photos/";
 

     if ($filename = $Shared -> resize_photo($path,$_FILES['Photo']['name'],$_FILES['Photo']['size'],$_FILES['Photo']['type'],$_FILES['Photo']['tmp_name'])){
     $Path = "https://pamian.site/KursovayaAPI/Photos/".$filename."";


 $products_arr=array();
    $products_arr["NewPhotoPreview"]=array();
    
    $product_item=array(
            "Path" => $Path,
    );
    
    array_push($products_arr["NewPhotoPreview"], $product_item);
        
http_response_code(200);
echo json_encode($products_arr);
     }

?>