<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/ObjectsO.php';

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

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$Objects = new ObjectsO($db);

$ID = $_POST['ID'];
$Status = $_POST['Status'];
$Date = $_POST['Date'];
$Price = $_POST['Price'];
$ObjectID = $_POST['ObjectID'];

$stmt = $Objects->UpdateNeedMaterials($ID, $Status, $Date, $Price);

if($ObjectID > 0){
$stmt = $Objects->ReadNeedMaterialsForObject($ObjectID);    
}
else{
    $stmt = $Objects->ReadAllNeedMaterialsForObject();    
}
$num = $stmt->rowCount();



if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["NeedMaterials"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "NeedMaterialsID" => $NeedMaterialsID,
            "Name" => $Name,
            "Col" => $Col,
            "ObjectID" => $ObjectID,
            "Date" => $Date,
            "Status" => $Status,
            "Price" => $Price,
            "ObjectName" => $ObjectName,
            "Adress" => $Adress,
            "EmployeeName" => $EmployeeName,
            "Phone" => $Phone,
            "Email" => $Email
        );

        array_push($products_arr["NeedMaterials"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(200);
    
     echo json_encode(0);
}
?>